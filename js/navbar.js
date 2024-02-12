$(document).ready(function () {
  nastavniPlanRedirect();
  displayLink();
  showOnamaLinks();
});

//Function to display or hide navigation links based on user authentication status.
function displayLink() {
  const token = localStorage.getItem("token");

  const nastavniPlanBtn = $("#nastavniPlanBtn");
  const odjaviSeBtn = $("#odjaviSeBtn");
  const prijaviSeBtn = $("#prijaviSeBtn");

  if (!token) {
    nastavniPlanBtn.add(odjaviSeBtn).hide();
    prijaviSeBtn.show();
  } else {
    nastavniPlanBtn.add(odjaviSeBtn).show();
    prijaviSeBtn.hide();
  }
}
//Function to redirect user if token is lost while on nastavniPlan
function nastavniPlanRedirect() {
  
  const currentPage = window.location.pathname;
  const token = localStorage.getItem("token");

  if (!token && currentPage.includes("/html/nastavniPlan.html")) {
    window.location.replace("/index.html");
  }
}
// Function to display or hide oNama links based on what page user at
function showOnamaLinks() {
  
  const currentPage = window.location.pathname;
  const rLinks = $("#oN_links");

  if (currentPage.includes("/html/oNama.html")) {
    rLinks.show();
  } else {
    rLinks.hide();
  }
}
