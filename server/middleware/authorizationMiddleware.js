const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");

const checkJwt = auth({
  audience: "http://catcouture.com",
  issuerBaseURL: "https://dev-izkt0uvu5yiwnl5k.us.auth0.com",
  // tokenSigningAlg: "RS256",
});

const checkScopes = requiredScopes("");

module.exports = {
  checkJwt,
  checkScopes,
};
