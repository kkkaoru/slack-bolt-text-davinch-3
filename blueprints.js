const approval = require('./blueprint-approval')
const createTask = require('./blueprint-create-task')
const hrTimeoff = require('./blueprint-hr-timeoff')
const paging = require('./blueprint-paging')
const privatePoll = require('./blueprint-private-poll')
const publicPoll = require('./blueprint-public-poll')
const search = require('./blueprint-search')
const template = require('./blueprint-template')

const slashCommands = require('./slash-commands')
const help = require('./blueprint-help')

module.exports = {
  "approval": approval,
  "create-task": createTask,
  "hr-timeoff": hrTimeoff,
  "private-poll": privatePoll,
  "public-poll": publicPoll,
  "paging": paging,
  "search": search,
  "template": template,
  "slashCommands": slashCommands,
  "help": help
}