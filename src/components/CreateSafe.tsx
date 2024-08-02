import React, { useState } from 'react';
import { createSafe } from '../gnosisSafe';

const CreateSafe: React.FC = () => {
    const [safeAddress, setSafeAddress] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleCreateSafe = async () => {
        try {
            const safeSdk = await createSafe();
            setSafeAddress(await safeSdk.getAddress());
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
