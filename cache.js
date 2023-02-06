const { createHash } = require('crypto');
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
 * @param {string} text
 * @returns {string}
 */
function generateCacheKey(text) {
  return createHash('md5').update(text).digest('hex');
}

/**
 * @param {string} cacheKey
 * @param {SlackCache} slackCache
 */
function saveCache(cacheKey, slackCache) {
  botCache.set(cacheKey, slackCache);
}

/**
 * @param {string} cacheKey
 * @returns {SlackCache | undefined}
 */
function searchCache(cacheKey) {
  return botCache.get(cacheKey);
}

module.exports = {
  generateCacheKey,
  saveCache,
  searchCache,
  SlackCache,
};
