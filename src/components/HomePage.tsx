import { FC, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { CampaignCard, ContributorCard, RaiseAFundBtn, useTokenAccount } from './common';
import { useConnection } from '@solana/wallet-adapter-react';
import { getAllRounds, SochaCampaign } from '~/web3';


type Contributor = {
	avatar: string;
	name: string;
	amount: number;
};

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
	const { connection } = useConnection();
	const [campaigns, setCampaigns] = useState<SochaCampaign[]>([]);

	useEffect(() => {
		getAllRounds(connection)
			.then(r => setCampaigns(r));
	}, [connection]);

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
