---
title: 'We shipped Enterprise SSO in 48 hours'
feature_image: we-shipped-enterprise-sso.png
post_image: we-shipped-enterprise-sso.png
primary_author:
    name: Subomi Oluwalana
    twitter: subomiOluwalana
primary_tag: Engineering
tags:
    - Convoy
    - Engineering
featured: false
description: 'We recently onboarded a customer who had Enterprise SSO requirements as a non-negotiable, and we were able to deliver a solution in ~2 days worth of work. I found the implementation to be quite straightforward so here’s a blog post. '
published_at: 2024-11-21T17:00:00.000+00:00
---

We recently onboarded a customer who had Enterprise SSO requirements as a non-negotiable, and we were able to deliver a solution in ~2 days worth of work. I found the implementation to be quite straightforward so here’s a blog post.

As with any technical problem, let’s first describe the requirement. Convoy is a webhook gateway that is available in the Cloud or on-prem. This customer in particular is going to deploy Convoy in their corporate network so the SSO capability needed to be embedded inside the binary.

## Options Considered

The first option we considered was building it ourselves from scratch leveraging open source libraries. This option was very attractive since this capability needs to exist in the core gateway that would be deployed by our customers. The idea of adding a third-party SaaS dependency that our customers needed to pay for wasn’t very appealing to us. But the problem with this approach is it would take us longer to ship because nobody on the team had shipped Enterprise SSO.

Nonetheless, we evaluated third-party SaaS offerings, specifically WorkOS and SSOReady. Both solutions seemed like equally viable options. But SSOReady stood out because we saw that we could potentially bundle the solution together with Convoy as an hoslitic solution for customers who didn’t want to reach out to a service for SSO. WorkOS on the other hand, was primarily a SaaS offering, so this wouldn’t have been possible.

But how quickly could we get this up and running? Thankfully, SSOReady also offered a SaaS solution, so rather thinking of deploying, we could dive straight into building, the only other problem was we didn’t want our users to take on new SaaS dependency they had to pay for to get SSO. If Convoy was a complete SaaS solution this wouldn’t have been a challenge. Users wouldn’t need to know about the internals of the implementation.

To solve for this last problem, we decided to build a proxy around the SaaS that enabled us to maintain one account for all our users rather than each user taking on SSOReady as a dependency. Enter the SSO Proxy.

## Designing the SSO Proxy

Enter the SSO Proxy, to ensure users didn’t take on a new SaaS dependency we wrote a simple SSO proxy that uses our SSO Proxy SaaS account. Self-Hosted instances connect to it and it connects to SSOReady’s SaaS to do the job. Let’s take a look at the Authorization flow:

![Authorization Flow](/blog-assets/authorization-flow.png)

The proxy was designed as part of the Rails monolith that powers Convoy Cloud. Let’s see the internals.

### Schema

```ruby
class CreateSSOTokens < ActiveRecord::Migration[7.1]
  def change
    create_table :sso_tokens, id: :uuid do |t|
      t.string :token
      t.string :saml_access_code
      t.text :data, null: false


      t.index :token, unique: true
      t.index :saml_access_code, unique: true
      t.timestamps
    end
  end
end
```

Here we create three columns:

1. `token`: our masked token.
2. `saml_access_code`: the access code from `SSOReady`, we add it here debugging reasons.
3. `data`: the payload retrieved from validating the initial token.

### SSO Token Model

```ruby
class SSOToken < ApplicationRecord

  after_find :destroy_self

  def self.hash_token(token)
    Digest::SHA256.hexdigest(token)
  end

  private

  def destroy_self
    destroy
  end
end
```

Here we design a self-destructing model to delete the token after validation. SAML tokens are one-time use; this is how SSOReady works, so we simply replicate this capability here.

### The Controller

```ruby
class SSOController < ApplicationController
  skip_before_action :authorize_request, only: [:redirect, :saml, :token]

  def redirect
    license = License.find_by_key!(params[:license_key])

    saml = SSOReady::Resources::Saml.new
    saml.body = { organizationExternalId: license.id }
    res = saml.redirect_url

    unless res.success?
      json = generate_json(status: false,
                           message: ApiResponse::SSO.failed_to_generate_uri)
      render status: 400, json: json and return
    end

    data = Models::Redirect.new(
      redirect_url: res.parsed_response["redirectUrl"])

    json = generate_json(status: true, data: data)
    render status: 200, json: json
  end

  def saml
    create_sso_token = CreateSSOToken.call(saml_access_code: params[:saml_access_code])

    unless create_sso_token.success?
      json = generate_json(status: false,
                           message: ApiResponse::SSO.failed_to_redeem)
      render status: 400, json: json and return
    end

    redirect_to create_sso_token.url, allow_other_host: true
  end

  def token
    sso_token = SSOToken.find_by(token: SSOToken.hash_token(params[:token]))

    if sso_token.nil?
      json = generate_json(status: false,
                           message: ApiResponse::SSO.invalid_token)
      render status: 400, json: json and return
    end

    data = Models::SSOTokenResponse.new(payload: sso_token.payload)
    json = generate_json(status: true, data: data)
    render status: 200, json: json
  end

end
```

