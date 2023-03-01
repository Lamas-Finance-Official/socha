use anchor_lang::prelude::*;

declare_id!("3ZkasC1HnKgGm2NvJn78PNGebxbd7soxrkpYTvjxmcvS");

mod actions;
mod error;
mod state;

use crate::actions::*;

#[program]
mod anchor_socha_program {
    use super::*;

    pub fn init(ctx: Context<Init>) -> anchor_lang::Result<()> {
        Init::execute(ctx)
    }

    pub fn create_round(
        ctx: Context<CreateRound>,
        params: CreateRoundParams,
    ) -> anchor_lang::Result<()> {
        CreateRound::execute(ctx, params)
    }

    pub fn update_round(
        ctx: Context<UpdateRound>,
        params: UpdateRoundParams,
    ) -> anchor_lang::Result<()> {
        UpdateRound::execute(ctx, params)
    }

    pub fn transfer_round(ctx: Context<TransferRound>) -> anchor_lang::Result<()> {
        TransferRound::execute(ctx)
    }

    pub fn close_round(ctx: Context<CloseRound>) -> anchor_lang::Result<()> {
        CloseRound::execute(ctx)
    }

    pub fn donate(ctx: Context<Donate>, params: DonateParams) -> anchor_lang::Result<()> {
        Donate::execute(ctx, params)
    }

    pub fn withdraw(ctx: Context<Withdraw>, params: WithdrawParams) -> anchor_lang::Result<()> {
        Withdraw::execute(ctx, params)
    }
}

fn write_str(buf: &mut [u8], str: &str) {
    buf[..str.as_bytes().len()].copy_from_slice(str.as_bytes());
}
