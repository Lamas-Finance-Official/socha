import { FC, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Logo, RaiseAFundBtn, useTokenAccount } from './common';
import { requestAirdrop } from '~/web3';

export const Header: FC = () => {
    const { setVisible } = useWalletModal();
    const { wallet, publicKey, signTransaction } = useWallet();
    const { connection } = useConnection();
    const tokenAccount = useTokenAccount();

    const walletConnected = Boolean(publicKey && wallet);
    const connectWallet = useCallback(() => {
        if (!walletConnected) {
            setVisible(true);
        }
    }, [walletConnected, setVisible]);

    const doAirdrop = useCallback((e: any) => {
        e.preventDefault();

        requestAirdrop({
            owner: publicKey!,
            tokenAccount: tokenAccount!.address,
            connection,
            signTransaction: signTransaction!,
        })
            .catch(err => console.log(err, err.logs));

    }, [publicKey, signTransaction, connection, tokenAccount]);

    return (
        <header className={'stickyNav'}>
            <div className={'content'}>
                <div className={'leftNav'}>
                    <Logo />
                    <nav className={'nav'}>
                        <Link href="/" >Browse funding</Link>
                        <Link href="/" onClick={doAirdrop} >How it works</Link>
                        <Link href="/">About us</Link>
                    </nav>
                </div>
                <div className={'rightNav'}>
                    {
                        walletConnected
                            ? (
                                <>
                                    <div className='connected'>
                                        <span>{publicKey!.toBase58()}</span>
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
