const fs = require('fs')
const path = require('path')

const globals = require('./globals.js')
const bundlercss = require('./css-bundler.js')
const bundlerjs = require('./js-bundler.js')

const bundle = {
  "js": function (options = {}) {

    if (!options.entry) {
        throw new Error('options.entryfilepath was not defined')
    }

    let entryfilepath = path.normalize(path.resolve(process.cwd(), options.entry))
    let bundled = bundlerjs.bundlejs(entryfilepath, options)

    if (options.dest) {
        let dest = path.normalize(path.resolve(process.cwd(), options.dest || globals.DEFAULT_OUTPUT_FILE))
        if (!fs.existsSync(path.dirname(dest))) {
            fs.mkdirSync(path.dirname(dest))
        }
        fs.writeFileSync(dest, bundled, { encoding: options.encoding || 'utf-8' })
    }
    if (options.print) {
        process.stdout.write(bundled)
    } else {
        console.log('Bundled:', bundled.split('\n'), 'lines')
        if (options.dest) {
            console.log('Wrote to file:', options.dest)
        }
        console.log('Done.')
    }

    return bundled
  },
  "css": function (options = {}) {

    if (!options.entry) {
        throw new Error('options.entryfilepath was not defined')
    }

    let entryfilepath = path.normalize(path.resolve(process.cwd(), options.entry))
    let bundled = bundlercss.bundlecss(entryfilepath, options)

    if (options.dest) {
        let dest = path.normalize(path.resolve(process.cwd(), options.dest || globals.DEFAULT_OUTPUT_FILE))
        if (!fs.existsSync(path.dirname(dest))) {
            fs.mkdirSync(path.dirname(dest))
        }
        fs.writeFileSync(dest, bundled, { encoding: options.encoding || 'utf-8' })
    }
    if (options.print) {
        process.stdout.write(bundled)
    } else {
        console.log('Bundled:', bundled.split('\n'), 'lines')
        if (options.dest) {
            console.log('Wrote to file:', options.dest)
        }
        console.log('Done.')
    }

    return bundled
  }
}

module.exports = bundle
