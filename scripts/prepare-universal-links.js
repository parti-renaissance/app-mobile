const fs = require('fs')
const path = require('path')

const baseIdentifier = 'fr.en-marche.jecoute'
const basePackage = 'fr.en_marche.jecoute'

function populateIosConfig(APPLE_TEAM_ID, BUNDLE_ID) {
  return {
    applinks: {
      apps: [],
      details: [
        {
          appIDs: [`${APPLE_TEAM_ID}.${BUNDLE_ID}`],
          components: [
            {
              "/": "*",
              comment: "Matches all routes"
            }
          ]
        },
      ],
    },
    activitycontinuation: {
      apps: [`${APPLE_TEAM_ID}.${BUNDLE_ID}`],
    },
    webcredentials: {
      apps: [`${APPLE_TEAM_ID}.${BUNDLE_ID}`],
    },
  }
}


function populateAndroidConfig(PACKAGE_NAME) {
  return [
    {
      relation: [
        "delegate_permission/common.handle_all_urls"
      ],
      target: {
        namespace: "android_app",
        package_name: PACKAGE_NAME,
        sha256_cert_fingerprints: [
          "{sha256_cert_fingerprints}"
        ]
      }
    }
  ]
}

const profile = process.env['EAS_BUILD_PROFILE'] ?? 'staging'
const APPLE_TEAM_ID = process.env['APPLE_TEAM_ID']

const bundleSuffix = profile === 'production' ? '' : `.${profile}`

const BUNDLE_ID = `${baseIdentifier}${bundleSuffix}`
const PACKAGE_NAME = `${basePackage}${bundleSuffix}`


let iosConfig = populateIosConfig(APPLE_TEAM_ID, BUNDLE_ID)
let androidConfig = populateAndroidConfig(PACKAGE_NAME)


const aasaPath = path.join(__dirname, '../web/.well-known', 'apple-app-site-association')
const assetlinksPath = path.join(__dirname, '../web/.well-known', 'assetlinks.json')

fs.writeFileSync(aasaPath, JSON.stringify(iosConfig), 'utf-8')
fs.writeFileSync(assetlinksPath, JSON.stringify(androidConfig), 'utf-8')
