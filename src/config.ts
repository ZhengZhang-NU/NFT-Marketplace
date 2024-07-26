import { createConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { mainnet, sepolia } from 'wagmi/chains';

const alchemyApiKey = import.meta.env.VITE_ALCHEMY_API_KEY || '';

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [mainnet, sepolia],
    [publicProvider(), alchemyProvider({ apiKey: alchemyApiKey })]
);

export const config = createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
});

export const NFTCollectionAddress = "0xdA107EE3f95BeB22B973BCAdbcfF2bDE5d91b06b"; // 新的合约地址
