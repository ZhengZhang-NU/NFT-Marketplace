interface Window {
    ethereum?: {
        isMetaMask?: true;
        request?: (...args: any[]) => Promise<void>;
    };
}
interface ImportMetaEnv {
    readonly VITE_ALCHEMY_API_KEY: string;
    readonly VITE_PRIVATE_KEY: string;
    readonly VITE_PINATA_API_KEY: string;
    readonly VITE_PINATA_API_SECRET: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}