import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  //   content: z.string().min(1, "Content is required"),
  //   category: z.string().min(1, "Category is required"),
  //   images: z
  //     .array(z.instanceof(File))
  //     .min(1, "At least one image is required")
  //     .optional(),
});
