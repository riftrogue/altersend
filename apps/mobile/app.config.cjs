const appJson = require('./app.json')

const clone = (value) => JSON.parse(JSON.stringify(value))

module.exports = ({ config }) => ({
  ...config,
  ...clone(appJson.expo)
})
