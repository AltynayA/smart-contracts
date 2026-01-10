export class TokenInteractor {
    constructor(contractAddress, abi) {
        this.contractAddress = contractAddress;
        this.abi = abi;
        this.provider = null;
        this.signer = null;
        this.contract = null;
        this.userAddress = null;
    }

    async connectWallet() {

        
        if (!window.ethereum) {
            throw new Error('No wallet detected. Please install MetaMask.');
        }
        this.provider = new ethers.providers.Web3Provider(window.ethereum);
        await this.provider.send('eth_requestAccounts', []);
        this.signer = this.provider.getSigner();
        this.userAddress = await this.signer.getAddress();
        this.contract = new ethers.Contract(this.contractAddress, this.abi, this.signer);
        const code = await this.provider.getCode(this.contractAddress);
        console.log("Contract code at address:", code);
        if (code === "0x") {
            console.error("NO CONTRACT DEPLOYED AT THIS ADDRESS!");
        }

        return this.userAddress;
    }

    async getBalance() {
        if (!this.contract) throw new Error('Wallet not connected');
        const balance = await this.contract.balanceOf(this.userAddress);
        return ethers.utils.formatUnits(balance, 18); // Assuming 18 decimals
    }

    async transfer(to, amount) {
        if (!this.contract) throw new Error('Wallet not connected');
        const tx = await this.contract.transfer(to, ethers.utils.parseUnits(amount.toString(), 18));
        await tx.wait();
        return tx;
    }


    async estimateGasForTransfer(to, amount) {
        if (!this.contract) throw new Error('Wallet not connected');
        try {
            const gasEstimate = await this.contract.estimateGas.transfer(to, ethers.utils.parseUnits(amount.toString(), 18));
            return { success: true, gas: gasEstimate.toString() };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async estimateGasForFailingTransfer() {
        if (!this.contract) throw new Error('Wallet not connected');
        const currentBalance = await this.contract.balanceOf(this.userAddress);
        const hugeAmount = currentBalance.add(1); // Amount larger than balance to force failure
        const dummyTo = '0x000000000000000000000000000000000000dead'; // Dummy address
        try {
            const gasEstimate = await this.contract.estimateGas.transfer(dummyTo, hugeAmount);
            return { success: true, gas: gasEstimate.toString() }; // Unexpected success
        } catch (error) {
            // to simulate comparison, assume a base gas for failure
            const baseGas = await this.signer.estimateGas({ to: this.contractAddress, data: '0x' }); // empty tx gas
            return { success: false, gas: baseGas.toString(), error: error.message };
        }
    }

    listenToTransfers(callback) {
        if (!this.contract) throw new Error('Wallet not connected');
        this.contract.on('Transfer', (from, to, value) => {
            if (from === this.userAddress || to === this.userAddress) {
                callback();
            }
        });
    }
}