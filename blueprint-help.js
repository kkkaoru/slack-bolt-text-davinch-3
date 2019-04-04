// THIS IS JUST A HELPER FUNCTION TO SHOW ALL AVAILABLE BLUEPRINTS FOR A `/blueprint-demo` COMMAND WITHOUT PARAMETERS

const blueprints = require('./blueprints')
console.log(blueprints)

let keys = Object.keys(blueprints)

console.log(keys)

let blocks = [
	{
		"type": "section",
		"text": {
			"type": "mrkdwn",
			"text": "This is a plain text section block."
		}
	}
]

const getBlueprints = () => P

module.exports = {
  help: {
     blocks: blocks
  }
}