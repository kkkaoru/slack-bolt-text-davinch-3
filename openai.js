const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const completionMaxTokens = Number.isNaN(process.env.OPENAI_COMPLETION_MAX_TOKENS)
  ? Number(process.env.OPENAI_COMPLETION_MAX_TOKENS)
  : 2048;
const completionTemparture = Number.isNaN(process.env.OPENAI_COMPLETION_TEMPERTURE)
  ? Number(process.env.OPENAI_COMPLETION_TEMPERTURE)
  : 0.8;

function fetchTextDavinci003(prompt){
    const openai = new OpenAIApi(configuration);
    return openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: completionMaxTokens,
      temperature: completionTemparture,
    });      
}

function findChoicesText(choices) {
  return choices.shift()?.text;
}

module.exports = {
  fetchTextDavinci003,
  findChoicesText
}