/**
 * Created by sergiodiazpinilla on 25/04/17.
 *
 *
 */
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var path = require('path');

var filePath = path.join(__dirname, 'client_secret.json');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/script-nodejs-quickstart.json

var SCOPES = [
    'https://mail.google.com/',
    'https://www.googleapis.com/auth/documents',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/script.external_request',
    'https://www.googleapis.com/auth/script.scriptapp',
    'https://www.googleapis.com/auth/script.send_mail',
    'https://www.googleapis.com/auth/script.storage',
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/userinfo.email'];



var TOKEN_DIR = '.credentials/';
var TOKEN_PATH = path.join(__dirname, '.credentials/script-nodejs-quickstart.json');
//Load client secrets from a local file.

var sendResponce = module.exports.sendResponce = function(){
    fs.readFile(filePath, function processClientSecrets(err, content) {
        if (err) {
            console.log('Error loading client secret file: ' + err);
            return;
        }
        // Authorize a client with the loaded credentials, then call the
        // Google Apps Script Execution API.
        console.log(JSON.parse(content));
        authorize(JSON.parse(content), callAppsScript);
    });
};


var continueQuotation = module.exports.continueQuotation = function(){
    fs.readFile(filePath, function processClientSecrets(err, content) {
        if (err) {
            console.log('Error loading client secret file: ' + err);
            return;
        }
        // Authorize a client with the loaded credentials, then call the
        // Google Apps Script Execution API.
        console.log(JSON.parse(content));
        authorize(JSON.parse(content), callAppsScript2);
    });
};
/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    console.log(credentials);
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    var auth = new googleAuth();
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, function(err, token) {
        if (err) {
            getNewToken(oauth2Client, callback);
        } else {
            oauth2Client.credentials = JSON.parse(token);
            callback(oauth2Client);
        }
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
    var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Enter the code from that page here: ', function(code) {
        rl.close();
        oauth2Client.getToken(code, function(err, token) {
            if (err) {
                console.log('Error while trying to retrieve access token', err);
                return;
            }
            oauth2Client.credentials = token;
            storeToken(token);
            callback(oauth2Client);
        });
    });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
    try {
        fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
        if (err.code != 'EEXIST') {
            throw err;
        }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token));
    console.log('Token stored to ' + TOKEN_PATH);
}

/**
 * Call an Apps Script function to list the folders in the user's root
 * Drive folder.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function callAppsScript(auth) {
    var scriptId = 'MUuPJ8FGShbQxCrCBI9ZKxZbyaOoD42jf';
    var script = google.script('v1');

    // Make the API request. The request object is included here as 'resource'.
    script.scripts.run({
        auth: auth,
        resource: {
            function: 'test'
        },
        scriptId: scriptId
    }, function(err, resp) {
        if (err) {
            // The API encountered a problem before the script started executing.
            console.log('The API returned an error: ' + err);
            return;
        }
        if (resp.error) {
            // The API executed, but the script returned an error.

            // Extract the first (and only) set of error details. The values of this
            // object are the script's 'errorMessage' and 'errorType', and an array
            // of stack trace elements.
            var error = resp.error.details[0];
            console.log('Script error message: ' + error.errorMessage);
            console.log('Script error stacktrace:');

            if (error.scriptStackTraceElements) {
                // There may not be a stacktrace if the script didn't start executing.
                for (var i = 0; i < error.scriptStackTraceElements.length; i++) {
                    var trace = error.scriptStackTraceElements[i];
                    console.log('\t%s: %s', trace.function, trace.lineNumber);
                }
            }
        } else {
            // The structure of the result will depend upon what the Apps Script
            // function returns. Here, the function returns an Apps Script Object
            // with String keys and values, and so the result is treated as a
            // Node.js object (folderSet).
            var folderSet = resp.response.result;
            console.log(resp.response);
        }

    });
}


function callAppsScript2(auth) {
    var scriptId = 'MUuPJ8FGShbQxCrCBI9ZKxZbyaOoD42jf';
    var script = google.script('v1');

    // Make the API request. The request object is included here as 'resource'.
    script.scripts.run({
        auth: auth,
        resource: {
            function: 'main_Quotation'
        },
        scriptId: scriptId
    }, function(err, resp) {
        if (err) {
            // The API encountered a problem before the script started executing.
            console.log('The API returned an error: ' + err);
            return;
        }
        if (resp.error) {
            // The API executed, but the script returned an error.

            // Extract the first (and only) set of error details. The values of this
            // object are the script's 'errorMessage' and 'errorType', and an array
            // of stack trace elements.
            var error = resp.error.details[0];
            console.log('Script error message: ' + error.errorMessage);
            console.log('Script error stacktrace:');

            if (error.scriptStackTraceElements) {
                // There may not be a stacktrace if the script didn't start executing.
                for (var i = 0; i < error.scriptStackTraceElements.length; i++) {
                    var trace = error.scriptStackTraceElements[i];
                    console.log('\t%s: %s', trace.function, trace.lineNumber);
                }
            }
        } else {
            // The structure of the result will depend upon what the Apps Script
            // function returns. Here, the function returns an Apps Script Object
            // with String keys and values, and so the result is treated as a
            // Node.js object (folderSet).
            var folderSet = resp.response.result;
            console.log(resp.response);
        }

    });
}