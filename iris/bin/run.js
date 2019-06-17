'use strict';

const slackClient = require('../server/slackClient');
const service = require('../server/service');
const http = require('http');
const server = http.createServer(service);
const env = require("./env");

const witClient = require('../server/witClient')(env.WIT_TOKEN);

const slackLogLevel = 'verbose';

const serviceRegistry = service.get('serviceRegistry');
const rtm = slackClient.init(env.SLACK_TOKEN, slackLogLevel, witClient, serviceRegistry);
rtm.start();

slackClient.addAuthenticatedHandler(rtm, () => server.listen(3000));

server.on('listening', function() {
    console.log(`IRIS is listening on ${server.address().port} in ${service.get('env')} mode.`);
});
