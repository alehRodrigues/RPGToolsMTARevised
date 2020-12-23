initApp = function () {
    firebase.auth().onAuthStateChanged(function (user) {

        var currentUser = null;

        if (user) {

            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var uid = user.uid;
            var phoneNumber = user.phoneNumber;
            var providerData = user.providerData;

            user.getIdToken().then(function (accessToken) {
                currentUser = JSON.stringify({
                    displayName: displayName,
                    email: email,
                    emailVerified: emailVerified,
                    phoneNumber: phoneNumber,
                    photoURL: photoURL,
                    uid: uid,
                    jwtToken: accessToken,
                    providerData: providerData

                }, null, '  ');

                DotNet.invokeMethod("RPGToolsMTARevised", "Login", currentUser);

            });

        } else {

            DotNet.invokeMethod("RPGToolsMTARevised", "Login", currentUser);
            // User is signed out.
            //document.getElementById('sign-in-status').textContent = 'Signed out';
            //document.getElementById('sign-in').textContent = 'Sign in';
            //document.getElementById('account-details').textContent = 'null';
        }

    }, function (error) {
        console.log(error);
    });
};

window.addEventListener('load', function () {
    initApp();
});