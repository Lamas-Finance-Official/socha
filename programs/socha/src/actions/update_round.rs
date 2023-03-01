use anchor_lang::prelude::*;

use crate::{
    error::ErrorCode,
    state::{ProgramState, SochaRound, PDA_ROUND_SEED, PDA_STATE_SEED},
    write_str,
};

#[derive(Accounts)]
pub struct UpdateRound<'info> {
    /// CHECK: authority is checked using require! in execute().
    ///
    /// We do this because both admin and round owner can update's round metadata
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

#[derive(Debug, AnchorSerialize, AnchorDeserialize)]
pub struct UpdateRoundParams {
    target_amount: Option<u64>,
    timestamp_planned_close: Option<i64>,
    thumbnail: Option<String>,
    title: Option<String>,
    summary: Option<String>,
    description: Option<String>,
}

impl UpdateRound<'_> {
    pub fn execute(ctx: Context<Self>, params: UpdateRoundParams) -> anchor_lang::Result<()> {
        let round = &mut ctx.accounts.round.load_mut()?;

        require!(
            ctx.accounts.authority.key() == round.authority
                || ctx.accounts.authority.key() == ctx.accounts.program_state.authority,
            ErrorCode::InvalidAuthority
        );

        if let Some(target_amount) = params.target_amount {
            round.target_amount = target_amount;
        }

        if let Some(timestamp_planned_close) = params.timestamp_planned_close {
            round.timestamp_planned_close = timestamp_planned_close;
        }

        if let Some(thumbnail) = params.thumbnail {
            require!(
                thumbnail.as_bytes().len() < 256,
                ErrorCode::ThumbnailTooLarge
            );

            write_str(&mut round.thumbnail, &thumbnail);
        }

        if let Some(title) = params.title {
            require!(title.as_bytes().len() < 256, ErrorCode::TitleTooLarge);

            write_str(&mut round.title, &title);
        }

        if let Some(summary) = params.summary {
            require!(summary.as_bytes().len() < 512, ErrorCode::SummaryTooLarge);

            write_str(&mut round.summary, &summary);
        }

        if let Some(description) = params.description {
            require!(
                description.as_bytes().len() < 2048,
                ErrorCode::DescriptionTooLarge
            );

            write_str(&mut round.description, &description);
        }

        Ok(())
    }
}
