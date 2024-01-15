import Sound from 'react-native-sound';

Sound.setCategory('Ambient');

const ClickOneSound = new Sound('click_1.mp3', Sound.MAIN_BUNDLE);
const ClickTwoSound = new Sound('click_2.mp3', Sound.MAIN_BUNDLE);
const GameOverSound = new Sound('gameover.mp3', Sound.MAIN_BUNDLE);
const GameWinSound = new Sound('gamewin.mp3', Sound.MAIN_BUNDLE);

export function loadAllMusic() {
  ClickOneSound.setVolume(1);
  ClickTwoSound.setVolume(1);
  GameOverSound.setVolume(1);
  GameWinSound.setVolume(1);
}

export function playClickOneSound() {
  if (!ClickOneSound.isLoaded()) {
    return;
  }
  ClickOneSound.play();
}

export function playClickTwoSound() {
  if (!ClickTwoSound.isLoaded()) {
    return;
  }
  ClickTwoSound.play();
}

export function playGameOverSound() {
  if (!GameOverSound.isLoaded()) {
    return;
  }
  GameOverSound.play();
}

export function playGameWinSound() {
  if (!GameWinSound.isLoaded()) {
    return;
  }
  GameWinSound.play();
}
