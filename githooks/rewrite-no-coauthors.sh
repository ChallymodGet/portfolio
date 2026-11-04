#!/bin/bash
set -e
cd "$(dirname "$0")/.."
export FILTER_BRANCH_SQUELCH_WARNING=1
git filter-branch -f --msg-filter 'grep -vi "^co-authored-by:"' HEAD
