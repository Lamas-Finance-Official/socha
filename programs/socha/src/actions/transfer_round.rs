use anchor_lang::prelude::*;

use crate::state::{SochaRound, PDA_ROUND_SEED};

#[derive(Accounts)]
pub struct TransferRound<'info> {
    #[account(address = round.load()?.authority)]
    authority: Signer<'info>,

    /// CHECK: account exists
    destination: AccountInfo<'info>,

    #[account(
		mut,
		seeds = [
			PDA_ROUND_SEED,
			&round.load()?.round_idx.to_be_bytes(),
		],
		bump = round.load()?.bump,
	)]
    round: AccountLoader<'info, SochaRound>,
}

impl TransferRound<'_> {
    pub fn execute(ctx: Context<Self>) -> anchor_lang::Result<()> {
        let round = &mut ctx.accounts.round.load_mut()?;

        round.authority = ctx.accounts.destination.key();
        Ok(())
    }
}