Our proxy exposes three endpoints, to generate a redirect uri, to accept a redirect from SSOReady, and lastly to validate tokens.

Our proxy exposes three endpoints:

1. `redirect`: Each Convoy instance calls this endpoint with their License key to generate a redirect URI.
2. `saml`: This is the endpoint that we use in the callback chain from `SSOReady`. It handles the core logic of validating the `saml_access_code`, generating our own `token`, and redirect to the Convoy’s instance. More on this in the next section.
3. `token`: Each Convoy instance calls this endpoint with the masked token to validate the user and grant access to the user. Once this endpoint, the `token` is deleted.

### Business Logic

```ruby
class CreateSSOToken < ApplicationInteractor

  ERR_FAILED_TO_REDEEM = "failed to redeem sso ready saml code"

  def call
    saml_access_code = context.saml_access_code

    saml = SSOReady::Resources::Saml.new
    saml.body = { samlAccessCode: saml_access_code }
    res = saml.redeem

    fail_context_to_user!(message: ERR_FAILED_TO_REDEEM) unless res.success?

    body = res.parsed_response
    license_id = body['organizationExternalId']
    license = License.find(license_id)

    token = generate_token
    SSOToken.create!(
      payload:  body,
      token: SSOToken.hash_token(token),
      saml_access_code: context.saml_access_code
    )

    context.url = generate_url(license, token)

  rescue StandardError => e
    fail_context_to_sentry!(e)
  end

  def generate_url(license, token)
    uri = URI.parse(license.url)

    saml_params = {"saml_access_code": token}

    # Update the URL query with the new key-value pair
    existing_params = URI.decode_www_form(uri.query || "") # Handle case when no query is present
    updated_params = existing_params + saml_params.to_a
    uri.path = "/saml"
    uri.query = URI.encode_www_form(updated_params)

    return uri.to_s
  end

  def generate_token
    prefix = "saml_access_code"

    return "#{prefix}_#{ULID.generate.downcase}"
  end
end
```

This is the core logic that is called from the `saml` controller method. There are a few important things to note here:

1. We a `ULID` to generate URL Friendly tokens that’ll be passed down to the customer.
2. Tokens are as good as passwords, so we hash them to the database instead of saving them in plain text.
3. We added a `url` column to each License. That’s how we know where the Convoy instance is located which powers the redirect chain.

### Routing

```ruby
class SubdomainConstraint
  def initialize(subdomain)
    @subdomain = subdomain
  end

  def matches?(request)
    return true unless Rails.env.production?
    return true if request.subdomain == @subdomain
  end
end

Rails.application.routes.draw do

	...
	constraints SubdomainConstraint.new('ssoproxy') do
		post 'ssoready/redirect', to: 'sso#redirect'
		get 'ssoready/saml', to: 'sso#saml'
		post 'ssoready/token', to: 'sso#token'
	end

	...
end
```

Finally, we want to give our customers an easy way to grant egress access to the proxy, we do this by setting up the proxy routes under a subdomain; in this case: `ssoproxy.getconvoy.io`

## Conclusion

Delivering Enterprise SSO in just two days showed how effective the right tools and a focused approach can be. Embedding SSO directly into the Convoy binary ensured the solution met our customers' corporate network requirements while maintaining simplicity and efficiency.

This experience reinforced the value of reliable, developer-friendly tools like **SSOReady**, significantly reducing implementation complexity and time. It’s a great example of how tailored solutions can quickly adapt to enterprise needs without compromising quality.

For teams facing similar challenges, integrating tools like these can significantly improve their ability to meet deadlines and exceed expectations.

And that’s all, if you’re curious here’s the final [docs](https://getconvoy.io/docs/business-and-enterprise/single-sign-on) our users need to read to configure SSO. Shoutout to [Ulysse](https://www.linkedin.com/in/ucarion/), CTO at SSOReady, for reviewing and providing guidance to the design of this proxy.
