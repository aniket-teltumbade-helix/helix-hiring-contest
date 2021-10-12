const { spawnSync } = require('child_process')
const cppExecutor = (input, path) => {
  let compilable = spawnSync('g++', [`${path}.cpp`, '-o', path], {
    timeout: 5000
  })
  if (compilable.status === 0) {
    let executable = spawnSync(path, { input: input, timeout: 5000 })
    if (executable.status === 0) {
      return { message: executable.stdout.toString().trim() }
    } else {
      return { error: executable.stderr.toString() }
    }
  } else {
    return { error: compilable.stderr.toString() }
  }
}
module.exports = cppExecutor
