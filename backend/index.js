import express from  'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import companyRoutes from './routes/companyRoutes.js';
import cors from "cors";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/companies", companyRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT ,()=>console.log(`Server running on port ${PORT}`));
