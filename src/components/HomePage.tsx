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

type Contributor = {
	avatar: string;
	name: string;
	amount: number;
};

const campaigns: any[] = [
	{
		targetAmount: 4000,
		currentAmount: 2500,
		title: 'Help 4 woman of color attend a higher education in Africa',
		thumbnail: '',
	},
	{
		targetAmount: 4000,
		currentAmount: 100,
		title: 'Grant to fund reforestation in Agogo',
		thumbnail: '',
	},
	{
		targetAmount: 5000,
		currentAmount: 2000,
		title: 'Project proposal: develop AI chatbots to help prevent suicide',
		thumbnail: '',
	},
	{
		targetAmount: 5000,
		currentAmount: 4400,
		title: 'Grant proposal: pair a veteran with a service dog to treat PTSD',
		thumbnail: '',
	},
];

const contributors: Contributor[] = [
	{
		avatar: '',
		name: 'Sahin Ozdemir',
		amount: 12500
	},
	{
		avatar: '',
		name: 'Osman Yildirim',
		amount: 11500
	},
	{
		avatar: '',
		name: 'GNXBosvDTNNwAjNFHxoQP5CMrqtkyLohjETExdr84pQw',
		amount: 10000
	},
	{
		avatar: '',
		name: 'Seyite Sansi',
		amount: 7500
	},
];

export const HomePage: FC = () => {
	return (
		<div className={styles.container}>
			<header className={styles.stickyNav}>
				<div className={styles.content}>
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
				<div className={styles.cards}>
					{campaigns.map((c) => (
						<CampaignCard key={c.title} round={c} />
					))}
				</div>
				<div>
					<Link href="/campaigns">See all project</Link>
				</div>
			</section>
			<section className={cx(styles.page, styles.page2)}></section>
			<section className={cx(styles.page, styles.page3)}>
				<div className={styles.bigQuote}>Top contributor</div>
				<div className={styles.smallQuote}>
					Users create campaigns and add information about their charitable cause. Each campaign is associated with a contract account, allowing for secure and transparent tracking of donations.
				</div>
				<div className={styles.cards}>
					{
						contributors.map((c) => (
							<ContributorCard key={c.name} contributor={c} />
						))
					}
				</div>
			</section>
			<section className={cx(styles.page, styles.page4)}>
				<div className={styles.content}>
					<div className={styles.bigQuote}>
						<div>Donate crypto.</div>
						<div>Change the world.</div>						
					</div>
					<div className={styles.smallQuote}>
						Users create campaigns and add information about their charitable cause. Each campaign is associated with a contract account, allowing for secure and transparent tracking of donations.
					</div>
					<Link href="/" className={styles.contributorBtn}>Become a contributor</Link>
				</div>
				<div className={styles.graphic}>
					<ul>
						<li>Create campaigns, contribute using USDC</li>
						<li>Transfer ownership of the campaigns</li>
						<li>Disclose donation history and charitable profile</li>
					</ul>
				</div>
			</section>
			<footer className={styles.footer}>
				<div className={styles.left}>
					<div className={styles.icon}></div>
					<div className={styles.content}>
						<div className={styles.category}>
							<h1>Solutions</h1>
							<Link href='/'>Transparency</Link>
							<Link href='/'>Crypto donations made simple</Link>
							<Link href='/'>Inherit funding</Link>
						</div>
						<div className={styles.category}>
							<h1>Funding</h1>
							<Link href='/'>Communities</Link>
							<Link href='/'>How to use</Link>
							<Link href='/'>Become a Donor</Link>
						</div>
						<div className={styles.category}>
							<h1>About Socha</h1>
							<Link href='/'>About us</Link>
							<Link href='/'>Meet the team</Link>
						</div>
					</div>
				</div>
				<div className={styles.right}>
					<div className={styles.socials}></div>
					<div>Do Better Together</div>
					<div>Transparency for Community</div>
					<RaiseAFundBtn />
				</div>
			</footer>
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

const CampaignCard: FC<{ round: SochaCampaign }> = ({ round }) => (
	<div className={styles.campaignCard}>
		<img src={round.thumbnail} alt="campagin image" />
		<div className={styles.content}>
			<div className={styles.title}>{round.title}</div>
			<div className={styles.pubkey}>{`GNXBosvDTNNwAjNFHxoQP5CMrqtkyLohjETExdr84pQw`}</div>
			<div className={styles.progressBar}>
				<div style={{ width: `${(round.currentAmount / round.targetAmount) * 100}%` }}></div>
			</div>
			<div className={styles.progress}>
				<span>${round.currentAmount} </span>
				funded of
				<span> ${round.targetAmount}</span>
			</div>
			<div className={styles.footer}>Last donation few days ago</div>
		</div>
	</div>
);

const ContributorCard: FC<{ contributor: Contributor }> = ({ contributor }) => (
	<div className={styles.contributorCard}>
		<img src={contributor.avatar} alt="contributor avatar" />
		<div className={styles.content}>
			<div className={styles.title}>{contributor.name}</div>
			<div className={styles.progress}>{contributor.amount} USDC</div>
		</div>
	</div>
)