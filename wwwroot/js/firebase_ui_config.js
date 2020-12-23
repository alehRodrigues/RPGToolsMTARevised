//File of configuration and interop of firebase

const uiConfig = {

    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        //Configuração do Google Provider
        {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            customParameters: { prompt: 'select_account'}
        },

        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            //signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD, 
            signInMethod: firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
            requireDisplayName: true
        }
        
        //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        //firebase.auth.GithubAuthProvider.PROVIDER_ID,
        //firebase.auth.EmailAuthProvider.PROVIDER_ID,
        //firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        //firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: '/',
    // Privacy policy url/callback.
    privacyPolicyUrl: function () {
        window.location.assign('/');
    }

};

//Set persistence of authenticate status SESSION for development
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
const ui = new firebaseui.auth.AuthUI(firebase.auth());

//Invokable in C#
window.StartAuthUI = () => {
    
    ui.start('#firebaseui-auth-container', uiConfig);
};
