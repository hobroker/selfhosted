import { z } from "zod";

export const AppReadmeSchema = z.object({
  rawName: z.string().min(1, "Name must not be empty"),
  description: z.string().min(1, "Description must not be empty"),
  sourceCodeUrl: z.string().refine(
    (val) => {
      try {
        const { protocol } = new URL(val);
        return protocol === "https:" || protocol === "http:";
      } catch {
        return false;
      }
    },
    { message: "Source Code must be an http or https URL" },
  ),
});

export type AppReadme = z.infer<typeof AppReadmeSchema>;

// ── README generation schemas ─────────────────────────────────────────────────

export const PartialReadmeFrontmatterSchema = z.object({
  description: z.string().min(1, "Description must not be empty"),
  sourceCode: z.string().url("sourceCode must be a valid URL"),
  chart: z.string().url("chart must be a valid URL").optional(),
});

const AppSourceRawSchema = z.object({
  repoURL: z.string(),
  chart: z.string().optional(),
  targetRevision: z.string().optional(),
  path: z.string().optional(),
  ref: z.string().optional(),
  helm: z
    .object({
      releaseName: z.string().optional(),
      valueFiles: z.array(z.string()).optional(),
    })
    .optional(),
});

export const AppManifestRawSchema = z.object({
  metadata: z.object({ name: z.string() }),
  spec: z.object({
    sources: z.array(AppSourceRawSchema),
    destination: z.object({ namespace: z.string() }),
  }),
});

export type AppManifestRaw = z.infer<typeof AppManifestRawSchema>;
