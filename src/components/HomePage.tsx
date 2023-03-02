import { FC, useCallback } from 'react';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { getOrCreateAssociatedTokenAccount, requestAirdrop } from '~/web3';

export const HomePage: FC = () => {
	const { connection } = useConnection();
	const { wallet, publicKey, signTransaction } = useWallet();
	const { setVisible } = useWalletModal();

	const walletConnected = Boolean(publicKey && wallet);
	const connectWallet = useCallback(() => {
		if (!walletConnected) {
			setVisible(true);
		}
	}, [walletConnected, setVisible]);

	const doAirdrop = useCallback(async () => {
		try {
			const tokenAccount = await getOrCreateAssociatedTokenAccount({
				connection,
				owner: publicKey!,
				payer: publicKey!,
				signTransaction: signTransaction!,
			});

			await requestAirdrop({
				owner: publicKey!,
				tokenAccount: tokenAccount.address,
				connection,
				signTransaction: signTransaction!,
			});
		} catch (err) {
			console.log(err, (err as any).logs);
		}
	}, [publicKey, signTransaction, connection]);

	return (
		<>
			<button onClick={connectWallet} disabled={walletConnected}>
				Connect wallet
			</button>
			<button onClick={doAirdrop} disabled={!walletConnected}>
				Airdrop
			</button>
		</>
	);
};
