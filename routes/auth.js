import express from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../index.js';
import { addDoc, collection } from 'firebase/firestore';
const router = express.Router();

// GET route that returns "Hello World"
router.get('/api-key', async (req, res) => {
  try {
    const key = jwt.sign(
      {
        type: 'apiKey',
        createdAt: new Date(),
      },
      process.env.JWT_SECRET
    );
    // TODO: Save the key in firestore
    await addDoc(collection(db, 'apiKeys'), {
      key,
      createdAt: new Date(),
    });
    res.status(200).json({
      key,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
});

export default router;