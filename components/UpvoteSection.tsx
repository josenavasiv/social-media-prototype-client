import { Flex, IconButton } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { PostFragment, usePostVoteMutation, PostVoteMutation } from '../graphql/__generated__/graphql';
import { ApolloCache, gql } from '@apollo/client';

interface UpvoteSectionProps {
	post: PostFragment;
}

const updateAfterVote = (value: number, postId: number, cache: ApolloCache<PostVoteMutation>) => {
	const data = cache.readFragment<{
		id: number;
		points: number;
		voteStatus: number | null;
	}>({
		id: 'Post:' + postId,
		fragment: gql`
			fragment _ on Post {
				id
				points
				voteStatus
			}
		`,
	});

	console.log(data);

	if (data) {
		if (data.voteStatus === value) {
			return;
		}

		const newPoints = (data.points as number) + (!data.voteStatus ? 1 : 2) * value;

		cache.writeFragment({
			id: 'Post:' + postId,
			fragment: gql`
				fragment __ on Post {
					points
					voteStatus
				}
			`,
			data: { points: newPoints, voteStatus: value },
		});
		// console.log('-----------------------------------');
		// const results = cache.readFragment<{
		// 	id: number;
		// 	points: number;
		// 	voteStatus: number | null;
		// }>({
		// 	id: 'Post:' + postId,
		// 	fragment: gql`
		// 		fragment _ on Post {
		// 			id
		// 			points
		// 			voteStatus
		// 		}
		// 	`,
		// });

		// console.log(results);
	}
};

const UpvoteSection = ({ post }: UpvoteSectionProps) => {
	const [loadingState, setLoadingState] = useState<'updoot-loading' | 'downdoot-loading' | 'not-loading'>(
		'not-loading'
	);

	const [postVote, _] = usePostVoteMutation();

	return (
		<Flex mr={5} alignItems={'center'} justifyContent="center" direction="column">
			<IconButton
				aria-label="Upvote"
				icon={<ChevronUpIcon />}
				isLoading={loadingState === 'updoot-loading'}
				colorScheme={post.voteStatus === 1 ? 'green' : undefined}
				onClick={async () => {
					if (post.voteStatus?.voteStatus === 1) {
						return;
					}
					setLoadingState('updoot-loading');
					await postVote({
						variables: {
							postVoteId: post.id,
							value: 1,
						},
						update: (cache) => updateAfterVote(1, parseInt(post.id), cache),
					});
					setLoadingState('not-loading');
				}}
			/>
			{post.points}
			<IconButton
				aria-label="Downvote"
				icon={<ChevronDownIcon />}
				isLoading={loadingState === 'downdoot-loading'}
				colorScheme={post.voteStatus === -1 ? 'red' : undefined}
				onClick={async () => {
					if (post.voteStatus?.voteStatus === -1) {
						return;
					}
					setLoadingState('downdoot-loading');
					await postVote({
						variables: {
							postVoteId: post.id,
							value: -1,
						},
						update: (cache) => updateAfterVote(-1, parseInt(post.id), cache),
					});
					setLoadingState('not-loading');
				}}
			/>
		</Flex>
	);
};

export default UpvoteSection;
