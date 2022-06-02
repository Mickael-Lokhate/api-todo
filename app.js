import app from "./server/server.js";

const port = 3001;

app.listen(port, () => {
  console.log(`Server now runnning at http://localhost:${port}/api`);
});
