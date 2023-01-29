const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const completionMaxTokens = Number.isNaN(process.env.OPENAI_COMPLETION_MAX_TOKENS)
  ? Number(process.env.OPENAI_COMPLETION_MAX_TOKENS)
  : 2048;
const completionTemperature = Number.isNaN(process.env.OPENAI_COMPLETION_TEMPERATURE)
  ? Number(process.env.OPENAI_COMPLETION_TEMPERATURE)
  : 0.8;

const defaultPrompt = process.env.OPENAI_COMPLETION_DEFAULT_PROMPT || 'Please tell me about ChatGPT.';

async function fetchTextDavinci003(prompt){
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: prompt || defaultPrompt,
    max_tokens: completionMaxTokens,
    temperature: completionTemperature,
  });
  return response.data;
}

function findChoicesText(choices) {
  return choices.shift()?.text;
}

module.exports = {
  fetchTextDavinci003,
  findChoicesText
}