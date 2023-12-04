

const sendMessage = require('./sendMessage');

const handlePostMoveNotification = async ({ game, mover, opponent }) => {
  try {
    // Assuming Tic Tac Toe game is won when a player has a line (horizontal, vertical, or diagonal)
    if (isGameWon(game)) {
      const winnerMessage = `Congratulations, ${mover.username}! You won the Tic Tac Toe game!`;
      const loserMessage = `Unfortunately, ${mover.username} beat you in the Tic Tac Toe game.`;
      await Promise.all([
        sendMessage({ email: mover.email, message: winnerMessage }),
        sendMessage({ email: opponent.email, message: loserMessage }),
      ]);
      console.log('Game over. The winner is:', opponent.username);
      return true;
    }
    else{
      const message = `${mover.username} has made a move. It's your turn in Tic Tac Toe Game ID ${game.gameId}!`;
      await sendMessage({ email: opponent.email, message });
      return false;
    }
  } catch (error) {
    console.error('Error handling post-move notification:', error);
    // Handle or log the error as needed
  }
};
// Function to check if the Tic Tac Toe game is won
const isGameWon = (game) => {
  // Check for horizontal wins for 1
  if (
    (game.a1 === game.a2 && game.a2 === game.a3 && game.a1 === 1) ||
    (game.a4 === game.a5 && game.a5 === game.a6 && game.a4 === 1) ||
    (game.a7 === game.a8 && game.a8 === game.a9 && game.a7 === 1)
  ) {
    return true;
  }

  // Check for vertical wins for 1
  else if (
    (game.a1 === game.a4 && game.a4 === game.a7 && game.a1 === 1) ||
    (game.a2 === game.a5 && game.a5 === game.a8 && game.a2 === 1) ||
    (game.a3 === game.a6 && game.a6 === game.a9 && game.a3 === 1)
  ) {
    return true;
  }

  // Check for diagonal wins for 1
  else if (
    (game.a1 === game.a5 && game.a5 === game.a9 && game.a1 === 1) ||
    (game.a3 === game.a5 && game.a5 === game.a7 && game.a3 === 1)
  ) {
    return true;
  }
  // Check for horizontal wins for 2
  else if (
    (game.a1 === game.a2 && game.a2 === game.a3 && game.a1 === 2) ||
    (game.a4 === game.a5 && game.a5 === game.a6 && game.a4 === 2) ||
    (game.a7 === game.a8 && game.a8 === game.a9 && game.a7 === 2)
  ) {
    return true;
  }

  // Check for vertical wins for 2
  else if (
    (game.a1 === game.a4 && game.a4 === game.a7 && game.a1 === 2) ||
    (game.a2 === game.a5 && game.a5 === game.a8 && game.a2 === 2) ||
    (game.a3 === game.a6 && game.a6 === game.a9 && game.a3 === 2)
  ) {
    return true;
  }

  // Check for diagonal wins for 2
  else if (
    (game.a1 === game.a5 && game.a5 === game.a9 && game.a1 === 2) ||
    (game.a3 === game.a5 && game.a5 === game.a7 && game.a3 === 2)
  ) {
    return true;
  }

  // No win
  return false;
};

module.exports = handlePostMoveNotification;