# Model Routing

AIOS assumes many models operate simultaneously.

## Model Tiers

| Tier | Example Size | Typical Use |
|---|---:|---|
| Tiny | sub-4B | Utility tasks |
| Small | 4B-7B | Fast local tasks |
| Medium | 14B-32B | Solid reasoning |
| Large | 70B-120B | Advanced local reasoning |
| Frontier | Hosted | Top capability tasks |

## Parallelism Concepts

- Different agents use different models.
- One workflow may use many tiers.
- Speculative execution is possible.
- Outputs can be compared between models.
- Work can fall back when one model fails.
- Sensitive tasks can be routed locally.

## Routing Inputs

A model routing engine should consider:

- Task complexity
- Latency requirement
- Privacy sensitivity
- Token and context need
- Cost budget
- Availability
- Current load
- Confidence score
- Domain specialization
- User preference

## Example Policies

Cheap first:

Try a local small model before escalation.

Private first:

Sensitive tasks stay local.

Best answer wins:

Run two models and evaluate.

Latency first:

Use the fastest acceptable model.

