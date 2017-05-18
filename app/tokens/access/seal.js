exports = module.exports = function() {
  // Load modules.
  var AccessToken = require('twilio').jwt.AccessToken;
  var IpMessagingGrant = AccessToken.IpMessagingGrant;
  
  // https://www.twilio.com/docs/api/rest/access-tokens
  // https://www.twilio.com/docs/api/chat/guides/create-tokens
  // https://www.twilio.com/docs/api/chat/guides/identity
  
  // https://www.twilio.com/docs/api/chat/guides/quickstart-js
  // https://github.com/TwilioDevEd/sdk-starter-node
  return function seal(claims, options, cb) {
    var grant;
    
    var accountSid = process.env['TWILIO_ACCOUNT_SID'];
    var apiKeySid = process.env['TWILIO_API_KEY_SID'];
    var apiKeySecret = process.env['TWILIO_API_KEY_SECRET'];
    
    var token = new AccessToken(accountSid, apiKeySid, apiKeySecret);
    
    for (key in claims.grants) {
      grant = claims.grants[key];
      
      switch (key) {
      case 'identity':
        token.identity = grant;
      case 'ip_messaging':
        token.addGrant(new IpMessagingGrant({
          serviceSid: grant.sid
        }));
        break;
      }
    }
    
    var jwt = token.toJwt();
    return cb(null, jwt);
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/tokens/sealFunc';
exports['@type'] = 'http://schemas.modulate.io/tokens/jwt/twilio';
exports['@require'] = [];
