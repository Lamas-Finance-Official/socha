import { clusterApiUrl, PublicKey } from '@solana/web3.js';

export const COMMITMENT = 'confirmed';
export const AIRDROP_PROGRAM_ID = new PublicKey('CuodM6g8ohjaF23VLkRSn395Az5hTQR6vVLzHt4rNiDx');
export const SOCHA_PROGRAM_ID = new PublicKey('3ZkasC1HnKgGm2NvJn78PNGebxbd7soxrkpYTvjxmcvS');
export const MINT = new PublicKey('F1deHv5NLeucg6GPkx2m3zJakFRXVX1CmBQ5PaZwHQiH');
export const SOLANA_CLUSTER = 'devnet';
export const SOLANA_URL = clusterApiUrl(SOLANA_CLUSTER);
