const { spawnSync, spawn } = require('child_process')
const cExecutor = (input, path) => {
  let compilable = spawnSync('gcc', [`${path}.c`, '-o', path], {
    timeout: 5000
  })
  spawn('gcc', [ '--help' ])
  .on('error', function( err ){ console.error( err) })
;
  if (compilable.status === 0) {
    let executable = spawnSync(path, { input: input, timeout: 5000 })
    if (executable.status === 0) {
      return { message: executable.stdout.toString() }
    } else {
      return { error: executable.stderr.toString() }
    }
  } else {
    return { error: compilable.stderr.toString() }
  }
}
module.exports = cExecutor
