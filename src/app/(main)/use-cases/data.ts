export interface UseCase {
	slug: string;
	title: string;
	displayName: string;
	description: string;
	industry: string;
	metaTitle: string;
	metaDescription: string;
	keywords: string;
	heroTitle: string;
	heroDescription: string;
	icon: string;
	painPointsHeading: string;
	painPointsSubheading: string;
	featuresHeading: string;
	featuresSubheading: string;
	painPoints: {
		title: string;
		description: string;
	}[];
	features: {
		title: string;
		description: string;
	}[];
	faq: {
		question: string;
		answer: string;
	}[];
	testimonial?: {
		quote: string;
		name: string;
		role: string;
		company: string;
		logo: string;
		avatar: string;
	};
}

export const useCases: UseCase[] = [
	{
		slug: 'fintech',
		title: 'Fintech',
		displayName: 'fintech',
		description: 'Real-time transaction alerts, payment confirmations, and compliance notifications with sub-second latency and cryptographic verification.',
		industry: 'Financial Services',
		icon: 'fintech',
		metaTitle: 'Webhook Gateway for Fintech | Convoy',
		metaDescription:
			'Deliver real-time transaction alerts, payment confirmations, and compliance notifications with sub-second latency. Built for the security and reliability fintech demands.',
		keywords: 'fintech webhooks, payment webhooks, transaction notifications, financial API webhooks, banking webhook gateway',
		heroTitle: 'Real-time financial event delivery your customers depend on',
		heroDescription:
			'Delayed financial notifications cost money and erode trust. Convoy delivers every transaction alert, payment confirmation, and compliance event with sub-second latency and cryptographic verification.',
		painPointsHeading: 'The cost of unreliable webhooks in financial services',
		painPointsSubheading: 'In fintech, failed webhooks translate directly to lost revenue, compliance gaps, and eroded customer trust.',
		featuresHeading: 'Built for the speed and security fintech demands',
		featuresSubheading: 'Convoy gives financial services teams the webhook infrastructure they need to move fast without compromising on security or compliance.',
		painPoints: [
			{
				title: 'Latency kills trust',
				description:
					'A payment confirmation that arrives 30 seconds late is a support ticket. One that arrives 5 minutes late is a chargeback. Financial events demand sub-second delivery to downstream systems and end users.'
			},
			{
				title: 'Compliance requires audit trails',
				description:
					'Regulators want to see exactly when events were sent, received, and acknowledged. Without proper webhook infrastructure, building compliant audit logs means stitching together data from multiple systems.'
			},
			{
				title: 'Security is non-negotiable',
				description:
					'Financial data flowing over webhooks must be signed, verified, and protected against replay attacks. SSRF vulnerabilities in webhook delivery can expose internal infrastructure to attackers.'
			},
			{
				title: 'Scale varies wildly',
				description:
					'Month-end settlement runs, payroll processing windows, and flash market events can spike webhook volume 10-100x. Your webhook infrastructure needs to absorb these bursts without dropping events.'
			}
		],
		features: [
			{
				title: 'Sub-second delivery latency',
				description: 'Convoy delivers webhook events in under one second. For time-sensitive financial workflows like payment confirmations and fraud alerts, every millisecond matters.'
			},
			{
				title: 'Cryptographic payload signing',
				description:
					'Every webhook payload is signed with HMAC, enabling recipients to verify authenticity and prevent tampering. Rolling secrets ensure compromised keys can be rotated without downtime.'
			},
			{
				title: 'Complete event audit log',
				description:
					'Every event sent through Convoy is logged with delivery status, response codes, timestamps, and retry history, giving your compliance team the audit trail they need.'
			},
			{
				title: 'SSRF protection built in',
				description:
					'Convoy validates destination URLs and prevents server-side request forgery attacks, protecting your internal infrastructure from being exploited through webhook endpoints.'
			},
			{
				title: 'Automatic retries with backoff',
				description:
					'Failed deliveries are retried with exponential backoff. Circuit breakers detect persistently failing endpoints and pause delivery, preventing cascading failures across your system.'
			},
			{
				title: 'Static IP addresses',
				description:
					'Deliver webhooks from consistent egress IPs, simplifying firewall configurations for enterprise customers who require IP allowlisting for their receiving infrastructure.'
			}
		],
		faq: [
			{
				question: 'How does Convoy handle PCI-sensitive webhook data?',
				answer:
					'Convoy signs all webhook payloads using HMAC signatures, allowing receivers to verify payload integrity. For sensitive data, we recommend sending event references rather than full payloads, with recipients fetching details via your API. Convoy is SOC 2 certified and supports data residency in the US and EU.'
			},
			{
				question: 'What happens when a financial webhook delivery fails?',
				answer:
					'Convoy automatically retries failed deliveries with configurable exponential backoff. If an endpoint is persistently failing, the circuit breaker activates to prevent backpressure on your system. You receive failure notifications so your team can investigate, and all retry attempts are logged for compliance.'
			},
			{
				question: 'Can Convoy handle high-volume events like month-end processing?',
				answer:
					"Yes. Convoy uses a control and data plane architecture designed for high throughput. Our infrastructure automatically scales to handle traffic spikes, whether from month-end settlements, payroll processing, or market events."
			},
			{
				question: 'Does Convoy support multi-tenancy for banking platforms?',
				answer:
					'Absolutely. Convoy supports multi-tenant architectures where each of your customers (merchants, partners, or sub-accounts) can register their own webhook endpoints, manage their secrets, and filter events by type, all isolated and secure.'
			}
		],
		testimonial: {
			quote: 'Convoy provides all the features that we are looking for at a fair price, and we were able to integrate and offer a webhook solution in a matter of days.',
			name: 'Jonathan Wiemer',
			role: 'Lead Software Engineer',
			company: 'Source.ag',
			logo: '/svg/source-new.svg',
			avatar: '/profile-images/jonathan.jpeg'
		}
	},
	{
		slug: 'ai-ml',
		title: 'AI & Machine Learning',
		displayName: 'AI & machine learning',
		description: 'Deliver model training completions, inference results, and pipeline events reliably so your team can focus on building AI.',
		industry: 'AI/ML Platforms',
		icon: 'ai-ml',
		metaTitle: 'Webhook Gateway for AI & ML Platforms | Convoy',
		metaDescription:
			'Deliver model training completions, inference results, and pipeline events reliably. Convoy handles the webhook infrastructure so your team can focus on building AI.',
		keywords: 'AI webhooks, machine learning webhooks, model training notifications, inference webhooks, ML pipeline webhooks',
		heroTitle: "Reliable event delivery for AI workflows that can't afford to miss a beat",
		heroDescription:
			"AI workloads are asynchronous by nature. Convoy ensures every training completion, inference result, and pipeline status change reaches the right system at the right time.",
		painPointsHeading: 'Why async AI workloads need dedicated webhook infrastructure',
		painPointsSubheading: 'AI pipelines are event-driven at their core. When webhook delivery fails, your entire workflow stalls.',
		featuresHeading: 'Webhook infrastructure built for AI-scale workloads',
		featuresSubheading: 'Convoy handles the event delivery plumbing so your team can stay focused on models, not infrastructure.',
		painPoints: [
			{
				title: 'Long-running jobs need reliable completion signals',
				description:
					'Model training runs for hours or days. When a run completes, or fails, downstream systems need to know immediately. A missed webhook means wasted GPU time, stalled pipelines, or delayed deployments.'
			},
			{
				title: 'Inference results must reach customers',
				description:
					"When your platform processes an image, generates text, or runs a prediction, the result needs to be delivered to your customer's system. Dropped webhooks mean customers see incomplete data and file support tickets."
			},
			{
				title: 'Pipeline orchestration depends on events',
				description:
					'Modern ML pipelines chain together data ingestion, preprocessing, training, evaluation, and deployment. Each stage signals the next via events. Unreliable delivery breaks the chain.'
			},
			{
				title: 'Customers expect self-service',
				description:
					'AI platform customers want to configure their own webhook endpoints, filter by event type, and debug delivery issues themselves. Building this management layer from scratch is a distraction from your core product.'
			}
		],
		features: [
			{
				title: 'Guaranteed delivery for async results',
				description:
					'Convoy ensures every model training completion, inference result, and pipeline event is delivered, even if the destination is temporarily unavailable. Automatic retries with backoff handle transient failures.'
			},
			{
				title: 'Event type filtering',
				description:
					'Let your customers subscribe only to the events they care about: model.training.completed, inference.result.ready, or pipeline.stage.failed. Fine-grained subscriptions reduce noise and improve integration quality.'
			},
			{
				title: 'Message broker integration',
				description:
					"Ingest events from Kafka, Amazon SQS, Google Pub/Sub, or RabbitMQ. Convoy bridges your internal event bus to external webhook delivery, so your ML pipeline doesn't need to speak HTTP."
			},
			{
				title: 'Developer portal for your customers',
				description:
					'Give your AI platform users a self-service portal to register endpoints, view delivery logs, retry failed events, and manage their webhook configuration, embeddable directly in your dashboard.'
			},
			{
				title: 'High-throughput event processing',
				description:
					"AI platforms generate massive volumes of events, from batch inference jobs to streaming predictions. Convoy's architecture handles billions of events without breaking a sweat."
			},
			{
				title: 'Payload flexibility',
				description:
					"Send event references for large model outputs, or include result summaries directly in the payload. Convoy supports flexible payload structures to match your platform's needs."
			}
		],
		faq: [
			{
				question: 'Can Convoy handle the high event volumes from batch inference jobs?',
				answer:
					"Yes. Convoy's control and data plane architecture is built for high throughput. Whether you're processing thousands of inference results per minute or handling burst traffic from batch jobs, Convoy scales automatically."
			},
			{
				question: 'How does Convoy integrate with our existing event bus?',
				answer:
					'Convoy natively ingests events from Kafka, Amazon SQS, Google Pub/Sub, and RabbitMQ. Your ML services publish events to your broker as they normally would, and Convoy handles the external webhook delivery.'
			},
			{
				question: 'Can our customers filter which AI events they receive?',
				answer:
					"Absolutely. Convoy supports fine-grained subscription filtering, your customers can subscribe to specific event types, and even filter based on payload content (e.g., only receive events for a specific model ID)."
			},
			{
				question: 'What about large inference result payloads?',
				answer:
					'We recommend sending lightweight event notifications via webhooks with a reference ID, then having the recipient fetch the full result via your API. This pattern keeps webhook delivery fast and reliable regardless of result size.'
			}
		]
	},
	{
		slug: 'developer-tools',
		title: 'Developer Tools',
		displayName: 'developer tools',
		description: 'Ship world-class webhooks in your developer platform, CI/CD notifications, deployment hooks, and event-driven integrations, in days, not months.',
		industry: 'Developer Platforms',
		icon: 'developer-tools',
		metaTitle: 'Webhook Gateway for Developer Tools & Platforms | Convoy',
		metaDescription:
			'Ship webhooks in your developer platform faster. Convoy provides the infrastructure for CI/CD notifications, deployment hooks, and event-driven integrations your users expect.',
		keywords: 'developer tools webhooks, CI/CD webhooks, deployment notifications, developer platform webhook gateway, API webhooks',
		heroTitle: 'Ship world-class webhooks in your developer platform, not months of infrastructure work',
		heroDescription:
			'Your developers expect payload signing, retry logic, delivery logs, and endpoint management. Building it yourself takes months. With Convoy, you ship it in days.',
		painPointsHeading: 'The build-it-yourself trap for developer platforms',
		painPointsSubheading: 'Your users are developers. They notice when your webhooks lack proper signatures, retries, or debugging tools.',
		featuresHeading: 'Ship webhooks your developers will love',
		featuresSubheading: 'Convoy gives developer platforms production-grade webhook infrastructure that meets the bar your users expect.',
		painPoints: [
			{
				title: 'Developers expect mature webhook infrastructure',
				description:
					"Your platform's users are developers themselves. They'll notice if your webhooks lack proper signatures, retry logic, or delivery logs. A subpar webhook experience reflects poorly on your entire platform."
			},
			{
				title: 'Integration is your moat',
				description:
					"For developer tools, webhooks are how customers integrate your product into their workflows. Poor webhook reliability means customers can't build on your platform, and they'll switch to a competitor who makes it easy."
			},
			{
				title: 'Building it yourself is a trap',
				description:
					"It starts simple: an HTTP POST on event. Then you need retries, then signatures, then a UI for debugging, then rate limiting, then circuit breakers. Before you know it, you've built a distributed system that needs its own team to maintain."
			},
			{
				title: 'Every engineering hour counts',
				description:
					'As a developer tools company, your competitive advantage is your core product, not your webhook delivery system. Every sprint spent on webhook infrastructure is a sprint not spent on the features your customers are paying for.'
			}
		],
		features: [
			{
				title: 'Production-ready in days, not months',
				description:
					"Convoy's API and SDKs integrate into your existing codebase with minimal effort. Send your first webhook with a single API call, and have a full webhook system live in days."
			},
			{
				title: 'Embeddable developer portal',
				description:
					'Give your users a self-service portal for managing webhook endpoints, viewing delivery logs, retrying failed events, and configuring subscriptions, embeddable directly in your dashboard with a single line of code.'
			},
			{
				title: 'Webhook signatures your users trust',
				description:
					'Convoy signs every payload with HMAC, and supports rolling secrets so your users can rotate keys without missing events. Your users get the same quality signatures they see from Stripe and GitHub.'
			},
			{
				title: 'Fine-grained event subscriptions',
				description:
					'Let your users subscribe to exactly the events they need. Filter by event type, payload content, or any custom criteria. This reduces noise and makes your webhooks more valuable to integrate.'
			},
			{
				title: 'Delivery logs and debugging tools',
				description:
					'Every webhook delivery is logged with full request/response details, timing, and retry history. Your users can self-serve when debugging integration issues instead of opening support tickets.'
			},
			{
				title: 'Rate limiting and circuit breaking',
				description:
					"Protect your users' endpoints from being overwhelmed. Convoy rate-limits delivery per endpoint and circuit-breaks failing destinations, preventing one bad integration from affecting others."
			}
		],
		faq: [
			{
				question: 'How quickly can we integrate Convoy into our platform?',
				answer:
					'Most teams have Convoy integrated and sending webhooks within a few days. Our SDKs support JavaScript, Ruby, and Go. Sending a webhook is a single API call.'
			},
			{
				question: 'Can we embed the webhook management portal in our own dashboard?',
				answer:
					"Yes. Convoy's portal links let you embed a fully-featured webhook management UI directly in your product. Your users can register endpoints, view logs, retry events, and manage secrets, all within your branded experience."
			},
			{
				question: 'How does Convoy compare to building our own webhook system?',
				answer:
					"Building a production-grade webhook system typically takes 3-6 months of engineering time and ongoing maintenance. Convoy gives you retries, signatures, rate limiting, circuit breaking, a management portal, and delivery logs out of the box. Check our build vs. buy analysis for a detailed comparison."
			},
			{
				question: 'Do you support webhook testing and debugging?',
				answer:
					'Yes. Convoy Playground lets developers generate test webhook URLs, inspect payloads, and analyze headers. The delivery logs show full request/response details for every webhook sent, making debugging straightforward.'
			}
		],
		testimonial: {
			quote: 'We tried a few different solutions in the market, but Convoy stood out for its dynamic filtering capabilities, and it was extremely easy to set up; we had test webhooks sent within the hour.',
			name: 'Manan Patel',
			role: 'CTO',
			company: 'Neynar',
			logo: '/svg/neynar-new.svg',
			avatar: '/profile-images/Manan Patel.png'
		}
	},
	{
		slug: 'logistics',
		title: 'Logistics',
		displayName: 'logistics',
		description: 'Keep every link in your supply chain synchronized, shipment tracking, inventory updates, and fleet management events delivered in real time.',
		industry: 'Logistics & Supply Chain',
		icon: 'logistics',
		metaTitle: 'Webhook Gateway for Logistics & Supply Chain | Convoy',
		metaDescription:
			'Deliver real-time shipment tracking, inventory updates, and fleet management events reliably. Keep every system in your supply chain synchronized with Convoy.',
		keywords: 'logistics webhooks, supply chain webhooks, shipment tracking webhooks, fleet management webhooks, inventory webhook notifications',
		heroTitle: 'Keep every link in your supply chain synchronized in real time',
		heroDescription:
			"In logistics, a late update means a warehouse isn't prepared and a customer sees the wrong ETA. Convoy ensures every tracking event, inventory change, and status update reaches every system in real time.",
		painPointsHeading: 'When information delays cascade through your supply chain',
		painPointsSubheading: 'In logistics, a single missed event update can ripple through your entire operation.',
		featuresHeading: 'Keep every partner and system in sync',
		featuresSubheading: 'Convoy gives logistics teams reliable, real-time event delivery across every link in the supply chain.',
		painPoints: [
			{
				title: 'Delayed updates cascade through the supply chain',
				description:
					"When a shipment status change doesn't propagate in real time, downstream systems operate on stale data. Warehouses prepare for the wrong shipment, drivers get outdated routes, and customers see inaccurate delivery windows."
			},
			{
				title: 'Partner integrations are fragile',
				description:
					"Logistics involves dozens of partners: carriers, warehouses, customs brokers, last-mile delivery. Each has different webhook endpoint reliability. A single failing partner endpoint shouldn't block updates to everyone else."
			},
			{
				title: 'Volume spikes during peak seasons',
				description:
					'Holiday seasons, flash sales, and promotional events can multiply shipment volumes overnight. Your webhook infrastructure needs to handle these spikes without dropping tracking updates.'
			},
			{
				title: 'Visibility across the chain is critical',
				description:
					'Supply chain managers need to know that every event was delivered to every system. Without delivery logs and monitoring, failed webhooks create blind spots in your operational visibility.'
			}
		],
		features: [
			{
				title: 'Fan-out to multiple systems',
				description:
					'A single shipment event often needs to reach your WMS, TMS, customer portal, and partner systems simultaneously. Convoy fans out events to multiple endpoints reliably, ensuring every system stays synchronized.'
			},
			{
				title: 'Circuit breaker for partner endpoints',
				description:
					"When a logistics partner's system goes down, Convoy's circuit breaker isolates that endpoint without affecting delivery to other partners. Events queue up and are delivered once the partner recovers."
			},
			{
				title: 'Static IP addresses for firewall rules',
				description:
					'Enterprise logistics partners often require webhook traffic from known IP addresses. Convoy delivers from static IPs, simplifying firewall configurations for your partners.'
			},
			{
				title: 'Real-time delivery monitoring',
				description:
					'Monitor webhook delivery health across all your partner integrations from a single dashboard. Identify failing endpoints, review retry history, and get notified when delivery issues arise.'
			},
			{
				title: 'Automatic retries ensure nothing is lost',
				description:
					'Network blips, partner downtime, and DNS issues are common in logistics. Convoy retries failed deliveries with exponential backoff, ensuring every shipment update eventually reaches its destination.'
			},
			{
				title: 'Event filtering by route or region',
				description:
					"Let partners subscribe only to events relevant to their operations. A last-mile carrier in Berlin doesn't need updates about shipments in Tokyo. Convoy's subscription filtering keeps integrations efficient."
			}
		],
		faq: [
			{
				question: 'How does Convoy handle logistics partner API outages?',
				answer:
					"Convoy's circuit breaker detects persistently failing endpoints and pauses delivery to prevent backpressure. Events are queued and delivered automatically once the partner's system recovers. Your team is notified of the outage so they can follow up if needed."
			},
			{
				question: 'Can different logistics partners receive different events?',
				answer:
					'Yes. Convoy supports fine-grained subscription filtering. Each partner can subscribe to specific event types, regions, or routes. A last-mile carrier only receives events for their coverage area, while your WMS gets everything.'
			},
			{
				question: 'How does Convoy handle peak season volume spikes?',
				answer:
					"Convoy's architecture scales automatically to handle traffic spikes. Whether it's Black Friday shipping volumes or seasonal peaks, the system absorbs bursts without dropping events or increasing latency."
			},
			{
				question: 'Do you support static IP addresses for enterprise partners?',
				answer:
					'Yes. Convoy delivers webhooks from consistent egress IP addresses. This is essential for enterprise logistics partners who require IP allowlisting in their firewall configurations.'
			}
		]
	},
	{
		slug: 'healthcare',
		title: 'Healthcare',
		displayName: 'healthcare',
		description: 'Secure, reliable event delivery for patient notifications, EHR integrations, and clinical workflows, with SOC 2 certification and audit trails.',
		industry: 'Healthcare & Life Sciences',
		icon: 'healthcare',
		metaTitle: 'Webhook Gateway for Healthcare & Life Sciences | Convoy',
		metaDescription:
			'Deliver secure webhook events for patient notifications, EHR integrations, and clinical workflows. SOC 2 certified infrastructure built for healthcare reliability.',
		keywords: 'healthcare webhooks, EHR webhook integration, patient notification webhooks, clinical workflow webhooks, healthcare API gateway',
		heroTitle: "Secure, reliable event delivery for healthcare systems that can't afford downtime",
		heroDescription:
			'Convoy delivers patient notifications, EHR updates, and clinical workflow events with SOC 2 certified infrastructure, encryption, and complete audit trails.',
		painPointsHeading: 'Why healthcare webhook infrastructure needs a higher bar',
		painPointsSubheading: 'Patient care, compliance, and data security leave zero room for unreliable event delivery.',
		featuresHeading: 'Enterprise-grade security meets reliable delivery',
		featuresSubheading: 'Convoy meets the compliance and reliability standards that healthcare organizations require.',
		painPoints: [
			{
				title: 'Security and compliance are table stakes',
				description:
					'Healthcare data is among the most regulated in the world. Webhook infrastructure handling patient-adjacent data must meet SOC 2, support encryption in transit and at rest, and maintain detailed audit logs for compliance reviews.'
			},
			{
				title: 'Reliability impacts patient care',
				description:
					"A missed appointment reminder, a delayed lab result notification, or a dropped prescription update doesn't just create a support ticket, it impacts patient care. Healthcare webhook delivery must be near-perfect."
			},
			{
				title: 'EHR integrations are complex and fragile',
				description:
					'Electronic Health Record systems vary wildly in their webhook consumption capabilities. Some are cloud-native, others run on-premise behind firewalls. Your webhook infrastructure needs to handle both gracefully.'
			},
			{
				title: "Audit trails aren't optional",
				description:
					'Healthcare organizations must demonstrate that notifications were sent, delivered, and acknowledged. Regulators and internal compliance teams require detailed logs of every webhook interaction.'
			}
		],
		features: [
			{
				title: 'SOC 2 certified',
				description:
					'Convoy is SOC 2 certified, demonstrating our commitment to security controls, availability, and data protection. Our infrastructure meets the compliance bar that healthcare organizations require.'
			},
			{
				title: 'Complete audit trail',
				description:
					'Every webhook event is logged with delivery status, response codes, timestamps, and retry history. Your compliance team gets full visibility into every webhook interaction.'
			},
			{
				title: 'End-to-end payload security',
				description:
					'Payloads are signed with HMAC for integrity verification, and delivered over TLS. SSRF protections prevent webhook endpoints from being exploited to access internal systems.'
			},
			{
				title: 'Data residency options',
				description:
					'Choose where your webhook data is processed and stored. Convoy supports US and EU data residency, helping you meet data sovereignty requirements for healthcare data.'
			},
			{
				title: 'High availability architecture',
				description:
					"Convoy's control and data plane architecture ensures high availability and durability. Healthcare systems can depend on Convoy for consistent, reliable event delivery."
			},
			{
				title: 'Private networking support',
				description:
					'For healthcare organizations running on-premise systems behind firewalls, Convoy supports static IP delivery and can work with your network security requirements.'
			}
		],
		faq: [
			{
				question: 'Is Convoy SOC 2 compliant?',
				answer:
					'Yes. Convoy is SOC 2 certified, which covers security, availability, and confidentiality controls. We undergo regular audits to maintain our certification.'
			},
			{
				question: 'How does Convoy handle sensitive patient data in webhooks?',
				answer:
					'We recommend sending event notifications with reference IDs rather than including PHI directly in webhook payloads. The receiving system then fetches the full data via your authenticated API. All webhook payloads are signed for integrity and delivered over TLS.'
			},
			{
				question: 'Can Convoy deliver webhooks to on-premise healthcare systems?',
				answer:
					'Yes. Convoy delivers from static IP addresses, which simplifies firewall configuration for on-premise systems. Combined with our private networking support, healthcare organizations can securely receive webhook events behind their firewalls.'
			},
			{
				question: 'What data residency options does Convoy offer?',
				answer:
					'Convoy supports data residency in the US and EU. You can choose which region processes and stores your webhook data, helping you meet data sovereignty and compliance requirements.'
			}
		],
		testimonial: {
			quote: 'We considered building a webhooks system internally but quickly realised that reaching the quality and robustness our customers deserve would be highly time-consuming. Convoy offered this out-of-the-box.',
			name: 'Michael Raines',
			role: 'Principal Engineer',
			company: 'Spruce Health',
			logo: '/svg/spruce-health-mark.svg',
			avatar: '/profile-images/Michael Raines.png'
		}
	},
	{
		slug: 'saas',
		title: 'SaaS Platforms',
		displayName: 'SaaS',
		description: 'Give your customers the webhook experience they expect, self-service endpoint management, delivery logs, and an embeddable portal, out of the box.',
		industry: 'SaaS',
		icon: 'saas',
		metaTitle: 'Webhook Gateway for SaaS Platforms | Convoy',
		metaDescription:
			'Give your SaaS customers the webhook experience they expect. Self-service endpoint management, delivery logs, event filtering, and an embeddable portal, out of the box.',
		keywords: 'SaaS webhooks, multi-tenant webhooks, webhook management portal, SaaS platform webhooks, customer webhook configuration',
		heroTitle: 'The webhook infrastructure your SaaS customers expect, without building it yourself',
		heroDescription:
			'Your customers expect self-service endpoint management, delivery logs, and event filtering. Convoy gives you all of this out of the box, so you can focus on your core product.',
		painPointsHeading: 'The webhook expectations gap in SaaS',
		painPointsSubheading: 'Your customers expect Stripe-quality webhooks. Building that yourself takes longer than you think.',
		featuresHeading: 'Everything your SaaS customers expect from webhooks',
		featuresSubheading: 'Convoy gives SaaS platforms multi-tenant webhook infrastructure with self-service built in.',
		painPoints: [
			{
				title: 'Customers expect webhooks on day one',
				description:
					"Modern SaaS buyers evaluate products partly on integration capabilities. If your platform doesn't offer webhooks, customers resort to polling your API, wasting their resources and yours, or they choose a competitor."
			},
			{
				title: 'Multi-tenancy is hard to get right',
				description:
					"Each of your customers needs their own webhook endpoints, secrets, and event subscriptions. A noisy neighbor, one customer with a failing endpoint, shouldn't impact delivery for everyone else."
			},
			{
				title: 'Webhook support tickets drain engineering time',
				description:
					'Without delivery logs and a debugging portal, every "I didn\'t receive my webhook" message becomes a support ticket that escalates to engineering. Your team ends up reading server logs instead of shipping features.'
			},
			{
				title: 'Scope creep turns a weekend project into a platform',
				description:
					"You start with a simple HTTP POST. Then customers ask for retries, then signatures, then a UI for debugging, then rate limiting. Within a year, you've accidentally built a distributed system that needs its own team."
			}
		],
		features: [
			{
				title: 'Multi-tenant by design',
				description:
					"Each of your customers gets isolated webhook management, their own endpoints, secrets, and delivery logs. One customer's failing endpoint never impacts another's delivery."
			},
			{
				title: 'Embeddable webhook portal',
				description:
					'Drop a self-service webhook management portal directly into your SaaS dashboard. Your customers can register endpoints, manage secrets, view delivery logs, and retry failed events, all within your branded experience.'
			},
			{
				title: 'Eliminate webhook support tickets',
				description:
					'With delivery logs, retry visibility, and a debugging portal, your customers can self-serve when investigating webhook issues. This dramatically reduces the support burden on your engineering team.'
			},
			{
				title: 'Fine-grained subscription filtering',
				description:
					"Let your customers subscribe to specific event types and even filter based on payload content. A customer who only cares about billing events doesn't need to receive user activity notifications."
			},
			{
				title: 'Failure notifications',
				description:
					'Automatically notify your customers when their webhook endpoints start failing. Proactive alerts reduce support tickets and help customers fix their integrations faster.'
			},
			{
				title: 'Scales with your customer base',
				description:
					"Whether you have 10 customers or 10,000, Convoy's architecture scales seamlessly. Add new tenants without worrying about webhook infrastructure capacity."
			}
		],
		faq: [
			{
				question: 'How does Convoy handle multi-tenancy for SaaS platforms?',
				answer:
					"Convoy provides full tenant isolation. Each of your customers gets their own set of endpoints, secrets, subscriptions, and delivery logs. Convoy's portal links let you embed a branded webhook management portal in your dashboard, giving each customer a self-service experience."
			},
			{
				question: 'Can our customers configure their own webhooks?',
				answer:
					"Yes. With Convoy's embeddable portal, your customers can register webhook endpoints, rotate secrets, filter event subscriptions, view delivery logs, and retry failed events, all without contacting your support team."
			},
			{
				question: 'How does Convoy reduce webhook-related support tickets?',
				answer:
					'In three ways: (1) delivery logs let customers see exactly what was sent and what response was received, (2) failure notifications proactively alert customers about endpoint issues, and (3) the retry feature lets customers re-deliver missed events themselves.'
			},
			{
				question: 'What does integration look like for a SaaS platform?',
				answer:
					'You send events to Convoy via a single API call or through a message broker. Convoy handles routing, signing, delivery, retries, and logging. Most SaaS teams have webhooks live in production within a few days.'
			}
		],
		testimonial: {
			quote: 'Convoy had everything we needed from a webhook gateway, retries, signatures, and SDKs. This allowed our engineering team to focus on building our core product.',
			name: 'Aravindkumar Rajendiran',
			role: 'CTO',
			company: 'Maple',
			logo: '/svg/maple-new.svg',
			avatar: '/profile-images/Aravindkumar Rajendira.png'
		}
	},
	{
		slug: 'ecommerce',
		title: 'E-commerce',
		displayName: 'e-commerce',
		description: 'Real-time order, inventory, and payment events across your entire e-commerce ecosystem, from flash sales to marketplace integrations.',
		industry: 'E-commerce & Marketplaces',
		icon: 'ecommerce',
		metaTitle: 'Webhook Gateway for E-commerce & Marketplaces | Convoy',
		metaDescription:
			'Deliver order confirmations, inventory updates, and payment notifications in real time. Keep your e-commerce ecosystem synchronized with reliable webhook delivery.',
		keywords: 'ecommerce webhooks, order notification webhooks, inventory webhook updates, marketplace webhooks, payment webhook notifications',
		heroTitle: 'Real-time order, inventory, and payment events across your entire e-commerce ecosystem',
		heroDescription:
			'Every order, payment, inventory change, and shipping update needs to reach multiple systems instantly. Convoy ensures every event reaches every system, every time.',
		painPointsHeading: 'Why e-commerce webhook failures cost you money',
		painPointsSubheading: 'Every missed event means a delayed order, unsynchronized inventory, or a frustrated customer.',
		featuresHeading: 'Webhook infrastructure that scales with your busiest days',
		featuresSubheading: 'Convoy keeps your entire e-commerce ecosystem synchronized, from flash sales to steady-state traffic.',
		painPoints: [
			{
				title: 'Flash sales and peak traffic create massive spikes',
				description:
					'Black Friday, product launches, and flash sales can increase order volume 50-100x in minutes. Your webhook infrastructure needs to absorb these bursts without dropping orders or delaying notifications.'
			},
			{
				title: 'Multiple systems need the same event',
				description:
					'A single "order.placed" event might need to reach your inventory system, payment processor, shipping provider, CRM, and analytics platform. Fan-out to multiple destinations must be reliable and fast.'
			},
			{
				title: 'Marketplace sellers need self-service',
				description:
					'If you run a marketplace, your sellers need to configure their own webhook endpoints, choose which events they receive, and debug delivery issues themselves. Building this portal is a major project.'
			},
			{
				title: 'Failed webhooks mean lost revenue',
				description:
					"A dropped order notification means inventory isn't reserved, fulfillment doesn't start, and the customer doesn't get a confirmation. In e-commerce, webhook failures directly impact revenue and customer experience."
			}
		],
		features: [
			{
				title: 'High-throughput event processing',
				description:
					"Convoy's architecture handles massive event volumes with sub-second latency. Whether it's a flash sale generating thousands of orders per minute or steady-state traffic, delivery is fast and reliable."
			},
			{
				title: 'Multi-endpoint fan-out',
				description:
					'Route a single event to multiple destinations. An "order.placed" event can simultaneously notify your WMS, trigger payment capture, alert the shipping provider, and update your analytics system.'
			},
			{
				title: 'Marketplace seller portal',
				description:
					'Give your marketplace sellers a self-service portal to register webhook endpoints, filter events by product category or region, view delivery logs, and manage their integration.'
			},
			{
				title: 'Automatic retries for business-critical events',
				description:
					'Every failed delivery is retried with exponential backoff. Order notifications, payment confirmations, and inventory updates are too important to lose, Convoy ensures eventual delivery.'
			},
			{
				title: 'Event type management',
				description:
					'Define and organize your webhook event types: order events, payment events, inventory events, shipping events. Customers and partners subscribe only to what they need.'
			},
			{
				title: 'Real-time delivery monitoring',
				description:
					'Monitor webhook delivery health across your entire e-commerce ecosystem. Identify failing seller endpoints, track delivery latency, and get proactive alerts when issues arise.'
			}
		],
		faq: [
			{
				question: 'Can Convoy handle Black Friday-level traffic spikes?',
				answer:
					"Yes. Convoy's control and data plane architecture scales automatically to handle traffic bursts. Whether it's a flash sale, product launch, or holiday shopping peak, Convoy absorbs the volume without dropping events or increasing latency."
			},
			{
				question: 'How does Convoy handle fan-out to multiple e-commerce systems?',
				answer:
					'When an event occurs, Convoy delivers it to all subscribed endpoints simultaneously. A single "order.placed" event can reach your WMS, payment system, shipping provider, and analytics platform, each with independent delivery tracking and retry logic.'
			},
			{
				question: 'Can marketplace sellers manage their own webhooks?',
				answer:
					"Yes. Convoy's embeddable portal gives each seller a self-service interface to register endpoints, choose event types, view delivery logs, and retry failed events. This scales your marketplace integrations without scaling your support team."
			},
			{
				question: "What happens if a seller's webhook endpoint goes down?",
				answer:
					"Convoy automatically retries failed deliveries with exponential backoff. If the endpoint is persistently failing, the circuit breaker activates and the seller is notified. Once their endpoint recovers, queued events are delivered automatically."
			}
		]
	},
	{
		slug: 'iot',
		title: 'IoT & Connected Devices',
		displayName: 'IoT',
		description: 'Bridge your IoT event streams to external systems, device telemetry, sensor alerts, and firmware update notifications delivered at massive scale.',
		industry: 'Internet of Things',
		icon: 'iot',
		metaTitle: 'Webhook Gateway for IoT & Connected Devices | Convoy',
		metaDescription:
			'Deliver device telemetry, sensor alerts, and firmware update notifications at scale. Convoy bridges your IoT event bus to external webhook consumers reliably.',
		keywords: 'IoT webhooks, device telemetry webhooks, sensor alert webhooks, connected device notifications, IoT webhook gateway',
		heroTitle: 'Bridge your IoT event streams to the systems that need them, reliably and at scale',
		heroDescription:
			'Convoy bridges your internal event streams to external webhook consumers, handling reliable delivery of device telemetry, sensor alerts, and firmware updates at massive scale.',
		painPointsHeading: 'The unique challenges of webhook delivery at IoT scale',
		painPointsSubheading: 'Millions of devices generating billions of events demands infrastructure built for sustained high throughput.',
		featuresHeading: 'Event delivery infrastructure designed for IoT volumes',
		featuresSubheading: 'Convoy bridges your internal event streams to external consumers, reliably and at massive scale.',
		painPoints: [
			{
				title: 'Volume is the defining challenge',
				description:
					"Millions of devices generating events every few seconds means billions of webhook deliveries per day. Most webhook infrastructure wasn't built for this kind of sustained throughput."
			},
			{
				title: 'Events originate from message brokers, not HTTP',
				description:
					'IoT platforms typically use Kafka, MQTT, or similar message brokers internally. But your customers and partners expect webhook delivery over HTTP. Bridging these two worlds requires dedicated infrastructure.'
			},
			{
				title: 'Not every consumer can keep up',
				description:
					'Some webhook consumers process events in real time; others batch-process hourly. Delivering device telemetry at full speed to a slow consumer overwhelms their system and triggers cascading failures.'
			},
			{
				title: 'Alert fatigue and event filtering',
				description:
					'Sending every sensor reading to every consumer creates noise. Partners and customers need to filter events by device type, severity level, geographic region, or threshold values to receive only actionable notifications.'
			}
		],
		features: [
			{
				title: 'Message broker ingestion',
				description:
					'Convoy natively ingests events from Kafka, Amazon SQS, Google Pub/Sub, and RabbitMQ. Your IoT services publish events to your broker as they normally would, and Convoy handles the external HTTP delivery.'
			},
			{
				title: 'Built for high throughput',
				description:
					"Convoy's control and data plane architecture handles billions of events. Sustained high-volume delivery from millions of devices is a first-class use case, not an afterthought."
			},
			{
				title: 'Per-endpoint rate limiting',
				description:
					'Protect slow consumers from being overwhelmed by controlling delivery rate per endpoint. Each consumer receives events at a pace they can handle, without affecting delivery to others.'
			},
			{
				title: 'Advanced subscription filtering',
				description:
					'Let consumers filter events by device ID, sensor type, severity level, geographic region, or any payload attribute. Deliver only the events each consumer actually needs.'
			},
			{
				title: 'Circuit breaker protection',
				description:
					"When a consumer's endpoint fails, Convoy's circuit breaker pauses delivery to prevent backpressure from propagating through your system. Events queue up and deliver automatically on recovery."
			},
			{
				title: 'Scalable event fan-out',
				description:
					'A single device event might need to reach a fleet management dashboard, a maintenance system, a customer app, and an analytics pipeline. Convoy fans out to all destinations reliably.'
			}
		],
		faq: [
			{
				question: 'Can Convoy handle millions of device events per day?',
				answer:
					"Yes. Convoy's architecture is built for high sustained throughput. Our control and data plane design, combined with PostgreSQL-backed durability, handles billions of events for our customers."
			},
			{
				question: 'How does Convoy integrate with MQTT or Kafka?',
				answer:
					"Convoy natively ingests events from Kafka, Amazon SQS, Google Pub/Sub, and RabbitMQ. For MQTT, you'd bridge your MQTT broker to one of these supported brokers, which is a common pattern in IoT architectures."
			},
			{
				question: 'How do you prevent overwhelming slow webhook consumers?',
				answer:
					"Convoy supports per-endpoint rate limiting. Each consumer's delivery rate is controlled independently, so a consumer that processes events slowly won't be overwhelmed, and faster consumers aren't throttled unnecessarily."
			},
			{
				question: 'Can consumers filter events by device type or region?',
				answer:
					"Yes. Convoy's subscription filtering supports filtering on any payload attribute, device type, sensor ID, geographic region, severity level, or any custom field in your event payload."
			}
		]
	}
];

export function getUseCaseBySlug(slug: string): UseCase | undefined {
	return useCases.find(uc => uc.slug === slug);
}
