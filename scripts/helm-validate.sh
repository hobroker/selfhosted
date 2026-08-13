#!/usr/bin/env bash
# Render every bjw-s app-template app's values.yaml and validate the rendered
# manifests with kubeconform. Catches broken values.yaml that the raw-manifest
# kubeconform job can't see (it never renders the chart).
set -uo pipefail

CATALOG='https://raw.githubusercontent.com/datreeio/CRDs-catalog/main/{{.Group}}/{{.ResourceKind}}_{{.ResourceAPIVersion}}.json'

helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts >/dev/null 2>&1 || true
helm repo update bjw-s >/dev/null

fail=0
while IFS= read -r values; do
  app_yaml="$(dirname "$values")/application.yaml"
  grep -q 'chart: app-template' "$app_yaml" 2>/dev/null || continue
  name="$(basename "$(dirname "$values")")"
  version="$(grep -A2 'chart: app-template' "$app_yaml" | grep 'targetRevision:' | head -1 | awk '{print $2}')"
  if [ -z "$version" ]; then
    echo "::error file=$app_yaml::could not parse app-template targetRevision for $name"
    fail=1
    continue
  fi
  echo "==> $name (app-template $version)"
  if ! helm template "$name" bjw-s/app-template --version "$version" -f "$values" \
       | kubeconform -summary -schema-location default -schema-location "$CATALOG" -; then
    echo "::error file=$values::helm template + kubeconform failed for $name"
    fail=1
  fi
done < <(find apps -name values.yaml | sort)

exit $fail
