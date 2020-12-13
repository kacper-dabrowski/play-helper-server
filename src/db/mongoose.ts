import mongoose, { Error } from "mongoose";
require("dotenv").config("../.env");
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((error: Error) => {
    console.log(process.env.MONGODB_URI);
    console.log("Unable to connect to the database! Details: " + error.message);
  });

export default mongoose.connection;
