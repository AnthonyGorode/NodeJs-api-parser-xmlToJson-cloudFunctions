const admin = require("firebase-admin");

const config_adm_sdk = {
    
};

admin.initializeApp({
    credential: admin.credential.cert(config_adm_sdk),
    databaseURL: "https://afpaproject-156d2.firebaseio.com"
});

module.exports = admin;
