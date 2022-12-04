import React, { ReactElement } from 'react';
import { Form, Formik } from 'formik';
import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';
import { Box, Button, Flex } from '@chakra-ui/react';
import { MeDocument, MeQuery, useUserLoginMutation } from '../graphql/__generated__/graphql';
import { toErrorMap } from '../utilities/toErrorMap';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface LoginProps {}

const Login = (props: LoginProps): ReactElement | null => {
	const [userLogin, { data, loading, error }] = useUserLoginMutation();
	const router = useRouter();

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

	return (
		<Wrapper variant="small">
			<Formik
				initialValues={{ username: '', password: '' }}
				onSubmit={async (values, { setErrors }) => {
					const { username, password } = values;
					const response = await userLogin({
						variables: {
							credentials: {
								username,
								password,
							},
						},
						// This updates the specific ME Query within the NavBar Component
						update: (cache, { data }) => {
							cache.writeQuery<MeQuery>({
								query: MeDocument,
								data: {
									__typename: 'Query',
									me: data?.userLogin.user,
								},
							});
							cache.evict({ fieldName: 'posts:{}' });
						},
					});

					// Check if we have errors
					if (response.data?.userLogin?.errors && response.data.userLogin.errors.length > 0) {
						setErrors(toErrorMap(response.data.userLogin.errors));
					} else if (response.data?.userLogin.user?.username) {
						// router.push('/');

						// Redirecting based on the router object
						if (typeof router.query.next === 'string') {
							router.push(router.query.next);
						} else {
							router.push('/');
						}
					}

					return;
				}}
			>
				{({ values, handleChange, isSubmitting }) => (
					<Form>
						<InputField name="username" placeholder="username" label="Username" type="text" />
						<Box mt={4}>
							<InputField name="password" placeholder="password" label="Password" type="password" />
						</Box>
						<Flex mt={2}>
							<Button mt={4} type="submit" colorScheme="teal" isLoading={isSubmitting}>
								Login
							</Button>
							<Box ml={'auto'}>
								<Link
									style={{ color: 'blue', textDecorationLine: 'underline' }}
									href="/forgot-password"
								>
									Forgot Password?
								</Link>
							</Box>
						</Flex>
					</Form>
				)}
			</Formik>
		</Wrapper>
	);
};

export default Login;
