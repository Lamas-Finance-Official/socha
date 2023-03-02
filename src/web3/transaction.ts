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
	const blockHash = await connection.getRecentBlockhash();
	const transaction = new Transaction().add(...instruction);

	transaction.feePayer = payer;
	transaction.recentBlockhash = blockHash.blockhash;

	if (extraSigners && extraSigners.length > 0) {
	  transaction.sign(...extraSigners);
	}

	const signed = await signTransaction(transaction);
	return await connection.sendRawTransaction(signed.serialize());
};
