import * as z from "zod";
export const boardItemSchema = z.object({
  status: z.string().min(1, "Status is required"),
});

export const boardFormSchema = z.object({
  boardItems: z.array(boardItemSchema).min(1, "At least one status is required"),
});

export type BoardFormSchema = z.output<typeof boardFormSchema>;
export type BoardItemSchema = z.output<typeof boardItemSchema>;
