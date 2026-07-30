import bcrypt from "bcrypt";

const password = "123456"; // Replace with the password you want to hash

const hash = await bcrypt.hash(password, 10);

console.log(hash);