// Initialize Firebase
let config = {
    apiKey: "AIzaSyBH8X7_ba8Yrz5mLUw8sM7GGI2QOujoej8",
    authDomain: "fir-sdkquest-574a4.firebaseapp.com",
    databaseURL: "https://fir-sdkquest-574a4.firebaseio.com",
    projectId: "fir-sdkquest-574a4",
    storageBucket: "fir-sdkquest-574a4.appspot.com",
    messagingSenderId: "497357880393"
};
firebase.initializeApp(config);


//AUTH
const uiConfig = {
    signInSuccessUrl: 'index.html',
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: 'http://localhost:8080/cgu' // conditions générales d'utilisation
};
// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);


function initApp(){
    firebase.auth().onAuthStateChanged(function (user) {
        document.getElementById('firebaseui-auth-container').style.display = 'block';
        if (user) {
            document.getElementById('firebaseui-auth-container').style.display = 'none';
            const displayName = user.displayName;
            const email = user.email;
            const emailVerified = user.emailVerified;
            const photoURL = user.photoURL;
            const uid = user.uid;
            const phoneNumber = user.phoneNumber;
            const providerData = user.providerData;

            user.getIdToken().then((accessToken) => {
                document.getElementById('sign-in-status').textContent = 'Signed in';
                document.getElementById('sign-in').textContent = 'Sign out';
            });

        } else {
            document.getElementById('sign-in-status').textContent = 'Signed out';
            document.getElementById('sign-in').textContent = 'Sign in';
        }
        if (user) {
            //WalckingDead
            let database = firebase.database();
            let myId = user.uid;
            ref = database.ref('walkingDead/' + myId);
            console.log(myId)

            ref.on("value", function (snapshot) {
                let i = 0;
                if (snapshot.val() != null) {
                    let keys = Object.keys(snapshot.val());
                    document.getElementById("character").innerHTML = "";
                    while (i < keys.length) {
                        document.getElementById("character").innerHTML += "<li>" + snapshot.val()[keys[i]].name + "</li>";
                        i++;
                    }
                } else {
                    creatCharacter("Carle Grimes");
                    creatCharacter("Rick Grimes");
                    creatCharacter("Negan");
                    creatCharacter("Michonne");
                    creatCharacter("Glenn");
                    creatCharacter("Daryl Dixon");
                    creatCharacter("Andréa");
                    creatCharacter("Gareth");
                }
                console.log(snapshot.val());
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
            document.getElementById("notAuth").style.display = "block";            
        }
    }, (error) => { // gestion de erreur de connexion
        console.error(error);
    });
}
let database = firebase.database();
let ref;

function myFunction() {
    console.log(document.getElementById("myForm").value);
    creatCharacter(document.getElementById("myForm").value);
}

function creatCharacter(name) {
    let character = {
        name: name,
    };
    ref.push(character);
}

initApp();

function logOut() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });
}

