import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  COLOR_GREY,
  KALAM_BOLD,
  KALAM_LIGHT,
  KALAM_REGULAR,
  UPI_ID,
  showMessage,
} from '../utils';
import {useBackgroundColor, useTextColor} from '../hooks';

const QR_CODE_PATH = '../images/qr_code.png';

function AboutUs() {
  const bgColor = useBackgroundColor();

  return (
    <ScrollView
      contentContainerStyle={[styles.container, {backgroundColor: bgColor}]}>
      <AboutUsSection />
      <References />
      <Donate />
    </ScrollView>
  );
}

function Donate() {
  const txtColor = useTextColor();

  const onPress = () => {
    Clipboard.setString(UPI_ID);
    showMessage('Copied!');
  };

  return (
    <>
      <Text style={[styles.headerTxt, {color: txtColor}]}> Donate</Text>
      <View style={styles.donateWrapper}>
        <Image source={require(QR_CODE_PATH)} style={styles.qrCode} />
        <View style={styles.upiIdWrapper}>
          <Text style={[styles.upiIdTxt, {color: txtColor}]}>{UPI_ID}</Text>
          <Ionicons
            name="copy-outline"
            size={18}
            color={txtColor}
            onPress={onPress}
          />
        </View>
      </View>
    </>
  );
}

function AboutUsSection() {
  const txtColor = useTextColor();
  return (
    <>
      <Text style={[styles.headerTxt, {color: txtColor}]}> About Us</Text>
      <Text style={[styles.paraTxt, {color: txtColor}]}>
        we are a team of developers from West Bengal, India. This is one of the
        games which we've built in our spare time. If you've enjoyed this game,
        we would appreciate any amount of contribution from your side. These
        small gestures of kindness help us present this game to you without ads.
      </Text>
    </>
  );
}

function References() {
  const REFERENCE_LINKS = [
    'https://en.wikipedia.org/wiki/Notakto',
    'https://www.youtube.com/watch?v=h09XU8t8eUM',
    'https://arxiv.org/pdf/1301.1672v1.pdf',
  ];
  const txtColor = useTextColor();

  const onPress = (txt: string) => {
    Clipboard.setString(txt);
    showMessage('Copied!');
  };

  return (
    <>
      <Text style={[styles.headerTxt, {color: txtColor}]}> References</Text>
      {REFERENCE_LINKS.map((txt, idx) => (
        <Text
          key={idx}
          style={[styles.linkTxt, {color: txtColor}]}
          onPress={() => onPress(txt)}>
          {txt}
        </Text>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerTxt: {
    fontFamily: KALAM_BOLD,
    fontSize: 24,
  },
  paraTxt: {
    paddingHorizontal: 10,
    fontFamily: KALAM_LIGHT,
    fontSize: 16,
  },
  linkTxt: {
    paddingHorizontal: 10,
    fontFamily: KALAM_LIGHT,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  donateWrapper: {
    alignItems: 'center',
  },
  qrCode: {
    height: 250,
    resizeMode: 'contain',
  },
  upiIdWrapper: {
    flexDirection: 'row',
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: COLOR_GREY,
    borderRadius: 10,
    alignItems: 'center',
  },
  upiIdTxt: {
    fontFamily: KALAM_REGULAR,
    fontSize: 18,
    marginRight: 5,
  },
});

export default AboutUs;
