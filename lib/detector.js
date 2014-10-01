'use strict';

var _ = require('lodash'),
	moment = require('moment');

module.exports = Detector;

function Detector(db) {
	// should replace db with an actual database
	this.db = db;
	this.detectionPeriod = 300000;
}

Detector.prototype.parseLine = function(line) {
	
	if (line && line.action === 'SIGNIN_SUCCESS') { 
		return null; 
	}
	
	// should query an actual database
	var entries = _.filter(this.db, function(item){
		var now = moment.utc(line.date);
		var entrydate = moment.utc(item.date);

		return item.action === line.action &&
		item.username === line.username &&
		now.diff(entrydate, 'milliseconds') <= this.detectionPeriod;

	}.bind(this));

	return entries.length < 5 ? null : line.ip;
};