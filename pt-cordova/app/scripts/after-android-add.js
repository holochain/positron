module.exports = (ctx) => {
  const fs = ctx.requireCordovaModule('fs')
  const path = ctx.requireCordovaModule('path')

  const platformRoot = path.join(ctx.opts.projectRoot, 'platforms', 'android')

  console.error('@@@@@@@@@@@@@@@@@@@')
  console.error('@@ platform hook: android')

  console.error('@@ upgrade to gradle 4.4')

  const clobberPlugin = (fn) => {
    console.log('@@ clobbering ' + fn)
    let data = fs.readFileSync(fn).toString()
    data = data.replace(/build:gradle:\d\.\d\.\d/, 'build:gradle:3.1.4')
    data = data.replace(/gradleVersion\s*=\s*'\d\.\d\.\d'/, 'gradleVersion = \'4.4.0\'')
    fs.writeFileSync(fn, data)
  }

  clobberPlugin(path.join(platformRoot, 'build.gradle'))
  clobberPlugin(path.join(platformRoot, 'CordovaLib', 'build.gradle'))
  clobberPlugin(path.join(platformRoot, 'app', 'build.gradle'))

  console.log('@@ adding build-extras.gradle')
  fs.writeFileSync(path.join(platformRoot, 'build-extras.gradle'),
    'ext.cdvMinSdkVersion = 19\n')

  console.error('@@@@@@@@@@@@@@@@@@@')
}
