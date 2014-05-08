'use strict';

var tasks = global.nss.db.collection('tasks');
var priorities = global.nss.db.collection('priorities');
var Mongo = require('mongodb');

var _ = require('lodash');

exports.index = (req, res)=>{
  tasks.find().toArray((e,r)=>{
    priorities.find().toArray((e,p)=>{

      console.log('BEFORE');
      console.log(r);

    r = r.map(task => {

        var priority =   _(p).find(pri =>pri._id.toString() === task.priorityId.toString());
        task.priority = priority;
        return task;
    });


      console.log('AFTER');
      console.log(r);



      res.render('tasks/index', {priorities: p, tasks: r, title: 'Task list'});
    });
  });
};

exports.create = (req, res)=>{

  req.body.isComplete = false;
  req.body.due = new Date(req.body.due);
  req.body.priorityId = Mongo.ObjectID(req.body.priorityId);
  tasks.save(req.body, ()=> res.redirect('/tasks'));

};

exports.destroy = (req, res)=>{
  var _id = Mongo.ObjectID(req.params.id);
  tasks.findAndRemove({_id:_id}, (err, record)=>{
    res.redirect('/tasks');
  });

};

exports.update = (req, res)=>{
  var _id = Mongo.ObjectID(req.params.id);
  tasks.findOne({_id:_id}, (e, task)=>{
    task.isComplete = !task.isComplete; //toggles either true of false

    tasks.save(task, ()=>res.redirect('/tasks'));

  });

};
