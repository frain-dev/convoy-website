#!/usr/bin/env bash
# Docs drift guard: forbidden substrings + lightweight cross-file consistency.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
DOCS="$ROOT/docs"
PATTERNS_FILE="$ROOT/.github/docs-drift/forbidden-patterns.txt"
CONFIG_MDX="$DOCS/deployment/configuration.mdx"
METRICS_MDX="$DOCS/product-manual/metrics.mdx"
FEATURE_FLAGS_MDX="$DOCS/resources/feature-flags.mdx"

fail() {
  echo "docs-drift-check: ERROR: $*" >&2
  exit 1
}

if [[ ! -d "$DOCS" ]]; then
  fail "docs directory missing: $DOCS"
fi

echo "== Forbidden patterns ($PATTERNS_FILE) =="
if [[ ! -f "$PATTERNS_FILE" ]]; then
  fail "forbidden patterns file missing"
fi
while IFS= read -r line || [[ -n "$line" ]]; do
  [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]] && continue
  pattern="$line"
  if grep -rIlF --include='*.mdx' --include='*.md' "$pattern" "$DOCS" 2>/dev/null | grep -q .; then
    echo "Matched forbidden pattern (fixed-string): $pattern" >&2
    grep -rInF --include='*.mdx' --include='*.md' "$pattern" "$DOCS" >&2 || true
    fail "remove or update stale pattern above"
  fi
done <"$PATTERNS_FILE"

echo "== Required anchors (configuration.mdx) =="
[[ -f "$CONFIG_MDX" ]] || fail "missing $CONFIG_MDX"

require_in_file() {
  local file="$1"
  local needle="$2"
  local msg="$3"
  grep -qF "$needle" "$file" || fail "$msg (expected in $file): $needle"
}

require_in_file "$CONFIG_MDX" "frain-dev/convoy/blob/main/config/config.go" \
  "configuration doc must link to server config source"
require_in_file "$CONFIG_MDX" 'cli flags` > `environment variables` > `convoy.json' \
  "configuration doc must document CLI > env > convoy.json precedence"

count="$(grep -cF 'cli flags` > `environment variables` > `convoy.json' "$CONFIG_MDX" || true)"
[[ "$count" -eq 1 ]] || fail "precedence line must appear exactly once in configuration.mdx (count=$count)"

echo "== Metrics / feature-flag naming consistency =="
[[ -f "$METRICS_MDX" ]] || fail "missing $METRICS_MDX"
[[ -f "$FEATURE_FLAGS_MDX" ]] || fail "missing $FEATURE_FLAGS_MDX"

# Keep metrics onboarding aligned with canonical env names in configuration.mdx.
for sym in CONVOY_METRICS_ENABLED CONVOY_METRICS_BACKEND CONVOY_METRICS_QUERY_TIMEOUT; do
  require_in_file "$CONFIG_MDX" "$sym" "configuration reference must mention $sym"
  require_in_file "$METRICS_MDX" "$sym" "metrics doc must mention $sym"
done
require_in_file "$CONFIG_MDX" "CONVOY_METRICS_SAMPLE_TIME" "configuration reference must mention CONVOY_METRICS_SAMPLE_TIME"

require_in_file "$METRICS_MDX" "CONVOY_ENABLE_FEATURE_FLAG" "metrics doc must document feature flag env for prometheus"
require_in_file "$FEATURE_FLAGS_MDX" "CONVOY_ENABLE_FEATURE_FLAG" "feature flags doc must document CONVOY_ENABLE_FEATURE_FLAG"

echo "docs-drift-check: OK"
