
const env =  'dev';// :prod: 'dev'

// development or production host
const hosts = {
  dev: 'http://python.joyfort.com',
  prod: 'https://test.lefou666.com'
}

var globalConfig={
    ServerUrl:hosts[env]
}
function getServerUrl() {
    return globalConfig.ServerUrl;
}
module.exports = {
    env:env,
    config:globalConfig,
    getServerUrl:getServerUrl
}
// export {
//     getServerUrl
// }