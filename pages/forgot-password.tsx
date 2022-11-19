import React, { ReactElement, useState } from 'react';
import { Form, Formik } from 'formik';
import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';
import { Box, Button, Text } from '@chakra-ui/react';
import { useUserForgotPasswordMutation } from '../graphql/__generated__/graphql';
import Link from 'next/link';

const ForgotPassword = (): ReactElement | null => {
	// const router = useRouter();
	const [userForgotPassword, { data, error, loading }] = useUserForgotPasswordMutation();
	const [emailSent, setEmailSent] = useState(false);

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
				initialValues={{ email: '' }}
				onSubmit={async (values, { setErrors }) => {
					const { email } = values;
					const response = await userForgotPassword({
						variables: {
							email,
						},
						// This updates the specific ME Query within the NavBar Component
						// update: (cache, { data }) => {
						// 	cache.writeQuery<MeQuery>({
						// 		query: MeDocument,
						// 		data: {
						// 			__typename: 'Query',
						// 			me: data?.userLogin.user,
						// 		},
						// 	});
						// 	cache.evict({ fieldName: 'posts:{}' });
						// },
					});

					if (response.data?.userForgotPassword) {
						setEmailSent(true);
					}

					return;
				}}
			>
				{({ values, handleChange, isSubmitting }) =>
					emailSent ? (
						<Box>
							<Text mb={2}>If the email exists, a reset password link has been sent!</Text>
							<Link href="/" style={{ color: 'blue', textDecorationLine: 'underline' }}>
								Return to Home
							</Link>
						</Box>
					) : (
						<Form>
							<InputField name="email" placeholder="email" label="Email" type="email" />

							<Button mt={4} type="submit" colorScheme="teal" isLoading={isSubmitting}>
								Forgot Password
							</Button>
						</Form>
					)
				}
			</Formik>
		</Wrapper>
	);
};

export default ForgotPassword;
