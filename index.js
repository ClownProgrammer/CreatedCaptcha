//Автор Клоун короче. 
//VK: https://vk.com/clownProgrammer
//GitHub: https://github.com/ClownProgrammer
//GMail: clownProgrammer@gmail.com
'use strict'

const { Canvas, Image, registerFont, createCanvas, loadImage} = require("canvas")
const fs = require("fs");

//Нелезь, код тебя сожрет
Object.defineProperty(exports, '__esModule', { value: true });
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    while (0 !== currentIndex) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

let isArray = Array.isArray

let Rand = (min,max) => {
    return Math.random() * (max - min) + min
}
let FileR = (dir = 'backround') => {
    let file = []
    fs.readdirSync(`${__dirname}/${dir}`).forEach(Name => {
        file.push(Name)
    })
    file = shuffle(file)
    return file
}
let randomA = (array) => {
    
    return array[Math.floor(Math.random() * (array.length))]
}
const def = {
    height: 200,
    width: 0,
    SymbolsUsed: ["A","B","C","D","E","F","G","H","I","K","L","M","N","P","Q","R","S","T","U","V","W","X","Y","Z",1,2,3,4,5,6,7,8,9],
    LengthOfText: 7,
    Lines: true,
    NumberOfFonts: 'all',
    SlantText: true,
    RandomTextHeight: true,
}

class Checker {
    Checking (options) {
         /*height = 200,
        width = 0,
        SymbolsUsed = ["A","B","C","D","E","F","G","H","I","K","L","M","N","P","Q","R","S","T","U","V","W","X","Y","Z",1,2,3,4,5,6,7,8,9],
        LengthOfText = 7,
        Lines: true,
        NumberOfFonts: 'all',
        SlantText: true,
        RandomTextHeight: true,
        */
        for(let key in def)
        {
            if(options[key] === undefined)
            {
                options[key] = def[key]
            }
        }
        if(!options.width) options.width = options.height * 3
        let CF = FileR('fonts')
        for(let key in def)
        {
        let letter = options[key]
           switch (key) {
                case 'height':
                    if(!Number(letter)) throw Error(`"${key}":${letter} | Значение должно являться числом`)
                    options.height = Number(letter)
                    letter = Number(letter)
                    if(letter < 200){ options.height = 200 }
                    break;
                case 'SymbolsUsed':
                    if(!isArray(letter)) throw Error(`"${key}":${letter} | Значение должно являться массивом`)
                    break;
                case 'LengthOfText':
                    if(!Number(letter)) throw Error(`"${key}":${letter} | Значение должно быть числом больше нуля`)
                    options.LengthOfText = Number(letter)
                    if(options.LengthOfText < 0) options.LengthOfText = 0
                    break;
                case 'Lines':
                    if(typeof letter != 'boolean') throw Error(`"${key}":${letter} | Значение должно быть либо true либо false`)
                    break;
                case 'NumberOfFonts':
                    if(letter != 'all' && letter != 'none' && typeof letter != 'boolean' && !Number(letter)) throw Error(`"${key}":${letter} | Неправельное значение. Значение должно быть true/false либо 'all'/'none' либо числом от 0 до ${CF.length}`)
                    if(letter == 'all' || letter == true){ options.NumberOfFonts = CF.length }
                    if(letter == 'none' || letter == false){ options.NumberOfFonts = 1 }
                    if(letter <= 0) { options.NumberOfFonts = 1 }
                    if(Number(letter))
                    {
                        options.NumberOfFonts = Number(letter)
                        letter = Number(letter)
                    }
                    if(letter < 0){ options.NumberOfFonts = 0 }
                    if(letter > CF.length){ options.NumberOfFonts = CF.length }

                    break;
                case 'SlantText':
                    if(typeof letter != 'boolean') throw Error(`"${key}":${letter} | Значение должно быть true либо false`)
                    break;
                case 'RandomTextHeight':
                    if(typeof letter != 'boolean') throw Error(`"${key}":${letter} | Значение должно быть true либо false`)
                    break;
                case 'width':
                    if(!Number(letter)) throw Error(`"${key}":${letter} | Значение должно быть цифрового вида`)
                    options.width = Number(letter)
                    letter = Number(letter)
                    if(letter <= 0){ options.width = 200 }
                    break;                                                                                    
                default:
                    break;
           }
            
        }

        return options
        
    }
    
}


