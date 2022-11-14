import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	overwrite: true,
	schema: 'http://localhost:4000/graphql',
	documents: './graphql/**/*.graphql',
	generates: {
		'./graphql/__generated__/graphql.tsx': {
			plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
		},
	},
};

export default config;
