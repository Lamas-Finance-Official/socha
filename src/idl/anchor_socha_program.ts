export type AnchorSochaProgram = {
  "version": "0.1.0",
  "name": "anchor_socha_program",
  "instructions": [
    {
      "name": "init",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "programState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createRound",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "round",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "CreateRoundParams"
          }
        }
      ]
    },
    {
      "name": "updateRound",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true,
          "docs": [
            "",
            "We do this because both admin and round owner can update's round metadata"
          ]
        },
        {
          "name": "programState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "round",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "UpdateRoundParams"
          }
        }
      ]
    },
    {
      "name": "transferRound",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "destination",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "round",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "closeRound",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true,
          "docs": [
            "",
            "We do this because both admin and round owner can close a round."
          ]
        },
        {
          "name": "programState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "round",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "donate",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "donation",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "round",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "roundWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "DonateParams"
          }
        }
      ]
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "destinationWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "round",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "roundWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "WithdrawParams"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "programState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "roundCreated",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "sochaRound",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "wallet",
            "type": "publicKey"
          },
          {
            "name": "targetAmount",
            "type": "u64"
          },
          {
            "name": "currentAmount",
            "type": "u64"
          },
          {
            "name": "thumbnail",
            "type": {
              "array": [
                "u8",
                256
              ]
            }
          },
          {
            "name": "title",
            "type": {
              "array": [
                "u8",
                256
              ]
            }
          },
          {
            "name": "summary",
            "type": {
              "array": [
                "u8",
                512
              ]
            }
          },
          {
            "name": "description",
            "type": {
              "array": [
                "u8",
                2048
              ]
            }
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "walletBump",
            "type": "u8"
          },
          {
            "name": "state",
            "type": "u8"
          },
          {
            "name": "roundIdx",
            "type": "u64"
          },
          {
            "name": "timestampOpen",
            "type": "i64"
          },
          {
            "name": "timestampClose",
            "type": "i64"
          },
          {
            "name": "timestampPlannedClose",
            "type": "i64"
          },
          {
            "name": "buf",
            "docs": [
              "reserved"
            ],
            "type": {
              "array": [
                "u8",
                901
              ]
            }
          }
        ]
      }
    },
    {
      "name": "sochaDonation",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "round",
            "type": "publicKey"
          },
          {
            "name": "name",
            "type": {
              "array": [
                "u8",
                128
              ]
            }
          },
          {
            "name": "message",
            "type": {
              "array": [
                "u8",
                512
              ]
            }
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "buf",
            "docs": [
              "reserved"
            ],
            "type": {
              "array": [
                "u8",
                328
              ]
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "CreateRoundParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "targetAmount",
            "type": "u64"
          },
          {
            "name": "closeUnixTimestamp",
            "type": "i64"
          },
          {
            "name": "thumbnail",
            "type": "string"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "summary",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "DonateParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "message",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "UpdateRoundParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "targetAmount",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "timestampPlannedClose",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "thumbnail",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "title",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "summary",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "description",
            "type": {
              "option": "string"
            }
          }
        ]
      }
    },
    {
      "name": "WithdrawParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "RoundState",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Open"
          },
          {
            "name": "Closed"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidAuthority",
      "msg": "invalid authority, only round owner or admin authority required"
    },
    {
      "code": 6001,
      "name": "RoundNotOpen",
      "msg": "funding round is not currently open"
    },
    {
      "code": 6002,
      "name": "ThumbnailTooLarge",
      "msg": "thumbnail may only contains less than 256 characters"
    },
    {
      "code": 6003,
      "name": "TitleTooLarge",
      "msg": "title may only contains less than 256 characters"
    },
    {
      "code": 6004,
      "name": "SummaryTooLarge",
      "msg": "summary may only contains less than 512 characters"
    },
    {
      "code": 6005,
      "name": "DescriptionTooLarge",
      "msg": "description may only contains less than 2048 characters"
    },
    {
      "code": 6006,
      "name": "NameTooLarge",
      "msg": "name may only contains less than 128 characters"
    },
    {
      "code": 6007,
      "name": "MessageTooLarge",
      "msg": "message may only contains less than 512 characters"
    }
  ]
};

