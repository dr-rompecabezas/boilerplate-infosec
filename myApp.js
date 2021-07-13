const express = require('express');
const helmet = require("helmet");
const app = express();


// The quick method (disabled for learning purposes) activates 11 middleware at once. See docs.
// app.use(helmet());

// Removes the X-Powered-By header if it was set.
app.use(helmet.hidePoweredBy());

// Sets "X-Frame-Options: DENY"
app.use(
  helmet.frameguard({
    action: "deny",
  })
);

// Sets "X-XSS-Protection: 0"
app.use(helmet.xssFilter());

// Sets "X-Content-Type-Options: nosniff"
app.use(helmet.noSniff());

// [IE8] Sets "X-Download-Options: noopen"
app.use(helmet.ieNoOpen());

// Sets "Strict-Transport-Security (HTTPS)"
// NOTE. Replit already has hsts enabled. To override its settings you need to set the field "force" to true in the config object.
ninetyDaysInSeconds = 90*24*60*60;
app.use(
  helmet.hsts({
    maxAge: ninetyDaysInSeconds,
    force: true,
  })
);

// Sets "X-DNS-Prefetch-Control: off"
app.use(helmet.dnsPrefetchControl());

// If you are releasing an update for your website, and you want the users to always download the newer version, you can (try to) disable caching on client’s browser. It can be useful in development too. Caching has performance benefits, which you will lose, so only use this option when there is a real need.
app.use(helmet.noCache());

// By setting and configuring a Content Security Policy you can prevent the injection of anything unintended into your page. This will protect your app from XSS vulnerabilities, undesired tracking, malicious frames, and much more. 
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "trusted-cdn.com"],
    },
  })
);




module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
