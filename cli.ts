import * as anchor from '@coral-xyz/anchor';
import { AnchorProvider, BN } from '@coral-xyz/anchor';
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import { TOKEN_PROGRAM_ID } from '@coral-xyz/anchor/dist/cjs/utils/token';
import { clusterApiUrl, Keypair, LAMPORTS_PER_SOL, SystemProgram } from '@solana/web3.js';
import { AnchorAirdropProgram, IDL as AirdropIDL } from './src/idl/anchor_airdrop_program';
import { AnchorSochaProgram, IDL as SochaIDL } from './src/idl/anchor_socha_program';

const COMMITMENT = 'confirmed';
const AIRDROP_PROGRAM_ID = 'CuodM6g8ohjaF23VLkRSn395Az5hTQR6vVLzHt4rNiDx';
const SOCHA_PROGRAM_ID = '3ZkasC1HnKgGm2NvJn78PNGebxbd7soxrkpYTvjxmcvS';
const MINT = 'F1deHv5NLeucg6GPkx2m3zJakFRXVX1CmBQ5PaZwHQiH';
const URL = clusterApiUrl('devnet');

const OWNER_KEYPAIR = Keypair.fromSecretKey(new Uint8Array(require('./keys/owner.json')));

(async () => {
	const provider = new AnchorProvider(
		new anchor.web3.Connection(URL, { commitment: COMMITMENT }),
		new NodeWallet(OWNER_KEYPAIR),
		{ commitment: COMMITMENT }
	);
	anchor.setProvider(provider);

	const airdropProgram: anchor.Program<AnchorAirdropProgram> = new anchor.Program(
		AirdropIDL,
		AIRDROP_PROGRAM_ID,
		provider,
		new anchor.BorshCoder(AirdropIDL),
	);

	const sochaProgram: anchor.Program<AnchorSochaProgram> = new anchor.Program(
		SochaIDL,
		SOCHA_PROGRAM_ID,
		provider,
		new anchor.BorshCoder(SochaIDL),
	);

	const [sochaProgramState, ___] = anchor.utils.publicKey.findProgramAddressSync(
		[Buffer.from('program-state')],
		sochaProgram.programId,
	);

	let tx: string | undefined;
	switch (process.argv[2]) {
		case 'airdrop-init': {
			const [airdropProgramState, _] = anchor.utils.publicKey.findProgramAddressSync(
				[Buffer.from('pda-state')],
				airdropProgram.programId,
			);

			const [airdropPool, __] = anchor.utils.publicKey.findProgramAddressSync(
				[Buffer.from('pda-pool')],
				airdropProgram.programId,
			);

			tx = await airdropProgram.methods.init(new BN(10 * LAMPORTS_PER_SOL)).accounts({
				owner: OWNER_KEYPAIR.publicKey,
				programState: airdropProgramState,
				pool: airdropPool,
				mint: MINT,
				systemProgram: SystemProgram.programId,
				tokenProgram: TOKEN_PROGRAM_ID,
			}).signers([OWNER_KEYPAIR]).rpc();

			break;
		}
		case 'init': {
			tx = await sochaProgram.methods.init().accounts({
				authority: OWNER_KEYPAIR.publicKey,
				mint: MINT,
				programState: sochaProgramState,
				systemProgram: SystemProgram.programId,
			}).signers([OWNER_KEYPAIR]).rpc();

			break;
		}

	}

	if (tx) {
		const trans = await provider.connection.getTransaction(tx);
		console.log('logMessages:\n', trans?.meta?.logMessages);
	}
})();
