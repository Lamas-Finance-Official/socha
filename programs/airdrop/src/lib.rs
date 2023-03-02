use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer};

declare_id!("CuodM6g8ohjaF23VLkRSn395Az5hTQR6vVLzHt4rNiDx");

pub const PDA_AUTHORITY: &'static [u8] = b"pda-state";
pub const PDA_POOL: &'static [u8] = b"pda-pool";

#[program]
mod anchor_airdrop_program {
    use super::*;

    pub fn init(ctx: Context<Init>, amount: u64) -> anchor_lang::Result<()> {
        *ctx.accounts.program_state = ProgramState {
            owner: ctx.accounts.owner.key(),
            amount,
        };

        Ok(())
    }

    pub fn update(ctx: Context<Update>, amount: u64) -> anchor_lang::Result<()> {
        ctx.accounts.program_state.amount = amount;
        Ok(())
    }

    pub fn airdrop(ctx: Context<Airdrop>) -> anchor_lang::Result<()> {
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.pool.to_account_info(),
                    to: ctx.accounts.wallet.to_account_info(),
                    authority: ctx.accounts.program_state.to_account_info(),
                },
            )
            .with_signer(&[&[PDA_AUTHORITY, &[*ctx.bumps.get("program_state").unwrap()]]]),
            ctx.accounts.program_state.amount,
        )
    }
}

#[account]
pub struct ProgramState {
    pub owner: Pubkey,
    pub amount: u64,
}

#[derive(Accounts)]
pub struct Init<'info> {
    #[account(mut)]
    owner: Signer<'info>,

    #[account(
		init,
		payer = owner,
		space = 512,
		seeds = [ PDA_AUTHORITY ],
		bump,
	)]
    program_state: Account<'info, ProgramState>,

    #[account(
		init,
		payer = owner,
		seeds = [ PDA_POOL ],
		bump,
		token::mint = mint,
		token::authority = program_state,
	)]
    pool: Account<'info, TokenAccount>,

    mint: Account<'info, Mint>,

    system_program: Program<'info, System>,
    token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(address = program_state.owner)]
    owner: Signer<'info>,

    #[account(
		mut,
		seeds = [ PDA_AUTHORITY ],
		bump,
	)]
    program_state: Account<'info, ProgramState>,
}

#[derive(Accounts)]
pub struct Airdrop<'info> {
    signer: Signer<'info>,

    #[account(mut, token::mint = pool.mint)]
    wallet: Account<'info, TokenAccount>,

    #[account(
		seeds = [ PDA_AUTHORITY ],
		bump,
	)]
    program_state: Account<'info, ProgramState>,

    #[account(
		mut,
		seeds = [ PDA_POOL ],
		bump,
	)]
    pool: Account<'info, TokenAccount>,

    token_program: Program<'info, Token>,
}