export const IDL: AnchorSochaProgram = {
  "version": "0.1.0",
  "name": "anchor_socha_program",
  "instructions": [
    {
      "name": "init",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "programState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createRound",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "round",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "CreateRoundParams"
          }
        }
      ]
    },
    {
      "name": "updateRound",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true,
          "docs": [
            "",
            "We do this because both admin and round owner can update's round metadata"
          ]
        },
        {
          "name": "programState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "round",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "UpdateRoundParams"
          }
        }
      ]
    },
    {
      "name": "transferRound",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "destination",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "round",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "closeRound",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true,
          "docs": [
            "",
            "We do this because both admin and round owner can close a round."
          ]
        },
        {
          "name": "programState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "round",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "donate",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "donation",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "round",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "roundWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "DonateParams"
          }
        }
      ]
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "destinationWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "round",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "roundWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "WithdrawParams"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "programState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "roundCreated",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "sochaRound",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "wallet",
            "type": "publicKey"
          },
          {
            "name": "targetAmount",
            "type": "u64"
          },
          {
            "name": "currentAmount",
            "type": "u64"
          },
          {
            "name": "thumbnail",
            "type": {
              "array": [
                "u8",
                256
              ]
            }
          },
          {
            "name": "title",
            "type": {
              "array": [
                "u8",
                256
              ]
            }
          },
          {
            "name": "summary",
            "type": {
              "array": [
                "u8",
                512
              ]
            }
          },
          {
            "name": "description",
            "type": {
              "array": [
                "u8",
                2048
              ]
            }
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "walletBump",
            "type": "u8"
          },
          {
            "name": "state",
            "type": "u8"
          },
          {
            "name": "roundIdx",
            "type": "u64"
          },
          {
            "name": "timestampOpen",
            "type": "i64"
          },
          {
            "name": "timestampClose",
            "type": "i64"
          },
          {
            "name": "timestampPlannedClose",
            "type": "i64"
          },
          {
            "name": "buf",
            "docs": [
              "reserved"
            ],
            "type": {
              "array": [
                "u8",
                901
              ]
            }
          }
        ]
      }
    },
    {
      "name": "sochaDonation",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "round",
            "type": "publicKey"
          },
          {
            "name": "name",
            "type": {
              "array": [
                "u8",
                128
              ]
            }
          },
          {
            "name": "message",
            "type": {
              "array": [
                "u8",
                512
              ]
            }
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "buf",
            "docs": [
              "reserved"
            ],
            "type": {
              "array": [
                "u8",
                328
              ]
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "CreateRoundParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "targetAmount",
            "type": "u64"
          },
          {
            "name": "closeUnixTimestamp",
            "type": "i64"
          },
          {
            "name": "thumbnail",
            "type": "string"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "summary",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "DonateParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "message",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "UpdateRoundParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "targetAmount",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "timestampPlannedClose",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "thumbnail",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "title",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "summary",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "description",
            "type": {
              "option": "string"
            }
          }
        ]
      }
    },
    {
      "name": "WithdrawParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "RoundState",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Open"
          },
          {
            "name": "Closed"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidAuthority",
      "msg": "invalid authority, only round owner or admin authority required"
    },
    {
      "code": 6001,
      "name": "RoundNotOpen",
      "msg": "funding round is not currently open"
    },
    {
      "code": 6002,
      "name": "ThumbnailTooLarge",
      "msg": "thumbnail may only contains less than 256 characters"
    },
    {
      "code": 6003,
      "name": "TitleTooLarge",
      "msg": "title may only contains less than 256 characters"
    },
    {
      "code": 6004,
      "name": "SummaryTooLarge",
      "msg": "summary may only contains less than 512 characters"
    },
    {
      "code": 6005,
      "name": "DescriptionTooLarge",
      "msg": "description may only contains less than 2048 characters"
    },
    {
      "code": 6006,
      "name": "NameTooLarge",
      "msg": "name may only contains less than 128 characters"
    },
    {
      "code": 6007,
      "name": "MessageTooLarge",
      "msg": "message may only contains less than 512 characters"
    }
  ]
};
