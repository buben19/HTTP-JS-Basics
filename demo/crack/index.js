const fs = require("fs");
const readline = require("readline");

// https://www.npmjs.com/package/bcrypt
const bcrypt = require("bcrypt");

// https://bcrypt-generator.com/
let hashed = "$2a$10$5FNXxNla46EYED4Fvi96GO59f62lkoCx3S4qCmLyuycKHHyEeuiUO";

async function main() {
  let rd = readline.createInterface({
    // https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/Common-Credentials/10k-most-common.txt
    input: fs.createReadStream("passwords.txt")
  });

  for await (let line of rd) {
    console.log(`Checking for password '${line}'...`);
    let match = bcrypt.compareSync(line, hashed);
    if (match) {
      return line;
    }
  }

  return null;
}

main().then(pass => {
  if (pass) {
    console.log(`Password cracked: ${pass}`);
  } else {
    console.log("No password matches");
  }
});