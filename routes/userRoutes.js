const express = require('express')
const router = express.Router()

router.post('/registration',userRegisteration)
router.post('/login',userLogin)
const user = require('../model/user')

function userRegisteration(req,res)
{
	let data = req.body;
	delete data.confpassword;
	console.log(data)
	user.userRegisteration(data).then( (result) => {
		res.status(200).json({
			message: 'success'
		});
	})
	.catch( (err) => {
		console.log(err)
		res.status(200).json({
       message: 'failed'});
	});
}

function userLogin(req,res)
{
	let data = req.body;
	console.log('login action')
	user.userLogin(data).then( (result) => {
		let resp = {message: 'success'} 
		
		if(! result.flag ){
			resp = {message: 'failed'}
		}
		else
		{
			
			req.session.user = result.user
		}

		res.status(200).json(resp);
	})
	.catch( (err) => {
		console.log('err  ')
		console.log(err)
		res.status(200).json({
       message: 'failed'});
	});
}

module.exports = router
