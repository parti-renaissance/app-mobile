function getAvailablePlatforms() {
  return ["android", "ios"];
}

function getDefaultPlatforms() {
  return getAvailablePlatforms();
}

module.exports = { getAvailablePlatforms, getDefaultPlatforms };
