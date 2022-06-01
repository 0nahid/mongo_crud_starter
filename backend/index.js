const express = require("express");
const app = express();
const port = process.env.PORT || 5500;
const cors = require("cors");

// middleware
app.use(cors());
app.use(express.json());
require("dotenv").config();

// connect to monogoDB

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://admin:WgYNVdQbGlf53rL9@cluster0.kdv7q.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const database = client.db("wifiUsers");
    const usersCollection = database.collection("users");
    // create a document to insert
    // const doc = {
    //   firstName: "John",
    //   lastName: "Doe",
    //   age: 50,
    //   interests: ["sports", "movies", "travel"],
    //   content: "No bytes, no problem. Just insert a document, in MongoDB",
    // };
    // const result = await usersCollection.insertOne(doc);
    // console.log(`A document was inserted with the _id: ${result.insertedId}`);

    // post api
    app.post("/api/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      // console.log('got new user', user);
      // console.log('added user', result);
      res.json(result);
    });

    // get api
    app.get("/api/users", async (req, res) => {
      const users = await usersCollection.find({}).toArray();
      res.json(users);
    });

    // load specified user  
    app.get("/api/users/:id", async (req, res) => {
      const id = req.params.id;
      const user = await usersCollection.findOne({ _id: ObjectId(id) });
      res.json(user);
    });

    // delete api
    app.delete("/api/users/:id", async (req, res) => {
      const { id } = req.params;
      const query = { _id: ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      console.log("deleting user", result);
      res.json(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
