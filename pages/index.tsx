import { PostsQuery, PostsDocument, Post } from '../graphql/__generated__/graphql';
import { addApolloState, initializeApolloClient } from '../lib/apollo';
import { GetServerSidePropsContext } from 'next/types';
import Layout from '../components/Layout';
import Link from 'next/link';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	const apolloClient = initializeApolloClient(null, ctx);
	const { data } = await apolloClient.query<PostsQuery>({
		query: PostsDocument,
		variables: {
			limit: 5,
		},
	});

	return addApolloState(apolloClient, {
		props: {
			posts: data.posts?.posts,
		},
	});
}

interface HomeProps {
	posts: Post[];
}

export default function Home({ posts }: HomeProps) {
	return (
		<Layout>
			<Link style={{ color: 'blue', textDecorationLine: 'underline' }} href="/create-post">
				Create Post
			</Link>
			<div>
				{posts.map((p) => {
					return <div key={p.id}>{p.title}</div>;
				})}
			</div>
		</Layout>
	);
}
