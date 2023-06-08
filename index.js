// An express server, which will handle api requests

const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;

const configuration = new Configuration({
  organization: "org-OhByKI0AfkLE3sRK4WTN8qbN",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

const text = "the Symposium by Plato";

app.post("/", async (req, res) => {
  const { message } = req.body;
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are a Classics professor who is helping a student without a background in the subject`,
      },
      { role: "user", content: `Can you please help me to understand ${text}` },
      {
        role: "assistant",
        content: `Absolutely. ${text} is one of my favourites.`,
      },
      {
        role: "user",
        content:
          "In 1-3 sentences, can you simply define Cydathenaeum and, if Cydathenaeum is important in the Symposium by Plato, tell me the role that Cydathenaeum plays in the text",
      },
      {
        role: "assistant",
        content:
          "Cydathenaeum was one of the demes in Ancient Athens. It is not important for the Symposium's overall narrative.",
      },
      {
        role: "user",
        content:
          "In 1-3 sentences, can you simply define Alcibiades and, if Alcibiades is important in the Symposium by Plato, tell me the role that Alcibiades plays in the text",
      },
      {
        role: "assistant",
        content:
          "Alcibiades was a prominent Athenian statesmen and general who was exiled a year after the Symposium supposedly took place. He is very handsome and was in love with Socrates. He makes the seventh and final speech in praise of Eros (Love)",
      },
      {
        role: "user",
        content:
          "In 1-3 sentences, can you simply define Wait and, if Wait is important in the Symposium by Plato, tell me the role that Wait plays in the text",
      },
      {
        role: "assistant",
        content: "A definition of Wait does not make sense here.",
      },
      {
        role: "user",
        content: `In 1-3 sentences, can you simply define ${message} and, if ${message} is important in ${text}, tell me the role that ${message} plays in the text.`,
      },
    ],
    max_tokens: 100,
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
