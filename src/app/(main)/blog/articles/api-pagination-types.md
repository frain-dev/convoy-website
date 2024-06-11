---
title: "API Pagination: How Leading API Platforms Implement It"
feature_image: 
post_image: 
primary_author:
    name: Amarachi Aso
    twitter: AsoAmarachi
primary_tag: API Pagination
tags:
    - Convoy
    - APIs
    - API Pagination
featured: false
description: Find out about the slightly different ways leading API platforms are implementing the two most common pagination types for APIs.
published_at: 2024-06-13T17:00:00.000+00:00
---

API endpoints that have the possibility of returning a large dataset as a response, should ideally support pagination. Pagination is the technique used to return data in small batches, as against returning all the available data that matches the request made at a go. In the absence of this, the problems that arise include a response time that gets slower as data grows, and the backend server or the client side retrieving or receiving an overwhelming amount of data that could cause either of them to shut down.

There are two widely used types of pagination, one is **offset-based** and the other is **cursor-based** pagination. Continue reading to find summaries of how leading API platforms like Atlassian, Shopify, GitHub, and three(3) more are implementing either of these two types of pagination.

### Offset-based Pagination

Offset is a type of pagination that fetches data from a database base on the two parameters - **limit**  and **offset**.

- **Limit**: The number of items to return.
- **Offset**: The number of items to skip before beginning to add items to be returned

More about possible ways to explore this approach can be learned from how some popular API platforms are implementing it. Consider these examples.

