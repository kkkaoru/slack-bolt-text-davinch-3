const approval = require('./blueprint-approval')
const createTask = require('./blueprint-create-task')
const privatePoll = require('./blueprint-private-poll')
const publicPoll = require('./blueprint-public-poll')
const search = require('./blueprint-search')
const template = require('./blueprint-template')

const onboarding1 = require('./blueprint-onboarding-1')
const onboarding2 = require('./blueprint-onboarding-2')
const onboarding3 = require('./blueprint-onboarding-3')

const slashCommands = require('./slash-commands')

module.exports = {
  approval: approval,
  createTask: createTask,
  privatePoll: privatePoll,
  publicPoll: publicPoll,
  search: search,
  template: template,
  slashCommands: slashCommands,
  onboarding1: onboarding1,
  onboarding2: onboarding2,
  onboarding3: onboarding3
}