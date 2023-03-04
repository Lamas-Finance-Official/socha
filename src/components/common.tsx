import { FC } from 'react';
import Link from 'next/link';
import { SochaCampaign } from '~/web3';

type Contributor = {
	avatar: string;
	name: string;
	amount: number;
};

export const Logo: FC = () => (
	<Link href='/' className={'logo'}>
		<i className={'logoIcon'}></i>
		<span>Socha</span>
	</Link>
);

export const RaiseAFundBtn: FC = () => {
	return (
		<Link href="/create" className={'raiseAFund'}>
			<b>Raise a fund</b>
			<i></i>
		</Link>
	);
};

export const CampaignCard: FC<{ round: SochaCampaign }> = ({ round }) => (
	<div className={'campaignCard'}>
		<img src={round.thumbnail} alt="campagin image" />
		<div className={'content'}>
			<div className={'title'}>{round.title}</div>
			<div className={'pubkey'}>{`GNXBosvDTNNwAjNFHxoQP5CMrqtkyLohjETExdr84pQw`}</div>
			<div className={'progressBar'}>
				<div style={{ width: `${(round.currentAmount / round.targetAmount) * 100}%` }}></div>
			</div>
			<div className={'progress'}>
				<span>${round.currentAmount} </span>
				funded of
				<span> ${round.targetAmount}</span>
			</div>
			<div className={'footer'}>Last donation few days ago</div>
		</div>
	</div>
);

export const ContributorCard: FC<{ contributor: Contributor }> = ({ contributor }) => (
	<div className={'contributorCard'}>
		<img src={contributor.avatar} alt="contributor avatar" />
		<div className={'content'}>
			<div className={'title'}>{contributor.name}</div>
			<div className={'progress'}>{contributor.amount} USDC</div>
		</div>
	</div>
);
