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
// Get the notification sections
var unreadSection = document.getElementById("unread-section");
var readSection = document.getElementById("read-section");

// Get the "Mark as Read" button
var markReadBtn = document.getElementById("mark-read-btn");

// Add event listener to the "Mark as Read" button
markReadBtn.addEventListener("click", function() {
  // Get all checked notification checkboxes in the unread section
  var checkboxes = unreadSection.querySelectorAll(".notification-checkbox:checked");

  // Move checked notifications to the read section
  checkboxes.forEach(function(checkbox) {
    var notification = checkbox.parentNode;
    var notificationMessage = document.createElement("p");
    notificationMessage.className = "notification-message";
    notificationMessage.textContent = notification.querySelector(".notification-due").textContent;
    readSection.querySelector(".notification-list").appendChild(notificationMessage);
    
    // Remove the notification from the unread section
    notification.parentNode.removeChild(notification);
  });
});

// Update the active tab when clicking on the notification nav links
var notificationNavLinks = document.querySelectorAll(".notification-nav a");

notificationNavLinks.forEach(function(link) {
  link.addEventListener("click", function(event) {
    event.preventDefault();
    var tab = link.getAttribute("data-tab");

    // Show the selected section and hide the other section
    if (tab === "unread") {
      unreadSection.style.display = "block";
      readSection.style.display = "none";
    } else if (tab === "read") {
      unreadSection.style.display = "none";
      readSection.style.display = "block";
    }

    // Update the active class for the navigation links
    notificationNavLinks.forEach(function(navLink) {
      navLink.classList.remove("active");
    });
    link.classList.add("active");
  });
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
