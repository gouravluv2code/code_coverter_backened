const express = require('express');
const axios = require('axios');
const cors=require('cors');
const app = express();
app.use(cors())
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const port = process.env.PORT || 3800;
const apiKey = process.env.OPENAI_API_KEY;
app.use(express.json())
app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from Gourav AI!'
  })
})
app.post('/convert', async (req, res) => {
  try {
    const {code,language} = req.body;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${code} Convert this code in ${language} language and also debugg the code find out the error and 
      if any error encounter's show the error and in the next line provide the correct code with explanation for the same
      with optimized code in the next line in different font color with its time complexity and space complexity
      along with all this check the quality of the code in depth with detail explanation in each parameter
      Time Complexity,Space Complexity,code consistency , code performance ,code documentation , error handling ,code testability,modularity,complexity and readability
      and provide the details for the same after  2 line
      separately in percentage `,
      temperature: 0, 
      max_tokens: 3000, 
      top_p: 1, 
      frequency_penalty: 0.5, 
      presence_penalty: 0, 
    });

    res.status(200).send(
     response.data.choices[0].text.split("\n\n")
    );

  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});