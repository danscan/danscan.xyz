import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		image: z.string().url().optional(),
		published: z.coerce.date(),
		updated: z.coerce.date().optional(),
	}),
});

export const collections = { blog };
