const router = require('express').Router()

function genCardGroup(randIdx) { 
    cards = new CardGroup();
    randIdx.forEach(id => {
        cards.push(id); 
    });
    return cards;
}
const {
    User
} = require('../models/user')
//user.gameStart = false
// let gameCoin = 10000;
// let gameCards;

const {
    pokers,
    randomCards,
    CardGroup
} = require('../models/card')
const winRates = {

    '5k': 750,

    rs: 250,

    sf: 150,

    '4k': 60,

    fh: 10,

    fl: 7,

    '3k': 5,

    '2p': 2,

    '1p': 1

}


router.get('/random', (req, res) => {

    const randIdx = randomCards(); //调用函数[0,12,2,14,5]
    gameCards = genCardGroup(randIdx);
    res.json({
        cards: randIdx, //=>{(type:1,vaule:1)}
        result: gameCards.judge(),
    }); //返回客户端
});

//下注
router.post('/pour', (req, res) => {
    if (!(req.session && req.session.user)) {
        res.redirect('./signin')
    }
    const userData = req.session.user;
    const user = new User();
    user.id = userData.id;
    user.name = userData.name;
    user.pass_hash = userData.pass_hash;
    user.pass_salt  = userData.pass_salt;
    user.cash = 10000;
    

    user.coin = req.body.coin || 0
    if (user.coin < 1) {
        res.json({
            code: 1,
            desc: '下注金额不能为0'
        })
        return
    }
    if (user.cash < user.coin) {
        res.json({
            code: 1,
            desc: '金额不足'
        })
        return
    }
    user.pourCoin = user.coin
    user.cash -= user.coin
    req.session.user = user
    user.save(err => {
        if (err) {
            return
        }
    })
    res.json({
        code: 0,
        currCoin: user.cash,
        gameStart: true,
    })
})

router.post('/switch', (req, res) => {
    /*
        keep = [0,1,2]
    */
    let keep = req.body['keepcard[]']
    for (let i = 0; i < req.body.length; i++) {
        if (keep[i] == "0") {
            keep[i] = 0;
        } else if (keep[i] == "1") {
            keep[i] = 1;
        } else if (keep[i] == "2") {
            keep[i] = 2;
        } else if (keep[i] == "3") {
            keep[i] = 3;
        } else if (keep[i] == "4") {
            keep[i] = 4;
        }
    }
    if (!keep) {
        keep = [];
    }
    let temp = []
    for (let i = 0; i < 5; i++) {
        let cardtext = false;
        for (let j = 0; j < req.body.length; j++) {
            if (keep[j] == i) {
                cardtext = !cardtext;
                break;
            }
        }
        if (cardtext) {
            temp[i] = gameCards[i].cardid;
        } else {
            temp[i] = null;
        }
    }
    const user = new User();
    user.gameCards = randomCards(temp)

    const cards = genCardGroup(user.gameCards)

    const result = cards.judge()

    const winCoin = (winRates[result] || 0) * req.body.pourCoin

    if (winCoin > 0) {
        user.cash += winCoin
        save(err => {
            if (err) {
                res.json({
                    code: 1
                })

            }
            return
        })
    } else {
        user.cash = user.cash
    }
    res.json({
        cards,
        result,
        Cion: user.cash,
        keep,
        temp
    })
})
module.exports = router