const database = require('./js/database');

window.onload = function() {

  // Populate the table
  populateTable();

  // Add the add button click event
  document.getElementById('add').addEventListener('click', () => {

    // Retrieve the input fields
    var projetname = document.getElementById('projetname');
    var description = document.getElementById('description');

    // Save the person in the database
    database.addProject(projetname.value, description.value);

    // Reset the input fields
    projetname.value = '';
    description.value = '';

    // Repopulate the table
    populateTable();
  });
}

// Populates the persons table
function populateTable() {

  // Retrieve the projects
  database.getProjects(function(projects) {

    // Generate the table body
    var tableBody = '';
    for (i = 0; i < projects.length; i++) {
      tableBody += '<tr>';
      tableBody += '  <td>' + projects[i].projetname + '</td>';
      tableBody += '  <td>' + projects[i].description + '</td>';
      tableBody += '  <td><input type="button" value="Delete" onclick="deleteProject(\'' + projects[i]._id + '\')"></td>'
      tableBody += '</tr>';
    }

    // Fill the table content
    document.getElementById('tablebody').innerHTML = tableBody;
  });
}

// Deletes a project
function deleteProject(id) {
  // Delete the project from the database
  database.deleteProject(id);

  // Repopulate the table
  populateTable();
}
