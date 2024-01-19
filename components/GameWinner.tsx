import React, {useCallback, useEffect} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {captureScreen} from 'react-native-view-shot';
import Share from 'react-native-share';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  COLOR_BLACK,
  COLOR_OVERLAY_DARK,
  KALAM_BOLD,
  KALAM_REGULAR,
} from '../utils';
import {useAppDispatch, useAppSelector} from '../redux/useTypeSelectorHook';
import {PlayerType} from '../lib';
import {playGameOverSound, playGameWinSound} from '../utils/sound';
import Button from './Button';
import {newGame, resetGame} from '../redux/gameState';
import {useShowSuggestedMove, useSoundMode} from '../hooks';

const FLAG_LEFT_PATH = '../images/flag_left.png';
const FLAG_RIGHT_PATH = '../images/flag_right.png';

async function onShare() {
  try {
    const url = await captureScreen({format: 'jpg', quality: 0.8});
    await Share.open({
      title: 'Boot Trap',
      message: "I've won in Boot Trap. Can you?",
      url,
    });
  } catch (err) {
    console.log(err);
  }
}

function GameWinner() {
  const {gameType, winner} = useAppSelector(state => state.gameState);

  if (!winner) {
    return false;
  }

  if (gameType === 'VsComputer') {
    return <WinnerVsComputer />;
  }

  if (gameType === 'VsHuman') {
    return <WinnerVsHuman />;
  }
}

function WinnerVsComputer() {
  const {gameMode, winner, playerOneType, scoringMoves} = useAppSelector(
    state => state.gameState,
  );
  const soundMode = useSoundMode();
  const suggestionMode = useShowSuggestedMove();
  const dispatch = useAppDispatch();

  const isGameWin = useCallback(() => {
    return (
      (winner === 'one' && playerOneType === PlayerType.Human) ||
      (winner === 'two' && playerOneType === PlayerType.Computer)
    );
  }, [playerOneType, winner]);

  useEffect(() => {
    if (!winner) {
      return;
    }
    if (soundMode) {
      if (isGameWin()) {
        playGameWinSound();
      } else {
        playGameOverSound();
      }
    }
  }, [isGameWin, soundMode, winner]);

  const playAgain = () => dispatch(newGame());
  const resetOptions = () => dispatch(resetGame());

  if (!winner) {
    return;
  }
  return (
    <View style={styles.container}>
      <View style={styles.gameInfoWrapper}>
        <Text style={styles.gameInfoLabel}>Mode: {gameMode}</Text>
        <Text style={styles.gameInfoLabel}>
          Suggestion: {suggestionMode ? 'On' : 'Off'}
        </Text>
      </View>
      {isGameWin() ? (
        <>
          <MaterialCommunityIcons
            name="hand-clap"
            size={50}
            color={COLOR_BLACK}
          />
          <Text style={styles.txtMsg}>Congratulations!! You've won.</Text>
        </>
      ) : (
        <>
          <Entypo name="emoji-sad" size={50} color={COLOR_BLACK} />
          <Text style={styles.txtMsg}>Sorry!! You've lost.</Text>
        </>
      )}
      <Text style={styles.scoreTxt}>Score: {scoringMoves.length}</Text>
      {isGameWin() && (
        <Pressable style={styles.shareBtn} onPress={onShare}>
          <Text style={styles.shareBtnTxt}>Share your success</Text>
          <AntDesign
            name="sharealt"
            size={20}
            color={COLOR_BLACK}
            onPress={onShare}
          />
        </Pressable>
      )}
      <View style={styles.btnWrapper}>
        <Button
          text="Play Again"
          onClick={playAgain}
          style={styles.playAgainBtn}
        />
        <Button
          text="Main Menu"
          onClick={resetOptions}
          style={styles.resetBtn}
        />
      </View>
    </View>
  );
}

function WinnerVsHuman() {
  const {playerNames, winner} = useAppSelector(state => state.gameState);
  const soundMode = useSoundMode();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!winner) {
      return;
    }
    if (soundMode) {
      playGameWinSound();
    }
  }, [soundMode, winner]);

  const winnerName = () => {
    return winner === 'one' ? playerNames[0] : playerNames[1];
  };
  const playAgain = () => dispatch(newGame());
  const resetOptions = () => dispatch(resetGame());

  return (
    <View style={styles.container}>
      <View style={styles.winFlagWrapper}>
        <Image source={require(FLAG_LEFT_PATH)} />
        <Text style={styles.winFlagMessage}>{winnerName()} wins!!</Text>
        <Image source={require(FLAG_RIGHT_PATH)} />
      </View>
      <MaterialCommunityIcons name="hand-clap" size={50} color={COLOR_BLACK} />
      <Pressable style={styles.shareBtn} onPress={onShare}>
        <Text style={styles.shareBtnTxt}>Share your success</Text>
        <AntDesign
          name="sharealt"
          size={20}
          color={COLOR_BLACK}
          onPress={onShare}
        />
      </Pressable>
      <View style={styles.btnWrapper}>
        <Button
          text="Play Again"
          onClick={playAgain}
          style={styles.playAgainBtn}
        />
        <Button
          text="Main Menu"
          onClick={resetOptions}
          style={styles.resetBtn}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_OVERLAY_DARK,
    height: 250,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },
  gameInfoWrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  gameInfoLabel: {
    fontFamily: KALAM_REGULAR,
    fontSize: 14,
    color: COLOR_BLACK,
  },
  txtMsg: {
    fontFamily: KALAM_REGULAR,
    fontSize: 24,
    color: COLOR_BLACK,
  },
  scoreTxt: {
    fontFamily: KALAM_BOLD,
    fontSize: 20,
    color: COLOR_BLACK,
  },
  btnWrapper: {
    marginTop: 'auto',
    paddingBottom: 5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  playAgainBtn: {
    width: 125,
  },
  resetBtn: {
    width: 125,
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareBtnTxt: {
    fontFamily: KALAM_REGULAR,
    fontSize: 20,
    color: COLOR_BLACK,
    textDecorationLine: 'underline',
  },
  winFlagWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  winFlagMessage: {
    flex: 1,
    fontFamily: KALAM_BOLD,
    fontSize: 24,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
});

export default GameWinner;
