use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, Token, TokenAccount};

use crate::{
    error::ErrorCode,
    state::{
        ProgramState, RoundState, SochaRound, PDA_ROUND_SEED, PDA_STATE_SEED, PDA_WALLET_SEED,
    },
    write_str,
};

#[derive(Accounts)]
pub struct CreateRound<'info> {
    #[account(mut)]
    authority: Signer<'info>,

    #[account(mut, seeds = [ PDA_STATE_SEED ], bump)]
    program_state: Account<'info, ProgramState>,

    #[account(
		init,
		payer = authority,
		space = SochaRound::SPACE,
		seeds = [
			PDA_ROUND_SEED,
			&program_state.round_created.to_be_bytes(),
		],
		bump,
	)]
    round: AccountLoader<'info, SochaRound>,

    #[account(
		init,
		payer = authority,
		seeds = [
			PDA_WALLET_SEED,
			round.key().as_ref(),
		],
		bump,
		token::mint = mint,
		token::authority = round
	)]
    wallet: Account<'info, TokenAccount>,

    #[account(address = program_state.mint)]
    mint: Account<'info, Mint>,

    system_program: Program<'info, System>,
    token_program: Program<'info, Token>,
}

#[derive(Debug, AnchorSerialize, AnchorDeserialize)]
pub struct CreateRoundParams {
    target_amount: u64,
    close_unix_timestamp: i64,
    thumbnail: String,
    title: String,
    summary: String,
    description: String,
}

impl CreateRound<'_> {
    pub fn execute(ctx: Context<Self>, params: CreateRoundParams) -> anchor_lang::Result<()> {
        require!(
            params.thumbnail.as_bytes().len() < 256,
            ErrorCode::ThumbnailTooLarge
        );
        require!(
            params.title.as_bytes().len() < 256,
            ErrorCode::TitleTooLarge
        );
        require!(
            params.summary.as_bytes().len() < 512,
            ErrorCode::SummaryTooLarge
        );
        require!(
            params.description.as_bytes().len() < 2048,
            ErrorCode::DescriptionTooLarge
        );

        let round = &mut ctx.accounts.round.load_init()?;
        round.authority = ctx.accounts.authority.key();
        round.wallet = ctx.accounts.wallet.key();
        round.target_amount = params.target_amount;
        round.current_amount = 0;

        round.bump = *ctx.bumps.get("round").unwrap();
        round.wallet_bump = *ctx.bumps.get("wallet").unwrap();

        round.state = RoundState::Open as u8;
        round.round_idx = ctx.accounts.program_state.round_created;
        round.timestamp_open = Clock::get()?.unix_timestamp;
        round.timestamp_planned_close = params.close_unix_timestamp;

        write_str(&mut round.thumbnail, &params.thumbnail);
        write_str(&mut round.title, &params.title);
        write_str(&mut round.summary, &params.summary);
        write_str(&mut round.description, &params.description);

        ctx.accounts.program_state.round_created += 1;

        Ok(())
    }
}
