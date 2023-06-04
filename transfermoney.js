
// Get the pop-up element
var popup = document.getElementById("popup");

// Get the link for notifications
var link = document.querySelector(".text");

// Get the close button element
var close = document.querySelector(".close");

// When the user clicks on the link, open the pop-up
link.onclick = function () {
    popup.style.display = "block";
};

// When the user clicks on the close button, close the pop-up
close.onclick = function () {
    popup.style.display = "none";
};

// When the user clicks outside of the pop-up, close it
window.onclick = function (event) {
    if (event.target === popup) {
        popup.style.display = "none";
    }
};


// notifications.js
// JavaScript for the pop-up
var popup = document.getElementById("popup");
var link = document.querySelector(".text");
var close = document.querySelector(".close");

link.onclick = function () {
    popup.style.display = "block";
};

close.onclick = function () {
    popup.style.display = "none";
};

window.onclick = function (event) {
    if (event.target === popup) {
        popup.style.display = "none";
    }
};

// JavaScript for the notification functionality
var unreadSection = document.getElementById("unread-section");
var readSection = document.getElementById("read-section");
var reminderSection = document.getElementById("reminder-section");

var markReadBtn = document.getElementById("mark-read-btn");
markReadBtn.addEventListener("click", function () {
    var checkboxes = unreadSection.querySelectorAll(".notification-checkbox:checked");

    checkboxes.forEach(function (checkbox) {
        var notification = checkbox.parentNode;
        var notificationMessage = document.createElement("p");
        notificationMessage.className = "notification-message";
        notificationMessage.textContent = notification.querySelector(".notification-due").textContent;
        readSection.querySelector(".notification-list").appendChild(notificationMessage);
        notification.parentNode.removeChild(notification);
    });
});

var notificationNavLinks = document.querySelectorAll(".notification-nav a");
notificationNavLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        var tab = link.getAttribute("data-tab");

        if (tab === "unread") {
            unreadSection.style.display = "block";
            readSection.style.display = "none";
            reminderSection.style.display = "none";
        } else if (tab === "read") {
            unreadSection.style.display = "none";
            readSection.style.display = "block";
            reminderSection.style.display = "none";
        } else if (tab === "reminder") {
            unreadSection.style.display = "none";
            readSection.style.display = "none";
            reminderSection.style.display = "block";
        }

        notificationNavLinks.forEach(function (navLink) {
            navLink.classList.remove("active");
        });
        link.classList.add("active");
    });
});

var createReminderForm = document.getElementById("create-reminder-form");
createReminderForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var reminderTitle = document.getElementById("reminder-title").value;
    var reminderDate = document.getElementById("reminder-date").value;

    if (reminderTitle && reminderDate) {
        var reminderItem = document.createElement("div");
        reminderItem.className = "notification-item";
        reminderItem.innerHTML = `
      <span class="notification-title">You will be reminded on ${reminderDate} about: ${reminderTitle}</span>
    `;

        unreadSection.querySelector(".notification-list").appendChild(reminderItem);
        createReminderForm.reset();
        document.getElementById("success-message").style.display = "block";
        setTimeout(function () {
            document.getElementById("success-message").style.display = "none";
        }, 2000);
    } else {
        alert("Please fill in all fields");
    }
});

// Generate dummy notifications
var notificationsData = [
    { type: "bill", title: "Gas Bill", dueDate: "2023-06-10" },
    { type: "bill", title: "Electricity Bill", dueDate: "2023-06-15" },
    { type: "bill", title: "Water Bill", dueDate: "2023-06-20" },
    { type: "bill", title: "Telephone Bill", dueDate: "2023-06-25" },
    { type: "payment", title: "Loan Payment Reminder", dueDate: "2023-06-30" },
    { type: "payment", title: "Credit Card Bill Reminder", dueDate: "2023-07-05" }
];

var unreadNotificationList = unreadSection.querySelector(".notification-list");
notificationsData.forEach(function (notification) {
    var notificationItem = document.createElement("div");
    notificationItem.className = "notification-item";
    notificationItem.innerHTML = `
    <input type="checkbox" class="notification-checkbox">
    <span class="notification-title">${notification.title}</span>
    <span class="notification-due">Reminder: You have a ${notification.type === "bill" ? "bill" : "payment"} due on ${notification.dueDate}</span>
  `;

    unreadNotificationList.appendChild(notificationItem);
});

// Get the necessary elements
var balanceElement = document.getElementById("balance");
var transferForm = document.getElementById("transfer_form");
var bankDetails = document.getElementById("bank_details");
var transferButton = document.getElementById("transfer_button");
var submissionMessage = document.getElementById("submission_message");

// Add event listener to the transfer button
transferButton.addEventListener("click", function () {
    // Get the input values
    var fromAccount = document.getElementById("from_account").value;
    var toAccount = document.getElementById("to_account").value;
    var amount = parseFloat(document.getElementById("amount").value);
    var transferType = document.getElementById("transfer_type").value;
    var bankName = document.getElementById("bank_name").value;
    var bankBranch = document.getElementById("bank_branch").value;

    // Perform validation
    if (fromAccount === "" || toAccount === "" || isNaN(amount) || amount <= 0 || amount > parseFloat(balanceElement.textContent)) {
        if (amount > parseFloat(balanceElement.textContent)) {
            submissionMessage.textContent = "Insufficient funds. Please check your balance.";
            submissionMessage.classList.add("error");
        } 
        else if (isNaN(amount)) {
            submissionMessage.textContent = "Invalid amount. Please check your entries.";
            submissionMessage.classList.add("error");
        }
        else if (amount <= 0) {
            submissionMessage.textContent = "Amount Cannot be negative. Please check your entries.";
            submissionMessage.classList.add("error");
        }
        else if (fromAccount === "" || toAccount === "") {
            submissionMessage.textContent = "Please select the account numbers.";
            submissionMessage.classList.add("error");
        }
        else {
            submissionMessage.textContent = "Invalid input. Please check your entries.";
            submissionMessage.classList.add("error");
        }
    } else {
        // Calculate the updated balance
        var currentBalance = parseFloat(balanceElement.textContent);
        var updatedBalance = currentBalance - amount;

        // Update the balance display
        balanceElement.textContent = updatedBalance.toFixed(2);

        // Prepare the submission message
        var message = "Transfer successful. ";
        if (transferType === "domestic" || transferType === "international") {
            if (bankName === "" || bankBranch === "") {
                submissionMessage.textContent = "Please enter the bank name and bank branch.";
                submissionMessage.classList.add("error");
                return;
            }
            message += "Bank Name: " + bankName + ", Bank Branch: " + bankBranch + ". ";
        }
        message += "You will be transferring $" + amount.toFixed(2) + " from Account " + fromAccount + " to Account " + toAccount + ".";

        submissionMessage.textContent = message;
        submissionMessage.classList.remove("error");
    }

    // Reset the form
    transferForm.reset();

    // Reset transfer type and hide bank details for internal transfer
    document.getElementById("transfer_type").value = "internal";
    bankDetails.style.display = "none";
});

// Add event listener to the transfer type select element
document.getElementById("transfer_type").addEventListener("change", function () {
    if (this.value === "domestic" || this.value === "international") {
        bankDetails.style.display = "block";
    } else {
        bankDetails.style.display = "none";
    }
});

