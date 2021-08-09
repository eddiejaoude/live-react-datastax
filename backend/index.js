const express = require("express");
const { createClient } = require("@astrajs/collections");

const app = express();
const port = 3001;

app.use(express.json());

const connect = async () => {
  console.log(process.env.ASTRA_DB_ID);
  return await createClient({
    astraDatabaseId: process.env.ASTRA_DB_ID,
    astraDatabaseRegion: process.env.ASTRA_DB_REGION,
    applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN,
  });
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/events", async (req, res) => {
  const client = await connect();
  const eventsCollection = client.namespace("reactjs").collection("events");

  let events = [];
  try {
    events = await eventsCollection.find({});
  } catch (err) {
    console.log(err);
  }

  const response = Object.keys(events).map((key) => ({
    id: key,
    ...events[key],
  }));

  res.json(response);
});

app.post("/events", async (req, res) => {
  const client = await connect();
  const eventsCollection = client.namespace("reactjs").collection("events");

  const event = await eventsCollection.create({
    name: req.body.name,
    author: req.body.author,
    description: req.body.description,
    date: new Date(),
  });

  res.json({ id: event.documentId, ...req.body });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
