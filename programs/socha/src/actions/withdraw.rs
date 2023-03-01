use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

use crate::state::{SochaRound, PDA_ROUND_SEED, PDA_WALLET_SEED};

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(address = round.load()?.authority)]
    authority: Signer<'info>,

    #[account(mut, token::mint = round_wallet.mint)]
    destination_wallet: Account<'info, TokenAccount>,

    #[account(
		seeds = [
			PDA_ROUND_SEED,
			&round.load()?.round_idx.to_be_bytes(),
		],
		bump = round.load()?.bump,
	)]
    round: AccountLoader<'info, SochaRound>,
    #[account(
		mut,
		seeds = [
			PDA_WALLET_SEED,
			round.key().as_ref(),
		],
		bump = round.load()?.wallet_bump,
	)]
    round_wallet: Account<'info, TokenAccount>,

    token_program: Program<'info, Token>,
}

#[derive(Debug, AnchorSerialize, AnchorDeserialize)]
pub struct WithdrawParams {
    amount: u64,
}

impl Withdraw<'_> {
    pub fn execute(ctx: Context<Self>, params: WithdrawParams) -> anchor_lang::Result<()> {
        let round = ctx.accounts.round.load()?;

        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.round_wallet.to_account_info(),
                    to: ctx.accounts.destination_wallet.to_account_info(),
                    authority: ctx.accounts.round.to_account_info(),
                },
            )
            .with_signer(&[&[
                PDA_ROUND_SEED,
                &round.round_idx.to_be_bytes(),
                &[round.bump],
            ]]),
            params.amount,
        )?;

        Ok(())
    }
}
