import type { AppProps } from 'next/app';
import { Nunito } from 'next/font/google';
import Layout from '~/components/Layout';

import '~/styles/globals.scss';
import '@solana/wallet-adapter-react-ui/styles.css';

const nunito = Nunito({
	subsets: ['latin', 'vietnamese'],
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Layout className={nunito.className}>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;
