import { useState } from 'react';
import { motion } from 'framer-motion';
import usePointsStore from '../store/firebasePointsStore';
import PropTypes from 'prop-types';

const WalletConnect = ({ onClose }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [error, setError] = useState('');
  const updateWallet = usePointsStore(state => state.updateWallet);

  const validateWalletAddress = (address) => {
    // Basic SUI address validation - should start with "0x" and be 64 chars long
    return /^0x[a-fA-F0-9]{64}$/.test(address);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateWalletAddress(walletAddress)) {
      setError('Please enter a valid SUI wallet address');
      return;
    }

    try {
      await updateWallet(walletAddress);
      onClose();
    } catch (error) {
      setError('Failed to save wallet address');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
    >
      <div className="bg-game-bg rounded-2xl p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4">Save SUI Wallet</h2>
        <div className="mb-4">
          <p className="text-sm text-game-text-secondary">
            Enter your SUI wallet address to receive rewards later
          </p>
          <div className="mt-2 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
            <p className="text-sm text-yellow-500 font-medium">⚠️ Important</p>
            <p className="text-xs text-yellow-500/90 mt-1">
              You can only set your wallet address once. Make sure to enter the correct address as it cannot be changed later.
            </p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              SUI Wallet Address
            </label>
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="0x..."
              className="w-full px-4 py-2 rounded-lg bg-game-panel border border-game-border focus:outline-none focus:border-game-primary"
            />
            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-game-panel hover:bg-game-panel/80"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-game-primary text-white hover:bg-game-primary/80"
            >
              Save Address
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

WalletConnect.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default WalletConnect;
