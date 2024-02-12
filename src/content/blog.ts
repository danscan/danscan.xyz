import { getCollection } from 'astro:content';

export async function getBlogCollectionSorted() {
	const blogEntries = await getCollection('blog');
	return blogEntries
		.sort((a, b) => b.data.published.getTime() - a.data.published.getTime());
}