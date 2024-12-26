require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const port = process.env.PORT || 5222 ;
const app = express() ;

app.use(cors());
app.use(express.json()) ;



app.get('/',(req,res) =>{
    res.send('Server is running in home')
})

app.listen(port,()=>{
    console.log(`port is raning : ${port}`);
})




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PAS}@cluster0.zxihh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

console.log(process.env.DB_USER,"thar is name");

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    // user data
    const db = client.db('Assingment-11');
    const userCollection = db.collection('userData');
    const userDataCollection = db.collection('userLogData');
    // wis list data
    const wicCollection = db.collection('watch');
// all data
    const onerCollection = db.collection('Mydata');

// post user data
    app.post('/add', async (req, res) => {
      const addata = req.body;
      console.log('All Data-------------', addata);

      try {
        const result = await userCollection.insertOne(addata);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
        res.send(result);
      } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).send({ message: 'Error inserting data' });
      }
    });
  // ---------------- post-----//
// post All data
    app.post('/alldata', async (req, res) => {
      const addata = req.body;
      console.log('All Data-------------', addata);
      
      try {
        const result = await onerCollection.insertOne(addata);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
        res.send(result);
      } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).send({ message: 'Error inserting data' });
      }
    });

      // post watchLists data
    app.post('/watchLists', async (req, res) => {
      const addatas = req.body;
      console.log('All watchLists-------------', addatas);

      try {
        const result = await wicCollection.insertOne(addatas);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
        res.send(result);
      } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).send({ message: 'Error inserting data' });
      }
    });


// post userData data
    app.post('/userData', async (req, res) => {
      const addatas = req.body;
      console.log('All userData-------------', addatas);

      try {
        const result = await userDataCollection.insertOne(addatas);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
        res.send(result);
      } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).send({ message: 'Error inserting data' });
      }
    });
    
// ---------------- Patch -----//


app.patch('/comant', async (req, res) => {
  const { Comment, username, userEmail, userphotoURL, _id } = req.body;

  if (!Comment || !username || !userEmail || !userphotoURL || !_id) {
      return res.status(400).send({ message: 'All fields are required' });
  }

  if (!ObjectId.isValid(_id)) {
      return res.status(400).send({ message: 'Invalid ID format' });
  }

  try {
      const filter = { _id: new ObjectId(_id) }; 
      const updateDoc = {
          $push: { comments: { Comment, username, userphotoURL,userEmail, date: new Date() } },
      };
      const result = await onerCollection.updateOne(filter, updateDoc);
      res.send(result);
  } catch (error) {
      console.error('Error updating comment:', error);
      res.status(500).send({ message: 'Error updating comment' });
  }
});






// ---------------- get-----//
      // get user data
    app.get('/datas', async (req, res) => {
      try {
        const cursor = userCollection.find();
        const result = await cursor.toArray();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(result);
      } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });
// gat watchLists data
app.get('/watchListsdata', async (req, res) => {
  try {
    const cursor = wicCollection.find();
    const result = await cursor.toArray();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(result);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

    // All data
    app.get('/alldata', async (req, res) => {
      try {
        const cursor = onerCollection.find();
        const result = await cursor.toArray();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(result);
      } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });


    // MongoDB limit
    app.get('/limited-data', async (req, res) => {
      const limit = parseInt(req.query.limit) || 6;
      try {
        const cursor = onerCollection.find().limit(limit); 
        const result = await cursor.toArray();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(result);
      } catch (error) {
        console.error('Error retrieving limited data:', error);
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });
    // MongoDB limit Featured Blogs
    app.get('/featured-blogs', async (req, res) => {
      const limit = parseInt(req.query.limit) || 10;
      try {
        const cursor = onerCollection.find().limit(limit); 
        const result = await cursor.toArray();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(result);
      } catch (error) {
        console.error('Error retrieving limited data:', error);
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });
// delete method
app.delete('/watchListsdata/:id', async (req, res) => {
  const id = req.params.id;
  console.log('Received ID for deletion:', id);
  
  if (!ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'Invalid ID format' });
  }
  
  const query = { _id: new ObjectId(id) };
  
  try {
    const result = await wicCollection.deleteOne(query);
    console.log('Delete result:', result);
    
    if (result.deletedCount === 0) {
      return res.status(404).send({ message: 'Data not found' });
    }
    
    res.send({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).send({ message: 'Error deleting data' });
  }
});

    





// ------------------update---------//
//update section

app.put('/update/:id', async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const updateData = req.body;

  const updateDoc = {
    $set: {
      Title: updateData.Title,
      shortdescription: updateData.shortdescription,
      longdescription: updateData.longdescription,
      Image: updateData.Image,
      username: updateData.username,
      userEmail: updateData.userEmail,
      category: updateData.category,
    },
  };

  const result = await onerCollection.updateOne(filter, updateDoc, { upsert: true });
  res.send(result);
});


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

run().catch(console.dir);

// nodemon index.js
