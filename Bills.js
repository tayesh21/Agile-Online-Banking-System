document.addEventListener("DOMContentLoaded", function () {
  const billTypes = document.querySelectorAll(".bill-type");

  billTypes.forEach(function (billType) {
    const showDetailsButton = billType.querySelector(".show-details-button");
    const feesElement = billType.querySelector(".fees");
    const submissionMessage = billType.querySelector(".submission-message");
    const errorMessage = billType.querySelector(".error-message");
    const fullPaymentButton = billType.querySelector(".full-payment-button");
    const partialPaymentButton = billType.querySelector(".partial-payment-button");
    const partialPaymentInput = billType.querySelector(".partial-payment-input");
    const payNowButton = billType.querySelector(".pay-now-button");

    showDetailsButton.addEventListener("click", function () {
      const details = billType.querySelector(".details");
      details.style.display = "block";
    });

    function deleteBill() {
      const billTypeElement = button.parentNode.parentNode;
      billTypeElement.parentNode.removeChild(billTypeElement);
    }

    // Event listener for "Pay in Full" button
    fullPaymentButton.addEventListener("click", function () {
      const fees = parseFloat(feesElement.textContent.replace("Fees: $", ""));
      const accountBalance = parseFloat(document.querySelector(".credit-card-balance h3").textContent.replace("Account Balance: $", ""));

      if (accountBalance >= fees) {
        const updatedBalance = accountBalance - fees;
        feesElement.textContent = "Fees: Paid";
        submissionMessage.style.display = "block";
        submissionMessage.textContent = "Full payment is submitted successfully.";
        errorMessage.textContent = "";
        fullPaymentButton.disabled = true;
        partialPaymentButton.disabled = true;
        partialPaymentInput.disabled = true;
        payNowButton.disabled = true;
        document.querySelector(".credit-card-balance h3").textContent = "Account Balance: $" + updatedBalance.toFixed(2);

        setTimeout(function () {
          var billTypeElement = fullPaymentButton.parentNode.parentNode;
          billTypeElement.parentNode.removeChild(billTypeElement);
        }, 5000); // Remove the bill after 5 seconds
      } else {
        errorMessage.textContent = "Error: Insufficient balance to pay the bill.";
        errorMessage.style.color = "red";
        submissionMessage.style.display = "none";
      }
    });



    partialPaymentButton.addEventListener("click", function () {
      partialPaymentInput.style.display = "block";
      payNowButton.style.display = "block";
      payNowButton.disabled = true; // Disable the button initially
    });

    partialPaymentInput.addEventListener("input", function () {
      const amount = parseFloat(this.value);
      const fees = parseFloat(feesElement.textContent.replace("Fees: $", ""));
      const accountBalance = parseFloat(document.querySelector(".credit-card-balance h3").textContent.replace("Account Balance: $", ""));

      if (amount > 0 && amount <= fees && amount <= accountBalance && Number.isInteger(amount)) {
        errorMessage.textContent = "Amount is valid.";
        //change the color of the text to green
        errorMessage.style.color = "green";
        submissionMessage.style.display = "none";
        payNowButton.disabled = false; // Enable the button if amount is a whole number and meets the conditions
      }
      else {
        if (!Number.isInteger(amount)) {
          errorMessage.textContent = "Error: Invalid amount.";
          errorMessage.style.color = "red";
          submissionMessage.style.display = "none";
        }
        if (amount > fees) {
          errorMessage.textContent = "Error: Payment amount exceeds bills's fees.";
          errorMessage.style.color = "red";
          submissionMessage.style.display = "none";
        }
        if (amount > accountBalance) {
          errorMessage.textContent = "Error: Payment amount exceeds account balance.";
          errorMessage.style.color = "red";
          submissionMessage.style.display = "none";
        }
        if (amount <= 0) {
          errorMessage.textContent = "Error: Payment amount must be greater than 0.";
          errorMessage.style.color = "red";
          submissionMessage.style.display = "none";
        }
        payNowButton.disabled = true; // Disable the button if amount is not a whole number or does not meet the conditions
      }
    });

    payNowButton.addEventListener("click", function () {
      const amount = parseFloat(partialPaymentInput.value);
      const fees = parseFloat(feesElement.textContent.replace("Fees: $", ""));
      const accountBalance = parseFloat(document.querySelector(".credit-card-balance h3").textContent.replace("Account Balance: $", ""));

      if (amount <= accountBalance && amount <= fees) {
        const updatedBalance = accountBalance - amount;
        const updatedFees = fees - amount;

        if (updatedFees === 0) {
          feesElement.textContent = "Fees: Paid";
          submissionMessage.style.display = "block";
          submissionMessage.textContent = "Full payment is submitted successfully.";
          errorMessage.textContent = "";
          fullPaymentButton.disabled = true;
          partialPaymentButton.disabled = true;
          partialPaymentInput.disabled = true;
          payNowButton.disabled = true;
          document.querySelector(".credit-card-balance h3").textContent = "Account Balance: $" + updatedBalance.toFixed(2);

          setTimeout(function () {
            var billTypeElement = payNowButton.parentNode.parentNode;
            billTypeElement.parentNode.removeChild(billTypeElement);
          }, 5000);
        } else if (updatedFees > 0) {
          feesElement.textContent = "Fees: $" + updatedFees.toFixed(2);
          submissionMessage.style.display = "block";
          submissionMessage.textContent = "Partial payment submitted successfully!";
          errorMessage.textContent = "";
          document.querySelector(".credit-card-balance h3").textContent = "Account Balance: $" + updatedBalance.toFixed(2);
        }
      } else {
        errorMessage.textContent = "Error: Payment amount exceeds account balance or is invalid.";
        submissionMessage.style.display = "none";
      }
    });

  });
});

