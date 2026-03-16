import { z } from "zod";

export const AppReadmeSchema = z.object({
  rawName: z.string().min(1, "Name must not be empty"),
  description: z.string().min(1, "Description must not be empty"),
  sourceCodeUrl: z.string().url("Source Code must be a valid URL"),
});

export type AppReadme = z.infer<typeof AppReadmeSchema>;
