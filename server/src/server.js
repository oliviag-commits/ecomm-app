import express from 'express';
import { MongoClient } from 'mongodb';
import path from 'path';
import dotenv from 'dotenv';
// import cors from 'cors';

dotenv.config();

async function start() {
  const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.qz66s.mongodb.net/?retryWrites=true&w=majority`
  
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tls: true,
});

  await client.connect();
  const db = client.db('myDatabase');

  const app = express();
  app.use(express.json());

  // serving images from assets directory
  app.use('/images', express.static(path.join(__dirname, '../src/assets')));

  // serving static files from dist directory
  app.use(express.static(
    path.resolve(__dirname, '../dist'),
    { maxAge: '1y', etag: false },
  ));

  // helper function
  async function populateCartIds(ids) {
    return Promise.all(ids.map(id => db.collection('products').findOne({ id })));
  }

  // API routes
  app.get('/api/plp', async (req, res) => {
    const products = await db.collection('products').find({}).toArray();
    res.send(products);
  });

  app.get('/api/users/:userId/cartcheckout', async (req, res) => {
    const user = await db.collection('users').findOne({ id: req.params.userId });
    const populatedCart = await populateCartIds(user?.cartItems || []);
    res.json(populatedCart);
  });

  app.get('/api/plp/:productId', async (req, res) => {
    const productId = req.params.productId;
    const product = await db.collection('products').findOne({ id: productId });
    res.json(product);
  });

  app.post('/api/users/:userId/cartcheckout', async (req, res) => {
    const userId = req.params.userId;
    const productId = req.body.id;

    const existingUser = await db.collection('users').findOne({ id: userId });

    if (!existingUser) {
      await db.collection('users').insertOne({ id: userId, cartItems: [] });
    }

    await db.collection('users').updateOne({ id: userId }, {
      $addToSet: { cartItems: productId }
    });

    const user = await db.collection('users').findOne({ id: req.params.userId });
    const populatedCart = await populateCartIds(user?.cartItems || []);
    res.json(populatedCart);
  });

  app.delete('/api/users/:userId/cartcheckout/:productId', async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;

    await db.collection('users').updateOne({ id: userId }, {
      $pull: { cartItems: productId },
    });

    const user = await db.collection('users').findOne({ id: req.params.userId });
    const populatedCart = await populateCartIds(user?.cartItems || []);
    res.json(populatedCart);
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });

  const port = process.env.PORT || 8000;

  app.listen(port, () => {
    console.log('Server is listening on port ' + port)
  });
}

start();