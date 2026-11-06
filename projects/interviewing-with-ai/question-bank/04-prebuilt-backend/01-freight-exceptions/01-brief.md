# Brief: exceptions at a freight forwarder

Rule of Acquisition Freight moves a few hundred shipments a week for small and mid-sized importers. Most shipments go fine. The ones that don't are called *exceptions*: a customs hold, damaged cargo, a delay, a bad delivery address. Exceptions are where the company wins or loses customers.

We have a backend that tracks shipments and exceptions. Right now people reach it through spreadsheets exported from it and a lot of messages. This is what we hear from them.

## What we hear

**Dispatchers (four of them) say:**

- "I start every morning trying to work out what's on fire. I'm scrolling through everything to find the bad ones."
- "Some shipments have nobody on them. I only find out when a customer calls."
- "Half of my day is chasing the same shipment's history across three tabs."

**The operations manager says:**

- "I can't tell whether we're keeping up. Are exceptions piling up or getting cleared?"
- "Priority customers should never wait. I can't see who's priority at a glance."

**Customers (through support) say:**

- "Where is my shipment, and is something wrong with it?"

## What we don't know

We haven't decided who the first users are. We have limited time before we show something to the dispatchers. We would rather have one thing that works well than a broad half-working tool.

## What you have

- The API running locally (see the [README](./README.md)), with Swagger docs at `/docs`.
- Seed data that looks like a normal week.

Treat the docs as a good starting point, not a guarantee.
