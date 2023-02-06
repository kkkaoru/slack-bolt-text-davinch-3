const NodeCache = require('node-cache');
const botCache = new NodeCache();

class SlackCache {
  /**
   * @param {unknown} fetched
   * @param {boolean} said
   */
  constructor(fetched, said) {
    this.fetched = fetched;
    this.said = said;
  }
}

/**
 * @param {string} eventId
 * @param {SlackCache} slackCache
 */
function saveCache(eventId, slackCache){
  botCache.set(eventId, slackCache);
}

/**
 * @param {string} eventId
 * @returns {SlackCache | undefined}
 */
function searchCache(eventId) {
  return botCache.get(eventId);
}

module.exports = {
  saveCache,
  searchCache,
  SlackCache,
};