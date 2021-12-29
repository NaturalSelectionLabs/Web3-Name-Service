# Web3 Name Service

> A compatible and inclusive name service for the web3 world

## Supported Protocols

- [RNS](https://ropsten.etherscan.io/address/0x63CfEB343975116Ec2fc27125609da236D066615): *.rss3
- [ENS](https://ens.domains): *.eth
- [DAS](https://da.systems): *.bit

In planning:

- [Mirror](https://mirror.xyz/): *.mirror
- [Twitter](https://twitter.com): *.twitter
- [Discord](https://discord.com/): *.discord

## Usage

`/name/:name`

Get information by RNS, DAS or ENS name

`/address/:address`

Get information by address

## Examples

Request by RNS name: https://rss3.domains/name/usagi.rss3

Request by ENS name: https://rss3.domains/name/usagii.eth

Request by DAS name: https://rss3.domains/name/usagii.bit

Request by address: https://rss3.domains/address/0xDA048BED40d40B1EBd9239Cdf56ca0c2F018ae65

Returned information:

```json
{
    "rnsName": "usagi.rss3",
    "ensName": "usagii.eth",
    "dasName": "usagii.bit",
    "address": "0xDA048BED40d40B1EBd9239Cdf56ca0c2F018ae65"
}
```

## Related Projects

- [RSS3](https://github.com/NaturalSelectionLabs/RSS3)
- [RSS3-Hub](https://github.com/NaturalSelectionLabs/RSS3-Hub)
- [Web3Pass](https://github.com/NaturalSelectionLabs/Web3Pass)
