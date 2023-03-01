use anchor_lang::prelude::*;
use anchor_spl::token::Mint;

use crate::state::{ProgramState, PDA_STATE_SEED};

#[derive(Accounts)]
pub struct Init<'info> {
    #[account(mut)]
    authority: Signer<'info>,

    mint: Account<'info, Mint>,

    #[account(
		init,
		payer = authority,
		space = ProgramState::SPACE,
		seeds = [ PDA_STATE_SEED ],
		bump
	)]
    program_state: Account<'info, ProgramState>,

    system_program: Program<'info, System>,
}

impl Init<'_> {
    pub fn execute(ctx: Context<Self>) -> anchor_lang::Result<()> {
        *ctx.accounts.program_state = ProgramState {
            authority: ctx.accounts.authority.key(),
            mint: ctx.accounts.mint.key(),
            round_created: 0,
        };

        Ok(())
    }
}
