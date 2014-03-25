var gaze = require('gaze');

// Watch all .js files/dirs in process.cwd()
gaze('web/current/content/*', function(err, watcher) {
  // Files have all started watching
  // watcher === this

  // Get all watched files
  console.log(this.watched());
	
/*
  // On file changed
  this.on('changed', function(filepath) {
    console.log(filepath + ' was changed');
  });

  // On file added
  this.on('added', function(filepath) {
    console.log(filepath + ' was added');
  });

  // On file deleted
  this.on('deleted', function(filepath) {
    console.log(filepath + ' was deleted');
  });
*/
  // On changed/added/deleted
  this.on('all', function(event, filepath) {
    console.log(filepath + ' was ' + event);
  });

  // Get watched files with relative paths
  console.log(this.relative());
});