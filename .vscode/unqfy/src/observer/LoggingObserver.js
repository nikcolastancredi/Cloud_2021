const LogginClient = require('../clientApi/LogginClient');
const Observer = require("./Observer");
const LogginClientInstance = new LogginClient.LogginClient();

class ObserverLogging extends Observer {

}

module.exports = ObserverLogging;