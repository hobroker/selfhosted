/**
 * Dependency detection rules.
 *
 * Each rule describes how to detect whether an app depends on a given provider
 * by scanning the concatenated content of all its YAML files.
 *
 * To add a new rule: append an entry to RULES with the provider app name,
 * a short edge label, and a detect function that returns true on a match.
 *
 * Mark a rule as `optional: true` when the app functions without the provider
 * (e.g. monitoring, ingress). Optional edges render as dashed lines in the
 * Mermaid diagram and are excluded from cycle detection.
 */

export interface DependencyRule {
  /** Name of the app that is being depended on */
  provider: string;
  /** Human-readable label shown on graph edges */
  label: string;
  /**
   * When true the dependency is non-critical — the app works without it.
   * Rendered as a dashed edge; excluded from cycle detection.
   */
  optional?: boolean;
  /** Returns true if the concatenated YAML content signals a dependency */
  detect: (content: string) => boolean;
}

export const RULES: DependencyRule[] = [
  {
    provider: "metallb",
    label: "LoadBalancer IP",
    optional: true,
    detect: (c) => /metallb\.io\/loadBalancerIPs/.test(c),
  },
  {
    provider: "prometheus-operator",
    label: "ServiceMonitor / PodMonitor",
    detect: (c) =>
      /serviceMonitor:\s*\n\s*enabled:\s*true/.test(c) ||
      /podMonitor:\s*\n\s*enabled:\s*true/.test(c) ||
      /kind:\s*(ServiceMonitor|PodMonitor|PrometheusRule)/.test(c),
  },
  {
    provider: "infisical-operator",
    label: "InfisicalSecret",
    detect: (c) =>
      /kind:\s*InfisicalSecret/.test(c) || /infisical-\w+-secret/.test(c),
  },
  {
    provider: "traefik",
    label: "Ingress",
    optional: true,
    detect: (c) =>
      /ingressClassName:\s*traefik/.test(c) ||
      /traefik\.ingress\.kubernetes\.io/.test(c),
  },
  {
    provider: "longhorn",
    label: "StorageClass",
    detect: (c) => /storageClassName:\s*"?longhorn/.test(c),
  },
  {
    provider: "cert-manager",
    label: "Certificate",
    detect: (c) => /cert-manager\.io\//.test(c),
  },
];
