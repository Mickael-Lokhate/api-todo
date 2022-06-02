import app from "./server/server.js";

app.listen(port, () => {
  console.log(`Server now runnning at http://localhost:${port}/api`);
});
