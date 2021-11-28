# Avoiding Common Attacks

## Using specific compiler pragma

We lock our contracts down to use `0.8.4` so that we can know with certainty which compiler was used.

This will also be helpful when it comes to verifying source code on Polygonscan.

## Check-Effects-Interactions

We use require statements, state updates, followed LAST by external interactions for all withdrawls.