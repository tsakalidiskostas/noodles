'use strict';

const express    = require('express');
const ctr        = rootRequire('controllers');
// Ex. const ctrTestNotification      = rootRequire('controllers/TestNotification');
// Ex. const ctrWebPushNotifications  = rootRequire('controllers/JourneyActivities/WebPushNotifications');

const router     = express.Router();

//Home
//Ex. router.get('/config.json', ctr.configActivity);
router.get('/|index|index.html', ctr.index);


module.exports = router;