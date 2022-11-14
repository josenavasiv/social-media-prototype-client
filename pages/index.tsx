import { gql, useQuery } from '@apollo/client';
import Wrapper from '../components/Wrapper';
import { usePostsQuery } from '../graphql/__generated__/graphql';

// const POSTS = gql`
// 	query POSTS {
// 		posts {
// 			createdAt
// 			id
// 			points
// 			text
// 			title
// 			updatedAt
// 		}
// 	}
// `;

export default function Home() {
	const { data, loading, error } = usePostsQuery();

	// const { data, loading, error } = useQuery(POSTS);
	if (loading) {
		<Wrapper variant="small">
			<p>loading...</p>
		</Wrapper>;
	}

	if (error) {
		<Wrapper variant="small">
			<p>{error.message}</p>
		</Wrapper>;
	}

	console.log(data?.posts);

	return <Wrapper variant="small">data</Wrapper>;
}
