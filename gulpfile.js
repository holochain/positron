const gulp = require('gulp')
const { exec, spawn } = require('child_process')

function gexec (cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        console.error(stderr)
        return reject(err)
      }
      resolve({ stdout, stderr })
    })
  })
}

function gspawn (cmd) {
  return new Promise((resolve, reject) => {
    const args = cmd.split(' ')
    cmd = args.shift()

    const proc = spawn(cmd, args, {
    })

    proc.stdout.on('data', (data) => {
      process.stdout.write(data)
    })

    proc.stderr.on('data', (data) => {
      process.stderr.write(data)
    })

    proc.on('close', (code) => {
      if (code !== 0) {
        reject(new Error('process exited with code ' + code))
      } else {
        resolve()
      }
    })
  })
}

gulp.task('default', ['check-env'])

gulp.task('check-env', [
  'rustup-version',
  'cargo-version',
  'rustup-targets'
])

gulp.task('rustup-version', async () => {
  const { stdout } = await gexec('rustup --version')
  if (stdout.indexOf('rustup ') < 0) {
    throw new Error('rustup not found in path, install?')
  }
})

gulp.task('cargo-version', async () => {
  const { stdout } = await gexec('cargo --version')
  if (stdout.indexOf('cargo ') < 0) {
    throw new Error('cargo not found in path, install rustup?')
  }
})

gulp.task('rustup-targets', async () => {
  await gspawn('rustup target add i686-linux-android aarch64-linux-android armv7-linux-androideabi')
})
