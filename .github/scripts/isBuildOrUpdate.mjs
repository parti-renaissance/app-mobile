import { program } from 'commander'
import semver from 'semver'

const actionHandler = (options) => {
  const release = options.release?.replace('v', '')
  const last = options.last?.replace('v', '')

  if (!release) {
    console.error('You must specify a target version with `-r` or `--release`')

    process.exit(0)
  }

  if (!last) {
    console.error(
      'You must specify a previous version to compare with `-l` or `--last`',
    )

    process.exit(0)
  }

  const parsedRelease = semver.parse(release)
  const parsedLast = semver.parse(last)

  if (
    parsedLast.major === parsedRelease.major &&
    parsedLast.minor === parsedRelease.minor &&
    parsedLast.patch !== parsedRelease.patch
  ) {
    process.stdout.write('patch')
  } else if (
    parsedLast.major !== parsedRelease.major ||
    parsedLast.minor !== parsedRelease.minor
  ) {
    process.stdout.write('build')
  } else if (parsedLast.compare(release) === 0) {
    process.stdout.write('cheeky')
    process.exit(2)
  } else {
    process.stdout.write('unknown')
  }
}

program
  .description('Compute if we need to make a new build or an update')
  .option('-r, --release <vX.X.X>', 'Target version')
  .option('-l, --last <vX.X.X>', 'Last known version')
  .parse()
  .action(actionHandler)
  .parse()
