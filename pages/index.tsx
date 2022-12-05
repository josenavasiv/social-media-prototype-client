// import { PostsQuery, PostsDocument, Post, usePostsQuery } from '../graphql/__generated__/graphql';
// import { addApolloState, initializeApolloClient } from '../lib/apollo';
// import { GetServerSidePropsContext } from 'next/types';
import { usePostsQuery } from '../graphql/__generated__/graphql';
import Layout from '../components/Layout';
import Link from 'next/link';
import { VStack, Box, Heading, Text, Flex, Button } from '@chakra-ui/react';

// export async function getServerSideProps(ctx: GetServerSidePropsContext) {
// 	const apolloClient = initializeApolloClient(null, ctx);
// 	const { data } = await apolloClient.query<PostsQuery>({
// 		query: PostsDocument,
// 		variables: {
// 			limit: 10,
// 		},
// 	});

// 	return addApolloState(apolloClient, {
// 		props: {
// 			posts: data.posts?.posts,
// 		},
// 	});
// }

// interface HomeProps {
// 	posts: Post[];
// }

export default function Home() {
	const { data, error, loading, fetchMore } = usePostsQuery({ variables: { limit: 10 } });

	console.log(data?.posts.posts);

	if (!loading && !data) {
		return (
			<div>
				<div>ERROR</div>
				<div>{error?.message}</div>
			</div>
		);
	}

	return (
		<Layout>
			<Flex>
				<Heading>The Blog</Heading>
				<Link
					style={{ color: 'blue', textDecorationLine: 'underline', marginLeft: 'auto' }}
					href="/create-post"
				>
					Create Post
				</Link>
			</Flex>
			<br />
			{!data && loading ? (
				<div>loading...</div>
			) : (
				<VStack spacing={8}>
					{data?.posts.posts.map((p) => {
						return (
							<Box key={p.id} p={5} shadow="md" borderWidth="1px" w={'full'}>
								<Heading fontSize="xl">{p.title}</Heading>
								<Text mt={4}>{p.text.slice(0, 50)}</Text>
							</Box>
						);
					})}
				</VStack>
			)}
			{data && data.posts.hasMore ? (
				<Flex>
					<Button
						isLoading={loading}
						m="auto"
						my={8}
						onClick={() => {
							fetchMore({
								variables: {
									limit: 10,
									cursor: parseInt(data.posts.posts[data.posts.posts.length - 1].id),
								},
							});
						}}
					>
						Load More
					</Button>
				</Flex>
			) : (
				<Box my={8}></Box>
			)}
		</Layout>
	);
}

// Need to research SSR (getServerSideProps) + Pagination
