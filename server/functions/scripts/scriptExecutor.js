const spawnSync = require('child_process').spawnSync

const scriptExecutor = (language, scriptPath, inputs) => {
  
  var result = {}
  const scriptExecution = spawnSync(language, [scriptPath], {
    input: inputs,
    timeout: 5000
  })
  if (scriptExecution.status === 0) {
    return { message: scriptExecution.stdout.toString().trim() }
  } else {
    return { error: scriptExecution.stderr.toString().trim() }
  }
}
module.exports = scriptExecutor
