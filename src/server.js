import app from "./app.js";
import moment from "moment";
import dotenv from "dotenv";
import sequelize from "./config/database.js";

dotenv.config();

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synced successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

const date = moment();
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`${date} - Server is running on port ${PORT}`);
});
