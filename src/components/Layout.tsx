import { FunctionComponent } from 'react';
import Head from 'next/head';
import { Wallet } from './Wallet';

import style from '~/styles/Layout.module.scss';

const Layout: FunctionComponent<{ children: JSX.Element; search?: string }> = ({ children, search }) => {
	return (
		<>
			<Head>
				<title>Socha</title>
			</Head>
			<main>
				<Wallet>
					{children}
				</Wallet>
			</main>
		</>
	);
};

export default Layout;
