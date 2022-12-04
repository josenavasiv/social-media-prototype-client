import { useMeQuery } from '../graphql/__generated__/graphql';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// Eventually move into middleware
const useIsAuth = () => {
	const { data, loading } = useMeQuery();

	const router = useRouter();

	useEffect(() => {
		if (!loading && !data?.me) {
			router.replace('/login?next=' + router.pathname);
		}
	}, [loading, data, router]);
};

export default useIsAuth;
