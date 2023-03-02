import { SignerWalletAdapterProps } from '@solana/wallet-adapter-base';
import { Connection, Keypair, PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js';

export async function signAndSend({
	instruction,
	connection,
	payer,
	signTransaction,
	extraSigners
}: {
	instruction: TransactionInstruction[];
	connection: Connection;
	payer: PublicKey;
	signTransaction: SignerWalletAdapterProps['signTransaction'];
	extraSigners?: Keypair[];
}): Promise<string> {
	const transaction = new Transaction().add(...instruction);

	const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
	transaction.feePayer = payer;
	transaction.recentBlockhash = blockhash;

	if (extraSigners && extraSigners.length > 0) {
		transaction.sign(...extraSigners);
	}

	const signed = await signTransaction(transaction);
	const signature = await connection.sendRawTransaction(signed.serialize());

	await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });
	return signature;
};
