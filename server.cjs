const jsonServer = require("json-server");
const cors = require("cors");
const server = jsonServer.create();
const router = jsonServer.router("db.json"); // Path to your db.json file
const middlewares = jsonServer.defaults();

server.use(cors()); // Enable CORS
server.use(middlewares);

// Middleware to map `_id` to `id` for json-server
server.use((req, res, next) => {
  if (req.method === "POST" && req.body._id) {
    req.body.id = req.body._id; // Map `_id` to `id`
  }
  next();
});

server.use(router);

server.listen(3002, () => {
  console.log("JSON Server is running on port 3002");
});
