exports = module.exports = function() {
  
  return function translateToTwilio(ctx, options, cb) {
    var grants = {};
    
    if (ctx.user) {
      grants.identity = ctx.user.id;
    }
    
    // TODO: Base object key off service URL.
    // url: 'https://chat.twilio.com/v2',
    grants.ip_messaging = {
      sid: process.env['TWILIO_CHAT_SID']
    };
    
    return cb(null, { grants: grants });
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/tokens/translateContextFunc';
exports['@dialect'] = 'http://schemas.modulate.io/tokens/jwt/twilio';
