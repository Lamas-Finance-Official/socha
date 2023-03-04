import BN from 'bn.js';
import { Program } from '@coral-xyz/anchor';
import { SignerWalletAdapterProps } from '@solana/wallet-adapter-base';
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, TransactionInstruction } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import type { AnchorSochaProgram } from '~/idl/anchor_socha_program';
import { SOCHA_PROGRAM_STATE, sochaProgram, sochaRoundWallet, sochaRound } from './program';
import { bufferToString } from './bufferToString';
import { signAndSend } from '../transaction';
import { MINT } from '../consts';

type SochaProgramRound = Awaited<ReturnType<Program<AnchorSochaProgram>['account']['sochaRound']['fetch']>>;
type SochaProgramDonation = Awaited<ReturnType<Program<AnchorSochaProgram>['account']['sochaDonation']['fetch']>>;
type SochaProgramState = Awaited<ReturnType<Program<AnchorSochaProgram>['account']['programState']['fetch']>>;

const LAMPORTS_PER_SOL_BN = new BN(LAMPORTS_PER_SOL);

export type SochaCampaign = {
	pubkey: PublicKey;
	authority: PublicKey;
	wallet: PublicKey;
	targetAmount: number;
	currentAmount: number;
	thumbnail: string;
	title: string;
	summary: string;
	description: string;
	closed: boolean;
	roundIdx: number;
	timestampOpen: number;
	timestampClose: number;
	timestampPlannedClose: number;
}

export type SochaDonation = {
	pubkey: PublicKey;
	round: PublicKey;
	name: string;
	message: string;
	amount: number;
	timestamp: number;
}

export class SochaActions {
	private owner: PublicKey;
	private tokenAccount: PublicKey;
	private connection: Connection;
	private signTransaction: SignerWalletAdapterProps['signTransaction'];
	private program: Program<AnchorSochaProgram>;

	constructor({
		owner,
		tokenAccount,
		connection,
		signTransaction,
	}: {
		owner: PublicKey,
		tokenAccount: PublicKey,
		connection: Connection,
		signTransaction: SignerWalletAdapterProps['signTransaction'],
	}) {
		this.owner = owner;
		this.tokenAccount = tokenAccount;
		this.connection = connection;
		this.signTransaction = signTransaction;
		this.program = sochaProgram(connection);
	}

	async createRound({
		title,
		summary,
		description,
		thumbnail,
		closeUnixTimestamp,
		targetAmount,
	}: {
		title: string;
		summary: string;
		description: string;
		thumbnail: string;
		closeUnixTimestamp: number;
		targetAmount: number;
	}) {
		const state = await this._programState();
		const roundPubkey = sochaRound(state.roundCreated);

		const ix = await this.program.methods.createRound({
			title,
			summary,
			description,
			thumbnail,
			closeUnixTimestamp: new BN(closeUnixTimestamp),
			targetAmount: (new BN(targetAmount)).mul(LAMPORTS_PER_SOL_BN),
		}).accounts({
			authority: this.owner,
			mint: MINT,
			programState: SOCHA_PROGRAM_STATE,
			round: roundPubkey,
			wallet: sochaRoundWallet(roundPubkey),
			systemProgram: SystemProgram.programId,
			tokenProgram: TOKEN_PROGRAM_ID,
		}).instruction();

		return this._signAndSend(ix)
			.then(() => roundPubkey);
	}

	async updateRound(round: PublicKey, {
		title = null,
		summary = null,
		description = null,
		thumbnail = null,
		closeUnixTimestamp = null,
		targetAmount = null,
	}: {
		title?: string | null;
		summary?: string | null;
		description?: string | null;
		thumbnail?: string | null;
		closeUnixTimestamp?: number | null;
		targetAmount?: number | null;
	}) {
		const ix = await this.program.methods.updateRound({
			title,
			summary,
			description,
			thumbnail,
			targetAmount: targetAmount ? new BN(targetAmount).mul(LAMPORTS_PER_SOL_BN) : null,
			timestampPlannedClose: closeUnixTimestamp ? new BN(closeUnixTimestamp) : null,
		}).accounts({
			authority: this.owner,
			programState: SOCHA_PROGRAM_STATE,
			round,
		}).instruction();

		return this._signAndSend(ix);
	}

	async transferRound(round: PublicKey, dstPubkey: PublicKey) {
		const ix = await this.program.methods.transferRound()
			.accounts({
				authority: this.owner,
				destination: dstPubkey,
				round,
			})
			.instruction();

		return this._signAndSend(ix);
	}

