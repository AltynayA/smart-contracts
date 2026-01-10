
const crypto = require("crypto");

const input = "Hello, World!";
const hash = crypto.createHash("sha256").update(input).digest("hex");

console.log("SHA-256 Hash:", hash);
