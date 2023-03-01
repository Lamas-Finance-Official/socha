use anchor_lang::prelude::*;

use crate::{
    error::ErrorCode,
    state::{ProgramState, RoundState, SochaRound, PDA_ROUND_SEED, PDA_STATE_SEED},
};

#[derive(Accounts)]
pub struct CloseRound<'info> {
    /// CHECK: authority is checked using require! in execute().
    ///
    /// We do this because both admin and round owner can close a round.
    authority: Signer<'info>,

    #[account(seeds = [ PDA_STATE_SEED ], bump)]
    program_state: Account<'info, ProgramState>,

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

impl CloseRound<'_> {
    pub fn execute(ctx: Context<Self>) -> anchor_lang::Result<()> {
        let round = &mut ctx.accounts.round.load_mut()?;

        require!(
            ctx.accounts.authority.key() == round.authority
                || ctx.accounts.authority.key() == ctx.accounts.program_state.authority,
            ErrorCode::InvalidAuthority
        );

        round.state = RoundState::Closed as u8;
        round.timestamp_close = Clock::get()?.unix_timestamp;

        Ok(())
    }
}
