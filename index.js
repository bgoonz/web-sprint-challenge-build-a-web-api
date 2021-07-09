require("dotenv").config();
const server = require("./api/server");

const port = process.env.PORT || 5000;

const sayHello = () => {
  console.log(`server is listening on port: ${port}`);
};

server.listen(port, sayHello);
