import { FunctionComponent } from 'react';
import Head from 'next/head';
import { Wallet } from './Wallet';

const Layout: FunctionComponent<{ children: JSX.Element; className: string }> = ({ children, className }) => {
	return (
		<>
			<Head>
				<title>Socha</title>
			</Head>
			<div className={className}>
				<Wallet>{children}</Wallet>
			</div>
		</>
	);
};

export default Layout;
