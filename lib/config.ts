import dotenv from 'dotenv';
dotenv.config();

export default {
    infuraId: [
        '76af1228cdf345d2bff6a9c0f35112e1',
        'cddf9c43e60e4fee9dd875f3f88f6c0a',
        'b2a1e1f49ce04af49b304cb281364053',
        'a34494c90ca24f30b003a41b5a4c7752',
        'bad1e9a0ade24a0da20859746c54ad32',
    ],
    redis: {
        url: process.env.REDIS_URL || 'redis://localhost:6379/',
        ensExat: 60 * 60, // 1 hour
    },
    rns: {
        test: true,
        suffix: '.pass3.me',
        contractNetworks: {
            ropsten: {
                resolver: '0x028A03A4E9Af3f5E078938c69b88740E81391A6a',
                token: '0x63CfEB343975116Ec2fc27125609da236D066615',
            },
            mainnet: {
                resolver: '0x0000000000000000000000000000000000000000',
                token: '0x0000000000000000000000000000000000000000',
            },
        },

        contract: {
            // rns contract abi
            resolver: [
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: true,
                            internalType: 'bytes32',
                            name: '_node',
                            type: 'bytes32',
                        },
                        {
                            indexed: false,
                            internalType: 'address',
                            name: '_addr',
                            type: 'address',
                        },
                    ],
                    name: 'AddrChanged',
                    type: 'event',
                },
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: true,
                            internalType: 'bytes32',
                            name: '_node',
                            type: 'bytes32',
                        },
                        {
                            indexed: false,
                            internalType: 'string',
                            name: '_name',
                            type: 'string',
                        },
                    ],
                    name: 'NameChanged',
                    type: 'event',
                },
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: true,
                            internalType: 'address',
                            name: 'previousOwner',
                            type: 'address',
                        },
                        {
                            indexed: true,
                            internalType: 'address',
                            name: 'newOwner',
                            type: 'address',
                        },
                    ],
                    name: 'OwnershipTransferred',
                    type: 'event',
                },
                {
                    inputs: [
                        {
                            internalType: 'bytes32',
                            name: '_node',
                            type: 'bytes32',
                        },
                    ],
                    name: 'addr',
                    outputs: [
                        {
                            internalType: 'address',
                            name: '',
                            type: 'address',
                        },
                    ],
                    stateMutability: 'view',
                    type: 'function',
                },
                {
                    inputs: [
                        {
                            internalType: 'bytes32',
                            name: '_node',
                            type: 'bytes32',
                        },
                    ],
                    name: 'name',
                    outputs: [
                        {
                            internalType: 'string',
                            name: '',
                            type: 'string',
                        },
                    ],
                    stateMutability: 'view',
                    type: 'function',
                },
                {
                    inputs: [],
                    name: 'owner',
                    outputs: [
                        {
                            internalType: 'address',
                            name: '',
                            type: 'address',
                        },
                    ],
                    stateMutability: 'view',
                    type: 'function',
                },
                {
                    inputs: [],
                    name: 'renounceOwnership',
                    outputs: [],
                    stateMutability: 'nonpayable',
                    type: 'function',
                },
                {
                    inputs: [
                        {
                            internalType: 'bytes32',
                            name: '_node',
                            type: 'bytes32',
                        },
                        {
                            internalType: 'address',
                            name: '_addr',
                            type: 'address',
                        },
                    ],
                    name: 'setAddr',
                    outputs: [],
                    stateMutability: 'nonpayable',
                    type: 'function',
                },
                {
                    inputs: [
                        {
                            internalType: 'bytes32',
                            name: '_node',
                            type: 'bytes32',
                        },
                        {
                            internalType: 'string',
                            name: '_name',
                            type: 'string',
                        },
                    ],
                    name: 'setName',
                    outputs: [],
                    stateMutability: 'nonpayable',
                    type: 'function',
                },
                {
                    inputs: [
                        {
                            internalType: 'bytes4',
                            name: '_interfaceId',
                            type: 'bytes4',
                        },
                    ],
                    name: 'supportsInterface',
                    outputs: [
                        {
                            internalType: 'bool',
                            name: '',
                            type: 'bool',
                        },
                    ],
                    stateMutability: 'view',
                    type: 'function',
                },
                {
                    inputs: [
                        {
                            internalType: 'address',
                            name: 'newOwner',
                            type: 'address',
                        },
                    ],
                    name: 'transferOwnership',
                    outputs: [],
                    stateMutability: 'nonpayable',
                    type: 'function',
                },
            ],
        },
    },
};
