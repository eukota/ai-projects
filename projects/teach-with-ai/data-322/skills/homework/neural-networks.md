---
name: neural-networks
description: Explain MLP architecture choices; debug a non-converging training loop; compare neural nets to classical ML for tabular data
---

# Homework Skill: Neural Networks

## Purpose

This skill is active during Week 13 and launches Project 3. Neural networks are the conceptual bridge from classical ML to modern deep learning — students don't need to understand the full theory, but they need enough to make architecture decisions, debug a non-converging model, and make an honest comparison to classical methods.

The central interpretive question for this week: when do you actually need a neural network?

---

## Ask Before Explaining

Before explaining MLP architecture: "You've used logistic regression and random forest. Both learn from data and make predictions. What do you think a neural network adds? What would it do that those models can't?"

If a student's training loss isn't decreasing: "Show me your learning rate and how your loss curve looks over epochs. Is the loss decreasing slowly, staying flat, or oscillating?"

If they're choosing between MLP and random forest for their Project 3 dataset: "How much data do you have? Do you have any reason to believe the feature interactions in your dataset are more complex than what a gradient boosted tree can capture?"

---

## Architecture Intuition

A multilayer perceptron (MLP) is a sequence of linear transformations with nonlinearities applied between them:

```
Input → [Dense → Activation] × N layers → Output
```

Each layer learns a new representation of the data. More layers = more abstract representations. More neurons per layer = more capacity within a representation.

**Activation functions:**
- **ReLU** (hidden layers): `max(0, x)`. Fast, default choice.
- **Sigmoid** (binary output): squashes to (0, 1), interprets as probability.
- **Softmax** (multiclass output): squashes to a probability distribution over classes.

For a tabular binary classification task:

```python
import torch
import torch.nn as nn

model = nn.Sequential(
    nn.Linear(n_features, 64),
    nn.ReLU(),
    nn.Linear(64, 32),
    nn.ReLU(),
    nn.Linear(32, 1),
    nn.Sigmoid()
)
```

Ask: "Why do you need nonlinear activation functions? What happens if you stack linear layers without them?"

---

## Backpropagation (Conceptually)

The model makes a prediction, computes a loss (how wrong it was), and then propagates that error backward through the layers using the chain rule. Each weight is adjusted in the direction that reduces the loss — gradient descent.

The learning rate controls the step size. Students do not need to implement this — but they need to understand the learning rate as the primary lever for training stability.

---

## Quick Keras Pattern for Tabular Classification

```python
import tensorflow as tf
from tensorflow import keras

model = keras.Sequential([
    keras.layers.Dense(64, activation="relu", input_shape=(n_features,)),
    keras.layers.Dense(32, activation="relu"),
    keras.layers.Dense(1, activation="sigmoid")
])

model.compile(
    optimizer=keras.optimizers.Adam(learning_rate=1e-3),
    loss="binary_crossentropy",
    metrics=["accuracy"]
)

history = model.fit(
    X_train_scaled, y_train,
    validation_split=0.2,
    epochs=50,
    batch_size=32,
    verbose=1
)
```

Plot the loss curves to diagnose training:

```python
import matplotlib.pyplot as plt
plt.plot(history.history["loss"], label="Train")
plt.plot(history.history["val_loss"], label="Validation")
plt.xlabel("Epoch")
plt.ylabel("Loss")
plt.legend()
```

---

## Debugging Training Failures

**Loss not decreasing (flat):** learning rate is too low, or the model is too small. Try increasing learning rate by 10x and observe.

**Loss oscillating or exploding:** learning rate is too high. Reduce by 10x. If using a custom architecture, check for missing activation functions between layers.

**Validation loss diverging from training loss early:** overfitting. Add dropout:

```python
keras.layers.Dropout(0.3)  # randomly zero 30% of neurons during training
```

Or reduce model size (fewer layers or neurons).

**Training accuracy is high but validation is much lower:** same problem — overfitting. For small tabular datasets, neural networks overfit aggressively. This is common and worth documenting in Project 3.

Ask: "Look at your loss curves. At what epoch does the validation loss start increasing while training loss keeps decreasing? That's your overfitting point."

---

## When to Use a Neural Network vs. Classical ML

This is the most important interpretive question of Week 13. Guide the student to reason through it rather than giving a rule.

Factors favoring neural networks:
- Large dataset (tens of thousands of rows or more)
- Non-tabular input: images, text, audio, sequences
- Complex feature interactions that trees struggle with
- Transfer learning from pre-trained models

Factors favoring random forest / gradient boosting on tabular data:
- Fewer than ~10,000 rows
- Need for feature importance or model interpretability
- Fast iteration cycles — trees train in seconds, MLP training takes longer
- Class imbalance — trees handle it more gracefully with balanced class weights

The honest answer for most tabular datasets in this course: "Try random forest first. If it doesn't fit and you have enough data, try gradient boosting. Add a neural network as a third option to compare, not as the default."

Ask: "If your random forest and MLP produce similar performance on your Project 3 dataset, which would you choose for deployment and why?"

---

## Connection to Project 3

Project 3 requires comparing at least two model families. Neural networks are an option but not required — the project is about justifying the choice, not hitting a specific algorithm. If a student uses an MLP, they must explain why it was a reasonable candidate given the dataset size and problem type. A comparison that reports only final test metrics without discussing trade-offs will not receive full credit.

---

## Quiz Prep

The AI will quiz you on these questions in Socratic mode before the in-class test — it will ask you to answer first, then give feedback. Memorizing definitions won't be enough; you need to be able to reason through these in plain language.

1. **Why do neural networks need nonlinear activation functions between layers? What happens if you stack multiple linear layers without them?**

2. **Your training loss decreases smoothly but your validation loss starts increasing after epoch 15. Explain what's happening and what you would try to fix it.**

3. **A classmate trains an MLP on a 500-row tabular dataset and gets better training accuracy than a random forest. Should they use the MLP? What question should they be asking instead of just looking at training accuracy?**

4. **What does the learning rate control, and what's the symptom of a learning rate that's too high vs. one that's too low?**

5. **For a tabular dataset with 2,000 rows and 20 features, make the case for using gradient boosting instead of a neural network. What are the practical reasons, not just the rule of thumb?**

6. **Explain backpropagation in plain language without using the phrase "gradient descent." What information flows backward through the network and what happens to the model's weights as a result?**
