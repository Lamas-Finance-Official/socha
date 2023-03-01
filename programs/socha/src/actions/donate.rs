use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

use crate::{
    error::ErrorCode,
    state::{RoundState, SochaDonation, SochaRound, PDA_ROUND_SEED, PDA_WALLET_SEED},
    write_str,
};

#[derive(Accounts)]
pub struct Donate<'info> {
    #[account(mut)]
    user: Signer<'info>,
    #[account(
		mut,
		token::mint = round_wallet.mint,
		token::authority = user.key(),
	)]
    user_wallet: Account<'info, TokenAccount>,

    #[account(
		init,
		payer = user,
		space = SochaDonation::SPACE,
	)]
    donation: AccountLoader<'info, SochaDonation>,

    #[account(
		mut,
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

    system_program: Program<'info, System>,
    token_program: Program<'info, Token>,
}

#[derive(Debug, AnchorSerialize, AnchorDeserialize)]
pub struct DonateParams {
    amount: u64,
    name: String,
    message: String,
}

impl Donate<'_> {
    pub fn execute(ctx: Context<Self>, params: DonateParams) -> anchor_lang::Result<()> {
        let round = &mut ctx.accounts.round.load_mut()?;

        require!(
            round.state == RoundState::Open as u8,
            ErrorCode::RoundNotOpen
        );
        require!(params.name.as_bytes().len() < 128, ErrorCode::NameTooLarge);
        require!(
            params.message.as_bytes().len() < 512,
            ErrorCode::MessageTooLarge
        );

        let donation = &mut ctx.accounts.donation.load_init()?;
        donation.round = ctx.accounts.round.key();
        donation.amount = params.amount;
        donation.timestamp = Clock::get()?.unix_timestamp;
        write_str(&mut donation.name, &params.name);
        write_str(&mut donation.message, &params.message);

        round.current_amount += params.amount;
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.user_wallet.to_account_info(),
                    to: ctx.accounts.round_wallet.to_account_info(),
                    authority: ctx.accounts.user.to_account_info(),
                },
            ),
            params.amount,
        )?;

        Ok(())
    }
}
