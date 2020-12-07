function getAvailableEnvironments() {
  return ['dev', 'staging', 'production']
}

function getDefaultEnvironment() {
  return 'staging'
}

module.exports = { getAvailableEnvironments, getDefaultEnvironment }
