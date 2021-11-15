function getAvailableEnvironments() {
  return ['staging', 'production']
}

function getDefaultEnvironment() {
  return 'staging'
}

module.exports = { getAvailableEnvironments, getDefaultEnvironment }