**Atlassian:** [Atlassian Confluence REST API](https://developer.atlassian.com/server/confluence/pagination-in-the-rest-api/) supports Offset-based pagination. To request the first page from an endpoint such as `http://localhost:8080/confluence/rest/api/space/ds/content/page`, the URL will look like this -

```
http://localhost:8080/confluence/rest/api/space/ds/content/page?limit=5

```

while the response is something like this -

```
{
    "_links": {
        "base": "http://localhost:8080/confluence",
        "context": "",
        "next": "/rest/api/space/ds/content/page?limit=5&start=5",
        "self": "http://localhost:8080/confluence/rest/api/space/ds/content/page"
    },
    "limit": 5,
    "results": [
        ...
    ],
    "size": 5,
    "start": 0
}

```

There are two things to take note of from the request URL and the response. One is that the request URL does not include a query for `offset`, it only includes `limit` which is set to 5. When an offset or start value is not specified, the counting will start from zero(0), hence this is ideal for requesting the initial page. To request the next page, notice that the response includes a property named "next", this property holds the relative url for the next page. This time it includes queries for both `limit` & `start`. "start" here signifies offset, and the value always corresponds to the position of the next item on the database after the current page. From the sample response, notice that the value is set to `5` because five items have been returned already, starting from the index 0 - 4.

Other notable things about how pages are requested and responded to in this API include that the response also includes a URL to the previous page if there is a previous page, for instance when you're on page two, the previous page would be page one. This works the same for the URL to the next page, it is only returned if there is a next page.

You don't always have to set a limit too as there's a default limit for the results, although they recommend that users always explicitly set the limit parameter to ensure they know how many results will be returned per page. Default limits are always nice to have even when there's a provision for consumers to set a limit parameter, this way you'd always catch exceptional cases where the caller forgets to set a limit.


**Github:** [Github's REST API](https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api?apiVersion=2022-11-28) supports a similar kind of pagination as Atlassian, but the way you specify start and limit parameters differ a little bit in Github's implementation. Some people refer to this style of implementation as Page-based pagination, it's essentially a subset of Offset pagination. 

The required parameters for requesting a page are `per_page` and `page`. 

**per_page** - The number of items to return per page.

**page** - The page number or batch number of the items to be returned.

**Per-page** works the same way as **limit** from the previous example, **page** is however a little different from the corresponding parameter "start". Instead of specifying the position of the next item in the database, is simply sets a page number. The position of the first item on that page corresponds to the Offset or Start parameter required to fetch the page contents. 

The benefit to this page-based approach is that it's a lot more straightforward to represent the data as uniformly sized pages.


Other things to note about Github's pagination style is that in addition to returning a link to the "next" and "prev" pages, it also returns links to the "first" & "last" pages, but these links do not come in the response body, but in a `link` header, like so:

```
link: <https://api.github.com/repositories/1300192/issues?page=2>; rel="prev", 
<https://api.github.com/repositories/1300192/issues?page=4>; rel="next", 
<https://api.github.com/repositories/1300192/issues?page=515>; rel="last", 
<https://api.github.com/repositories/1300192/issues?page=1>; rel="first"

```

**Strapi:** [Strapi's API](https://docs.strapi.io/dev-docs/api/rest/sort-pagination#pagination-by-page) also supports offset pagination. What's unique about their implementation that has not been covered in the last two example is the fact that they support both the typical Offset-based pagination and the page-based types used by GitHub. Consumers can either set the parameters `start` and `limit` for the former or set `page` and `pageSize` for the latter.


### Cursor-based Pagination

Cursor-based is a type of pagination that batch-returns items from a database based on the parameters **limit** and, **cursor**.

- **limit**: Same as Offset, the number of items to return.
- **cursor**: A pointer to a reference item on the dataset used to navigate between pages.

APIs from platforms such as Squareup, X, and Shopify use this method, albeit in a slightly different way. Here are summaries.

**Squareup:** On Squareup and many other platforms that support cursor pagination, making a request without setting a cursor value will return the first batch of items on the list, this is the expected way to request the first page. To enable the caller to fetch other items on the list, [Square APIs](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination) include a field "cursor" in the response, if there are indeed more results left. 

In subsequent requests, the caller then includes the cursor obtained from the previous request. If it's a `POST` request, the cursor field goes into the request body like so:

```
curl https://connect.squareupsandbox.com/v2/customers/search \
  -X POST \
  -H 'Square-Version: 2021-12-15' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -d '{
    "limit": 4,
    "cursor": "Cg1HRUY3NEszUERFME40GgAiQAgCEjxDQUlRQWhva056ZzVNakUyWWojdE5qaGxaQzAwWldRNUxUbG1ZelF0WmpSaE9EVTFaV0ZpTUdabElDbz0qBAgBEAE="
  }'

```

If it's a `GET` request, the cursor is set as a query parameter instead:

```
curl https://connect.squareupsandbox.com/v2/refunds?limit=2&cursor=N4LMZ7RPBUxbVBZccouiIhlFDJ1S3Dy7VsMVMookk2599EUNUaturj6EVXpsltjWc27YUXzDIYPP9O6bImVn1rvUJH98eyyAfsXLIIkYx7mM4UEXZQRcvjSulHf \
  -H 'Square-Version: 2021-12-15' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json'
```

Notice that the requests also included a field for `limit`. When it comes to limits, the common practice in both Offset and cursor pagination is to build in default limits, while still allowing consumers to specify a custom, the same is true of this API, hence the `limit` field is optional.


**X:** X, previously Twitter, supports pagination in their [API v2 endpoints](https://developer.x.com/en/docs/twitter-api/pagination). The type is Offset-based, just as with the previous example, but there are some differences in the way it's implemented here. It not only Supports switching between the current page to the next page, but also switching to the previous page. For paginated results, X accepts query parameters `pagination_token` and `max_results`, with max_results corresponding to "limit" and is optional. `pagination_token` takes a token that references either the previous page or the next one. 

A typical request looks something like this -

```
https://api.twitter.com/2/users/2244994845/tweets?tweet.fields=created_at&max_results=100&start_time=2020-03-01T17:00:00Z&end_time=2020-12-12T01:00:00Z&pagination_token=77qp8

```

and response like this -

```
    {
    "data": [
      ...
    ],
    "meta": {
      "oldest_id": "1082718487011884056",
      "newest_id": "1197549578418942952",
      "result_count": 95,
      "next_token": "71408hi",
      "previous_token": "77qplte"
    }
  }

```

When you scan the response, you can see that it includes `next_token` and `previous_token` fields. This is where the caller obtains the token that they set their pagination_token parameter to.

**Spotify:** Spotify's use of Cursor pagination is very similar to X's implementation. The key difference is that it returns the pointers to the next and previous page in the response header, and not the response body. it returns a `link` header like the following sample:

```
Link: "<https://{shop}.myshopify.com/admin/api/{api_version}/customers.json?page_info=abcdefg&limit=3>; rel=previous, 
<https://{shop}.myshopify.com/admin/api/{api_version}/customers.json?page_info=opqrstu&limit=3>; rel=next"

```

for a request such as:

```
GET https://{shop}.myshopify.com/admin/api/{api_version}/customers.json?page_info=hijgklmn&limit=3

```

`page_info` is the query parameter that holds the cursor that points to either the previous page or the next one.


### In Conclusion

Either of the two pagination types discussed here come with their benefits and trade-offs, but the numbers show that many leading API platforms implement them in ways that best serve their pagination needs. Take some time to analyze the different use cases where each of these methods have been applied, to see if they help you determine the approach that would work best for the next API you build.

### Getting Started with Convoy

Already have an API, and want to send or receive webhooks from it? Get started in minutes at [cloud.getconvoy.io/signup](http://cloud.getconvoy.io/signup).

