const labels = document.querySelectorAll('.form-control label')

labels.forEach(label => {
    label.innerHTML = label.innerText.split('').map((letter, idx) => `<span style="transition-delay: ${idx * 50}ms">${letter}</span>`).join('')
})

// Get the pop-up element
var popup = document.getElementById("popup");

// Getthe button that opens the pop-up
var btn = document.querySelector(".forgot-password");

// Get the close button element
var close = document.querySelector(".close");

// When the user clicks on the button, open the pop-up
btn.onclick = function () {
    popup.style.display = "block";
}

// When the user clicks on the close button, close the pop-up
close.onclick = function () {
    popup.style.display = "none";
}

// When the user clicks outside of the pop-up, close it
window.onclick = function (event) {
    if (event.target == popup) {
        popup.style.display = "none";
    }
}

// Get the pop-up element
var popup1 = document.getElementById("popup1");

// Getthe button that opens the pop-up
var btn1 = document.querySelector(".register");

// Get the close button element
var close1 = document.querySelector(".close1");

// When the user clicks on the button, open the pop-up
btn1.onclick = function () {
    popup1.style.display = "block";
}

// When the user clicks on the close button, close the pop-up
close1.onclick = function () {
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm-password").value;

    if (password == confirmPassword) {
        successMessage.style.display = "flex"; // Display success message
        setTimeout(function () {
            window.location.href = "UserLogin.html";
        }, 5000);
    } else {
        alert("Passwords do not match.");
    }
}
  

// When the user clicks outside of the pop-up, close it
window.onclick = function (event) {
    if (event.target == popup1) {
        popup1.style.display = "none";
    }
}