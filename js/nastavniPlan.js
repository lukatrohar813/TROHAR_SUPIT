const Kolegiji = [];
const labela = [];
const Kolegiji_u_tablici = [];
const token1 = localStorage.getItem("token");

$("#tablica").hide();
// Function to fetch curriculum list
async function getCurriculumList() {
  try {
    const response = await fetch("https://www.fulek.com/data/api/supit/curriculum-list/hr", {
      method: "GET",
      headers: { Authorization: "Bearer " + token1 },
    });

    const { data } = await response.json();
// Populate arrays with curriculum data
    data.forEach((name) => {
      Kolegiji.push(name);
      labela.push(name.kolegij);
    });
  } catch (error) {
    console.error("Error fetching curriculum list:", error);
  }
}
// Fetch curriculum list
getCurriculumList();
// Function to fetch curriculum details based on selected curriculum
async function getCuriculum(vrijednost) {
  try {
    const response = await fetch(`https://www.fulek.com/data/api/supit/get-curriculum/${vrijednost}`, {
      method: "GET",
      headers: { Authorization: "Bearer " + token1 },
    });

    const { data } = await response.json();
    console.log(data);
    insertPredmet(data);

  } catch (error) {
    console.error("Error fetching curriculum:", error);
  }
}
// Autocomplete functionality for searching (jquery)
$(function () {
  $("#pretraga").autocomplete({
    source: labela,
    select: function (e, label) {
// Get the selected curriculum based on label
      const selectedKolegij = Kolegiji.find(element => element.kolegij === label.item.label);
      if (selectedKolegij) {
        getCuriculum(selectedKolegij.id);

// Delay clearing the input field to ensure dropdown closes first
        setTimeout(function () {
// Clear the input field
          $("#pretraga").val("");
        }, 100);

      }
    },
  });
});


// Function to calculate and display total values in the table
function AddValues() {
  const Total_ects = document.getElementById("ects");
  const Total_sati = document.getElementById("sati");
  const Total_predavanja = document.getElementById("predavanja");
  const Total_vjezbe = document.getElementById("vjezbe");
  let zbroj_ects = 0;
  let zbroj_sati = 0;
  let zbroj_predavanja = 0;
  let zbroj_vjezbe = 0;

  Kolegiji_u_tablici.forEach((element) => {
    zbroj_ects += element.ects;
    zbroj_sati += element.sati;
    zbroj_predavanja += element.predavanja;
    zbroj_vjezbe += element.vjezbe;
  });

  Total_ects.innerHTML = zbroj_ects;
  Total_sati.innerHTML = zbroj_sati;
  Total_predavanja.innerHTML = zbroj_predavanja;
  Total_vjezbe.innerHTML = zbroj_vjezbe;

  $("#tablica").toggle(zbroj_sati !== 0);
}
// Function to insert a new curriculum row in the table 
function insertPredmet(kolegij) {
  Kolegiji_u_tablici.push(kolegij);
  const tablica = document.getElementById("tablica");
  const trow = tablica.insertRow(Kolegiji_u_tablici.length);
  trow.setAttribute("id", "kolegijRedak");
// Create cells for each attribute of the curriculum
  const [cell0, cell1, cell2, cell3, cell4, cell5, cell6,cell7] = Array.from({ length: 8 }, () => trow .insertCell());
// Create a delete button for each row
  const btn = document.createElement("button");
  btn.setAttribute("id", kolegij.id);
  btn.setAttribute("class", "deleteButton");
  btn.innerHTML = "Delete";
// Populate cells with curriculum data
  cell0.innerHTML = kolegij.kolegij;
  cell1.innerHTML = kolegij.ects;
  cell2.innerHTML = kolegij.sati;
  cell3.innerHTML = kolegij.predavanja;
  cell4.innerHTML = kolegij.vjezbe;
  cell5.innerHTML = kolegij.tip;
  cell6.innerHTML = kolegij.semestar;
  cell7.appendChild(btn);
// Update total values and add delete functionality
  AddValues();
  DeleteKolegij(btn, kolegij);
}
// Function to delete a curriculum row
function DeleteKolegij(button, kolegij) {
  $(button).click(function () {
    $(this).closest("tr").remove();
    const index = Kolegiji_u_tablici.findIndex(item => item === kolegij);
    if (index !== -1) {
      Kolegiji_u_tablici.splice(index, 1);
    }
// Update total values
    AddValues();
  });
}
