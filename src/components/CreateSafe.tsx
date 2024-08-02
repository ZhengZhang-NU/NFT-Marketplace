import React, { useState } from 'react';
import { createSafe } from '../gnosisSafe';

interface CreateSafeProps {
    onCreateSafe: (safeAddress: string) => void;
}

const CreateSafe: React.FC<CreateSafeProps> = ({ onCreateSafe }) => {
    const [safeAddress, setSafeAddress] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleCreateSafe = async () => {
        try {
            const safeSdk = await createSafe();
            const address = safeSdk.getAddress();
            setSafeAddress(address);
            onCreateSafe(address);
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div>
            <button onClick={handleCreateSafe}>Create Gnosis Safe</button>
            {safeAddress && <p>Gnosis Safe Address: {safeAddress}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default CreateSafe;