// Get the pop-up element
var popup = document.getElementById("popup");

// Get the link for notifications
var link = document.querySelector(".text");

// Get the close button element
var close = document.querySelector(".close");

// When the user clicks on the link, open the pop-up
link.onclick = function() {
  popup.style.display = "block";
};

// When the user clicks on the close button, close the pop-up
close.onclick = function() {
  popup.style.display = "none";
};

// When the user clicks outside of the pop-up, close it
window.onclick = function(event) {
  if (event.target === popup) {
    popup.style.display = "none";
  }
};


// notifications.js
// JavaScript for the pop-up
var popup = document.getElementById("popup");
var link = document.querySelector(".text");
var close = document.querySelector(".close");

link.onclick = function() {
  popup.style.display = "block";
};

close.onclick = function() {
  popup.style.display = "none";
};

window.onclick = function(event) {
  if (event.target === popup) {
    popup.style.display = "none";
  }
};

// JavaScript for the notification functionality
var unreadSection = document.getElementById("unread-section");
var readSection = document.getElementById("read-section");
var reminderSection = document.getElementById("reminder-section");

var markReadBtn = document.getElementById("mark-read-btn");
markReadBtn.addEventListener("click", function() {
  var checkboxes = unreadSection.querySelectorAll(".notification-checkbox:checked");

  checkboxes.forEach(function(checkbox) {
    var notification = checkbox.parentNode;
    var notificationMessage = document.createElement("p");
    notificationMessage.className = "notification-message";
    notificationMessage.textContent = notification.querySelector(".notification-due").textContent;
    readSection.querySelector(".notification-list").appendChild(notificationMessage);
    notification.parentNode.removeChild(notification);
  });
});

var notificationNavLinks = document.querySelectorAll(".notification-nav a");
notificationNavLinks.forEach(function(link) {
  link.addEventListener("click", function(event) {
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

    notificationNavLinks.forEach(function(navLink) {
      navLink.classList.remove("active");
    });
    link.classList.add("active");
  });
});

var createReminderForm = document.getElementById("create-reminder-form");
createReminderForm.addEventListener("submit", function(event) {
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
    setTimeout(function() {
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
notificationsData.forEach(function(notification) {
  var notificationItem = document.createElement("div");
  notificationItem.className = "notification-item";
  notificationItem.innerHTML = `
    <input type="checkbox" class="notification-checkbox">
    <span class="notification-title">${notification.title}</span>
    <span class="notification-due">Reminder: You have a ${notification.type === "bill" ? "bill" : "payment"} due on ${notification.dueDate}</span>
  `;

  unreadNotificationList.appendChild(notificationItem);
});

