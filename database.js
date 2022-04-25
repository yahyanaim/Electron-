// Initialize the database
var Datastore = require('nedb');
db = new Datastore({ filename: 'db/projects.db', autoload: true });

// Add a project
exports.addProject = function(projetname, description) {

  // Create the project object
  var project = {
    "projetname": projetname,
    "description": description
  };

  // Save the project to the database
  db.insert(project, function(err, newDoc) {

  });
};

// Returns all projects
exports.getProjects = function(fnc) {

  // Get all projects from the database
  db.find({}, function(err, docs) {

    // Execute the parameter function
    fnc(docs);
  });
};

// Deletes a proejct
exports.deleteProject = function(id) {

  db.remove({ _id: id }, {}, function(err, numRemoved) {
    // Do nothing
  });
};
