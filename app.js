
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser')
const gameRouter = require('./routes/game')
const indexRouter = require('./routes/index')
const session = require('express-session')
const cookie = require('cookie-parser')
require('./models/mysql')
//const cardModule = require('./card');
//const randomCards = cardModule.randomCards;

//const {pokers, randomCards} = require('./card');
app.use(cookie())
app.use(session({
    secret: 'card game',
    resave: true,
    saveUninitialized: true
}))
app.use(express.static('public')); //静态文件
app.use(bodyParser.json())
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use('/game',gameRouter)
app.use('/',indexRouter)
app.listen(port,()=>{
    console.log('正在监听',port,'端口');
});