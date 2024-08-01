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

export const NFTCollectionAddress = "0xD69a028D92A33ad0866113e1975Ce679C4C8621b"; // 使用新部署的合约地址
