import {program} from "commander";

program
    .description('This script read app version against  App Store')
    .option('-i, --id <com.example.app>', 'App Store bundle identifier')
    .action((options) => {
        if (!options.id) {
            process.stderr.write('App store bundle identifier not specified\n')
            process.exit(1)
        }


        const baseUrl = 'https://itunes.apple.com/lookup'

        fetch(`${baseUrl}?bundleId=${options.id}`)
            .then(res => res.json())
            .then(result => {
                if (result.count === 0) {
                    throw new Error('No app found')
                }

                return result.results[0]
            })
            .then(({version}) => process.stdout.write(version + '\n'))
    })
    .parse()
