import {BootstrapCookieConsentSettings} from "./cookie-consent.js";
this.props = {
    autoShowDialog: true, // disable autoShowModal on the privacy policy and legal notice pages, to make these pages readable
    lang: navigator.language, // the language, in which the modal is shown
    languages: [ "de"], // supported languages (in ./content/), defaults to first in array
    contentURL: "../content", // this URL must contain the dialogs content in the needed languages
    cookieName: "cookie-consent-settings",  // the name of the cookie in which the configuration is stored as JSON
    cookieStorageDays: 365, // the duration the cookie configuration is stored on the client
    postSelectionCallback: getScript // callback function, called after the user has made his selection
}
var cookieSettings = new BootstrapCookieConsentSettings(props)
 cookieSettings.showDialog();

function getScript() {
    var cookies = cookieSettings.getSettings();
    if(cookies.analyses){
        let script = document.createElement( 'script' );
        script.type = 'text/javascript';
        script.src = "https://www.googletagmanager.com/gtag/js?id=G-6YMRPBDDN1";
        let script2 = document.createElement( 'script' );
        script2.innerHTML="  window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date());gtag('config', 'G-6YMRPBDDN1');"
        document.head.appendChild(script);
        document.head.appendChild(script2);

        console.log('getScript executed');
    }else  {
        console.log('getScript not executed')
    }

}