export type AnchorAirdropProgram = {
	"version": "0.1.0",
	"name": "anchor_airdrop_program",
	"instructions": [
	  {
		"name": "init",
		"accounts": [
		  {
			"name": "owner",
			"isMut": true,
			"isSigner": true
		  },
		  {
			"name": "programState",
			"isMut": true,
			"isSigner": false
		  },
		  {
			"name": "pool",
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
			"name": "amount",
			"type": "u64"
		  }
		]
	  },
	  {
		"name": "update",
		"accounts": [
		  {
			"name": "owner",
			"isMut": false,
			"isSigner": true
		  },
		  {
			"name": "programState",
			"isMut": true,
			"isSigner": false
		  }
		],
		"args": [
		  {
			"name": "amount",
			"type": "u64"
		  }
		]
	  },
	  {
		"name": "airdrop",
		"accounts": [
		  {
			"name": "signer",
			"isMut": false,
			"isSigner": true
		  },
		  {
			"name": "wallet",
			"isMut": true,
			"isSigner": false
		  },
		  {
			"name": "programState",
			"isMut": false,
			"isSigner": false
		  },
		  {
			"name": "pool",
			"isMut": true,
			"isSigner": false
		  },
		  {
			"name": "tokenProgram",
			"isMut": false,
			"isSigner": false
		  }
		],
		"args": []
	  }
	],
	"accounts": [
	  {
		"name": "programState",
		"type": {
		  "kind": "struct",
		  "fields": [
			{
			  "name": "owner",
			  "type": "publicKey"
			},
			{
			  "name": "amount",
			  "type": "u64"
			}
		  ]
		}
	  }
	]
  };

  export const IDL: AnchorAirdropProgram = {
	"version": "0.1.0",
	"name": "anchor_airdrop_program",
	"instructions": [
	  {
		"name": "init",
		"accounts": [
		  {
			"name": "owner",
			"isMut": true,
			"isSigner": true
		  },
		  {
			"name": "programState",
			"isMut": true,
			"isSigner": false
		  },
		  {
			"name": "pool",
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
			"name": "amount",
			"type": "u64"
		  }
		]
	  },
	  {
		"name": "update",
		"accounts": [
		  {
			"name": "owner",
			"isMut": false,
			"isSigner": true
		  },
		  {
			"name": "programState",
			"isMut": true,
			"isSigner": false
		  }
		],
		"args": [
		  {
			"name": "amount",
			"type": "u64"
		  }
		]
	  },
	  {
		"name": "airdrop",
		"accounts": [
		  {
			"name": "signer",
			"isMut": false,
			"isSigner": true
		  },
		  {
			"name": "wallet",
			"isMut": true,
			"isSigner": false
		  },
		  {
			"name": "programState",
			"isMut": false,
			"isSigner": false
		  },
		  {
			"name": "pool",
			"isMut": true,
			"isSigner": false
		  },
		  {
			"name": "tokenProgram",
			"isMut": false,
			"isSigner": false
		  }
		],
		"args": []
	  }
	],
	"accounts": [
	  {
		"name": "programState",
		"type": {
		  "kind": "struct",
		  "fields": [
			{
			  "name": "owner",
			  "type": "publicKey"
			},
			{
			  "name": "amount",
			  "type": "u64"
			}
		  ]
		}
	  }
	]
  };
