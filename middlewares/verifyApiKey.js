import jwt from 'jsonwebtoken';
import { db } from '../index.js';
import { query, where, collection, getDocs } from 'firebase/firestore';
async function validateApiKey(req, res, next) {
  try {
    const { apikey: apiKey } = req.headers;

    if (!apiKey) {
      return res.status(401).json({
        message: 'API key not found',
      });
    }
    // TODO: Get from firestore the api key and validate that it exists

    const q = query(collection(db, 'apiKeys'), where('key', '==', apiKey));
    const apiKeyExistis = await getDocs(q);
    if (apiKeyExistis.empty) {
      console.log('No matching documents.');
      return res.status(401).json({
        message: 'Invalid API key',
      });
    }
    apiKeyExistis.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });

    jwt.verify(apiKey, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(401).json({
          message: 'Invalid API key',
        });
      }
      next();
    });
  } catch (error) {
    console.log('error', error);
    res.status(500).send(error);
  }
}

export default validateApiKey;
