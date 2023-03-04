import { FC, useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { getRound, SochaCampaign } from '~/web3';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useSochaActions } from './common';

export const Campaign: FC<{ pubkey: string }> = ({ pubkey }) => {
    const { publicKey } = useWallet();
    const sochaActions = useSochaActions();
    const [amount, setAmount] = useState(0);
    const [note, setNote] = useState('');

    const inputAmount = useRef<HTMLInputElement>(null);
    const inputNote = useRef<HTMLTextAreaElement>(null);

    const { connection } = useConnection();
    const [campaign, setCampaign] = useState<SochaCampaign | undefined>();

    useEffect(() => {
        if (pubkey) {
            getRound(connection, new PublicKey(pubkey as string))
                .then(c => setCampaign(c));
        }
    }, [connection, pubkey]);

    const onChange = useCallback((e: any) => {
        if (e.target === inputAmount.current) {
            setAmount(e.target.value);
        } else if (e.target === inputNote.current) {
            setNote(e.target.value);
        }
    }, []);

    const donate = useCallback(() => {
        if (sochaActions && publicKey) {
            sochaActions.donate(new PublicKey(pubkey as string), {
                name: publicKey.toBase58(),
                amount,
                message: note,
            }).then(() => {
                setNote('');
                setAmount(0);
            })
        }
    }, [amount, note, pubkey, publicKey, sochaActions]);

    if (!campaign) {
        return <div>Loading...</div>
    }

    return (
        <div className='container'>
            <section className='page pageCampaign'>
                <div className='image'>
                    <Image src={campaign.thumbnail} alt="upload button" width={400} height={400} />
                </div>
                <div className='content'>
                    <label className='labelName' htmlFor='inputName'>
                        {campaign.title}
                    </label>
                    <label className='labelOverview' htmlFor='inputOverview'>
                        {campaign.description}
                    </label>
                </div>
            </section>
            <section className='pageCampaignInfo'>
                <div className='cards'>
                    <div className='card'>
                        <div>
                            <div>Raise amount</div>
                            <div className='input'>
                                <span>{`${campaign.currentAmount}/${campaign.targetAmount} USDC`}</span>
                            </div>
                        </div>
                        <div className={'progressBar'}>
                            <div style={{ width: `${(campaign.currentAmount / campaign.targetAmount) * 100}%` }}></div>
                        </div>
                    </div>
                    <div className='card'>
                        <div>End time</div>
                        <div className='input'>
                            <span>{new Date(campaign.timestampPlannedClose * 1000).toDateString()}</span>
                            <span>{new Date(campaign.timestampOpen * 1000).toDateString()}</span>
                        </div>
                    </div>
                    <div className='card avatar'>
                        <Image src='/assets/avatar.png' alt='avatar' width={40} height={40}></Image>
                        <span>Seyite Sansi</span>
                    </div>
                </div>
                <div className='donate'>
                    <div className='smallQuote'>Donate to campaign</div>
                    <div className='card'>
                        <div className='amount'>
                            <label htmlFor="donateAmount">Amount</label>
                            <div>
                                <input type="text" ref={inputAmount} onChange={onChange} value={amount} />
                                <span>USDC</span>
                            </div>
                        </div>
                        <div className='note'>
                            <label htmlFor="donateNote">Note for campaign</label>
                            <div>
                                <textarea id="donateNote" ref={inputNote} onChange={onChange} value={note} cols={30} rows={10} placeholder='Write your support speech here (Optional)'></textarea>
                            </div>
                        </div>
                        <button className='donateBtn' onClick={donate}>
                            Donate
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}