	async closeRound(round: PublicKey) {
		const ix = await this.program.methods.closeRound()
			.accounts({
				authority: this.owner,
				programState: SOCHA_PROGRAM_STATE,
				round,
			})
			.instruction();

		return this._signAndSend(ix);
	}

	async donate(round: PublicKey, {
		amount,
		name,
		message,
	}: {
		amount: number;
		name: string;
		message: string;
	}) {
		const donationKeypair = Keypair.generate();

		const ix = await this.program.methods.donate({
			amount: new BN(amount).mul(LAMPORTS_PER_SOL_BN),
			name,
			message,
		}).accounts({
			user: this.owner,
			userWallet: this.tokenAccount,
			donation: donationKeypair.publicKey,
			round,
			roundWallet: sochaRoundWallet(round),
			systemProgram: SystemProgram.programId,
			tokenProgram: TOKEN_PROGRAM_ID,
		}).instruction();

		return this._signAndSend(ix, [donationKeypair]);
	}

	async withdraw(round: PublicKey, dstWallet: PublicKey, amount: number) {
		const ix = await this.program.methods
			.withdraw({
				amount: new BN(amount).mul(LAMPORTS_PER_SOL_BN),
			}).accounts({
				authority: this.owner,
				destinationWallet: dstWallet,
				round,
				roundWallet: sochaRoundWallet(round),
				tokenProgram: TOKEN_PROGRAM_ID,
			}).instruction();

		return this._signAndSend(ix);
	}

	private async _programState(): Promise<SochaProgramState> {
		return await this.program.account.programState.fetch(SOCHA_PROGRAM_STATE);
	}

	private async _signAndSend(ix: TransactionInstruction, extraSigners: Keypair[] = []): Promise<string> {
		try {
			return await signAndSend({
				instruction: [ix],
				payer: this.owner,
				connection: this.connection,
				signTransaction: this.signTransaction,
				extraSigners,
			});
		} catch (err) {
			((window as any).$err = (window as any).$err || []).push(err);
			console.log(err, (err as any).logs);
			return '';
		}
	}
}

export function getRound(connection: Connection, roundPubkey: PublicKey): Promise<SochaCampaign> {
	return sochaProgram(connection).account.sochaRound.fetch(roundPubkey)
		.then(round => ({
			pubkey: roundPubkey,
			authority: round.authority,
			wallet: round.wallet,
			targetAmount: round.targetAmount.div(LAMPORTS_PER_SOL_BN).toNumber(),
			currentAmount: round.currentAmount.div(LAMPORTS_PER_SOL_BN).toNumber(),
			thumbnail: bufferToString(round.thumbnail),
			title: bufferToString(round.title),
			summary: bufferToString(round.summary),
			description: bufferToString(round.description),
			closed: round.state !== 0,
			roundIdx: round.roundIdx.toNumber(),
			timestampOpen: round.timestampOpen.toNumber(),
			timestampClose: round.timestampClose.toNumber(),
			timestampPlannedClose: round.timestampPlannedClose.toNumber(),
		}));
}

export function getAllRounds(connection: Connection): Promise<SochaCampaign[]> {
	return sochaProgram(connection).account.sochaRound.all()
		.then(rounds => rounds.map(round => ({
			pubkey: round.publicKey,
			authority: round.account.authority,
			wallet: round.account.wallet,
			targetAmount: round.account.targetAmount.div(LAMPORTS_PER_SOL_BN).toNumber(),
			currentAmount: round.account.currentAmount.div(LAMPORTS_PER_SOL_BN).toNumber(),
			thumbnail: bufferToString(round.account.thumbnail),
			title: bufferToString(round.account.title),
			summary: bufferToString(round.account.summary),
			description: bufferToString(round.account.description),
			closed: round.account.state !== 0,
			roundIdx: round.account.roundIdx.toNumber(),
			timestampOpen: round.account.timestampOpen.toNumber(),
			timestampClose: round.account.timestampClose.toNumber(),
			timestampPlannedClose: round.account.timestampPlannedClose.toNumber(),
		})));
}

export function getAllDonations(connection: Connection, round: PublicKey): Promise<SochaDonation[]> {
	return sochaProgram(connection).account.sochaDonation.all([
		{
			memcmp: {
				offset: 8,
				bytes: round.toBase58(),
			}
		}
	]).then(donations => donations.map(donation => ({
		pubkey: donation.publicKey,
		round: donation.account.round,
		name: bufferToString(donation.account.name),
		message: bufferToString(donation.account.message),
		amount: donation.account.amount.div(LAMPORTS_PER_SOL_BN).toNumber(),
		timestamp: donation.account.timestamp.toNumber(),
	})));
}