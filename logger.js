const needsLogger = process.env.NEEDS_OUTPUT_LOG === 'true';


function appLog(log) {
  if (!needsLogger) {
    return;
  }
  console.log(log);
}

function errorLog(errorLog) {
  if (!needsLogger) {
    return;
  }
  console.error(errorLog)
}

module.exports = {
  appLog,
  errorLog,
}