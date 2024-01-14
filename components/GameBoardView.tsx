import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BOT_MOVE_TIMEOUT, KALAM_LIGHT} from '../utils';
import {useSoundMode, useTextColor} from '../hooks';
import GameMoves from './GameMoves';
import {
  Board,
  BoardMove,
  PlayerType,
  createEmptyBoard,
  findNextMove,
  makeMove,
} from '../lib';
import {PlayerNumber} from '../definitions';
import {useAppSelector} from '../redux/useTypeSelectorHook';
import BoardView from './BoardView';
import {playClickOneSound, playClickTwoSound} from '../utils/sound';
import PlayerInfo from './PlayerInfo';

function isUserMove(
  currentPlayer: PlayerNumber,
  playerOneType: PlayerType,
  playerTwoType: PlayerType,
): boolean {
  return (
    (currentPlayer === 'one' && playerOneType === PlayerType.Human) ||
    (currentPlayer === 'two' && playerTwoType === PlayerType.Human)
  );
}

function isFinished(boards: Board[]) {
  return boards.length !== 0 && boards.every(board => board.isDead());
}

function GameBoardView() {
  const textColor = useTextColor();
  const soundMode = useSoundMode();
  const {playerOneType, playerTwoType} = useAppSelector(
    state => state.gameState,
  );
  const [player1Moves, setPlayer1Moves] = useState<BoardMove[]>([]);
  const [player2Moves, setPlayer2Moves] = useState<BoardMove[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<PlayerNumber>('one');
  const [lastMove, setLastMove] = useState<BoardMove | undefined>();
  const [winner, setWinner] = useState<PlayerNumber | undefined>();
  const [boards, setBoards] = useState<Board[]>([]);

  const newGame = () => {
    setPlayer1Moves([]);
    setPlayer2Moves([]);
    setCurrentPlayer('one');
    setLastMove(undefined);
    setWinner(undefined);
    const boardsCopy = createEmptyBoard();
    setBoards(boardsCopy);
    if (playerOneType === PlayerType.Computer) {
      computerMove(boardsCopy);
    }
  };

  const computerMove = useCallback(
    async (newBoards: Board[]) => {
      const {boardIndex, x, y} = findNextMove(newBoards);
      await new Promise(resolve =>
        setTimeout(() => resolve(true), BOT_MOVE_TIMEOUT),
      );
      if (soundMode) {
        playClickTwoSound();
      }
      if (playerOneType === PlayerType.Computer) {
        setPlayer1Moves(prev => [...prev, {boardIndex, x, y}]);
      } else if (playerTwoType === PlayerType.Computer) {
        setPlayer2Moves(prev => [...prev, {boardIndex, x, y}]);
      }
      const boardsAfterMove = makeMove({boardIndex, x, y}, newBoards);
      setLastMove({boardIndex, x, y});
      setBoards(boardsAfterMove);
      setCurrentPlayer(prev => (prev === 'one' ? 'two' : 'one'));
    },
    [playerOneType, playerTwoType, soundMode],
  );

  useEffect(() => {
    newGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClick = (move: BoardMove) => {
    if (!!winner || !isUserMove(currentPlayer, playerOneType, playerTwoType)) {
      return;
    }
    if (soundMode) {
      playClickOneSound();
    }
    const {boardIndex, x, y} = move;
    const newBoards = makeMove(move, boards);
    if (playerOneType === PlayerType.Human) {
      setPlayer1Moves(prev => [...prev, {boardIndex, x, y}]);
    } else if (playerTwoType === PlayerType.Human) {
      setPlayer2Moves(prev => [...prev, {boardIndex, x, y}]);
    }
    const finished = isFinished(newBoards);
    if (finished) {
      setWinner(currentPlayer === 'one' ? 'two' : 'one');
    }
    setBoards(newBoards);
    setLastMove({boardIndex, x, y});
    setCurrentPlayer(prev => (prev === 'one' ? 'two' : 'one'));
    if (!finished) {
      computerMove(newBoards);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.avoidTxt, {color: textColor}]}>
        Avoid making 3"X" in a line
      </Text>
      <PlayerInfo currentPlayer={currentPlayer} />
      <Text style={{color: textColor}}>Winner is: {winner}</Text>
      <View style={styles.innerContainer}>
        <GameMoves player1Moves={player1Moves} player2Moves={player2Moves} />
        <View style={styles.boardContainer}>
          {boards.map((board, idx) => (
            <BoardView
              key={idx}
              boardIndex={idx}
              board={board}
              player1Moves={player1Moves}
              player2Moves={player2Moves}
              lastMove={lastMove}
              onPress={onClick}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avoidTxt: {
    fontFamily: KALAM_LIGHT,
    fontSize: 12,
    alignSelf: 'center',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  boardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

export default GameBoardView;
