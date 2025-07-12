// Load environment variables
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const basicRoutes = require("./routes/index");
const { connectDB } = require("./config/database");
const cors = require("cors");

// Validate required environment variables
const requiredEnvVars = ['DATABASE_URL'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error(`Error: Required environment variables missing: ${missingEnvVars.join(', ')}`);
  console.error("Please check your .env file and ensure all required variables are set.");
  process.exit(-1);
}

// Warn about missing optional API keys
const optionalEnvVars = ['OPENAI_API_KEY', 'ANTHROPIC_API_KEY'];
const missingOptionalVars = optionalEnvVars.filter(envVar => !process.env[envVar]);

if (missingOptionalVars.length > 0) {
  console.warn(`Warning: Optional environment variables missing: ${missingOptionalVars.join(', ')}`);
  console.warn("LLM services may not function properly without these keys.");
}

const app = express();
const port = process.env.PORT || 3000;
// Pretty-print JSON responses
app.enable('json spaces');
// We want to be consistent with URL paths, so we enable strict routing
app.enable('strict routing');

app.use(cors({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
connectDB();

app.on("error", (error) => {
  console.error(`Server error: ${error.message}`);
  console.error(error.stack);
});

// Basic Routes
app.use(basicRoutes);

// If no routes handled the request, it's a 404
app.use((req, res, next) => {
  res.status(404).send("Page not found.");
});

// Error handling
app.use((err, req, res, next) => {
  console.error(`Unhandled application error: ${err.message}`);
  console.error(err.stack);
  res.status(500).send("There was an error serving your request.");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
