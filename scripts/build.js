/**
* This script builds all of the specs into their own html file which end up in /build to be published to github pages
*/
const { readdirSync, statSync, mkdirSync } = require('fs');
const path = require('path')
const promisify = require("util").promisify
const exec = promisify(require("child_process").exec)

const baseDir = path.join(__dirname, '..', 'specs')
const buildDir = path.join(__dirname, '..', 'build')

const folders = readdirSync(baseDir).filter(item => statSync(path.join(baseDir, item)).isDirectory())


// Ignoring the error because the folder might exist already
try {
  mkdirSync(buildDir)
} catch (_) { };

(async () => {
  for (let folder of folders) {
    await exec(`npx redocly build-docs ${path.join(baseDir, folder, "openapi.yml")} -o ${path.join(buildDir, `${folder}.html`)}`)
  }
})();