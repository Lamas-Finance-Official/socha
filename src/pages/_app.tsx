import '~/styles/globals.scss';
import '@solana/wallet-adapter-react-ui/styles.css';

import type { AppProps } from 'next/app';
import Layout from '~/components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Layout search={pageProps.search}>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;
