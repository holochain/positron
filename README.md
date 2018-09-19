# positron

Holochain composer framework abstraction for generating web apps across electron and cordova

## What Is It?

Bundles up a rust library and makes it available for both electron and cordova.

## But Why?

We want a unified app that can be published to multiple desktop platforms as well as iOs and Android. There are many ways to do this. This is one option that provides us the ability to write UI using web technologies.

## Project Status

Proof of concept. This is currently an app demo.

Really we'd like this repo to be utilities for hiding the complexities of electron and cordova behind the scenes for any Web UI you'd like to publish. But for now, this is an actual app that showcases how to go about this.

## Usage

```shell
# setup npm
npm install

# prepare the environment
npm run prep

# build the electron module
npm run build-electron

# execute the electron app
npm run electron

# build the android module
# make sure gradle is in your $PATH
ANDROID_HOME=<??> npm run build-android
```
