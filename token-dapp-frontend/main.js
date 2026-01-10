// main.js
import { TokenInteractor } from './blockchain.js';

// const contractAddress = '0xdA3Bb7dBfA1ce150f4ea31f08934317e7583A4c7';
const contractAddress = '0x025bd04356BaD10Ce3AE368767c767197e5eeCdc';
const abi = [
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function decimals() view returns (uint8)',
    'function totalSupply() view returns (uint256)',
    'function balanceOf(address) view returns (uint256)',
    'function transfer(address to, uint256 amount) returns (bool)',
    'function mint(address to, uint256 amount)',
    'function getBalance() view returns (uint256)',
    'event Transfer(address indexed from, address indexed to, uint256 value)'
];

const interactor = new TokenInteractor(contractAddress, abi);

document.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connectWallet');
    const walletStatus = document.getElementById('walletStatus');
    const balanceSection = document.getElementById('balanceSection');
    const transferSection = document.getElementById('transferSection');
    const balanceDisplay = document.getElementById('balance');
    const toAddressInput = document.getElementById('toAddress');
    const amountInput = document.getElementById('amount');
    const estimateGasButton = document.getElementById('estimateGas');
    const gasEstimateDisplay = document.getElementById('gasEstimate');
    const transferButton = document.getElementById('transfer');
    const transferStatus = document.getElementById('transferStatus');

    async function updateBalance() {
        try {
            const balance = await interactor.getBalance();
            balanceDisplay.textContent = `${balance} MTK`;
        } catch (error) {
            console.error('Error updating balance:', error);
            balanceDisplay.textContent = 'Error loading balance';
        }
    }

    connectButton.addEventListener('click', async () => {
        try {
            const address = await interactor.connectWallet();
            walletStatus.textContent = `Connected: ${address}`;
            balanceSection.classList.remove('hidden');
            transferSection.classList.remove('hidden');
            await updateBalance();
            interactor.listenToTransfers(updateBalance);
        } catch (error) {
            walletStatus.textContent = `Connection failed: ${error.message}`;
        }
    });

    estimateGasButton.addEventListener('click', async () => {
        const to = toAddressInput.value;
        const amount = amountInput.value;
        if (!to || !amount) {
            gasEstimateDisplay.textContent = 'Gas Estimate: Enter to and amount';
            return;
        }
        try {
            const successEstimate = await interactor.estimateGasForTransfer(to, amount);
            const failureEstimate = await interactor.estimateGasForFailingTransfer();
            let message = `Success Gas: ${successEstimate.gas || 'N/A'}`;
            message += `\nFailure Gas (simulated): ${failureEstimate.gas || 'N/A'}`;
            if (!successEstimate.success) {
                message += `\nError: ${successEstimate.error}`;
            }
            gasEstimateDisplay.textContent = `Gas Estimate: ${message}`;
        } catch (error) {
            gasEstimateDisplay.textContent = `Gas Estimate Error: ${error.message}`;
        }
    });

    transferButton.addEventListener('click', async () => {
        const to = toAddressInput.value;
        const amount = amountInput.value;
        if (!to || !amount) {
            transferStatus.textContent = 'Enter to and amount';
            return;
        }
        transferStatus.textContent = 'Processing...';
        try {
            const tx = await interactor.transfer(to, amount);
            transferStatus.textContent = `Transfer successful: Tx ${tx.hash}`;
            await updateBalance();
        } catch (error) {
            transferStatus.textContent = `Transfer failed: ${error.message}`;
            if (error.code === 'ACTION_REJECTED') {
                transferStatus.textContent += ' (Transaction rejected by user)';
            }
        }
    });
});