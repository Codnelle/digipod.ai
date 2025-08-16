// CommonJS version of background service initialization
const { initializeBackgroundServices, cleanupBackgroundServices } = require('./dist/server/lib/backgroundService');

module.exports = {
  initializeBackgroundServices,
  cleanupBackgroundServices
};