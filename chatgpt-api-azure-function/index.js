const { OpenAIApi } = require('openai');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const openai = new OpenAIApi({
    //apiKey: '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'
});

const app = express();
const port = 3000;

 app.use(bodyParser.json());
// app.use(cors());

app.get("/", async (req, res) => {
    const { message } = req.body;
    try {
        const systemMessage = { "role": "system", "content": "You are DesignGPT helpful assistant graphics design chatbot" };
        const chatMessages = Array.isArray(message) ? [...message, systemMessage] : [systemMessage];

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            message: chatMessages
        });

        res.json({
            completion: completion.data.choices[0].message
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred during chat completion' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

