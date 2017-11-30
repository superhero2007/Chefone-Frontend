## Getting started

#

The app requires Node.js and NPM.

```sh
brew install nvm
nvm install v8.4.0

git clone 

git checkout develop
npm install
# to install git hook on push
npm run install-git-hooks

# because of some bug you need to do production build once before making dev build
npm run build

# you need to do this once or when vendor stuff of build proccess gets updated
npm run prepare-dev
# start developing with auto reloading and recompiling
npm start
```

# Circuits

App use currently these services: Parse.com, custom server for payment\
each have two instances for production and development\
`CIRCUIT` is environment variable to control which set of services to use

```
CIRCUIT=development npm start
CIRCUIT=production npm start
```

basically you can run these commands to choose which `CIRCUIT` to use

default `CIRCUIT` for master branch is `production`, for others it is
`development`

# Deployment

prod.chef.one -> deployed on commit in master by ci `CIRCUIT=production
NODE_ENV=production`\
dev.chef.one -> deployed on commit in develop by ci `CIRCUIT=development NODE_ENV=production`\
chef.one -> deployed manually by command `RELEASE=IAMSURE npm run build-deploy`
`CIRCUIT=production NODE_ENV=production`

# Playground

Playground is based on [cosmos-js project](https://github.com/skidding/cosmos)

## Start

```
npm run playground
open http://localhost:8989/
```
