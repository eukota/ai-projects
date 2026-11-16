# Brief: moving ore for Tycho Bulk Freight

Tycho Bulk Freight ships raw minerals (iron ore, bauxite, copper ore, quartz sand, rock salt, kaolin and more) between ports for a handful of institutional customers. It moves a few hundred shipments a week. Most go fine. Some run into problems: a customs hold, damaged cargo, a delay, a bad delivery address.

We have a backend that tracks shipments. Right now people reach it through spreadsheets exported from it and a lot of messages. We want to replace that with one place everyone can go to see what is moving. This is what we hear from them.

## What we hear

**Customers (through support) say:**

- "Where is my ore, and is something wrong with it?"
- "I asked for the status of my bauxite and was told someone would call me back."

**Dispatchers (four of them) say:**

- "Half of my day is chasing the same shipment's history across three tabs."
- "Some shipments have nobody on them. I only find out when a customer calls."
- "I start every morning trying to work out what's on fire."

**The operations manager says:**

- "I can't tell whether we're keeping up."
- "Our priority customers should never wait. I can't see who they are at a glance."

## What we don't know

We haven't decided who the first users are. We have limited time before we show something to the people above. We would rather have one thing that works well than a broad half-working tool.

## What you have

- The API running (the interviewer gives you the URL), with Swagger docs at `/docs`.
- Seed data that looks like a normal week.

Treat the docs as a good starting point, not a guarantee.
