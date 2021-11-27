# OpenQ

My Ethereum Account: `0x46e09468616365256F11F4544e65cE0C70ee624b`

Project URL: https://www.development.openq.dev <i>(NOTE: Bounties may take a few seconds to load all data)</i>

Demo Recording: https://drive.google.com/file/d/1o3oVuSEDJpgfqGTN-odQo8uUAEMBXjc3/view

## Getting Started

### Install Dependencies

`cd OpenQ-Contracts && yarn`
`cd OpenQ-Frontend && yarn`
`cd OpenQ-Github-OAuth-Server && yarn`
`cd OpenQ-Oracle && yarn`

### Get a GitHub Personal Access Token (PAT)

Add your Github Personal Access Token (PAT) to the `.env` file in `OpenQ-Frontend`.

You can get a PAT [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).

Necessary Scopes:
`admin:org`
`repo`
`user`

### Add WALLET_KEY to contracts and Oracle

This wallet key must be the owner that deployed the OpenQ contract since the oracle is privileged.

### Booting each Microservice

