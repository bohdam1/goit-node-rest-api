const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./helpers/swaggerConfig.js');


const contactsRouter = require("./routes/contactsRouter.js");
const UserRoutes = require("./routes/userRoutes.js")

const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const app = express();

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  mongoose.connect(process.env.MONGO_URL,)
  
  .then(() => {
    
    console.log("Database connection successful");

    app.use(morgan("tiny"));
    app.use(cors({
      origin: 'http://localhost:3001', // Замість * вказуємо точний домен
      credentials: true, // Дозволяємо креденціали (cookies, токени)
    }));
    app.use(express.json());

    app.use("/api/task", contactsRouter);
    app.use("/api/auth", UserRoutes);

    app.use((_, res) => {
      res.status(404).json({ message: "Route not found" });
    });

    app.use((err, req, res, next) => {
      const { status = 500, message = "Server error" } = err;
      res.status(status).json({ message });
    });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.disconnect();
      console.log('MongoDB disconnected');
      process.exit(0);
    });
  })
  .catch((error) => {
    console.error(`Error connecting to the database: ${error.message}`);
    process.exit(1);
  });
