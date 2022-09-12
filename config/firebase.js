const admin = require("firebase-admin");

const config_adm_sdk = {
    "type": "service_account",
    "project_id": "afpaproject-156d2",
    "private_key_id": "43904982cd82cfab6cd33b0838d865aa98a9ee1e",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCpYmB79ECoyQaO\nNzd2aWVYlrQQkJcNIPbfFGQj/vdLwS8AEQayCQufoHrKKpV0PIADwwFNHl1Uk9mU\nbOJP0E2lw+T9IO8QPZEc6R8tLCqOrYTUDlq2odShJYTk5AKnaJdBs9foDhoP9m87\nMRy4L3ApHEZSTDHZC1sXHb/8UrL337/eanYyDEpM2vIRbYjp2sED8NmHhrsJamd3\n8WPX4CO6YQVxQ5YZMZpST1ECMw34Tg748GtFRgAn955MpR5BPZeRx6aiFVQpTJAh\nWmYE7inWfxY7IEhLgtRFv4KYaQXM8nOFfokNTIjJr6qDOrcU8cXP9cT7f8yx41qu\n/0xIbH+FAgMBAAECggEAGi1+jNmgXpWG4lbNRwsd4xWTaZX3Ckvka3Ca02dVr8sA\n6Qk4mC5Gshpar8DqDSdGf45VNqZxNR+Oel5jkYM3ZN2EF8zNtZxWP3oV2+TeBOPz\nSdSYF26mTmtegQNuF5JWAgz52r7HL11eLm82KY8HTgs1IQXulEUphEaQQ75CM4WL\n7d+aMjoWXjYFX9det84AkQLcQOV02NBIEXhqNwvU/TxuFNcXYuuNDt5WsedGm16d\n54NGH/EdxcOiR2MLzmv63qfMA4vsTGhPM8bBtLasa9Zeclr9tF95AkM2BlNbuZ+z\nKIqQ/IHhbsBSxKfyCVnyyaq3HcCoq+3WGnI2XkAgIQKBgQDhv7jB4DvV3R336MrR\no8SlzFt4+jij2btWls2jbxM2Uldb5UDshqs1Ik8y6MfSSWvD9Q3HWP07AVxuGcM1\n7ZW7T47AIPyaezNBJL5Ol0TtULYQrEpS32ircBBULNnWJJl5zJYS+F33p2IsNFfd\ncvHwM3IErW9KRf4Jl4O+amAr9QKBgQDAFRN+DtpitgTLZy+CjtKmaEpqtMRY3qX1\nC4oMYADnqs3kGk40S4qHP3V4An64Vjm5x9BzinAUjlARup1hrIQgYnTjCGvyp5m0\nL8FShcbUjX/eOVtIrqj0bujj2D7l7iWfKvGy2qnLalFl3hcQWJz3hx591PoENRyO\nD6BvdlTbUQKBgQCBAr0GZywqy0POIoaOCeZezgvUdkMaOFscX/BDHz4+hA4SoVBa\nG5gKNIJIWMmhPn5MrWXjb9K//sYg0a5CynUQZ6Xv3Kofapre9q2fYklsyfxSSPPs\nqmo510AtqrgO7jmbZrS5QKEK3+h11LAGCSOEnxHg5HC+ZIOKXcFXd5lgZQKBgAvY\nANiv/8VAZfFIzoQlXFXIbnY/6S91oxQF/yAeN1ARlxpuiM3urn8CabLZrIifQHX1\nHSRSr/CEield8WBZa9g3We+50DYpIXAb1bbJ6uWmR/Ei5j8IDgDsac3Kwq4YzhcP\nZdHaa8fQKW63kAKBBES6/yVRIY1q3PThf8n/qOHRAoGBAIb2iGiwmcKm4dfWvLkw\nPAqKNvIFszyU0iSPrFcU2++5d5Nu/FfB1PGFl0VSd/5wHRTzm8rELj/jm7iy7Pxt\n/o/jGaQ8BZXuQ2PoIzmGSlQ2TCO26DelMZCfpNv/lGF8C5LzKf1goWQLwD9AkJma\nGDFYlWDkNX7zCrdgheEzdBp/\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-5huby@afpaproject-156d2.iam.gserviceaccount.com",
    "client_id": "101649880823849081422",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-5huby%40afpaproject-156d2.iam.gserviceaccount.com"
};

admin.initializeApp({
    credential: admin.credential.cert(config_adm_sdk),
    databaseURL: "https://afpaproject-156d2.firebaseio.com"
});

module.exports = admin;