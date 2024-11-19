import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';


import productRoutes from './routes/product.routes.js';
import userRoutes from './routes/user.routes.js';
import faqRoutes from './routes/faq.routes.js';
import contactsRoutes from './routes/contact.routes.js';
import categoryRoutes from './routes/category.routes.js';
import informRoutes from './routes/inform.routes.js';
import searchRoutes from './routes/search.routes.js';
import authRoutes from './routes/auth.routes.js';
import cartRoutes from './routes/cart.routes.js';
import wishlistRoutes from './routes/wishlist.routes.js';


const server = express();  

server.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)

dotenv.config();

server.use(express.json());  


server.use('/api/products', productRoutes);
server.use('/api/users', userRoutes);
server.use('/api/faqs', faqRoutes);
server.use('/api/contacts', contactsRoutes);
server.use('/api/categories', categoryRoutes);
server.use('/api/informs', informRoutes);
server.use('/api/search', searchRoutes);
server.use('/api/auth', authRoutes);
server.use('/api/cart', cartRoutes);
server.use('/api/wishlist', wishlistRoutes);



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
