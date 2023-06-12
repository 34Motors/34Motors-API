import app from "./app";
import "dotenv/config";

const port = process.env.PORT || 4002;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});
