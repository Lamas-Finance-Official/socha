import { FC, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CampaignCard, ContributorCard, Logo, RaiseAFundBtn } from './common';
import { Header } from './Header';

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
		amount: 12500,
	},
	{
		avatar: '',
		name: 'Osman Yildirim',
		amount: 11500,
	},
	{
		avatar: '',
		name: 'GNXBosvDTNNwAjNFHxoQP5CMrqtkyLohjETExdr84pQw',
		amount: 10000,
	},
	{
		avatar: '',
		name: 'Seyite Sansi',
		amount: 7500,
	},
];

export const HomePage: FC = () => {
	return (
		<div className={'container'}>
			<section className={'page page0'}>
				<div className={'content'}>
					<div className={'bigQuote'}>
						<div>Transparency</div>
						<div>Authenticity</div>
						<div>for Community</div>
					</div>
					<div className={'smallQuote'}>
						Web3 platform for charitable fundraising using blockchain to ensure authenticity and
						transparency
					</div>
					<RaiseAFundBtn />
				</div>
				<div className={'graphic'}></div>
			</section>
			<section className={'page page1'}>
				<div className={'bigQuote'}>Make the world better through charity</div>
				<div className={'smallQuote'}>
					Meet some world-changing communities using Socha to raise money and make a difference.
				</div>
				<div className={'cards'}>
					{campaigns.map((c) => (
						<CampaignCard key={c.title} round={c} />
					))}
				</div>
				<div>
					<Link href="/campaigns">See all project</Link>
				</div>
			</section>
			<section className={'page page2'}></section>
			<section className={'page page3'}>
				<div className={'bigQuote'}>Top contributor</div>
				<div className={'smallQuote'}>
					Users create campaigns and add information about their charitable cause. Each campaign is associated
					with a contract account, allowing for secure and transparent tracking of donations.
				</div>
				<div className={'cards'}>
					{contributors.map((c) => (
						<ContributorCard key={c.name} contributor={c} />
					))}
				</div>
			</section>
			<section className={'page page4'}>
				<div className={'content'}>
					<div className={'bigQuote'}>
						<div>Donate crypto.</div>
						<div>Change the world.</div>
					</div>
					<div className={'smallQuote'}>
						Users create campaigns and add information about their charitable cause. Each campaign is
						associated with a contract account, allowing for secure and transparent tracking of donations.
					</div>
					<Link href="/" className={'contributorBtn'}>
						Become a contributor
					</Link>
				</div>
				<div className={'graphic'}>
					<ul>
						<li>Create campaigns, contribute using USDC</li>
						<li>Transfer ownership of the campaigns</li>
						<li>Disclose donation history and charitable profile</li>
					</ul>
				</div>
			</section>
		</div>
	);
};
