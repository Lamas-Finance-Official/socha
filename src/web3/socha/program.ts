import BN from 'bn.js';
import { Program, utils } from '@coral-xyz/anchor';
import { Connection, PublicKey } from '@solana/web3.js';
import { AnchorSochaProgram, IDL } from '~/idl/anchor_socha_program';
import { SOCHA_PROGRAM_ID } from '../consts';

let __cachedSochaProgram: Program<AnchorSochaProgram> | undefined;

export const sochaProgram = (connection: Connection) => {
	if (!__cachedSochaProgram) {
		__cachedSochaProgram = new Program(
			IDL,
			SOCHA_PROGRAM_ID,
			{ connection },
		);
	}

	return __cachedSochaProgram;
}

export const SOCHA_PROGRAM_STATE = utils.publicKey.findProgramAddressSync(
	[Buffer.from('program-state')],
	SOCHA_PROGRAM_ID,
)[0];

export const sochaRound = (round: BN) =>
	utils.publicKey.findProgramAddressSync(
		[
			Buffer.from('socha-round'),
			round.toArrayLike(Buffer, 'be', 8),
		],
		SOCHA_PROGRAM_ID,
	)[0];

export const sochaRoundWallet = (round: PublicKey): PublicKey =>
	utils.publicKey.findProgramAddressSync(
		[
			Buffer.from('socha-wallet'),
			round.toBuffer(),
		],
		SOCHA_PROGRAM_ID,
	)[0];
