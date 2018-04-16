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

let database = firebase.database();
let ref = database.ref('walkingDead');


// Attach an asynchronous callback to read the data at our posts reference

ref.on("value", function (snapshot) {
    let i = 0;
    let keys = Object.keys(snapshot.val());
    document.getElementById("character").innerHTML = "";
    while (i < keys.length) {
        document.getElementById("character").innerHTML += "<li>" + snapshot.val()[keys[i]].name + "</li>";
        i++;
    }

    /* console.log(Object.keys(snapshot.val())); */
    /* document.getElementById("character").innerHTML = snapshot.val()[1].name; */
    console.log(snapshot.val());
},
    function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

function myFunction() {
    console.log(document.getElementById("myForm").value);
    let character = {
        name: document.getElementById("myForm").value,
    };

    ref.push(character);
    /* document.getElementById("character").innerHTML; */
    /* ref.push("myForm"); */
}
