var firebaseConfig = {
    apiKey: "AIzaSyAlzrsToitMnU6rKzTPslcwOslICow6qMk",
    authDomain: "testing-web-app-c218e.firebaseapp.com",
    projectId: "testing-web-app-c218e",
    storageBucket: "testing-web-app-c218e.appspot.com",
    messagingSenderId: "47486244519",
    appId: "1:47486244519:web:b4b96a4274663487c02d82"
};

var app = firebase.initializeApp(firebaseConfig);

var auth = firebase.auth()

function changeIcon() {
    var passwordInput = document.getElementById('password');
    var img = document.getElementById('img');

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        img.src = "./images/eye.png"
    }
    else {
        passwordInput.type = "password";
        img.src = "./images/hidden.png"
    }
}
function validation() {
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var mobileNumber = document.getElementById("mobileNumber").value;

    var userCheck = /^[A-Za-z][A-Za-z0-9_]{7,29}$/;
    var emailCheck = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    var passwordCheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    var mobileCheck = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;

    if (userCheck.test(username)) {
        document.getElementById("usernameError").innerHTML = "";
    }
    else {
        document.getElementById("usernameError").innerHTML = "** Invalid username";
        return false
    }

    if (emailCheck.test(email)) {
        document.getElementById("emailError").innerHTML = "";
    }
    else {
        document.getElementById("emailError").innerHTML = "** Invalid email";
        return false
    }

    if (passwordCheck.test(password)) {
        document.getElementById("passwordError").innerHTML = "";
    }
    else {
        document.getElementById("passwordError").innerHTML = "** Invalid password";
        return false
    }

    if (mobileCheck.test(mobileNumber)) {
        document.getElementById("mobileError").innerHTML = "";
    }
    else {
        document.getElementById("mobileError").innerHTML = "** Invalid Mobile Number";
        return false
    }
    var obj = {
        username,
        mobileNumber
    }
    localStorage.setItem("userDetails", JSON.stringify(obj))

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log(user);
            window.location = "profile.html"
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
        });
}


function login() {

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log(user);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
        });
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        if (location.pathname !== "/profile.html") {
            window.location = "profile.html"
        }
        console.log(user)
    } else {
        if (location.pathname !== "/login.html" && location.pathname !== "/signup.html") {
            window.location = "login.html";
        }
        console.log("not Login")
    }
});

