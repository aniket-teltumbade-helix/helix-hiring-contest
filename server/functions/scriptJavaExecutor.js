const path = require('path')
const os = require('os')
const fs = require('fs')
const { execSync } = require('child_process')

const javaExecutor = (input, r) => {
  fs.writeFileSync(path.join(os.tmpdir(), r, 'input.txt'), input)
  try {
    execSync(`javac ${path.join(os.tmpdir(), r, 'Solution.java')}`, {
      timeout: 5000
    })
  } catch (error) {
    return { error: error.stderr.toString() }
  }
  try {
    let message = execSync(
      `java -classpath ${path.join(os.tmpdir(), r)} Solution < ${path.join(
        os.tmpdir(),
        r,
        'input.txt'
      )}`,
      { timeout: 5000 }
    )
    return { message: message.toString() }
  } catch (error) {
    return { error: error.stderr.toString() }
  }
}
module.exports = javaExecutor
