import { Connection, PublicKey } from '@solana/web3.js';
import { SignerWalletAdapterProps } from '@solana/wallet-adapter-base';
import { ASSOCIATED_TOKEN_PROGRAM_ID, createAssociatedTokenAccountInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID, getAccount, Account as TokenAccount } from '@solana/spl-token';
import { COMMITMENT, MINT } from './consts';
import { signAndSend } from './transaction';

export async function getOrCreateAssociatedTokenAccount({
	owner, payer, connection, signTransaction
}: {
	owner: PublicKey;
	payer: PublicKey;
	connection: Connection;
	signTransaction: SignerWalletAdapterProps['signTransaction'];
}) {
	const associatedToken = await getAssociatedTokenAddress(
		MINT,
		owner,
		false,
		TOKEN_PROGRAM_ID,
		ASSOCIATED_TOKEN_PROGRAM_ID,
	);

	let account: TokenAccount;
	try {
		account = await getAccount(
			connection,
			associatedToken,
			COMMITMENT,
		);
	} catch (error) {
		if (
			(error as Error).name === 'TokenAccountNotFoundError' ||
			(error as Error).name === 'TokenInvalidAccountOwnerError'
		) {
			try {
				const tx = await signAndSend({
					instruction: [
						createAssociatedTokenAccountInstruction(
							payer,
							associatedToken,
							owner,
							MINT
						),
					],
					connection,
					payer,
					signTransaction,
				});

				await connection.confirmTransaction(tx);
			} catch (error: unknown) {
				// Ignore all errors;
			}

			account = await getAccount(
				connection,
				associatedToken,
				COMMITMENT,
			);
		} else {
			throw error;
		}
	}

	if (!account.mint.equals(MINT))
		throw Error('TokenInvalidMintError');

	if (!account.owner.equals(owner))
		throw new Error('TokenInvalidOwnerError');

	return account;
}
