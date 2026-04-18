const app = require('./app');
const logger = require('./infrastructure/logging/logger');
const connectDB = require('./infrastructure/config/db');
require('dotenv').config();

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  console.log(`Server is running on port ${PORT}`);
});
