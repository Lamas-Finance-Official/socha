import { useRouter } from 'next/router';
import { Campaign } from '~/components/Campaign';

const CampaignFetcher = () => {
    const router = useRouter();
    const { pubkey } = router.query;

    return <Campaign pubkey={pubkey as string} />;
}

export default CampaignFetcher;