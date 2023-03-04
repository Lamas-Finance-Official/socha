import { FC, useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { Header } from './Header';
import { addDays, formatISO } from 'date-fns';
import { useSochaActions } from './common';
import { useRouter } from 'next/router';

export const CreateCampaign: FC = () => {
    const router = useRouter();
    const sochaActions = useSochaActions();
    if (typeof window !== 'undefined') (window as any).$a = sochaActions;

    const [name, setName] = useState('');
    const [overview, setOverview] = useState('');
    const [amount, setAmount] = useState(1000);
    const [endTime, setEndTime] = useState(
        formatISO(
            addDays(new Date(), 15),
            { representation: 'date' }
        ));

    const inputName = useRef<HTMLInputElement>(null);
    const inputOverview = useRef<HTMLTextAreaElement>(null);
    const inputAmount = useRef<HTMLInputElement>(null);
    const inputDate = useRef<HTMLInputElement>(null);

    const onChange = useCallback((e: any) => {
        if (e.target === inputName.current) {
            setName(e.target.value);
        } else if (e.target === inputOverview.current) {
            setOverview(e.target.value);
        } else if (e.target === inputAmount.current) {
            setAmount(e.target.value);
        } else if (e.target === inputDate.current) {
            setEndTime(e.target.value);
        }
    }, []);

    const submit = useCallback(() => {
        if (sochaActions) {
            sochaActions.createRound({
                title: name,
                summary: '',
                description: overview,
                thumbnail: '',
                targetAmount: amount,
                closeUnixTimestamp: new Date(endTime).getTime() / 1000,
            }).then(key => {
                router.push(`/campaign/${key}`);
            });
        }
    }, [name, overview, amount, endTime, sochaActions]);

    return (
        <div className='container'>
            <section className='page pageCreate'>
                <div className='upload'>
                    <img src="/assets/upload.svg" alt="upload button" />
                </div>
                <div className='content'>
                    <label className='labelName' htmlFor='inputName'>
                        Fill the name of your campaign here
                    </label>
                    <div className='input'>
                        <span>{name.length}/50</span>
                        <input type="text" ref={inputName} onChange={onChange} id='inputName' value={name} />
                    </div>
                    <label className='labelOverview' htmlFor='inputOverview'>
                        Give an overview of your campaign's mission and vision here
                    </label>
                    <div className='input'>
                        <span>{overview.length}/500</span>
                        <textarea ref={inputOverview} onChange={onChange} id='inputOverview' value={overview} cols={10} rows={16} />
                    </div>
                </div>
            </section>
            <section className='page pageCreateInfo'>
                <div className='cards'>
                    <div className='card cardInput'>
                        <div>Raise amount</div>
                        <div className='input'>
                            <span>
                                <input type="number" ref={inputAmount} onChange={onChange} value={amount} />
                                <span>USDC</span>
                            </span>
                            <div>
                                Or
                                <button>choose Unlimited</button>
                            </div>
                        </div>
                    </div>
                    <div className='card cardInput'>
                        <div>End time</div>
                        <div className='input'>
                            <input type="date" ref={inputDate} onChange={onChange} value={endTime} />
                            <div>
                                Or
                                <button>choose Perpetual</button>
                            </div>
                        </div>
                    </div>
                    <div className='card avatar'>
                        <Image src='/assets/avatar.png' alt='avatar' width={40} height={40}></Image>
                        <span>Seyite Sansi</span>
                    </div>
                </div>
                <div className='publish'>
                    <button onClick={submit}>Publish your Campaign</button>
                </div>
            </section>
        </div>
    );
}
