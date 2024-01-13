import Sound from 'react-native-sound';

Sound.setCategory('Ambient');
const BackgroundMusic = new Sound(
  'backgound_music.mp3',
  Sound.MAIN_BUNDLE,
  err => {
    if (err) {
      console.log('Failed to load backgound_music.mp3');
    }
  },
);

const ClickOneSound = new Sound('click_1.mp3', Sound.MAIN_BUNDLE, err => {
  if (err) {
    console.log('Failed to load click_1.mp3');
  }
});
const ClickTwoSound = new Sound('click_2.mp3', Sound.MAIN_BUNDLE, err => {
  if (err) {
    console.log('Failed to load click_2.mp3');
  }
});

const GameOverSound = new Sound('gameover.mp3', Sound.MAIN_BUNDLE, err => {
  if (err) {
    console.log('Failed to load gameover.mp3');
  }
});

const GameWinSound = new Sound('gamewin.mp3', Sound.MAIN_BUNDLE, err => {
  if (err) {
    console.log('Failed to load gamewin.mp3');
  }
});

export function loadAllMusic() {
  BackgroundMusic.setVolume(0.5);
  ClickOneSound.setVolume(1);
  ClickTwoSound.setVolume(1);
  GameOverSound.setVolume(1);
  GameWinSound.setVolume(1);
}

export function playBackgroundMusic() {
  //   BackgroundMusic.isLoaded();
  //   BackgroundMusic.play(success => {
  //     if (!success) {
  //       console.log('fails to play backgroundMusic');
  //       return;
  //     }
  //   });
  //   BackgroundMusic.setNumberOfLoops(-1);
  //   BackgroundMusic.play(success => {
  //     if (!success) {
  //       console.log('Failed to play BackgoundMusic');
  //     }
  //   });
}

export function playClickOneSound() {
  if (!ClickOneSound.isLoaded()) {
    console.log('ClickOneSound is not loaded');
    return;
  }
  ClickOneSound.play(success => {
    if (!success) {
      console.log('Failed to play click one sound');
    }
  });
}

export function playClickTwoSound() {
  if (!ClickTwoSound.isLoaded()) {
    console.log('ClickTwoSound is not loaded');
    return;
  }
  ClickTwoSound.play(success => {
    if (!success) {
      console.log('Failed to play click two sound');
    }
  });
}

export function playGameOverSound() {
  if (!GameOverSound.isLoaded()) {
    console.log('GameOverSound is not loaded');
    return;
  }
  GameOverSound.play(success => {
    if (!success) {
      console.log('Failed to play GameOverSound');
    }
  });
}

export function playGameWinSound() {
  if (!GameWinSound.isLoaded()) {
    console.log('GameWinSound is not loaded');
    return;
  }
  GameWinSound.play(success => {
    if (!success) {
      console.log('Failed to play GameWinSound');
    }
  });
}
