use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("invalid authority, only round owner or admin authority required")]
    InvalidAuthority,
    #[msg("funding round is not currently open")]
    RoundNotOpen,
    #[msg("thumbnail may only contains less than 256 characters")]
    ThumbnailTooLarge,
    #[msg("title may only contains less than 256 characters")]
    TitleTooLarge,
    #[msg("summary may only contains less than 512 characters")]
    SummaryTooLarge,
    #[msg("description may only contains less than 2048 characters")]
    DescriptionTooLarge,
    #[msg("name may only contains less than 128 characters")]
    NameTooLarge,
    #[msg("message may only contains less than 512 characters")]
    MessageTooLarge,
}
