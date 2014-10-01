/*jshint unused:false*/
/*jshint maxstatements:false*/

'use strict';

var Detector = require('../lib/detector'),
    assert = require('assert'),
    moment = require('moment');

describe('hacker detection', function(){

  var db = [];

  beforeEach(function(){
    db = [];
    db.push({ ip : '80.238.9.170', date : '1336129471', action : 'SIGNIN_FAILURE', username : 'Andrew.Keig' });
    db.push({ ip : '80.238.9.170', date : '1336129472', action : 'SIGNIN_FAILURE', username : 'Andrew.Keig' });
    db.push({ ip : '80.238.9.170', date : '1336129473', action : 'SIGNIN_FAILURE', username : 'Andrew.Keig' });
    db.push({ ip : '80.238.9.170', date : '1336129474', action : 'SIGNIN_FAILURE', username : 'Andrew.Keig' });
    db.push({ ip : '80.238.9.170', date : '1336129475', action : 'SIGNIN_FAILURE', username : 'Andrew.Keig' });
  });

  describe('when parsing a success log line', function(){
    var detector;

    beforeEach(function(){
      detector = new Detector(db);
    });

    var line = {
      ip : '80.238.9.179',
      date : moment().valueOf(),
      action : 'SIGNIN_SUCCESS',
      username : 'Dave.Branning'
    };

    it('should return null', function(done){
      var response = detector.parseLine(line);
      assert.equal(response, null);
      done();
    });
  });

  describe('when parsing failure log line with 0 failed entries in last 5 mins', function(){
    var detector;

    beforeEach(function(){
      detector = new Detector(db);
    });

    var line = {
      ip : '80.238.9.179',
      date : moment().valueOf(),
      action : 'SIGNIN_FAILURE',
      username : 'Dave.Branning'
    };

    it('should return null', function(done){
      var response = detector.parseLine(line);
      assert.equal(response, null);
      done();
    });
  });

  describe('when parsing a failure log line with 1 failed entry in last 5 mins', function(){
    var detector;

    beforeEach(function(){
      db.push({ ip : '80.238.9.179', date : moment().valueOf(), action : 'SIGNIN_FAILURE', username : 'Dave.Branning' });

      detector = new Detector(db);
    });

    var line = {
      ip : '80.238.9.179',
      date : moment().valueOf(),
      action : 'SIGNIN_FAILURE',
      username : 'Dave.Branning'
    };

    it('should return null', function(done){
      var response = detector.parseLine(line);
      assert.equal(response, null);
      done();
    });
  });

  describe('when parsing a failure log line with 4 failed entry in last 5 mins and 1 failure 6 mins ago', function(){
    var detector;

    beforeEach(function(){
      db.push({ ip : '80.238.9.179', date : moment().subtract(1, 'minutes').valueOf(), action : 'SIGNIN_FAILURE', username : 'Dave.Branning' });
      db.push({ ip : '80.238.9.179', date : moment().subtract(2, 'minutes').valueOf(), action : 'SIGNIN_FAILURE', username : 'Dave.Branning' });
      db.push({ ip : '80.238.9.179', date : moment().subtract(3, 'minutes').valueOf(), action : 'SIGNIN_FAILURE', username : 'Dave.Branning' });
      db.push({ ip : '80.238.9.179', date : moment().subtract(4, 'minutes').valueOf(), action : 'SIGNIN_FAILURE', username : 'Dave.Branning' });
      db.push({ ip : '80.238.9.179', date : moment().subtract(6, 'minutes').valueOf(), action : 'SIGNIN_FAILURE', username : 'Dave.Branning' });

      detector = new Detector(db);
    });

    var line = {
      ip : '80.238.9.179',
      date : moment().valueOf(),
      action : 'SIGNIN_FAILURE',
      username : 'Dave.Branning'
    };

    it('should return null', function(done){
      var response = detector.parseLine(line);
      assert.equal(response, null);
      done();
    });
  });

  describe('when parsing a failure log line with 5 failed entry in last 5 mins', function(){
    var detector;

    beforeEach(function(){
      db.push({ ip : '80.238.9.179', date : moment().subtract(1, 'minutes').valueOf(), action : 'SIGNIN_FAILURE', username : 'Dave.Branning' });
      db.push({ ip : '80.238.9.179', date : moment().subtract(2, 'minutes').valueOf(), action : 'SIGNIN_FAILURE', username : 'Dave.Branning' });
      db.push({ ip : '80.238.9.179', date : moment().subtract(3, 'minutes').valueOf(), action : 'SIGNIN_FAILURE', username : 'Dave.Branning' });
      db.push({ ip : '80.238.9.179', date : moment().subtract(4, 'minutes').valueOf(), action : 'SIGNIN_FAILURE', username : 'Dave.Branning' });
      db.push({ ip : '80.238.9.179', date : moment().subtract(5, 'minutes').valueOf(), action : 'SIGNIN_FAILURE', username : 'Dave.Branning' });

      detector = new Detector(db);
    });

    var line = {
      ip : '80.238.9.179',
      date : moment().valueOf(),
      action : 'SIGNIN_FAILURE',
      username : 'Dave.Branning'
    };

    it('should return ip address', function(done){
      var response = detector.parseLine(line);
      assert.equal(response, line.ip);
      done();
    });
  });

  describe('when parsing a failure log line with 6 failed entry in last 5 mins', function(){
    var detector;

    beforeEach(function(){
      db.push({ ip : '80.238.9.179', date : moment().subtract(1, 'minutes').valueOf(), action : 'SIGNIN_FAILURE', username : 'Dave.Branning' });
      db.push({ ip : '80.238.9.179', date : moment().subtract(2, 'minutes').valueOf(), action : 'SIGNIN_FAILURE', username : 'Dave.Branning' });
      db.push({ ip : '80.238.9.179', date : moment().subtract(3, 'minutes').valueOf(), action : 'SIGNIN_FAILURE', username : 'Dave.Branning' });
      db.push({ ip : '80.238.9.179', date : moment().subtract(4, 'minutes').valueOf(), action : 'SIGNIN_FAILURE', username : 'Dave.Branning' });
      db.push({ ip : '80.238.9.179', date : moment().subtract(5, 'minutes').valueOf(), action : 'SIGNIN_FAILURE', username : 'Dave.Branning' });
      db.push({ ip : '80.238.9.179', date : moment().subtract(5, 'minutes').valueOf(), action : 'SIGNIN_FAILURE', username : 'Dave.Branning' });

      detector = new Detector(db);
    });

    var line = {
      ip : '80.238.9.179',
      date : moment().valueOf(),
      action : 'SIGNIN_FAILURE',
      username : 'Dave.Branning'
    };

    it('should return ip address', function(done){
      var response = detector.parseLine(line);
      assert.equal(response, line.ip);
      done();
    });
  });
});