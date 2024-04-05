import { exec } from 'child_process'
import { promisify } from 'util'
import chalk from 'chalk'

const aExec = promisify(exec)

const { stdout: buildOrUpdate, stderr } = await aExec(
  'node ./isBuildOrUpdate.mjs ' + process.argv.slice(2).join(' '),
)

if (stderr) {
  process.stdout.write('Got error ! ' + stderr)
  process.exit(1)
}

if (buildOrUpdate === 'patch') {
  // do patch thing
  console.log(chalk.blue("It's a patch dude !"))

  process.exit()
}

if (buildOrUpdate === 'build') {
  // do release thing
  console.log(chalk.green("It's a release !"))

  process.exit()
}
