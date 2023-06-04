function showCustomMap(elementId) {
    // Get the map iframe element
    var mapFrame = document.getElementById('mapFrame');
    var url = "";
    if(elementId == 1)
        url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d220517.28613173313!2d31.462564886718734!3d30.277472000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1457fdb0a207b82b%3A0x209bed5ce396e4b2!2sCIB%20-%20Commercial%20International%20Bank!5e0!3m2!1sen!2seg!4v1685321934333!5m2!1sen!2seg";
    else if(elementId == 2)
        url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.4446186676046!2d31.235410424083366!3d30.024099719536977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145847378a767335%3A0x48de3b2f36b35296!2sAtm%20ciB!5e0!3m2!1sen!2seg!4v1685322668853!5m2!1sen!2seg";
    else if(elementId == 3)
        url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13824.461080018435!2d30.926470756530776!3d29.976117103760895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145856f852e15739%3A0x44dcecacc324a99e!2sCIB!5e0!3m2!1sen!2seg!4v1685322754843!5m2!1sen!2seg";
    else if(elementId == 4)
        url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.2911404477422!2d31.335062674084927!3d30.057188117969407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583e65c5c6db47%3A0x2c969f8f37177822!2sCIB%20-%20Commercial%20International%20Bank!5e0!3m2!1sen!2seg!4v1685322796981!5m2!1sen!2seg";
    else if(elementId == 5)
        url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110504.89983973019!2d31.255234379388696!3d30.057561431147175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145815db1a20f275%3A0x370c3de113a88a31!2sCommercial%20International%20Bank!5e0!3m2!1sen!2seg!4v1685322850510!5m2!1sen!2seg";
    mapFrame.src = url;
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

