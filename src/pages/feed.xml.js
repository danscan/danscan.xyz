import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { getBlogCollectionSorted } from '../content/blog';

export async function GET(context) {
	const posts = await getBlogCollectionSorted();
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `/${post.slug}/`,
			pubDate: post.data.published,
		})),
	});
}
