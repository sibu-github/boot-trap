import React from 'react';
import GameMoves from './GameMoves';
import {useSoundMode} from '../../hooks';
import {useAppDispatch, useAppSelector} from '../../redux/useTypeSelectorHook';
import {BoardMove, clearMove, isUserMove} from '../../lib';
import {playClickOneSound} from '../../utils/sound';
import {deleteMove} from '../../redux/gameState';

function GameMovesContainer() {
  const soundMode = useSoundMode();
  const {
    gameType,
    playerOneType,
    playerTwoType,
    currentPlayer,
    player1Moves,
    player2Moves,
    winner,
    boardItems,
    scoringMoves,
  } = useAppSelector(state => state.gameState);
  const dispatch = useAppDispatch();

  if (!currentPlayer || !playerOneType || !playerTwoType) {
    console.log({currentPlayer, playerOneType, playerTwoType});
    throw new Error('Incorrect game initialization');
  }
  const copyMove = (m: BoardMove): BoardMove => ({
    boardIndex: m.boardIndex,
    x: m.x,
    y: m.y,
  });

  const undoMultiplayerGame = async () => {
    const player1MovesCopy = player1Moves.map(copyMove);
    const player2MovesCopy = player2Moves.map(copyMove);
    let scoringMovesCopy = scoringMoves.map(copyMove);
    console.log(player1MovesCopy);
    console.log(player2MovesCopy);
    const moveToClear =
      currentPlayer === 'one' ? player2MovesCopy.pop() : player1MovesCopy.pop();
    const newLastMove =
      currentPlayer === 'one'
        ? player1MovesCopy[player1MovesCopy.length - 1]
        : player2MovesCopy[player2MovesCopy.length - 1];
    if (!moveToClear) {
      return;
    }
    const newBoards = clearMove(moveToClear, boardItems);
    const newBoardItems = newBoards.map(b => b.items);
    const newCurrentPlayer = currentPlayer === 'one' ? 'two' : 'one';
    await dispatch(
      deleteMove({
        newBoardItems,
        newCurrentPlayer,
        newLastMove,
        player1MovesCopy,
        player2MovesCopy,
        scoringMovesCopy,
      }),
    );
  };

  const undoPlayerOne = async () => {
    const player1MovesCopy = player1Moves.map(copyMove);
    const player2MovesCopy = player2Moves.map(copyMove);
    let scoringMovesCopy = scoringMoves.map(copyMove);
    let moveToClear = player2MovesCopy.pop();
    if (!moveToClear) {
      return;
    }
    let newBoards = clearMove(moveToClear, boardItems);
    let newBoardItems = newBoards.map(b => b.items);
    moveToClear = player1MovesCopy.pop();
    if (!moveToClear) {
      return;
    }
    scoringMovesCopy = scoringMovesCopy.filter(
      m =>
        !(
          m.boardIndex === moveToClear?.boardIndex &&
          m.x === moveToClear?.x &&
          m.y === moveToClear?.y
        ),
    );
    const newCurrentPlayer = currentPlayer;
    const newLastMove = player2MovesCopy[player2MovesCopy.length - 1];
    newBoards = clearMove(moveToClear, newBoardItems);
    newBoardItems = newBoards.map(b => b.items);
    await dispatch(
      deleteMove({
        newBoardItems,
        newCurrentPlayer,
        newLastMove,
        player1MovesCopy,
        player2MovesCopy,
        scoringMovesCopy,
      }),
    );
  };

  const undoPlayerTwo = async () => {
    if (player2Moves.length === 0) {
      return;
    }
    const player1MovesCopy = player1Moves.map(copyMove);
    const player2MovesCopy = player2Moves.map(copyMove);
    let scoringMovesCopy = scoringMoves.map(copyMove);
    let moveToClear = player1MovesCopy.pop();
    if (!moveToClear) {
      return;
    }
    let newBoards = clearMove(moveToClear, boardItems);
    let newBoardItems = newBoards.map(b => b.items);
    moveToClear = player2MovesCopy.pop();
    if (!moveToClear) {
      return;
    }
    scoringMovesCopy = scoringMovesCopy.filter(
      m =>
        !(
          m.boardIndex === moveToClear?.boardIndex &&
          m.x === moveToClear?.x &&
          m.y === moveToClear?.y
        ),
    );
    const newCurrentPlayer = currentPlayer;
    const newLastMove = player1MovesCopy[player1MovesCopy.length - 1];
    newBoards = clearMove(moveToClear, newBoardItems);
    newBoardItems = newBoards.map(b => b.items);

    await dispatch(
      deleteMove({
        newBoardItems,
        newCurrentPlayer,
        newLastMove,
        player1MovesCopy,
        player2MovesCopy,
        scoringMovesCopy,
      }),
    );
  };

  const onUndo = async () => {
    if (!!winner || !isUserMove(currentPlayer, playerOneType, playerTwoType)) {
      return;
    }
    if (soundMode) {
      playClickOneSound();
    }
    if (player1Moves.length === 0) {
      return;
    }
    if (gameType === 'VsHuman') {
      return undoMultiplayerGame();
    }
    if (currentPlayer === 'one') {
      return undoPlayerOne();
    }
    return undoPlayerTwo();
  };

  return (
    <GameMoves
      player1Moves={player1Moves}
      player2Moves={player2Moves}
      scoringMoves={scoringMoves}
      winner={winner}
      onUndo={onUndo}
    />
  );
}

export default GameMovesContainer;
