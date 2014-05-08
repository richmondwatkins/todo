'use strict';

var Mongo = require('mongodb');
var priorities = global.nss.db.collection('priorities');

exports.index = (req, res)=>{

  priorities.find().toArray((err, rec)=>
    res.render('priorities/index', {priorities: rec, title: 'Node.js: Home'}));

};


exports.destroy = (req, res)=>{
  var _id = Mongo.ObjectID(req.params.id);
  priorities.findAndRemove({_id:_id}, (err, record)=>{
    res.redirect('/priorities');
  });

};


exports.create = (req, res)=>{
  priorities.save(req.body, ()=>res.redirect('/priorities'));
};
