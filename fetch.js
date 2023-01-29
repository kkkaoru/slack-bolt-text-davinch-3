const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const completionMaxTokens = process.env.OPENAI_COMPLETION_MAX_TOKENS ?? 2048;
const completionTemparture = process.env.OPENAI_COMPLETION_TEMPERTURE ?? 0.8;


module.exports = {
  fetchTextDavinci003: (prompt)=>{
    const openai = new OpenAIApi(configuration);
    return openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: completionMaxTokens,
      temperature: completionTemparture,
    });    
  }
}