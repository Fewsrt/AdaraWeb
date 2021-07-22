const firebaseConfig = {
  apiKey: "AIzaSyAwylkbFj2ZDeLuyAHSrr854C9RgDkDpfY",
  authDomain: "adaralinebot-wkyk.firebaseapp.com",
  projectId: "adaralinebot-wkyk",
  storageBucket: "adaralinebot-wkyk.appspot.com",
  messagingSenderId: "705464554867",
  appId: "1:705464554867:web:750cd9db9b9b3866bde106",
  measurementId: "G-5E90BKRCCX",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

var email = "";
var password = "";

async function runApp() {
  await liff
    .getProfile()
    .then((profile) => {
      document.getElementById("pictureUrl").src = profile.pictureUrl;
      document.getElementById("welcome").innerHTML =
        "<b>Welcome, </b> " + profile.displayName;
      document.getElementById("userId").innerHTML = '<b>UserId:</b> ' + profile.userId;
      document.getElementById("displayName").innerHTML = '<b>DisplayName:</b> ' + profile.displayName;
      document.getElementById("statusMessage").innerHTML = '<b>StatusMessage:</b> ' + profile.statusMessage;
      document.getElementById("getDecodedIDToken").innerHTML = '<b>Email:</b> ' + liff.getDecodedIDToken().email;
      email = liff.getDecodedIDToken().email;
      password = profile.userId;
    })
    .catch((err) => console.error(err));
}

liff.init(
  { liffId: "1656228840-yn8XQ9ar" },
  () => {
    if (liff.isLoggedIn()) {
      runApp();
    } else {
      liff.login();
    }
  },
  (err) => console.error(err.code, error.message)
);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    document.getElementById("btnLogIn").style.display = "none";
    document.getElementById("btnLogOut").style.display = "block";
  } else {
    document.getElementById("btnLogIn").style.display = "block";
    document.getElementById("btnLogOut").style.display = "none";
  }
});

function login() {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      if (user) {
        alert("Welcomeback");
      }
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("error signing in ", error.message);
      alert(error.message);
    });
}

function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
}
