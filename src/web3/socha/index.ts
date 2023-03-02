import BN from 'bn.js';
import { Program } from '@coral-xyz/anchor';
import { SignerWalletAdapterProps } from '@solana/wallet-adapter-base';
import { Connection, Keypair, PublicKey, SystemProgram, TransactionInstruction } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import type { AnchorSochaProgram } from '~/idl/anchor_socha_program';
import { SOCHA_PROGRAM_STATE, sochaProgram, sochaRoundWallet, sochaRound } from './program';
import { signAndSend } from '../transaction';
import { MINT } from '../consts';

export type SochaRound = Awaited<ReturnType<Program<AnchorSochaProgram>['account']['sochaRound']['fetch']>>;
export type SochaDonation = Awaited<ReturnType<Program<AnchorSochaProgram>['account']['sochaDonation']['fetch']>>;
export type SochaState = Awaited<ReturnType<Program<AnchorSochaProgram>['account']['programState']['fetch']>>;

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

	getRound(roundPubkey: PublicKey): Promise<SochaRound> {
		return this.program.account.sochaRound.fetch(roundPubkey);
	}

	getAllRounds(): Promise<(SochaRound & { pubkey: PublicKey })[]> {
		return this.program.account.sochaRound.all()
			.then(rounds => rounds.map(round => ({
				...round.account,
				pubkey: round.publicKey,
			})));
	}

	getAllDonations(round: PublicKey): Promise<(SochaDonation & { pubkey: PublicKey })[]> {
		return this.program.account.sochaDonation.all([
			{
				memcmp: {
					offset: 8,
					bytes: round.toBase58(),
				}
			}
		]).then(donations => donations.map(donation => ({
			...donation.account,
			pubkey: donation.publicKey,
		})));
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
		targetAmount: BN;
	}) {
		const state = await this._programState();
		const roundPubkey = sochaRound(state.roundCreated);

		const ix = await this.program.methods.createRound({
			title,
			summary,
			description,
			thumbnail,
			closeUnixTimestamp: new BN(closeUnixTimestamp),
			targetAmount,
		}).accounts({
			authority: this.owner,
			mint: MINT,
			programState: SOCHA_PROGRAM_STATE,
			round: roundPubkey,
			wallet: sochaRoundWallet(roundPubkey),
			systemProgram: SystemProgram.programId,
			tokenProgram: TOKEN_PROGRAM_ID,
		}).instruction();

		return this._signAndSend(ix);
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
		targetAmount?: BN | null;
	}) {
		const ix = await this.program.methods.updateRound({
			title,
			summary,
			description,
			thumbnail,
			targetAmount,
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
		amount: BN;
		name: string;
		message: string;
	}) {
		const ix = await this.program.methods.donate({
			amount,
			name,
			message,
		}).accounts({
			user: this.owner,
			userWallet: this.tokenAccount,
			donation: Keypair.generate().publicKey,
			round,
			roundWallet: sochaRoundWallet(round),
			systemProgram: SystemProgram.programId,
			tokenProgram: TOKEN_PROGRAM_ID,
		}).instruction();

		return this._signAndSend(ix);
	}

	async withdraw(round: PublicKey, dstWallet: PublicKey, amount: BN) {
		const ix = await this.program.methods
			.withdraw({
				amount,
			}).accounts({
				authority: this.owner,
				destinationWallet: dstWallet,
				round,
				roundWallet: sochaRoundWallet(round),
				tokenProgram: TOKEN_PROGRAM_ID,
			}).instruction();

		return this._signAndSend(ix);
	}

	private async _programState(): Promise<SochaState> {
		return await this.program.account.programState.fetch(SOCHA_PROGRAM_STATE);
	}

	private async _signAndSend(ix: TransactionInstruction): Promise<string> {
		try {
			const tx = await signAndSend({
				instruction: [ix],
				payer: this.owner,
				connection: this.connection,
				signTransaction: this.signTransaction,
			});

			await this.connection.getTransaction(tx, {
				commitment: 'confirmed',
				maxSupportedTransactionVersion: undefined,
			});

			return tx;
		} catch (err) {
			console.log(err, (err as any).logs);
			return '';
		}
	}
}