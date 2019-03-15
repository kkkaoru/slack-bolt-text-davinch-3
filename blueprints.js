const approval = require('./blueprint-approval')
const createTask = require('./blueprint-create-task')
const privatePoll = require('./blueprint-private-poll')
const publicPoll = require('./blueprint-public-poll')
const template = require('./blueprint-template')

module.exports = {
  approval: approval,
  createTask: createTask,
  privatePoll: privatePoll,
  publicPoll: publicPoll,
  template: template
}