/*
 * gulp build script for positron
 */

const path = require('path')
const { spawn } = require('child_process')

const gulp = require('gulp')

function gspawn (cmd, opts) {
  return new Promise((resolve, reject) => {
    const args = cmd.split(' ')
    cmd = args.shift()

    const proc = spawn(cmd, args, opts || {})

    let stdout = ''
    proc.stdout.on('data', (data) => {
      stdout += data.toString()
      process.stdout.write(data)
    })

    let stderr = ''
    proc.stderr.on('data', (data) => {
      stderr += data.toString()
      process.stderr.write(data)
    })

    proc.on('close', (code) => {
      if (code !== 0) {
        reject(new Error('process exited with code ' + code))
      } else {
        resolve({ stdout, stderr })
      }
    })
  })
}

gulp.task('rustup-version', async () => {
  const { stdout } = await gspawn('rustup --version')
  if (stdout.indexOf('rustup ') < 0) {
    throw new Error('rustup not found in path, install?')
  }
})

gulp.task('cargo-version', async () => {
  const { stdout } = await gspawn('cargo --version')
  if (stdout.indexOf('cargo ') < 0) {
    throw new Error('cargo not found in path, install rustup?')
  }
})

gulp.task('npm-version', async () => {
  const { stdout } = await gspawn('npm --version')
  if (stdout.length < 1) {
    throw new Error('npm not found in path, install nodejs?')
  }
})

gulp.task('rustup-targets', async () => {
  await gspawn('rustup target add x86_64-linux-android i686-linux-android aarch64-linux-android armv7-linux-androideabi')
})

gulp.task('check-env', gulp.series(
  gulp.parallel(
    'npm-version',
    'rustup-version',
    'cargo-version'
  ),
  'rustup-targets'
))

gulp.task('default', gulp.series(
  'check-env',
), () => {
  console.log('environment ready, you can now:')
  console.log(' - `gulp build-electron`')
  console.log(' - `gulp build-android`')
})

gulp.task('prep', gulp.series('check-env'))

gulp.task('build-ptlib-host', async () => {
  await gspawn('cargo build --release', {
    cwd: path.join(__dirname, 'ptlib')
  })
})

gulp.task('build-ptlib-armv7', async () => {
  await gspawn('cargo build --target armv7-linux-androideabi --release', {
    cwd: path.join(__dirname, 'ptlib')
  })
})

gulp.task('build-ptlib-x86_64', async () => {
  await gspawn('cargo build --target x86_64-linux-android --release', {
    cwd: path.join(__dirname, 'ptlib')
  })
})

gulp.task('build-ptlib-i686', async () => {
  await gspawn('cargo build --target i686-linux-android --release', {
    cwd: path.join(__dirname, 'ptlib')
  })
})

gulp.task('build-ptlib-arm64', async () => {
  await gspawn('cargo build --target aarch64-linux-android --release', {
    cwd: path.join(__dirname, 'ptlib')
  })
})

gulp.task('build-ptlib', gulp.series(
  'build-ptlib-host',
  'build-ptlib-armv7',
  'build-ptlib-arm64',
  'build-ptlib-x86_64',
  'build-ptlib-i686'
))

gulp.task('build-ptlib-nodejs', async () => {
  await gspawn('npm install', {
    cwd: path.join(__dirname, 'ptlib-nodejs')
  })
  await gspawn('npm run prebuild', {
    cwd: path.join(__dirname, 'ptlib-nodejs')
  })
})

gulp.task('build-pt-electron', async () => {
  await gspawn('npm install', {
    cwd: path.join(__dirname, 'pt-electron')
  })
})

gulp.task('build-electron', gulp.series(
  'build-ptlib',
  'build-ptlib-nodejs',
  'build-pt-electron'
))

gulp.task('build-ptlib-android', async () => {
  await gspawn('./gradlew build', {
    cwd: path.join(__dirname, 'ptlib-android'),
    shell: true
  })
})

gulp.task('build-android', gulp.series(
  'build-ptlib',
  'build-ptlib-android'
))
