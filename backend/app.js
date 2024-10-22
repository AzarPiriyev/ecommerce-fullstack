import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Import Routes
import productRoutes from './routes/product.routes.js';
import userRoutes from './routes/user.routes.js';
import faqRoutes from './routes/faq.routes.js';
import contactsRoutes from './routes/contact.routes.js';
import categoryRoutes from './routes/category.routes.js';

const server = express();  // `server` olarak adlandırılmış

dotenv.config();

server.use(express.json());  // JSON middleware

// Route definitions
server.use('/api/products', productRoutes);
server.use('/api/users', userRoutes);
server.use('/api/faqs', faqRoutes);
server.use('/api/contacts', contactsRoutes);
server.use('/api/categories', categoryRoutes);

const PORT = process.env.PORT || 3004;
const MONGODB_URL = process.env.MONGODB_URL;

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Database connection established");
  })
  .catch((err) => {
    console.log(err);
  });
