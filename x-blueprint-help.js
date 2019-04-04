// THIS IS JUST A HELPER FUNCTION TO SHOW ALL AVAILABLE BLUEPRINTS FOR A `/blueprint-demo` COMMAND WITHOUT PARAMETERS

let getBlueprints = () => {
  const blueprints = require('./blueprints')
  
  let keys = Object.keys(blueprints)

  console.log(keys)

  return 
  {
    help: {
       blocks: [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "This is a plain text section block."
            }
          }
        ]
      }
  }
  
}

module.exports = {
  ephemeral: getBlueprints()
}