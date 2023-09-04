const mongoose = require('mongoose');

const dbConnection = () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log(`Connected to MongoDB at host ${mongoose.connection.host}`);
        })
        .catch((err) => {
            console.error(`Error connecting to MongoDB: ${err.message}`);
        });
};

module.exports = dbConnection;
