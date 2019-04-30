/*type取值范围：0~4(花色)
value取值范围： 0~14
    0：black joker
    1：red joker
    14：A
*/
const JOKER = 0;
const SPADE = 1;
const DIAMEND = 2;
const HEART = 3;
const CLUB = 4;
/*const TYPE_MAP = {
    0: 'Joker',
    1: 'Spade',
    2: 'Diamond',
    3: 'Heart',
    4: 'Club'
}
const VALUE_MAP = {
    0: 'black_joker',
    1: 'red_joker',
    11: 'J',
    12: 'Q',
    13: 'K',
    14: 'A'

}*/
const BLACK_JOKER = 0;
const RED_JOKER = 1;

class Card {
    constructor(type, value){
        this.type = type;
        this.value = value;
    }
    get type(){
        return this._type;
    }
    set type(t){
        if(t > 4 || t < 0)
        t = 0;
        else
        this._type = t;
    }
    get value(){
        return this._value;
    }
    set value(v){
        if(this.type === JOKER ){
            if (v < 0 || v > 1)
            this.value = 0;
            else
            this._value = v;

        }
        else {
            if(this.value > 14 || this.value < 2)
                this.value = 2;
            else
                this._value = v;
        }
    }
    relativeURL(){
        /*let url;
        let typeStr = TYPE_MAP[ this.type ];
        let valueStr ;
        if ( this.value >= 2 && this.value <= 10 ) {
            valueStr = `${this.value}`;

        }
        else {
            valueStr = VALUE_MAP[this.value];
        }
        url = './cards/' + typeStr + '/' + valueStr + '.png';
        console.log(url);*/
        return `./cards/${this.type}/${this.value}.png`;
    }
}
class CardGroup extends Array {
    judge(){
        const jokerArr = [], normalArr = [];
        console.log('111:',this)
        for(const card of this){
            if (card.type == JOKER){
                jokerArr.push(card);
            } else {
                normalArr.push(card);
            }
        }
        switch(jokerArr.length) {
            case 1:
            for (const card of normalArr) {
                if (jokerArr.length > 0 ){
                    let is5k = true;

                }
            }
            break;
            
        }
    }
}
const pokers = [];

function createRandomCard(){
    return new Card();
}
let cardGroup = [];
for(let i = 0; i < 5; i++){
    cardGroup.push(createRandomCard());
}
let card = new Card ( JOKER, 100 );
console.log('card type:', card.type)
console.log(card)
//const pokers = [];
for (let i = 0; i < 5; i +=1 ) {
    if(i === JOKER) {
        pokers.push( new Card( i, 0 ) );
        pokers.push( new Card( i, 1 ) );
    }
    else {
        for (let j = 2; j < 15; j += 1 ) {
            pokers.push( new Card( i, j ) );
        }

    }
    
}
let randomCards = ( origin ) => {
    if (!origin) {
        origin = new Array(5).fill(null);
    }

    const result = origin;
    let id;
   for (let i = 0; i < result.length; i++) {
        id = result[i];
       while(!id){
           id = Math.floor( Math.random() * 54 );
           if (result.includes(id)) {
               id = null;

           } else {
               result[i] = id;
           }
       }
   }
    /*while( result.length < 5 ){
         let ri = Math.floor( Math.random() * 54 );//54
        if( !result.includes( ri ) ) {
             result.push( ri );
         }
     }
   const resultObj = new CardGroup;//新建一个对象，返回
   for ( const i of result ) {//迭代器，遍历
        resultObj.push( pokers[i] );
   }
    return resultObj;*/
    return result;
}

module.exports = {
    pokers,
    randomCards,
    CardGroup

}//模块--》导出

//const cards = randomCards();
//const obj = new cardGroup();
for (let i = 1; i <4; i++){

}