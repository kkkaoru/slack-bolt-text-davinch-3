const approval = require('./blueprint-approval')
const privatePoll = require('./blueprint-private-poll')
const publicPoll = require('./blueprint-public-poll')
const template = require('./blueprint-template')

module.exports = {
  approval: approval,
  privatePoll: privatePoll,
  publicPoll: publicPoll,
  template: template
}