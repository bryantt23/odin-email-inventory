const bcrypt = require('bcryptjs');

// Replace 'your_plain_text_password' with the password you want to hash
const plainTextPassword = 'your_plain_text_password';

bcrypt.hash(plainTextPassword, 10, function (err, hash) {
    if (err) throw err;
    console.log("Hashed password:", hash);
});
