import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import type { NormalizedCacheObject } from '@apollo/client';
import { GetServerSidePropsContext } from 'next';
import merge from 'deepmerge';
import isEqual from 'lodash.isequal';
import { useMemo } from 'react';

interface PageProps {
	props?: Record<string, any>;
}

export const APOLLO_STATE_PROPERTY_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

const createApolloClient = (ctx?: GetServerSidePropsContext) => {
	const httpLink = new HttpLink({
		uri: 'http://localhost:4000/graphql',
		credentials: 'include', // same-origin for same domain | include if different domain
	});

	return new ApolloClient({
		cache: new InMemoryCache(),
		link: httpLink,
		ssrMode: typeof window === 'undefined', //
	});
};

export const initializeApolloClient = (
	initialState: Record<string, any> | null = null,
	ctx: GetServerSidePropsContext | undefined = undefined
) => {
	const client = apolloClient ?? createApolloClient(ctx);

	// If page has Nextjs data fetching methods that use Apollo Client
	// The initial state gets hydrated here
	if (initialState) {
		// Gets the existing cache, loaded during client side data fetching
		const existingCache = client.extract();

		// Merge the existing cache into data passed from getStaticProps|getServerSideProps
		const data = merge(initialState, existingCache, {
			// combine arrays using object equality (like in sets) - For deepmerge
			arrayMerge: (destinationArray, sourceArray) => [
				...sourceArray,
				...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s))),
			],
		});

		// Restore the cache with the merged data
		client.cache.restore(data);
	}

	// For SSG|SSR always create a new Apollo Client Object (Basically running on the server not browser)
	if (typeof window === 'undefined') {
		return client;
	}

	// Create the Apollo Client Object once in the client
	if (!apolloClient) {
		apolloClient = client;
	}

	return client;
};

export const addApolloState = (client: ApolloClient<NormalizedCacheObject>, pageProps: PageProps) => {
	if (pageProps?.props) {
		pageProps.props[APOLLO_STATE_PROPERTY_NAME] = client.cache.extract();
	}

	return pageProps;
};

export const useApollo = (pageProps: PageProps) => {
	let state: Record<string, any> | null = null;

	if (pageProps?.props) {
		state = pageProps.props[APOLLO_STATE_PROPERTY_NAME];
	}
	const store = useMemo(() => initializeApolloClient(state), [state]);

	return store;
};
