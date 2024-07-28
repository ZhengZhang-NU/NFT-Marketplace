import { createConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { sepolia } from 'wagmi/chains';
import { InjectedConnector } from '@wagmi/core/connectors/injected';

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [sepolia],
    [publicProvider()]
);

export const config = createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
    connectors: [
        new InjectedConnector({
            chains: [sepolia],
            options: { shimDisconnect: true },
        }),
    ],
});

export const NFTCollectionAddress = "0xdA107EE3f95BeB22B973BCAdbcfF2bDE5d91b06b";
