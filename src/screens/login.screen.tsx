import React, { useState } from 'react';
import { Image } from 'common/components/image.component';
import { IMAGES } from 'common/constants/images.consts';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { Title } from 'src/features/authorization/title.component';
import { STRINGS } from 'src/common/constants/strings.consts';
import { Button } from 'src/features/authorization/button.component';
import { Link } from 'src/features/authorization/link.component';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { screenNames } from 'src/common/constants/screens.consts';
import { RootNavigationProp } from 'src/routes/root/root.types';
import { AuthorizationInput } from 'src/features/authorization/input.component';
import { Pressable } from 'src/common/components/button.component';
import { useDispatch } from 'react-redux';
import { LOGIN } from 'src/redux/login/auth.actions';

export interface LoginScreenProps {}

export const LoginScreen: React.FC<LoginScreenProps> = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const signUpHandler = () => {
    navigation.dispatch(state => {
      const routes = [
        { name: screenNames.register, kay: screenNames.register },
      ];

      return CommonActions.reset({
        ...state,
        routes,
        index: 0,
      });
    });
  };

  const logInPressHandler = () => {
    dispatch(LOGIN.TRIGGER({ email, password }));
  };

  const dismissKeyboardHandler = () => {
    Keyboard.dismiss();
  };

  return (
    <Image source={IMAGES.authBackground} style={styles.screenWrapper}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={-72}>
        <Pressable onPress={dismissKeyboardHandler}>
          <Title
            style={styles.title}
            firstLine={STRINGS.logInto}
            secondLine={STRINGS.account}
          />
          <View style={styles.inputs}>
            <AuthorizationInput
              value={email}
              onChangeText={setEmail}
              placeholder={STRINGS.email}
              containerStyle={styles.spacing}
              autoCapitalize="none"
            />
            <AuthorizationInput
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholder={STRINGS.password}
            />
          </View>
          <Button
            title={STRINGS.login}
            onPress={logInPressHandler}
            style={styles.button}
          />
        </Pressable>
      </KeyboardAvoidingView>
      <Link
        text={STRINGS.dontHave}
        boldText={STRINGS.signUp}
        onPress={signUpHandler}
        style={styles.link}
      />
    </Image>
  );
};

export const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'flex-end',
  },
  title: {
    marginBottom: 40,
  },
  inputs: {
    marginBottom: 63,
  },
  button: {
    marginBottom: 139,
  },
  link: {
    marginBottom: 60,
  },
  spacing: {
    marginBottom: 24,
  },
});
