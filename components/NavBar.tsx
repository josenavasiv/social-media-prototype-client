import React from 'react';
import { Box, Flex, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { useMeQuery, useUserLogoutMutation } from '../graphql/__generated__/graphql';

interface NavBarProps {}

const NavBar = ({}: NavBarProps) => {
	const { data, loading, error, client } = useMeQuery();
	const [logout, { loading: logoutLoading }] = useUserLogoutMutation();

	const handleLogout = async () => {
		await logout();
		await client.resetStore();
	};

	let body = null;

	if (loading) {
	}
	// User IS NOT logged-in
	else if (!data?.me) {
		body = (
			<>
				<Link style={{ marginRight: 4, fontWeight: 'bold', color: 'cornsilk' }} href="/login">
					Login
				</Link>
				<Link style={{ fontWeight: 'bold', color: 'cornsilk' }} href="/register">
					Register
				</Link>
			</>
		);
		// User IS logged-in
	} else {
		body = (
			<Box>
				<Flex>
					<p style={{ marginRight: 4, fontWeight: 'bold', color: 'cornsilk' }}>{data.me.username}</p>
					<Button
						variant="link"
						style={{ color: 'darkkhaki' }}
						onClick={handleLogout}
						isLoading={logoutLoading}
					>
						Logout
					</Button>
				</Flex>
			</Box>
		);
	}

	return (
		<Flex position={'sticky'} top={0} zIndex={1} bg="pink.900" p={4}>
			<Box ml="auto">{body}</Box>
		</Flex>
	);
};

export default NavBar;
