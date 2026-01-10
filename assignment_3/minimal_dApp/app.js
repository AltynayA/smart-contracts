
let provider = null;
let contract = null;

const CONTRACT_ADDRESS = "0xdA3Bb7dBfA1ce150f4ea31f08934317e7583A4c7";
const ABI = [
  "function storedValue() view returns (uint256)"
];

async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask (or another wallet) not detected!");
    return;
  }
  try {
    provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const account = accounts[0];

    document.getElementById("account").textContent = account;
    document.getElementById("readBtn").disabled = false;

    // initialize contract (read-only)
    contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

    document.getElementById("error").textContent = "";

  } catch (err) {
    document.getElementById("error").textContent = err.message || "Connection failed";
    console.error(err);
  }
}

async function readValue() {
  if (!contract) {
    document.getElementById("error").textContent = "Please connect wallet first";

    return;
  }
  try {
    document.getElementById("value").textContent = "Loading...";
    const value = await contract.storedValue();
    document.getElementById("value").textContent = value.toString();
    document.getElementById("error").textContent = "";
  }
  catch (err) {
    document.getElementById("value").textContent = "Failed";
    document.getElementById("error").textContent = err.reason || err.message || "Call failed";
    console.error(err);
  }


}