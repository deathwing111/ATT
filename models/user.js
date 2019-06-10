const mysql = require('./mysql')
const crypto = require('crypto')
// const md5encode = (str) => {
//     const hash= crypto.createHash('md5')
//     hash.update(str)
//     return hash.digest('hex')
// }

class User{
    static md5encode(str){
        const hash= crypto.createHash('md5')
        hash.update(str)
        return hash.digest('hex')
    }

    static find(name,callback){
        let sql = `select * from user where name = "${name}"`
        mysql.query(sql, (err, result) => {
            if(err){
                callback(err,null)
                return
            }
            if(result.length === 0){
                callback(null,null)
                return
            }
            const userData = result[0]
            const user = new User()
            user.id = userData.id
            user.name = userData.name
            user.pass_hash = userData.pass_hash
            user.pass_salt = userData.pass_salt
            user.cash = userData.cash
            console.log('aftersqlname:',user.id)
            callback(null,user)
        })
    }
    static create(userinfo, callback){//位置
        const passsalt = this.md5encode(`${Date.now()}`)
        const { username, password } = userinfo
        const passhash = this.md5encode(`${passsalt}^^^${password}`)
        let sql = `insert into user(name, pass_hash,pass_salt) values("${username}","${password}","${passhash}")`
        mysql.query(sql,(err,result) => {
            console.log('--err', err)
            if (err) {
                callback(err)
                return
            }
            if(result.affectedRows === 1) {
                callback(null)
            }
            else{

            }
        })
    }
    save(callback) {
        let sql = `update user set cash = ${this.cash} where id = ${this.id}`
        mysql.query(sql, (err, result) => {
            if(err) {
                //callback(err)
                return
            }
            if(result.affectedRows === 1 && result.changedRows === 1){
                callback(null)
            }
            else{
                callback(new Error('Error'))
            }
        })

    }
    
}
 
const user = new User()
user.save()
// User.find(name, (err, user) => {

// })
module.exports = {
    User
}