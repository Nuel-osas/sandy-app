import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useWallet } from '@mysten/wallet-adapter-react';
import { TransactionBlock } from '@mysten/sui.js';

const BasicQRScanner: React.FC = () => {
    const { signAndExecuteTransactionBlock } = useWallet();
    const [showScanner, setShowScanner] = useState(false);
    const [status, setStatus] = useState<string>('');

    const handleScan = async (result: any) => {
        if (!result) return;

        try {
            // Get the QR code data
            const scannedData = result.getText();
            setStatus('Processing QR code...');

            // Parse the transaction data
            const parsedData = JSON.parse(scannedData);
            const txBytes = Buffer.from(parsedData.txBytes, 'base64');
            
            // Create transaction block from bytes
            const transactionBlock = TransactionBlock.from(txBytes);

            // Sign and execute the transaction
            setStatus('Signing transaction...');
            const response = await signAndExecuteTransactionBlock({
                transactionBlock,
            });

            setStatus(`Transaction successful! Digest: ${response.digest}`);
            setShowScanner(false);

        } catch (error) {
            console.error('Error processing transaction:', error);
            setStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '20px auto' }}>
            <button 
                onClick={() => setShowScanner(!showScanner)}
                style={{
                    padding: '10px 20px',
                    margin: '10px 0',
                    cursor: 'pointer'
                }}
            >
                {showScanner ? 'Close Scanner' : 'Scan QR Code'}
            </button>

            {showScanner && (
                <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
                    <QrReader
                        onResult={handleScan}
                        constraints={{ facingMode: 'environment' }}
                        containerStyle={{ width: '100%' }}
                    />
                </div>
            )}

            {status && (
                <div style={{ 
                    margin: '10px 0',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                }}>
                    {status}
                </div>
            )}
        </div>
    );
};

export default BasicQRScanner; 