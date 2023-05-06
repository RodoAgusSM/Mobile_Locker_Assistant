import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import AwesomeButton from 'react-native-really-awesome-button';
import {screenHeight, screenWidth, colors} from '../utils/index';
import {useTranslation} from 'react-i18next';

type BottomSheetProps = {
  navigation: any;
  openBottomSheet: any;
  setOpenBottomSheet: any;
  handleResetPassword?: any;
  handleEraseLocker: any;
};

export const CustomBottomSheet = (bottomSheetProps: BottomSheetProps) => {
  const {t, i18n} = useTranslation();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['65%'], []);
  const handleSheetChanges = useCallback((index: number) => {}, []);

  useEffect(() => {
    if (!bottomSheetProps.openBottomSheet) {
      bottomSheetRef.current?.close();
    } else if (bottomSheetProps.openBottomSheet) {
      bottomSheetRef.current?.expand();
    }
  }, [bottomSheetProps.openBottomSheet]);

  return (
    <BottomSheet
      onClose={() => bottomSheetProps.setOpenBottomSheet(false)}
      ref={bottomSheetRef}
      index={bottomSheetProps.openBottomSheet ? 0 : -1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      style={{backgroundColor: 'transparent'}}
      backgroundStyle={CustomBottomSheetStyles.bottomSheetBackgroundStyle}
      onChange={() => handleSheetChanges}>
      <Text style={CustomBottomSheetStyles.settingsTitleTxt}>
        {t('BottomSheet.settings')}
      </Text>
      <View style={CustomBottomSheetStyles.bottomSheetView}>
        <AwesomeButton
          progress={false}
          width={screenWidth * 0.55}
          height={screenHeight * 0.08}
          backgroundColor={colors.sunset}
          backgroundShadow={colors.xanthous}
          backgroundActive={colors.peach}
          backgroundDarker={colors.xanthous}
          onPress={async () => {
            await bottomSheetProps.handleResetPassword();
          }}>
          <Text>{t('BottomSheet.resetPassword')}</Text>
        </AwesomeButton>
        <AwesomeButton
          progress={false}
          width={screenWidth * 0.55}
          height={screenHeight * 0.08}
          backgroundColor={colors.sunset}
          backgroundShadow={colors.xanthous}
          backgroundActive={colors.peach}
          backgroundDarker={colors.xanthous}
          style={{margin: 25}}
          onPress={async () => {
            await bottomSheetProps.handleEraseLocker();
          }}>
          <Text>{t('BottomSheet.eraseLocker')}</Text>
        </AwesomeButton>
        {i18n.language === 'sp' && (
          <AwesomeButton
            progress={false}
            width={screenWidth * 0.55}
            height={screenHeight * 0.08}
            backgroundColor={colors.sunset}
            backgroundShadow={colors.xanthous}
            backgroundActive={colors.peach}
            backgroundDarker={colors.xanthous}
            onPressOut={() => {
              i18n.changeLanguage('en');
            }}>
            <Text>{t('Language.english')}</Text>
          </AwesomeButton>
        )}
        {i18n.language === 'en' && (
          <AwesomeButton
            progress={false}
            width={screenWidth * 0.55}
            height={screenHeight * 0.08}
            backgroundColor={colors.sunset}
            backgroundShadow={colors.xanthous}
            backgroundActive={colors.peach}
            backgroundDarker={colors.xanthous}
            onPressOut={() => {
              i18n.changeLanguage('sp');
            }}>
            <Text>{t('Language.spanish')}</Text>
          </AwesomeButton>
        )}
      </View>
    </BottomSheet>
  );
};

const CustomBottomSheetStyles = StyleSheet.create({
  bottomSheetBackgroundStyle: {
    borderTopStartRadius: 22,
    borderTopEndRadius: 22,
    backgroundColor: colors.papayaWhite,
  },
  settingsTitleTxt: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  bottomSheetView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
