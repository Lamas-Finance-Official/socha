import { FC, useCallback, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base';
import {
	PhantomWalletAdapter,
	Coin98WalletAdapter,
	SolletWalletAdapter,
	SolflareWalletAdapter,
	SlopeWalletAdapter,
	LedgerWalletAdapter,
	SolletExtensionWalletAdapter,
	TorusWalletAdapter,
	BitKeepWalletAdapter,
	BloctoWalletAdapter,
	BitpieWalletAdapter,
	CloverWalletAdapter,
	CoinhubWalletAdapter,
	MathWalletAdapter,
	SafePalWalletAdapter,
	SolongWalletAdapter,
	TokenPocketWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { SOLANA_URL } from '~/web3';

export const Wallet: FC<{ children: any }> = ({ children }) => {
	const wallets = useMemo(
		() => [
			new PhantomWalletAdapter(),
			new Coin98WalletAdapter(),
			new SolletWalletAdapter({ network: WalletAdapterNetwork.Devnet }),
			new SolflareWalletAdapter(),
			new SlopeWalletAdapter(),
			new LedgerWalletAdapter(),
			new SolletExtensionWalletAdapter(),
			new TorusWalletAdapter(),
			new BitKeepWalletAdapter(),
			new BloctoWalletAdapter(),
			new BitpieWalletAdapter(),
			new CloverWalletAdapter(),
			new CoinhubWalletAdapter(),
			new MathWalletAdapter(),
			new SafePalWalletAdapter(),
			new SolongWalletAdapter(),
			new TokenPocketWalletAdapter(),
		],
		[]
	);

	const onError = useCallback((error: WalletError) => {
		console.warn('Connect wallet error', error);
	}, []);

	return (
		<ConnectionProvider endpoint={SOLANA_URL}>
			<WalletProvider wallets={wallets} onError={onError} autoConnect>
				<WalletModalProvider>{children}</WalletModalProvider>
			</WalletProvider>
		</ConnectionProvider>
	);
};
