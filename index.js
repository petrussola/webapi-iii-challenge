// code away!

require('dotenv').config();

const port = process.env.PORT;

const server = require("./server");

// SERVER LISTENING
server.listen(port, () => {
  console.log("\n* Server Running on http://localhost:3000 *\n");
});
