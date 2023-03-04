import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { getOrCreateAssociatedTokenAccount, SochaActions, SochaCampaign } from '~/web3';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Account } from '@solana/spl-token';

type Contributor = {
	avatar: string;
	name: string;
	amount: number;
};

export const useTokenAccount = () => {
	const { connection } = useConnection();
	const { publicKey, signTransaction } = useWallet();
	const [tokenAccount, setTokenAccount] = useState<null | Account>(null);

	useEffect(() => {
		if (publicKey && signTransaction) {
			getOrCreateAssociatedTokenAccount({
				connection,
				owner: publicKey!,
				payer: publicKey!,
				signTransaction: signTransaction!,
			})
				.then(token => setTokenAccount(token));

		}
	}, [setTokenAccount, publicKey, connection, signTransaction]);

	return tokenAccount;
}

export const useSochaActions = () => {
	const [sochaActions, setSochaActions] = useState<null | SochaActions>(null);
	const tokenAccount = useTokenAccount();
	const { connection } = useConnection();
	const { publicKey, signTransaction } = useWallet();

	useEffect(() => {
		if (tokenAccount && publicKey && signTransaction) {
			const sochaActions = new SochaActions({
				owner: publicKey,
				tokenAccount: tokenAccount.address,
				connection,
				signTransaction,
			});

			setSochaActions(sochaActions);
		}
	}, [tokenAccount, publicKey, connection, signTransaction]);

	return sochaActions;
}

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
	<Link href={`/campaign/${round.pubkey}`} className={'campaignCard'}>
		<img src={round.thumbnail} alt="campagin image" />
		<div className={'content'}>
			<div className={'title'}>{round.title}</div>
			<div className={'pubkey'}>{round.pubkey.toBase58()}</div>
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
	</Link>
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
