const reportForm = document.getElementById('reportForm');
const submittedReport = document.getElementById('submittedReport');
const verificationMessage = document.getElementById('verificationMessage');

reportForm.addEventListener('submit', submitReport);

function submitReport(event) {
  event.preventDefault();

  const reportType = document.getElementById('reportType').value;
  const reportContent = document.getElementById('reportContent').value;

  submittedReport.innerHTML = `
    <h3>${reportType}</h3>
    <p>${reportContent}</p>
  `;

  verificationMessage.textContent = 'Report submitted successfully!';
  verificationMessage.style.color = 'green';

  document.getElementById('reportType').value = "Bug Report";
  document.getElementById('reportContent').value = '';
}
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