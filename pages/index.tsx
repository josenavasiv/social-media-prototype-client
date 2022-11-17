// import Wrapper from '../components/Wrapper';
import { PostsQuery, PostsDocument, Post } from '../graphql/__generated__/graphql';
import NavBar from '../components/NavBar';
import { addApolloState, initializeApolloClient } from '../lib/apollo';
import { GetServerSidePropsContext } from 'next/types';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	const apolloClient = initializeApolloClient(null, ctx);
	const { data } = await apolloClient.query<PostsQuery>({
		query: PostsDocument,
	});

	return addApolloState(apolloClient, {
		props: {
			posts: data.posts,
		},
	});
}

interface HomeProps {
	posts: Post[];
}

export default function Home({ posts }: HomeProps) {
	// const { data, loading, error } = usePostsQuery();

	// if (loading) {
	// 	<Wrapper variant="small">
	// 		<p>loading...</p>
	// 	</Wrapper>;
	// }

	// if (error) {
	// 	<Wrapper variant="small">
	// 		<p>{error.message}</p>
	// 	</Wrapper>;
	// }

	// console.log(data?.posts);

	// return <Wrapper variant="small">data</Wrapper>;
	// console.log(posts);
	return (
		<>
			<NavBar />
			<div>shalom world</div>
			<div>
				{posts.map((p) => {
					return <div key={p.id}>{p.title}</div>;
				})}
			</div>
		</>
	);
}
