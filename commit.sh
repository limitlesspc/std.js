#!/bin/sh
TYPE=$(gum choose "feat" "fix" "style" "docs" "refactor" "perf" "chore" "revert" "build" "test" "infra")
SCOPE=$(gum input --placeholder "scope")

# Since the scope is optional, wrap it in parentheses if it has a value.
test -n "$SCOPE" && SCOPE="($SCOPE)"

# Pre-populate the input with the type(scope): so that the user may change it
SUMMARY=$(gum input --value "$TYPE$SCOPE: " --placeholder "Summary of this change")

# Commit these changes
gum confirm "Commit changes?" && git commit -m "$SUMMARY"