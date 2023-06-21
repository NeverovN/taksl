import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { Pressable, TextButton } from 'src/common/components/button.component';
import { HeaderWithButtons } from 'src/common/components/header-with-buttons.component';
import { COLORS } from 'src/common/constants/colors.consts';
import { ICON_NAMES } from 'src/common/constants/icon-names.consts';
import { STRINGS } from 'src/common/constants/strings.consts';
import { FONT_SIZES } from 'src/common/types/text.types';
import { ContactItem } from 'src/features/contact-preferences/contact-item.component';
import { Header } from 'src/features/settings/header.component';
import { LOGOUT } from 'src/redux/login/auth.actions';
import { UPDATE_USER } from 'src/redux/user/user.actions';
import { rootUserSelector } from 'src/redux/user/user.selectors';
import { RootNavigationProp } from 'src/routes/root/root.types';

export const SettingsScreen: React.FC = () => {
  const { loading, data } = useSelector(rootUserSelector);
  const dispatch = useDispatch();
  const navigation = useNavigation<RootNavigationProp>();

  const [name, setName] = useState<string>(data.username);
  const [role, setRole] = useState<string>(data.role);
  const [phone, setPhone] = useState<string>(data.phone);
  const [email, setMail] = useState<string>(data.email);
  const [telegram, setTelegram] = useState<string>(data.telegram);

  const exitHandler = () => {
    dispatch(LOGOUT.TRIGGER());
  };

  const backNavigationHandler = () => {
    dispatch(
      UPDATE_USER.TRIGGER({ body: { phone, email, telegram }, id: data.id }),
    );
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  if (loading) {
    return null;
  }

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.keyboardAvoiding}>
      <SafeAreaView edges={['top']} style={styles.wrapper}>
        <View>
          <HeaderWithButtons
            title={STRINGS.settings}
            editable={false}
            style={styles.navBar}
            onBackPress={backNavigationHandler}
          />
          <Header
            name={name}
            role={role}
            style={styles.header}
            setName={setName}
            setRole={setRole}
          />
          <View style={styles.contactPreferencesSection}>
            <ContactItem
              iconName={ICON_NAMES.phone}
              value={phone}
              onChangeText={setPhone}
              placeholder={STRINGS.phone}
              style={styles.contactItem}
            />
            <ContactItem
              iconName={ICON_NAMES.mail}
              value={email}
              onChangeText={setMail}
              placeholder={STRINGS.mail}
              style={styles.contactItem}
            />
            <ContactItem
              iconName={ICON_NAMES.telegram}
              value={telegram}
              onChangeText={setTelegram}
              placeholder={STRINGS.telegram}
            />
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <TextButton
            title={STRINGS.exit}
            style={styles.button}
            color={'background'}
            size={FONT_SIZES.font20}
            onPress={exitHandler}
          />
        </View>
      </SafeAreaView>
    </Pressable>
  );
};

export const styles = StyleSheet.create({
  keyboardAvoiding: {
    flex: 1,
    backgroundColor: COLORS.backgroundSecondary,
  },
  wrapper: {
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: 'space-between',
  },
  navBar: {
    marginBottom: 8,
  },
  header: {
    marginBottom: 30,
  },
  contactPreferencesSection: {},
  contactItem: {
    marginBottom: 16,
  },
  buttonWrapper: {
    alignItems: 'center',
    marginBottom: 39,
  },
  button: {
    width: 162,
    paddingVertical: 10,
    backgroundColor: COLORS.main,
    borderRadius: Number.MAX_SAFE_INTEGER,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
