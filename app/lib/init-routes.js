'use strict';

var traceur = require('traceur');
var routeDebugger = traceur.require(__dirname + '/route-debugger.js');
var initialized = false;

module.exports = (req, res, next)=>{
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = traceur.require(__dirname + '/../routes/home.js');
  var priorities = traceur.require(__dirname + '/../routes/priorities.js');
  var tasks = traceur.require(__dirname + '/../routes/tasks.js');

  app.all('*', routeDebugger);
  app.get('/', home.index);
  app.get('/priorities', priorities.index);
  app.get('/tasks', tasks.index);
  app.post('/tasks', tasks.create);


  app.delete('/priorities/:id', priorities.destroy);
  app.delete('/tasks/:id', tasks.destroy);

  app.post('/priorities', priorities.create);

  app.put('/tasks/:id', tasks.update);

  console.log('Routes Loaded');
  fn();
}
