const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://prashant9818101426_db_user:VjuN1ciCjDiA6Mgq@cluster0.mrtz2j2.mongodb.net/",
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
 
module.exports = connectDB; 
