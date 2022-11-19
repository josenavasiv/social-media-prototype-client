import React, { ReactElement } from 'react';
import { Form, Formik } from 'formik';
import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';
import { Box, Button } from '@chakra-ui/react';
import { MeDocument, MeQuery, useUserRegisterMutation } from '../graphql/__generated__/graphql';
import { toErrorMap } from '../utilities/toErrorMap';
import { useRouter } from 'next/router';

interface RegisterProps {}

const Register = (props: RegisterProps): ReactElement | null => {
	const [register, { data, loading, error }] = useUserRegisterMutation();
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
				initialValues={{ username: '', password: '', email: '' }}
				onSubmit={async (values, { setErrors }) => {
					const { username, email, password } = values;
					const response = await register({
						variables: {
							credentials: {
								username,
								password,
							},
							email,
						},
						// This updates the specific ME Query within the NavBar Component
						update: (cache, { data }) => {
							cache.writeQuery<MeQuery>({
								query: MeDocument,
								data: {
									__typename: 'Query',
									me: data?.userRegister.user,
								},
							});
							cache.evict({ fieldName: 'posts:{}' });
						},
					});

					console.log(response.data?.userRegister); // Returns as the UserPayloadType

					// Check if we have errors
					if (response.data?.userRegister?.errors && response.data.userRegister.errors.length > 0) {
						setErrors(toErrorMap(response.data?.userRegister.errors));
					} else if (response.data?.userRegister.user) {
						router.push('/');
					}
					return;
				}}
			>
				{({ values, handleChange, isSubmitting }) => (
					<Form>
						<InputField name="username" placeholder="username" label="Username" type="text" />
						<Box mt={4}>
							<InputField name="email" placeholder="email" label="Email" type="email" />
						</Box>
						<Box mt={4}>
							<InputField name="password" placeholder="password" label="Password" type="password" />
						</Box>
						<Button mt={4} type="submit" colorScheme="teal" isLoading={isSubmitting}>
							Register
						</Button>
					</Form>
				)}
			</Formik>
		</Wrapper>
	);
};

export default Register;
