// An express server, which will handle api requests

const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;

require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 80;

app.use(
  cors({
    origin: "http://symposium-ai-tool.s3-website-ap-southeast-2.amazonaws.com",
  })
);

const configuration = new Configuration({
  organization: "org-OhByKI0AfkLE3sRK4WTN8qbN",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

const text = "the Symposium by Plato";
const categories = `the rest of ${text}, the author's wider works, and Classics generally.`;

app.post("/", async (req, res) => {
  const term = req.body[0];
  const paragraph = req.body[1];
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are a Classics professor who is helping a student without a background in the subject. You are helping them with ${text} and its key themes and ideas.`,
      },
      {
        role: "user",
        content: `In 1-3 sentences, can you simply define Cydathenaeum in this paragraph of ${text}: \
        "'Certainly not', I said. 'It was actually the man who told Phoenix, someone called Aristodemus of Cydathenaeum, a small man, who never wore any shoes. \ 
        He had been at the party, and I think there was no more devoted admirer of Socrates at that time. \ 
        But of course I asked Socrates myself some questions afterwards about what I had heard from Aristodemus, and he confirmed what Aristodemus had said'." \
        Is there anything important to note about Cydathenaeum in ${categories}? Do not say anything if there is no direct relevance and prioritise it with respect to ${text}.`,
      },
      {
        role: "assistant",
        content:
          "Cydathenaeum was one of the demes in Ancient Athens and is where Aristodemus was from. It is not important for the Symposium's overall narrative but it was located in the heart of the city and produced various notable people.",
      },
      {
        role: "user",
        content: `In 1-3 sentences, can you simply define party in this paragraph of ${text}: \
        "Don't make fun of me', he said. 'Just tell me when that party took place'."
        Is there anything important to note about party in ${categories}? Do not say anything if there is no direct relevance and prioritise it with respect to ${text}.`,
      },
      {
        role: "assistant",
        content:
          "This party references the Symposium (drinking party) held by Agathon to discuss Love (Eros). Symposia were popular among elite Athenians to drink and discuss various topics, which include philosophy.",
      },
      //   {
      //     role: "user",
      //     content:
      //       "In 1-3 sentences, can you simply define Wait and, if Wait is important in the Symposium by Plato, tell me the role that Wait plays in the text",
      //   },
      //   {
      //     role: "assistant",
      //     content: "A definition of Wait does not make sense here.",
      //   },
      {
        role: "user",
        content: `In 1-3 sentences, can you simply define ${term} in this paragraph of ${text}: ${paragraph}. \
        Is there anything important to note about ${term} in ${categories}? Do not say anything if there is no direct relevance and prioritise it with respect to ${text}.`,
      },
    ],
    max_tokens: 150,
    temperature: 0,
  });
  console.log(response.data);
  if (response.data.choices[0].message.content) {
    res.json({
      message: response.data.choices[0].message.content,
    });
  }
});

app.listen(port, () => {
  console.log("Example app listening");
});
