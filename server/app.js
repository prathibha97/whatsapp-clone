import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from 'cors';
// app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1068172",
  key: "70e47dcea78ebf55fb79",
  secret: "74e85800c1adbc23bced",
  cluster: "mt1",
  encrypted: true,
});

// middleware
app.use(express.json());
app.use(cors());

// DB config
const connectUrl =
  "mongodb+srv://admin:KQDUQ0cGeb7FU1NE@cluster0.btlei.mongodb.net/whatsappDB?retryWrites=true&w=majority";
mongoose.connect(connectUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("DB Connected");

  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log("There was a change: ", change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp:messageDetails.timestamp,
        received:messageDetails.received
      });
    } else {
      console.log("Error trigerring pusher");
    }
  });
});
// API routes
app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});
// Listen
app.listen(port, () => {
  console.log(`Listning on localhost:${port}`);
});

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const dbMesssage = req.body;
  Messages.create(dbMesssage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(`New message created: \n ${data}`);
    }
  });
});

//KQDUQ0cGeb7FU1NE
