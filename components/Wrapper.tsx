import React, { ReactElement, ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

export type WrapperVariant = 'small' | 'regular';

interface WrapperProps {
	children: ReactNode;
	variant?: WrapperVariant;
}

const Wrapper = ({ children, variant = 'regular' }: WrapperProps): ReactElement | null => {
	return (
		<Box mt={8} mx="auto" maxW={variant === 'regular' ? '800px' : '400px'} w="100%">
			{children}
		</Box>
	);
};

export default Wrapper;
