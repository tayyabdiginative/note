const mongoose = require("mongoose");
const connectMDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUniFiedTopology: true,
      useNewUrlParser: true,
      //   usecreateIndex: true,
    });
    console.log("Mangoo Connected", conn.connection.host);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit();
  }
};
module.exports = connectMDB;
