// THIS IS JUST A HELPER FUNCTION TO SHOW ALL AVAILABLE BLUEPRINTS FOR A `/blueprint-demo` COMMAND WITHOUT PARAMETERS

const dir = './'
const fs = require('fs')

const getBlueprints = () => {
  let blueprints = []
  fs.readdirSync(dir).forEach(file => {
    if(file.indexOf('blueprint-') >= 0) {
      let bp = file.replace('blueprint-', '').replace('.js', '')
      blueprints.push(bp)
    }
  })
  
  let text = 'Here\'s a list of available blueprints:\n\n'
  blueprints.forEach(bp => {
    text += '`'+bp+'`\n'
  })
  
  return text
}

module.exports = {
  ephemeral: {
    help: {
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": getBlueprints()
          }
        }
      ]
    }
  }
}