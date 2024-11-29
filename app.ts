enum gameOver {yes = 1, no, draw};

//Inicio
const gameState = 
{
    board: Array(9).fill(''),
    images: Array(9).fill(false),
    currentPlayer: 'X',
    gameOver: gameOver.no
};

const boardElement = document.getElementById('board') as HTMLElement;
const statusElement = document.getElementById('status') as HTMLElement;
const resetButton = document.getElementById('reset') as HTMLButtonElement;
const statusElement2 = document.getElementById('turno') as HTMLElement;
const audioButton = document.getElementById('audioButton') as HTMLButtonElement;
const audio = document.getElementById('audio') as HTMLAudioElement;

// Función para inicializar el tablero del juego
function initGame() 
{
    boardElement.innerHTML = '';
    gameState.board.forEach((_, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = `${index}`;
        cell.addEventListener('click', handleCellClick);
        boardElement.appendChild(cell);
      });
      updateStatus();
}

// Maneja el click en una celda del tablero
function handleCellClick(event: Event) 
{
    const target = event.target as HTMLElement;
    const index = Number(target.dataset.index);
  
    // Si la celda ya fue seleccionada o el juego ha terminado, no hace nada
    if (gameState.board[index] !== '' || gameState.gameOver !== gameOver.no) return;
  
    // Actualiza la celda con el símbolo del jugador actual
    gameState.board[index] = gameState.currentPlayer;
    updateBoard();
  
    // Verifica si hay un ganador o empate
    if (checkWinner()) 
    {
      gameState.gameOver = gameOver.yes;
      statusElement2.textContent = 'Ganador!'
    } else if (gameState.board.every(cell => cell !== '')) 
    {
      gameState.gameOver = gameOver.draw;
      statusElement.style.visibility = 'hidden';
      statusElement2.textContent = 'Empate!';
      
    } else 
    {
      // Cambia de jugador
      gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
      updateStatus();
    }
}

// Actualiza el contenido del tablero visualmente
function updateBoard()
{
    const cells = boardElement.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
      if (gameState.board[index] === 'X' && gameState.images[index] === false)
        {
          let img = document.createElement('img');
          img.src = './img/SherlockCruz.png';
          img.alt = 'X';
          img.height = 150;
          img.width = 150;
          cell.appendChild(img);
          gameState.images[index] = true;
          
        }else if (gameState.board[index] === 'O' && gameState.images[index] === false)
          {
            let img = document.createElement('img');
            img.src = './img/SherlockLupa.png';
            img.alt = 'O';
            img.height = 150;
            img.width = 150;
            cell.appendChild(img);
            gameState.images[index] = true;
          }
      
    });
}

// Actualiza el estado de quién es el siguiente en jugar
function updateStatus()
{
    if (gameState.gameOver === gameOver.no) 
    {
      if (statusElement.firstChild)
        {
          statusElement.removeChild(statusElement.firstChild);
        }
      if (gameState.currentPlayer === 'X')
        {
          let img = document.createElement('img');
          img.src = './img/SherlockCruz.png';
          img.alt = 'X';
          img.height = 100;
          img.width = 100;
          statusElement.appendChild(img);
        } else if (gameState.currentPlayer === 'O')
          {
            let img = document.createElement('img');
            img.src = './img/SherlockLupa.png';
            img.alt = 'O';
            img.height = 100;
            img.width = 100;
            statusElement.appendChild(img);
          }
    }
}

// Verifica si hay un ganador
function checkWinner() 
{
    const winningCombinations = 
    [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    return winningCombinations.some(combo => {
        const [a, b, c] = combo;
        return (
          gameState.board[a] &&
          gameState.board[a] === gameState.board[b] &&
          gameState.board[a] === gameState.board[c]
        );
    });
}

// Reinica las imágenes del tablero
function restartImages() {
  const cells = boardElement.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
      if (cell.firstChild)
        {
          cell.removeChild(cell.firstChild);
        }
      
    });
}

// Gestiona el audio
audioButton.addEventListener('click', () => {
  if (audio.paused)
    {
      audio.play();
      audioButton.textContent = 'Audio: on';
    }else
    {
      audio.pause();
      audioButton.textContent = 'Audio: off';
    }
});

// Reinicia el juego
resetButton.addEventListener('click', () => {
    gameState.board = Array(9).fill('');
    gameState.currentPlayer = 'X';
    gameState.gameOver = gameOver.no;
    gameState.images = Array(9).fill(false);
    statusElement.style.visibility = 'visible';
    statusElement2.textContent = 'Turno:';
    restartImages();
    updateBoard();
    updateStatus();
  });



// Inicializa el juego cuando la página carga
document.addEventListener('DOMContentLoaded', initGame);