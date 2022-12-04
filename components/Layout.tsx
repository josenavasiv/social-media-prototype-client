import React, { ReactNode } from 'react';
import Wrapper from './Wrapper';
import NavBar from './NavBar';
import { WrapperVariant } from './Wrapper';

interface LayoutProps {
	variant?: WrapperVariant;
	children: ReactNode;
}

const Layout = ({ children, variant }: LayoutProps) => {
	return (
		<>
			<NavBar />
			<Wrapper variant={variant}>{children}</Wrapper>
		</>
	);
};

export default Layout;
