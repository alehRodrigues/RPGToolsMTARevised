//File of configuration of firebase API

const firebaseConfig = {
    apiKey: "AIzaSyBpzy6EviWwgt8ngI7uhgDoME3hM2dXmUA",
    authDomain: "rpgtools-862f1.firebaseapp.com",
    databaseURL: "https://rpgtools-862f1.firebaseio.com",
    projectId: "rpgtools-862f1",
    storageBucket: "rpgtools-862f1.appspot.com",
    messagingSenderId: "988648860664",
    appId: "1:988648860664:web:3f6684417faba90bed840d"
}

const app = firebase.initializeApp(firebaseConfig);

document.addEventListener('DOMContentLoaded', function () {

    // Get the action to complete.
    var mode = getParameterByName('mode');
    // Get the one-time code from the query parameter.
    var actionCode = getParameterByName('oobCode');
    // (Optional) Get the continue URL from the query parameter if available.
    var continueUrl = getParameterByName('continueUrl');
    // (Optional) Get the language code if available.
    var lang = getParameterByName('lang') || 'en';

    //console.log(mode);
    //console.log(actionCode);
    //console.log(continueUrl);
    //console.log(lang);

    // Configure the Firebase SDK.
    // This is the minimum configuration required for the API to be used.
    var auth = app.auth();

    // Handle the user management action.
    switch (mode) {
        case 'resetPassword':
    // Display reset password handler and UI.
            handleResetPassword(auth, actionCode, continueUrl, lang);
            break;
        case 'recoverEmail':
    // Display email recovery handler and UI.
            handleRecoverEmail(auth, actionCode, lang);
            break;
        case 'verifyEmail':
    // Display email verification handler and UI.
            console.log('vericar email');
            handleVerifyEmail(auth, actionCode, continueUrl, lang);
            break;
        case 'signIn':
            console.log('tentando logar');
            handlerSignInByLink(auth);
        default:
    // Error: invalid mode.
    }
}, false);

//Custom function for get query parameters
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

function handleResetPassword(auth, actionCode, continueUrl, lang) {
    // Localize the UI to the selected language as determined by the lang
    // parameter.
    var accountEmail;
    // Verify the password reset code is valid.
    auth.verifyPasswordResetCode(actionCode).then(function (email) {
        var accountEmail = email;

        // TODO: Show the reset screen with the user's email and ask the user for
        // the new password.

        // Save the new password.
        auth.confirmPasswordReset(actionCode, newPassword).then(function (resp) {
            // Password reset has been confirmed and new password updated.

            // TODO: Display a link back to the app, or sign-in the user directly
            // if the page belongs to the same domain as the app:
            // auth.signInWithEmailAndPassword(accountEmail, newPassword);

            // TODO: If a continue URL is available, display a button which on
            // click redirects the user back to the app via continueUrl with
            // additional state determined from that URL's parameters.
        }).catch(function (error) {
            // Error occurred during confirmation. The code might have expired or the
            // password is too weak.
        });
    }).catch(function (error) {
        // Invalid or expired action code. Ask user to try to reset the password
        // again.
    });
}

function handleRecoverEmail(auth, actionCode, lang) {
    // Localize the UI to the selected language as determined by the lang
    // parameter.
    var restoredEmail = null;
    // Confirm the action code is valid.
    auth.checkActionCode(actionCode).then(function (info) {
        // Get the restored email address.
        restoredEmail = info['data']['email'];

        // Revert to the old email.
        return auth.applyActionCode(actionCode);
    }).then(function () {
        // Account email reverted to restoredEmail

        // TODO: Display a confirmation message to the user.

        // You might also want to give the user the option to reset their password
        // in case the account was compromised:
        auth.sendPasswordResetEmail(restoredEmail).then(function () {
            // Password reset confirmation sent. Ask user to check their email.
        }).catch(function (error) {
            // Error encountered while sending password reset code.
        });
    }).catch(function (error) {
        // Invalid code.
    });
}

function handleVerifyEmail(auth, actionCode, continueUrl, lang) {
    // Localize the UI to the selected language as determined by the lang
    // parameter.
    // Try to apply the email verification code.
    auth.applyActionCode(actionCode).then(function (resp) {
        // Email address has been verified.
        // TODO: Display a confirmation message to the user.
        // You could also provide the user with a link back to the app.

        // TODO: If a continue URL is available, display a button which on
        // click redirects the user back to the app via continueUrl with
        // additional state determined from that URL's parameters.
    }).catch(function (error) {
        console.log(error);
        // Code is invalid or expired. Ask the user to verify their email address
        // again.
    });
}

function handlerSignInByLink(auth) {

    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
        var email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
            // User opened the link on a different device. To prevent session fixation
            // attacks, ask the user to provide the associated email again. For example:
            email = window.prompt('Please provide your email for confirmation');
        }

        firebase.auth().signInWithEmailLink(email, window.location.href)
            .then(function (result) {
                // Clear email from storage.
                window.localStorage.removeItem('emailForSignIn');
                //console.log("logado");
                // You can access the new user via result.user
                // Additional user info profile not available via:
                // result.additionalUserInfo.profile == null
                // You can check if the user is new or existing:
                // result.additionalUserInfo.isNewUser
            })
            .catch(function (error) {
                // Some error occurred, you can inspect the code: error.code
                // Common errors could be invalid email and invalid or expired OTPs.
            });
    }
}