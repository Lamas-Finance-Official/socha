import { FC, useCallback } from 'react';
import Link from 'next/link';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { getOrCreateAssociatedTokenAccount, requestAirdrop, SochaCampaign } from '~/web3';
import { cx } from '~/lib/cx';

import styles from '~/styles/HomePage.module.scss';
import { Keypair } from '@solana/web3.js';

// export const HomePage: FC = () => {
// 	const { connection } = useConnection();
// 	const { setVisible } = useWalletModal();
// 	const { wallet, publicKey, signTransaction } = useWallet();

// 	const walletConnected = Boolean(publicKey && wallet);
// 	const connectWallet = useCallback(() => {
// 		if (!walletConnected) {
// 			setVisible(true);
// 		}
// 	}, [walletConnected, setVisible]);

// 	const doAirdrop = useCallback(async () => {
// 		try {
// 			const tokenAccount = await getOrCreateAssociatedTokenAccount({
// 				connection,
// 				owner: publicKey!,
// 				payer: publicKey!,
// 				signTransaction: signTransaction!,
// 			});

// 			await requestAirdrop({
// 				owner: publicKey!,
// 				tokenAccount: tokenAccount.address,
// 				connection,
// 				signTransaction: signTransaction!,
// 			});
// 		} catch (err) {
// 			console.log(err, (err as any).logs);
// 		}
// 	}, [publicKey, signTransaction, connection]);

// 	return (
// 		<>
// 			<button onClick={connectWallet} disabled={walletConnected}>
// 				Connect wallet
// 			</button>
// 			<button onClick={doAirdrop} disabled={!walletConnected}>
// 				Airdrop
// 			</button>
// 		</>
// 	);
// };

const cards: any[] = [
	{
		targetAmount: 2500,
		currentAmount: 4000,
		title: 'Help 4 woman of color attend a higher education in Africa',
		thumbnail: '',
	},
	{
		targetAmount: 2500,
		currentAmount: 4000,
		title: 'Grant to fund reforestation in Agogo',
		thumbnail: '',
	},
	{
		targetAmount: 2500,
		currentAmount: 4000,
		title: 'Project proposal: develop AI chatbots to help prevent suicide',
		thumbnail: '',
	},
	{
		targetAmount: 2500,
		currentAmount: 4000,
		title: 'Grant proposal: pair a veteran with a service dog to treat PTSD',
		thumbnail: '',
	},
];

export const HomePage: FC = () => {
	return (
		<div className={styles.container}>
			<header className={styles.stickyNav}>
				<div className={styles.leftNav}>
					<div className={styles.logo}>Socha</div>
					<nav className={styles.nav}>
						<Link href="/campaigns">Browse funding</Link>
						<Link href="/faq">How it works</Link>
						<Link href="/about">About us</Link>
					</nav>
				</div>
				<div className={styles.rightNav}>
					<button>Connect wallet</button>
					<RaiseAFundBtn />
				</div>
			</header>
			<section className={cx(styles.page, styles.page0)}>
				<div className={styles.content}>
					<div className={styles.bigQuote}>
						<div>Transparency</div>
						<div>Authenticity</div>
						<div>for Community</div>
					</div>
					<div className={styles.smallQuote}>
						Web3 platform for charitable fundraising using blockchain to ensure authenticity and
						transparency
					</div>
					<RaiseAFundBtn />
				</div>
				<div className={styles.graphic}></div>
			</section>
			<section className={cx(styles.page, styles.page1)}>
				<div className={styles.bigQuote}>Make the world better through charity</div>
				<div className={styles.smallQuote}>
					Meet some world-changing communities using Socha to raise money and make a difference.
				</div>
				<div className={styles.card}>
					{cards.map((c) => (
						<CampaignCard key={c.title} round={c} />
					))}
				</div>
				<div>
					<Link href="/campaigns">See all project</Link>
				</div>
			</section>
			<section className={cx(styles.page, styles.page2)}></section>

			<footer></footer>
		</div>
	);
};

const RaiseAFundBtn: FC = () => {
	return (
		<Link href="/campaign/create" className={styles.raiseAFund}>
			<b>Raise a fund</b>
			<i>icon</i>
		</Link>
	);
};

const CampaignCard: FC<{ round: SochaCampaign }> = ({ round }) => {
	return (
		<div className={styles.campaignCard}>
			<img src={round.thumbnail} alt="campagin image" />
			<div className={styles.title}>{round.title}</div>
			<div className={styles.pubkey}>{`GNXBosvDTNNwAjNFHxoQP5CMrqtkyLohjETExdr84pQw`}</div>
			<div className={styles.progressBar}>
				<div style={{ width: `${(round.currentAmount / round.targetAmount) * 100}%` }}></div>
			</div>
			<div className={styles.progress}>
				<span>${round.currentAmount}</span>
				funded of
				<span>${round.targetAmount}</span>
			</div>
			<div className={styles.footer}>Last donation few days ago</div>
		</div>
	);
};
