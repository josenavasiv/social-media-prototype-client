import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Form, Formik } from 'formik';
import { Box, Button, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import InputField from '../../components/InputField';
import Wrapper from '../../components/Wrapper';
import { MeDocument, MeQuery, useUserChangePasswordMutation } from '../../graphql/__generated__/graphql';
import { toErrorMap } from '../../utilities/toErrorMap';
import Link from 'next/link';

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
	const [userChangePassword, { data, error, loading }] = useUserChangePasswordMutation();
	const router = useRouter();
	const [tokenError, setTokenError] = useState('');

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
				initialValues={{ newPassword: '' }}
				onSubmit={async (values, { setErrors }) => {
					const { newPassword } = values;
					const response = await userChangePassword({
						variables: {
							token,
							newPassword,
						},
						// Update the cache for the me query since changing password logs in user
						update: (cache, { data }) => {
							cache.writeQuery<MeQuery>({
								query: MeDocument,
								data: {
									__typename: 'Query',
									me: data?.userChangePassword.user,
								},
							});
							cache.evict({ fieldName: 'posts:{}' });
						},
					});

					// Check if we have errors
					if (
						response.data?.userChangePassword?.errors &&
						response.data.userChangePassword.errors.length > 0
					) {
						const errorMap = toErrorMap(response.data.userChangePassword.errors);
						if ('token' in errorMap) {
							setTokenError(errorMap.token);
						}
						setErrors(errorMap);
					} else if (response.data?.userChangePassword.user?.username) {
						router.push('/');
					}

					return;
				}}
			>
				{({ values, handleChange, isSubmitting }) => (
					<Form>
						<InputField
							name="newPassword"
							placeholder="new password"
							label="New Password"
							type="password"
						/>
						{tokenError && (
							<Box>
								<Flex>
									<Box mr={1} color={'red'}>
										{tokenError} -
									</Box>
									<Link
										style={{ color: 'blue', textDecorationLine: 'underline' }}
										href="/forgot-password"
									>
										Reset Password Here
									</Link>
								</Flex>
							</Box>
						)}
						<Button mt={4} type="submit" colorScheme="teal" isLoading={isSubmitting}>
							Change Password
						</Button>
					</Form>
				)}
			</Formik>
		</Wrapper>
	);
};

// Getting the dynamic url parameter within the page functional component
ChangePassword.getInitialProps = ({ query }) => {
	return {
		token: query.token as string,
	};
};

export default ChangePassword;
