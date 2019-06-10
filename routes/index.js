const path = require('path');
const router = require('express').Router()
const viewPath = path.join(__dirname, '../views')
const { User } = require('../models/user')
router.get('/', (req, res) => {
    if(req.session && req.session.user){
        req.session.count = 0
        const htmlPath = path.join(__dirname, '../views', 'card.html'); //绝对路径
        res.sendFile(htmlPath);
    }else{
        res.redirect('/signin') //未登录，则发送登录界面
    }
})
router.get('/main',(req,res) =>{
    if(req.session && req.session.user){
        const { user } = req.session
        res.json({
            code: 0,
            data:{
                cash: user.cash
            }
        })
    }
})
router.get('/signin', (req, res) => {
    const signinPath = viewPath + '/signin.html'
    res.sendFile(signinPath);
})
router.get('/signup', (req, res) => {
    const signupPath = viewPath + '/signup.html'
    res.sendFile(signupPath);
})
const regName = /^[a-zA-Z]\w{3,}/
router.post('/signup', (req,res) => {
    const { username, password} = req.body
    if(username.length === 0  || password.length === 0 || !regName.test(username)){
        res.json({
            code: 1,
            desc: 'felled'
        })
        return
    }
    User.find(username, (err,user) => {
        if(err){
            console.error('find user failed',err)
            res.json({
                code:1,
                desc: err.massage
            })
        }
        if(user){
            res.json({
                code:1,
                desc: '用户名已存在'
            })
            return
        }
        User.create({username,password}, (err) => {
            console.log('--err', err)
            if(err){
                console.error('insert failed',err)
                res.json({
                    code:1,
                    desc:'创建用户失败'
                })
            } else {
                res.json({
                    code:0,
                    desc:'创建成功'
                })
            }

        })
    })
})
router.post('/signin', (req,res) => {
    const { username, password} = req.body
    if(username.length === 0  || password.length === 0 ){
        res.json({
            code: 1,
            desc: 'felled'
        })
        return
    }
    User.find(username, (err,user) => {
        console.log('login')
        console.log('--user', user)
        if(err){
            console.error('login failed',err)
            res.json({
                code:1,
                desc: err.massage
            })
            
        }
        if(user){
            // const hash= User.md5encode( `${user.pass_salt}^^^${password}`)
            // if ( user.password !== hash ){
            //     res.json({
            //         code:1,
            //         desc: '密码错误'
            //     }) 
            // return
            // }
            
            req.session.user = user
            res.json({
                code:0,
                desc:'okey'
            })
            return
        }
       
    })
})
//User.create()//
module.exports = router