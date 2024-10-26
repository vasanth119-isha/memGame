import { z } from "zod";

export const formSchema = z.object({
    name: z
      .string({ message: "Name is required" })
      .min(3, "Name should be at least 3 characters"),
    department: z
      .string()
      .min(1, "Please Enter a Department")
  });

  export type FormSchema = z.infer<typeof formSchema>;