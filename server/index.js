const Reversi = require('clovers-reversi').default
const express = require('express')
const fs = require('fs')
const app = express()
const port = 8000

const CLOVERSIZE = 150
const PERROW = 5
const LIMIT = 99999

let moves = "c4e3f6c6e2b3d6e6b6f3a2d1e1b4d3b2g3b7f4a6c2b1c1d2c5g2g4f2h1f1a4g5c7g1a5e7a7c3a1b5h2d7d8f5h6h5g6e8f7h7f8h4h3g8h8c8a3b8g7a8"

app.get('/', (req, res) => {



  var dir = 'clovers/';

  fs.readdir(dir, function(err, files){
    files = files.map(function (fileName) {
      return {
        name: fileName,
        time: fs.statSync(dir + '/' + fileName).mtime.getTime()
      };
    })
    .sort(function (a, b) {
      return a.time - b.time; })
    .map(function (v) {
      return v.name; });

    let clovers = ""
    let c = 0

    for(let f in files){
      if(f<LIMIT){

        let cloverRendered = clover(files[f],CLOVERSIZE,req.query.filter)
        if(cloverRendered){
          if(c==0){
            clovers += '<div style="border:1px solid #eeeeee;margin:5px;padding:10px;">'
            c=1
          }else if(c++==PERROW){
            c=1
            clovers += '</div><div style="border:1px solid #eeeeee;margin:5px;padding:10px;">'
          }
          clovers += cloverRendered
        }

      }

    }
    clovers += "</div>"

    res.send('<html><body>'+clovers+'</body></html>')
  });



})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


//grabbed this from https://github.com/clovers-network/clovers-dapp/blob/master/src/components/Clv--SVG.vue
// all due props to https://github.com/evvvritt
function clover(moves,size,filter){
  let green = '#01B463'
  let black = '#000000'
  let white = '#FFFFFF'
  let grey = '#808080'
  let r = new Reversi()
  let array = r.playGameMovesString(moves)
  r.calcWinners()
  r.isSymmetrical()
  let fill, stroke, sequence
  let strokeWidth = 1
  let radius = size / 2


  let hasgreen=false

  let row = 0

  let svg = `<a href='https://clovers.network/account/basket?pick=`+moves+`' target="_blank">`+
  '<span><?xml  version="1.0" encoding="UTF-8"?><svg style="width:'+size+'px;" class="block" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="-1 -1 ' +
  (size + 2) +
  ' ' +
  (size + 2) +
  '" enable-background="new 0 0 ' +
  size +
  ' ' +
  size +
  '" xml:space="preserve"><title>Clover Image</title>'
  if (r.whiteScore < r.blackScore) {
    fill = black
    stroke = black
  } else if (r.whiteScore > r.blackScore) {
    fill = white
    stroke = black
  } else {
    fill = grey
    stroke = grey
  }
  // if (r.symmetrical) {
  //   strokeWidth = 2
  //   stroke = green
  // }
  //
  //
  //
  svg +=
  '<circle shape-rendering="optimizeQuality" fill="' +
  fill +
  '" stroke="' +
  stroke +
  '" stroke-width="' +
  strokeWidth +
  '" stroke-miterlimit="10" cx="' +
  size / 2 +
  '" cy="' +
  size / 2 +
  '" r="' +
  radius +
  '"/>'

  for (let i = 0; i < 64; i++) {
    let row = Math.floor(i / 8)
    let col = i % 8
    switch (r.board[row][col]) {
      case r.BLACK:
      if (r.whiteScore < r.blackScore) continue
      fill = black
      stroke = 'none'
      break
      case r.WHITE:
      if (r.whiteScore > r.blackScore) continue
      fill = white
      stroke = 'none'
      break
      case r.EMPTY:
      fill = green
      stroke = 'none'
      hasgreen = true
      break
      default:
      continue
    }
    let x = (row + 1) * (size / 12) + size / 8
    let y = (col + 1) * (size / 12) + size / 8
    svg +=
    '<circle shape-rendering="optimizeQuality" fill="' +
    fill +
    '" stroke="' +
    stroke +
    '" stroke-miterlimit="1" cx="' +
    x +
    '" cy="' +
    y +
    '" r="' +
    size / 24 +
    '"/>'
  }


    let sym = ""
    if(r.RotSym){
      if(sym!="") sym+=","
      sym+="Rot"
    }
    if(r.X0Sym){
      if(sym!="") sym+=","
      sym+="X0"
    }
    if(r.Y0Sym){
      if(sym!="") sym+=","
      sym+="Y0"
    }
    if(r.XYSym){
      if(sym!="") sym+=","
      sym+="XY"
    }
    if(r.XnYSym){
      if(sym!="") sym+=","
      sym+="XnY"
    }
    if(hasgreen){
      if(sym!="") sym+=","
      sym+="Grn"
    }

    if(filter && sym.indexOf(filter)<0){
      return false
    }

    let metadata = `<span style="font-size:8px">
      `+sym+`
    </span>`

  svg += '</svg>'+metadata+'</span></a>'
  return svg;
}
