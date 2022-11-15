import Wrapper from '../components/Wrapper';
import { usePostsQuery } from '../graphql/__generated__/graphql';

export default function Home() {
	const { data, loading, error } = usePostsQuery();

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
