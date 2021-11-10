<p align="center">
<img src="https://rss3.mypinata.cloud/ipfs/QmUG6H3Z7D5P511shn7sB4CPmpjH5uZWu4m5mWX7U3Gqbu" alt="RSS3" width="300">
</p>
<h1 align="center">RSS3 Name Service</h1>

> A compatible and inclusive name service

## Supported Protocols

- [RNS](https://ropsten.etherscan.io/address/0x63CfEB343975116Ec2fc27125609da236D066615): *.rss3
- [ENS](https://ens.domains): *.eth

## Usage

`/name/:name`

Get information by RNS or ENS name

`/address/:address`

Get information by address

## Examples

Request by RNS name: https://rss3.domains/name/usagi.rss3

Request by ENS name: https://rss3.domains/name/usagii.eth

Request by address: https://rss3.domains/address/0xDA048BED40d40B1EBd9239Cdf56ca0c2F018ae65

Returned information:

```json
{
    "rnsName": "usagi.rss3",
    "ensName": "usagii.eth",
    "address": "0xDA048BED40d40B1EBd9239Cdf56ca0c2F018ae65"
}
```

## Related Projects

- [RSS3](https://github.com/NaturalSelectionLabs/RSS3)
- [RSS3-Hub](https://github.com/NaturalSelectionLabs/RSS3-Hub)
- [Web3Pass](https://github.com/NaturalSelectionLabs/Web3Pass)