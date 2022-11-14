import { Error } from '../graphql/__generated__/graphql';

export const toErrorMap = (errors: Error[]) => {
	const errorMap: Record<string, string> = {};
	errors.forEach((error) => {
		errorMap[error.field] = error.message;
	});

	return errorMap;
};
