const dotenv = require("dotenv");
const express = require("express");
const app = express();

dotenv.config();

const accountSid = process.env.accountSid;
const authToken = process.env.authToken;

const client = require("twilio")(accountSid, authToken);

app.use(express.json());

app.get("/ping", (req, res) => {
    res.send("Ping");
});

app.post("/", (req, res) => {
    const { mTo, mBody } = req.body;
    client.messages
        .create({
            body: mBody,
            to: mTo, // Text your number
            from: "+12179553245", // From a valid Twilio number
        })
        .then((message) => console.log(message.sid));
    res.send("Done");
});

app.listen(4000, () => console.log("Running " + 4000));
