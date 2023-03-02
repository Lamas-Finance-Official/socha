import { Program, utils } from '@coral-xyz/anchor';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { SignerWalletAdapterProps } from '@solana/wallet-adapter-base';
import { Connection, PublicKey } from '@solana/web3.js';
import { AnchorAirdropProgram, IDL } from '~/idl/anchor_airdrop_program';
import { AIRDROP_PROGRAM_ID } from './consts';
import { signAndSend } from './transaction';

let __cachedAirdropProgram: Program<AnchorAirdropProgram> | undefined;

const airdropProgram = (connection: Connection) => {
	if (!__cachedAirdropProgram) {
		__cachedAirdropProgram = new Program(
			IDL,
			AIRDROP_PROGRAM_ID,
			{ connection },
		);
	}

	return __cachedAirdropProgram;
}

const [AIRDROP_PROGRAM_STATE, _] = utils.publicKey.findProgramAddressSync(
	[Buffer.from('pda-state')],
	AIRDROP_PROGRAM_ID,
);

const [AIRDROP_POOL, __] = utils.publicKey.findProgramAddressSync(
	[Buffer.from('pda-pool')],
	AIRDROP_PROGRAM_ID,
);

console.log(AIRDROP_POOL.toBase58());

export async function requestAirdrop({
	owner, tokenAccount, connection, signTransaction
}: {
	owner: PublicKey,
	tokenAccount: PublicKey,
	connection: Connection,
	signTransaction: SignerWalletAdapterProps['signTransaction'],
}) {
	const program = airdropProgram(connection);

	const ix = await program.methods
		.airdrop()
		.accounts({
			signer: owner,
			wallet: tokenAccount,
			pool: AIRDROP_POOL,
			programState: AIRDROP_PROGRAM_STATE,
			tokenProgram: TOKEN_PROGRAM_ID,
		})
		.instruction();

	const tx = await signAndSend({
		instruction: [ix],
		connection,
		payer: owner,
		signTransaction
	});

	await connection.getTransaction(tx, {
		commitment: 'finalized',
		maxSupportedTransactionVersion: undefined
	});
}