class CaptchaGenerator {
    NewCaptcha(options = { height: 200}) {
        let Checking = new Checker()
        let obj = Checking.Checking(options)
        for(let i in obj)
        {
            if(!this[i])
            {
            this[i] = obj[i]
            }
        }
        let TC = ``
        let TCa = []
        for(let i=0;i<this.LengthOfText;i++)
        {

            let r = String(randomA(this.SymbolsUsed))
            r = r.toUpperCase()
            TC += r
            TCa.push(r)
        }
        let BR = randomA(FileR())
        const BackRound = new Image()
        const buffer1 = fs.readFileSync(`${__dirname}\\backround\\${BR}`)
        const b641 = new Buffer(buffer1).toString('base64')
        const mimeType1 = `image/png`
        BackRound.src = `data:${mimeType1};base64,${b641}`
        const canvas = createCanvas(this.width,this.height)
        const ctx = canvas.getContext('2d')
        ctx.drawImage(BackRound, 0, 0,this.width,this.height)
        const DTS = (this.width * 0.8) / this.LengthOfText
        let posTextX = this.width / 11
        let fonts = []
        for(let i = 0;i < this.NumberOfFonts;i++)
        {
            fonts.push(FileR("fonts")[i])
        }
        TCa.forEach(letter => {
            let posTextY = Math.floor(this.height * 0.5) + 10
            let font = randomA(fonts)
            font = font.split('.ttf')[0]
            let RS = DTS 

            //registerFont(`${__dirname}/fonts/${font}.ttf`, {family: font})
            
            ctx.font = `500 ${RS}px "${font}"`;
            ctx.fillStyle = `rgb(${Math.floor(Rand(150,255))},${Math.floor(Rand(150,255))},${Math.floor(Rand(150,255))})`;
            ctx.textAlign = 'center';
            if(this.RandomTextHeight)
            {
                posTextY = Math.floor(this.height * Rand(0.30,0.60)) + 10
            }
            if(this.SlantText)
            {
                ctx.translate(posTextX, posTextY);
                ctx.rotate(8 * (Rand(-10,10) / 100))
                ctx.fillText(`${letter}`, 0,0);
                ctx.setTransform(1, 0, 0, 1, 0, 0);
            }
            else
            {
              ctx.fillText(`${letter}`, posTextX,posTextY);
            }
            posTextX += this.width / this.LengthOfText
        
        
        /*height = 200,
        width = 0,
        SymbolsUsed = ["A","B","C","D","E","F","G","H","I","K","L","M","N","P","Q","R","S","T","U","V","W","X","Y","Z",1,2,3,4,5,6,7,8,9],
        LengthOfText = 7,
        Lines: true,
        NumberOfFonts: 'all',
        SlantText: true,
        RandomTextHeight: true,
        */
        })
        let CountLine = Rand(5,10)
        if(this.Lines)
        {
            for(let i =0;i<CountLine;i++)
            {
                ctx.beginPath();
                ctx.moveTo(0,Rand(0,this.height))
                ctx.lineTo(this.width,Rand(0,this.height))
                ctx.lineWidth = Rand(1,4)
                ctx.strokeStyle = `rgb(${Math.floor(Rand(100,255))},${Math.floor(Rand(100,255))},${Math.floor(Rand(100,255))})`;
                ctx.stroke();
                ctx.closePath()
            }
        }
    
        const img1 = new Image();
        const buffer = fs.readFileSync(`${__dirname}/fones.png`)
        const b64 = new Buffer(buffer).toString('base64')
        const mimeType = `image/png`
        img1.src = `data:${mimeType};base64,${b64}`
        ctx.drawImage(img1,0,0,this.width,this.height)
        return {image: canvas.toBuffer(), text: TC}
    }
    
}
let options = { //пример!
    height: 100,
    LengthOfText: 7,
    NumberOfFonts: 'all',
    SlantText: true,
    RandomTextHeight: true,
    Lines: true
}
let g = new CaptchaGenerator()
let h = g.NewCaptcha(options)
fs.createWriteStream('sdffsd.png').write(h.image)
module.exports.CaptchaGenerator = CaptchaGenerator
module.exports.Checker = Checker
module.exports.default = CaptchaGenerator
