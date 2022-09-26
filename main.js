//vamos criar um event listener para envolver nosso código
//ele vai ficar escutando as alterações feitas e podemos
//inserir novos comportamentos
document.addEventListener('DOMContentLoaded', () => {
  const gridDisplay = document.querySelector('.grid')
  const scoreDisplay = document.getElementById('score')
  const resultDisplay = document.getElementById('result')

  const gameTiles = 4;
  let squares = [];
  let score = 0;


  //create a playing board

  function createBoard(){
    for (let i = 0; i < gameTiles*gameTiles; i++) {
      let square = document.createElement('div')
      square.innerHTML = 0
      gridDisplay.appendChild(square)    
      squares.push(square)
    }
    generate()
    generate()

  }
  createBoard()

    //generate a random number to put as initial value
    // into the generated board

  function generate() {

    let randomNumber = Math.floor(Math.random() * squares.length)
    if (squares[randomNumber].innerHTML == 0) {
      squares[randomNumber].innerHTML = 2;
      checkForLose()
    }else generate()
    return randomNumber;
  }


  //swipe to the right

  function moveRight(){
    for (let i = 0; i < squares.length; i++) {

      let remain = i % 4;
      //alert ('o resto de '+ i + ' dividido por 4 é: ' + remain)

      // função mapeia onde está cada número no grid
      if (i % 4 === 0) {
        let row1 = squares[i].innerHTML
        let row2 = squares[i+1].innerHTML
        let row3 = squares[i+2].innerHTML
        let row4 = squares[i+3].innerHTML
        //vamos pegar esses novos arrays criados e colocar num
        //grande array
        let joinedRows = [parseInt(row1), parseInt(row2), parseInt(row3), parseInt(row4)]
        //depois vamos filtrar e deixar apenas os números dentro de cada array
        let filteredJoinedRows = joinedRows.filter(num => num)

        //agora vamos preencher com zeros  o restante das posições
        // primeira parte é decobrir quantos zeros faltam no array
        // vamos usar o metodo fill 
        //para preencher as posições restantes com zeros
        let missingZeros = 4 - filteredJoinedRows.length;
        // cria um array com os zeros
        let zeros = Array(missingZeros).fill(0)

        // como estamos varrendo a tela para a direita é só
        // concatenar o array dos números filtrados ao total de zeros

        let rowAfterChange = zeros.concat(filteredJoinedRows)

        // e por ultimo vamos passar todos os números para a direita

        squares[i].innerHTML = rowAfterChange[0];
        squares[i+1].innerHTML = rowAfterChange[1];
        squares[i+2].innerHTML = rowAfterChange[2];
        squares[i+3].innerHTML = rowAfterChange[3];
        
      }
      const element = squares[i];    
    }
  }

  //swipe to the left
  function moveLeft(){
    for (let i = 0; i < squares.length; i++) {

      let remain = i % 4;
      if (i % 4 === 0) {
        let row1 = squares[i].innerHTML
        let row2 = squares[i+1].innerHTML
        let row3 = squares[i+2].innerHTML
        let row4 = squares[i+3].innerHTML

        let joinedRows = [parseInt(row1), parseInt(row2), parseInt(row3), parseInt(row4)]

        let filteredJoinedRows = joinedRows.filter(num => num)

        let missingZeros = 4 - filteredJoinedRows.length;
        let zeros = Array(missingZeros).fill(0)
        // essa é a unica parte diferente, só inverter
        //colocar primeiro o filtro, depois os zeros
        let rowAfterChange = filteredJoinedRows.concat(zeros)

        squares[i].innerHTML = rowAfterChange[0];
        squares[i+1].innerHTML = rowAfterChange[1];
        squares[i+2].innerHTML = rowAfterChange[2];
        squares[i+3].innerHTML = rowAfterChange[3];
        
      }
      const element = squares[i];
    }
  }

  function moveDown() {

    for (let i = 0; i < gameTiles; i++) {
      let col1 = squares[i].innerHTML;
      let col2 = squares[i+gameTiles].innerHTML;
      let col3 = squares[i+(gameTiles*2)].innerHTML;
      let col4 = squares[i+(gameTiles*3)].innerHTML;
      let joinedCols = [parseInt(col1), parseInt(col2), parseInt(col3), parseInt(col4)]
      let filteredJoinedCols = joinedCols.filter(num => num)
      let missingZeros = 4 - filteredJoinedCols.length;
      let zeros = Array(missingZeros).fill(0)
      let colAfterChange = zeros.concat(filteredJoinedCols)

      squares[i].innerHTML   = colAfterChange[0];
      squares[i+gameTiles].innerHTML = colAfterChange[1];
      squares[i+(gameTiles*2)].innerHTML = colAfterChange[2];
      squares[i+(gameTiles*3)].innerHTML = colAfterChange[3];
    }


  }

  // swipe up
  function moveUp() {

    for (let i = 0; i < gameTiles; i++) {
      let col1 = squares[i].innerHTML;
      let col2 = squares[i+gameTiles].innerHTML;
      let col3 = squares[i+(gameTiles*2)].innerHTML;
      let col4 = squares[i+(gameTiles*3)].innerHTML;
      let joinedCols = [parseInt(col1), parseInt(col2), parseInt(col3), parseInt(col4)]
      let filteredJoinedCols = joinedCols.filter(num => num)
      let missingZeros = 4 - filteredJoinedCols.length;
      let zeros = Array(missingZeros).fill(0)
      let colAfterChange = filteredJoinedCols.concat(zeros)

      squares[i].innerHTML   = colAfterChange[0];
      squares[i+gameTiles].innerHTML = colAfterChange[1];
      squares[i+(gameTiles*2)].innerHTML = colAfterChange[2];
      squares[i+(gameTiles*3)].innerHTML = colAfterChange[3];

    }
  }


  function combineRow() {
    for (let i = 0; i < 15; i++) {
      if(squares[i].innerHTML === squares[i+1].innerHTML){

        let combinedTile = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML)
        squares[i].innerHTML = combinedTile
        squares[i+1].innerHTML = 0
        score += combinedTile
        scoreDisplay.innerHTML = score
      }
    }
    checkForWin()
  }

  function combineCol() {
    for (let i = 0; i < 12; i++) {
      if(squares[i].innerHTML === squares[i+gameTiles].innerHTML){

        let combinedTile = parseInt(squares[i].innerHTML) + parseInt(squares[i+gameTiles].innerHTML)
        squares[i].innerHTML = combinedTile
        squares[i+gameTiles].innerHTML = 0
        score += combinedTile
        scoreDisplay.innerHTML = score 
      }
    }
    checkForWin()
  }

  //assigned keys to controls
  function control(e){
    
    if(e.keyCode === 39){
      keyRight()
    }else if(e.keyCode === 37){
      keyLeft()
    }else if (e.keyCode === 40){
      keyDown()
    }else if (e.keyCode === 38){
      keyUp()
    }
  }
  document.addEventListener('keyup', control)
  function keyRight(){
    moveRight()
    combineRow()
    moveRight()
    generate()
  }

  function keyLeft(){
    moveLeft()
    combineRow()
    moveLeft()
    generate()
  }


  function keyDown(){
    moveDown()
    combineCol()
    moveDown()
    generate()

  }

  function keyUp(){
    moveUp()
    combineCol()
    moveUp()
    generate()

  }
  // quando um quadrado é combinado é bom checar se o jogo é ganho
  function checkForWin(){
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].innerHTML == 2048) {
          resultDisplay.innerHTML = 'You Win! Perfect!!!'
          document.removeEventListener('keyup', control)
          
        }
    }
  }

  function checkForLose(){
    let zeros = 0;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) {
        zeros++         
      }
    }

    if (zeros === 0) {
      resultDisplay.innerHTML = 'You Loose" auhusahahuahua'
      document.removeEventListener('keyup', control)
    }
    document.getElementById('output1').innerHTML = zeros
  }


//fim do event listenner
})



