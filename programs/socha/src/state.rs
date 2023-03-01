use anchor_lang::prelude::*;
use static_assertions::const_assert;

pub const PDA_STATE_SEED: &'static [u8] = b"program-state";
pub const PDA_ROUND_SEED: &'static [u8] = b"socha-round";
pub const PDA_WALLET_SEED: &'static [u8] = b"socha-wallet";

#[repr(u8)]
pub enum RoundState {
    Open = 0,
    Closed = 1,
}

#[account]
pub struct ProgramState {
    pub authority: Pubkey,
    pub mint: Pubkey,
    pub round_created: u64,
}

impl ProgramState {
    pub const SPACE: usize = 8 + // Discriminator
		32 + // authority pubkey
		32 + // mint pubkey
		8 + // round_created
		944; // reserved
}

#[account(zero_copy)]
#[repr(packed)]
pub struct SochaRound {
    pub authority: Pubkey,
    pub wallet: Pubkey,

    pub target_amount: u64,
    pub current_amount: u64,

    pub thumbnail: [u8; 256],
    pub title: [u8; 256],
    pub summary: [u8; 512],
    pub description: [u8; 2048],

    pub bump: u8,
    pub wallet_bump: u8,

    pub state: u8,
    pub round_idx: u64,
    pub timestamp_open: i64,
    pub timestamp_close: i64,
    pub timestamp_planned_close: i64,

    /// reserved
    _buf: [u8; 901],
}

const_assert!(std::mem::size_of::<SochaRound>() + 8 == SochaRound::SPACE);

impl SochaRound {
    pub const SPACE: usize = 4096;
}

#[account(zero_copy)]
#[repr(packed)]
pub struct SochaDonation {
    pub round: Pubkey,
    pub name: [u8; 128],
    pub message: [u8; 512],
    pub amount: u64,
    pub timestamp: i64,

    /// reserved
    _buf: [u8; 328],
}

const_assert!(std::mem::size_of::<SochaDonation>() + 8 == SochaDonation::SPACE);

impl SochaDonation {
    pub const SPACE: usize = 1024;
}
