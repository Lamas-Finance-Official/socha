import { FC, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { getOrCreateAssociatedTokenAccount, requestAirdrop, SochaCampaign } from '~/web3';
import { Logo, RaiseAFundBtn } from './common';

export const Header: FC = () => {
    const { connection } = useConnection();
    const { setVisible } = useWalletModal();
    const { wallet, publicKey, signTransaction } = useWallet();

    const walletConnected = Boolean(publicKey && wallet);
    const connectWallet = useCallback(() => {
        if (!walletConnected) {
            setVisible(true);
        }
    }, [walletConnected, setVisible]);

    return (
        <header className={'stickyNav'}>
            <div className={'content'}>
                <div className={'leftNav'}>
                    <Logo />
                    <nav className={'nav'}>
                        <Link href="/campaigns">Browse funding</Link>
                        <Link href="/faq">How it works</Link>
                        <Link href="/about">About us</Link>
                    </nav>
                </div>
                <div className={'rightNav'}>
                    {
                        walletConnected
                            ? (
                                <>
                                    <div className='connected'>
                                        <span>{'GNXBosvDTNNwAjNFHxoQP5CMrqtkyLohjETExdr84pQw' || publicKey!.toBase58()}</span>
                                        <Image src='/assets/avatar.png' alt='avatar' width={40} height={40}></Image>
                                    </div>
                                    <div className='divisor'></div>
                                </>
                            )
                            : <button className='connectWallet' onClick={connectWallet}>Connect wallet</button>
                    }
                    <RaiseAFundBtn />
                </div>
            </div>
        </header>
    );
}
