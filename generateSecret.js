const crypto = require('crypto');

// Generate a random string (e.g., 64 characters)
const secretKey = crypto.randomBytes(64).toString('hex');

console.log(secretKey);