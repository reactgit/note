const config = require('../config');
const express = require('express');
const router = express.Router();
const request = require('request');
const fs = require('fs');
const path = require('path');
const util = require('../util');

/* GET home page. */
router.get('/', function(req, res, next) {
	const list = fs.readdirSync('../media');
	res.render('list', {
		list: JSON.stringify(list.filter((it) => {
			return it.match(/^\d+$/)
		}))
	});
});



router.get('/voa/:month', function(req, res, next) {
	const list = fs.readdirSync('../media/' + req.params.month);
	res.render('month', {
		month: req.params.month,
		list: JSON.stringify(list.filter((it) => {
			return it[0] !== '.'
		}))
	});
});


router.get('/voa/:month/:name', function(req, res, next) {
	try {
		const lrc = fs.readFileSync(`../media/${req.params.month}/${req.params.name}/${req.params.name}.lrc.txt`, { encoding: 'utf8'});
		const txt = fs.readFileSync(`../media/${req.params.month}/${req.params.name}/${req.params.name}.txt`, { encoding: 'utf8'});
		res.render('index', {
			
			data: JSON.stringify({
				month: req.params.month,
				name: req.params.name,
				lrc,
				txt
			})
		});
	} catch (err) {
		res.render('error', {
			message: err.message,
			error: err
		})
	}
});
router.get('/media/:month/:name', function(req, res, next) {
	const name = req.params.name.trim().replace(/\.mp3$/, '')
	res.sendFile(path.join(__dirname, `../../media/${req.params.month}/${name}/${name}.mp3`), {}, (err) => {
		err && console.log(err.message);
	});
});
module.exports = router;