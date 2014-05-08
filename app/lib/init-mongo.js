'use strict';

var MongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://127.0.0.1/' + process.env.DBNAME;
var initialized = false;

exports.connect = (req, res, next)=>{
  if(!initialized){
    initialized = true;
    exports.db(next);
  }else{
    next();
  }
};

exports.db = fn=>{
  MongoClient.connect(mongoUrl, (err, db)=>{
    if(err){throw err;}
    global.nss = {};
    global.nss.db = db;
    console.log('Connected to MongoDB');
    fn();
  });
};
