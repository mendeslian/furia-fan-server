import app from "./app.js";
import moment from "moment";
import dotenv from "dotenv";
import sequelize from "./config/database.js";

dotenv.config();

const date = moment();
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`${date} - Server is running on port ${PORT}`);
});
