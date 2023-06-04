// Global variable
let isLoggedIn = false;

// Function to set isLoggedIn to true
function setLoggedIn() {
    isLoggedIn = true;
}

function logout() {
    isLoggedIn = false;
    toggleLoginButton();
    // Perform any other logout tasks if needed
  }
  

// Example login function
function loginInUserPage() {
    // Perform login validation and authentication here
    // If login is successful, call the setLoggedIn() function
    var username = document.getElementById("email123").value;
    var password = document.getElementById("pass123").value;
    if (username === "seif.hoss@lol.com" && password === "123") {
        setLoggedIn();
        location.replace('/transactions.html');
    } else {
        
        if (username == "banker@lol.com" && password == "123") {
            setLoggedIn();
            location.replace('/BankerAccount.html');
        }
        else {
            if (username == "admin@lol.com" && password == "123") {
                setLoggedIn();
                location.replace('/Admin.html');
            }
            else {
                alert("Wrong username or password.");
            }
        }
    }
}

function checkIfLoggedIn(event) {
    if (!isLoggedIn) {
        event.preventDefault(); // Prevent the default behavior of the link element
        alert("You are not logged in.");
    }
}  

function toggleLoginButton() {
    alert('hi');
    const loginButton = document.getElementById("loginButton");
    alert('hi');
    if (isLoggedIn) {
      loginButton.textContent = "Logout";
      loginButton.setAttribute("onclick", "logout()");
    } else {
      loginButton.textContent = "Login";
      loginButton.setAttribute("onclick", "loginInUserPage()");
    }
}