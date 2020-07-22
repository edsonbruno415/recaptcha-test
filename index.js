const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request-promise');
const axios = require('axios');

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/',(req, res)=>{
    res.render('index');
});

app.post('/', async(req, res)=>{
    const result = await axios({
        method: 'post',
        url: 'https://www.google.com/recaptcha/api/siteverify',
        params: {
            secret: '6LeKw7QZAAAAAH2cmudNGRWBdUJjKfFPr-18axaB',
            response: req.body['g-recaptcha-response'],
            remoteip: req.headers['x-forward-for'] || req.connection.remoteAddress
        }
    });

    const isValidate = result.data.success;

    if(isValidate){
        res.send('autorizado');
    }else{
        res.send('Não autorizado');
    }
});

app.listen(3000, ()=> console.log('running...'));