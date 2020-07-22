const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request-promise');

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/',(req, res)=>{
    res.render('index');
});

app.post('/', async(req, res)=>{
    const validate = await request({
        method: 'post',
        uri: 'https://www.google.com/recaptcha/api/siteverify',
        formData: {
            secret: '6LeKw7QZAAAAAH2cmudNGRWBdUJjKfFPr-18axaB',
            response: req.body['g-recaptcha-response'],
            remoteip: req.headers['x-forward-for'] || req.connection.remoteAddress
        }
    });

    const json = JSON.parse(validate);
    if(json.success){
        res.send('Autorizado');
    }else{
        res.send('Falha ao autorizar')
    }
    console.log(validate);
    //res.send(req.body);
});

app.listen(3000, ()=> console.log('running...'));