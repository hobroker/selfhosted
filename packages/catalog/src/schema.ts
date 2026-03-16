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
