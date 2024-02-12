// Retrieve the authentication token from local storage
const token = localStorage.getItem("token");
const uname = $("input[name='uname']").val();

$(document).ready(function () {
// Load the contents of the 'navbar.html' into the element with the id 'navbar'
  $("#navbar").load("navbar.html", function () {
// Load the contents of the 'footer.html' into the element with the id 'footer'
   $("#footer").load("footer.html", function () {
// Attach event handlers to the registration and login forms
    $("#registrationForm").submit(registerForm);
    $("#loginForm").submit(loginForm);
    });
  });
});

// Logout function
function logout(event) {
  event.preventDefault();
  localStorage.removeItem("token");
  window.location.reload();
}

// Function to handle registration form submission
async function registerForm(event) {
    event.preventDefault();
// Get values from registration form
    const uname = $("input[name='username']").val();
    const psw = $("input[name='psw']").val();
    const data = {
      username: uname,
      password: psw,
    };
// Send a POST request to register a user
    fetch("https://www.fulek.com/data/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(response => {
        console.log("Success:", response);
 // Check the response status and redirect if success, show error message if not
        if (response.statusCode === 200) {
          $("#msg").text("Registration successful! Redirecting to login page...");
          setTimeout(function () {
            window.location.href = "/html/logIn.html";
          }, 1000);
        } else {
          $("#msg").text("Registration failed. Please check your information and try again.");
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }

// Function to handle login form submission
  async function loginForm(event) {
    event.preventDefault();
// Get values from login form
    const uname = $("input[name='uname']").val();
    const psw = $("input[name='psw']").val();
    const data = {
      username: uname,
      password: psw,
    };
// Send a POST request to login
    fetch("https://www.fulek.com/data/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(response => {
        console.log("Success:", response);
// Check the response status and redirect if success, show error message if not
        if (response.statusCode === 200) {
          $("#msg").text("Uspjesna prijava :) Na pocetnu stranicu 3,2,1...");
          localStorage.setItem("token", response.data.token);
          setTimeout(function () {
            $(location).attr("href", "/html/pocetna.html");
          }, 3000);
        } else {
          $("#msg").text("User not found.");
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }

