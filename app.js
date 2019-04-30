const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser')
const {
    pokers,
    randomCards,
    CardGroup
} = require('./card')

//const cardModule = require('./card');
//const randomCards = cardModule.randomCards;
const path = require('path');
//const {pokers, randomCards} = require('./card');
app.use(express.static('public')); //静态文件
app.use(bodyParser.json())
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false
}))
app.get('/', (req, res) => {
    const htmlPath = path.join(__dirname, 'public', 'card.html'); //绝对路径
    res.sendFile(htmlPath);
})
/*app.get('/random', (req, res) => {
    const randIdx = randomCards();
    const cards = genCardGroup(randIdx);
    const cardIDx = randomCards();
    
    //const cards = new CardGroup();
    
//    cardIDx.forEach(id => {
//         cards.push(pokers[id])
//     })
//     const newArr = [];
//     for(const card of cards) {
//         const newCard = {
//             type: 
//             value:
//         }
//     }

    res.json({
        cards: cards,
        result: cards.judge()
    });
}) 
app.post('/main', (req, res) => {
    res.json({
        coin: gameCoin,
        gameBonus,
    })
})
let pourCoin = 0
let gameCards;
let gameCoin = 10000
let gameStart = false
const gameBonus = {
    '5k': 5000,
    'rs': 2000,
    'sf': 800,
    '4k': 400
}
app.post('/pour', (req, res) => {
    if (gameStart) {
        res.json({
            code: 1,
            desc: 'game start already!'
        })
        return;
    }
    let coin = req.body.coin || 0
    if (coin < 1) {
        res.json({
            code: 1,
            desc: 'pour could not be 0'
        })
        return
    }
    if (gameCoin < coin) {
        res.json({
            code: 1,
            desc: 'coin is not enough'
        })
        return
    }
    gameCoin -= coin
    gameCards = randomCards()

    const cards = new CardGroup()
    randIdx.forEach(id => {

        cards.push(pokers[id])
    })
    res.json({
        cards: cards,
    })
})

function genCardGroup(indexes) {
    const cards = new CardGroup()
    indexes.forEach(id => {
        cards.push(pokers[id])
    })
    return cards
}
app.post('/switch', (req, res) => {
    /*
    change = [0,1,3]
    */
// res.json({
//     code: 2,
//     desc: 'not start yet!'
// })

//    let change = req.body.change
//     for( let i = 0; i < change.length(); i++){
//         const index = change[i];
//         gameCards[index]
//         while( result.length < 5 ){
//             let ri = Math.floor( Math.random() * 54 );//54
//             if( !result.includes( ri ) ) {
//                 result.push( ri );
//             }
//     }
// }
//const keep = req.body.keep 
/*
    if (!gameStart) {

        res.json({

            code: 2,

            desc: 'Game not start',

        });

        return;

    }

    let keep = req.body['keep[]'];

    if (!keep) {

        keep = [];

    }

    const temp = []; // 暂存卡牌的编号

    for (let i = 0; i < 5; i += 1) {

        if (keep.includes(i.toFixed())) {

            temp.push(gameCards[i]);

        } else {

            temp.push(undefined);

        }

    }

    gameCards = randomCards(temp); // {0,12,1,3,4}

    const cardGroup = getCardGroup(gameCards);

    const cards = cardGroup.cards;

    const result = cardGroup.judge();

    const winCoin = settlement(pourCoin, result);

    gameCoin += winCoin;

    gameStart = false;

    // gameCards = [];

    res.json({

        cards,

        code: 0,

        currentCoin: gameCoin,

        result,

        winCoin,

    });
     
    let keep = req.body['keep[]']
    // let whole = [0, 1, 2, 3, 4]
    // if (!keep) keep  = []
    // let m = []
    // whole.forEach(function (al) {
    //     m[al] = al;
    // })
    // keep.forEach(function (bl) {
    //     delete m[bl];
    // })
    //let temp = Object.keys(m)
    if (!keep) {

        keep = [];

    }

    const temp = []; // 暂存卡牌的编号

    for (let i = 0; i < 5; i += 1) {

        if (keep.includes(i)) {

            temp.push(gameCards[i]);

        } else {

            temp.push(undefined);

        }

    }
    gameCards = randomCards(temp)
    const cards = genCardGroup(gameCards)
    gameStart = false
    const result = cards.judge()
    const winCoin = (winRates[result] || 0) * pourCoin
    if (winCoin > 0) {
        gameCoin += winCoin
    }
    res.json({
        temp,
        cards,
        result,
        winCoin: 100
    })
})
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
app.listen(port, () => {
    console.log(`Server start on port ${port}`)
});*/
app.get('/random', (req, res) => {

    randIdx = randomCards(); // [0,12,1,3,4]

    //pokers

    const cards = genCardGroup(randIdx)

    console.log('--- cards: ', cards)

    res.json({

        cards: cards, // =>[{type:1,value:0}]

        result: cards.judge()



    });

})

let gameStart = false

let gameCoin = 10000

let gameCards

let pourCoin = 0

const gameBonus = {

    '5K': 5000,

    'rs': 2000,

    'sf': 800,

    '4K': 400

}

app.post('/pour', (req, res) => {

    if (gameStart) {

        res.json({

            code: 1,

            desc: '游戏已经开始，不能下注'

        })

        return

    }

    let coin = req.body.coin || 0

    if (coin < 1) {

        res.json({

            code: 1,

            desc: '下注金额不能为0'

        })

        return

    }

    if (gameCoin < coin) {

        return

    }

    pourCoin = coin

    gameCoin -= coin

    gameStart = true

    let gameCards = randomCards()

    const cards = genCardGroup(gameCards)

    const bonusInc = parseInt(coin / 80)

    for (let k in gameBonus) {

        gameBonus[k] += bonusInc

    }

    gameCards = randomCards()

    const cardIdx = randomCards()

    randIdx.forEach(id => {

        cards.push(pokers[id])

    })

    gameStart = false

    res.json({

        cards: cards,

    })

})

function genCardGroup(indexes) {

    console.log('---- indexes：', indexes) // [21, 43, 1, 42, 53]

    const cards = new CardGroup()

    indexes.forEach(id => {

        cards.push(pokers[id])

    })

    return cards

}



app.post('/switch', (req, res) => {

    /*

    change = [0,1,3],[]

    */

    if (!gameStart) {

        res.json({

            code: 2,

            desc: '游戏未开始'

        })

        return

    }

    keep = req.body['keep[]'];

    if (!keep) keep = []

    const temp = []

    for (let i = 0; i < 5; i++) {

        if (keep.includes(i)) {

            temp.push(gameCards[i])

        } else {

            temp.push(null)

        }

    }

    const gameCards = randomCards();



    for (var i in keep) {

        gameCardGroup[keep[i]] = gameCards_ramdom[keep[i]];

    }



    //    const cardGroup = getCardGroup(gameCards)

    //   const cards = cardGroup.cards;

    //    const result = cardGroup.judge();



    gameCards = temp

    const cards = genCardGroup(gameCards)


    keep.forEach(keepID => {

        const temp = []

        gameCards.forEach(idx => {

            temp.push(idx) || (null)

        })

    })

    gameStart = false

    const result = cards.judge()

    const winCoin = (winRates[result] || 0) * pourCoin

    if (winCoin > 0)

        gameCoin += winCoin

    res.json({

        Cards,

        result,

        winCoin,

    })

})

const winRates = {

    '5k': 75000,

    rs: 25000,

    sf: 15000,

    '4k': 6000,

    fh: 1000,

    fl: 700,

    st: 500,

    '3k': 300,

    '2p': 200,

    '1p': 100

}

app.listen(port, function () {

    console.log("start");

})