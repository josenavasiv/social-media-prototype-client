import React, { ReactElement } from 'react';

import { Form, Formik } from 'formik';
import InputField from '../components/InputField';
import { Box, Button } from '@chakra-ui/react';

import { useRouter } from 'next/router';
import { usePostCreateMutation } from '../graphql/__generated__/graphql';
import Layout from '../components/Layout';

import useIsAuth from '../lib/useIsAuth';

const CreatePost = (): ReactElement | null => {
	const router = useRouter();
	useIsAuth(); // Authentication Custom Hook
	const [postCreate, _] = usePostCreateMutation();

	return (
		<Layout variant="small">
			<Formik
				initialValues={{ title: '', text: '' }}
				onSubmit={async (values, { setErrors }) => {
					const { title, text } = values;
					console.log(title, text);
					const response = await postCreate({
						variables: {
							title,
							text,
						},
						// Forces refetching of the posts query (Cache Invalidating)
						update: (cache) => {
							cache.evict({ fieldName: 'posts:{}' });
						},
					});

					if (response.errors) {
						console.log(response.errors);
						router.push('/login');
					} else if (response.data?.postCreate) {
						router.push('/');
					}

					// // Check if we have errors
					// if (response.data?.postCreate?.errors && response.data.userLogin.errors.length > 0) {
					// 	setErrors(toErrorMap(response.data.userLogin.errors));
					// } else if (response.data?.userLogin.user?.username) {
					// 	router.push('/');
					// }

					return;
				}}
			>
				{({ values, handleChange, isSubmitting }) => (
					<Form>
						<InputField name="title" placeholder="title" label="Title" type="text" />
						<Box mt={4}>
							<InputField name="text" placeholder="text..." label="Text" type="text" textarea={true} />
						</Box>
						<Button mt={4} type="submit" colorScheme="teal" isLoading={isSubmitting}>
							Create Post
						</Button>
					</Form>
				)}
			</Formik>
		</Layout>
	);
};

export default CreatePost;
