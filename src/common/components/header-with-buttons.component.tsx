import React, { useImperativeHandle, useMemo, useRef, useState } from 'react';
import { IconName } from '../types/icon-name.types';
import {
  StyleSheet,
  View,
  TextInput as RNTextInput,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { COLORS } from '../constants/colors.consts';
import { IconButton } from './button.component';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from './text-input.component';
import { FONT_WEIGHTS } from '../types/text.types';
import { ICON_NAMES } from '../constants/icon-names.consts';

export interface HeaderWithButtonsProps {
  focused?: boolean;
  setFocused?: (newFocused: boolean) => void;
  style?: StyleProp<ViewStyle>;
  icons?: Array<{ icon: IconName; onPress: () => void }>;
  title: string;
  onChangeText?: (text: string) => void;
  editable?: boolean;
  onBackPress?: () => void;
}

export const HeaderWithButtons = React.forwardRef<
  Pick<RNTextInput, 'blur' | 'focus'>,
  HeaderWithButtonsProps
>(
  (
    {
      icons,
      title,
      onChangeText,
      editable = true,
      style,
      focused: externalFocused = false,
      setFocused: setExternalFocused,
      onBackPress,
    },
    ref,
  ) => {
    const internalInputRef = useRef<RNTextInput>(null);

    useImperativeHandle(ref, () => ({
      blur: () => {
        internalInputRef.current?.blur();
      },
      focus: () => {
        internalInputRef.current?.focus();
      },
    }));

    const navigation = useNavigation();

    const [internalFocused, setInternalFocused] =
      useState<boolean>(externalFocused);

    const [focused, setFocused] = useMemo((): [
      boolean,
      (newValue: boolean) => void,
    ] => {
      return externalFocused !== undefined && setExternalFocused !== undefined
        ? [externalFocused, setExternalFocused]
        : [internalFocused, setInternalFocused];
    }, [externalFocused, internalFocused, setExternalFocused]);

    const backNavigationHandler = () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    };

    const onFocusHandler = () => {
      setFocused(true);
    };

    const onEndFocusHandler = () => {
      setFocused(false);
    };

    const clearHandler = () => {
      onChangeText?.('');
      setFocused(false);
      internalInputRef.current?.blur();
    };

    return (
      <View style={[styles.wrapper, style]}>
        <IconButton
          name={ICON_NAMES['carret-left']}
          onPress={onBackPress || backNavigationHandler}
        />
        <View
          style={[
            styles.inputWrapper,
            ...(focused ? [styles.textInputFocused] : []),
          ]}>
          <TextInput
            editable={editable}
            fontWeight={FONT_WEIGHTS.bold}
            size={24}
            color="title"
            value={title}
            onChangeText={onChangeText}
            onFocus={onFocusHandler}
            onSubmitEditing={onEndFocusHandler}
            ref={internalInputRef}
            style={styles.textInput}
          />
          {focused && (
            <IconButton
              name={ICON_NAMES.cross}
              onPress={clearHandler}
              style={styles.clearIcon}
            />
          )}
        </View>
        {!focused &&
          icons &&
          icons.map(({ icon, onPress }, index) => {
            const additionalStyle =
              index + 1 === icons.length ? undefined : styles.spacer;
            return (
              <IconButton
                key={icon}
                onPress={onPress}
                size={24}
                name={icon}
                style={additionalStyle}
              />
            );
          })}
      </View>
    );
  },
);

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    paddingVertical: 8,
    marginLeft: 16,
    paddingHorizontal: 16,
    flex: 1,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#00000000',
  },
  textInput: {
    flex: 1,
  },
  textInputFocused: {
    borderRadius: Number.MAX_SAFE_INTEGER,
    borderColor: COLORS.main,
  },
  clearIcon: {
    marginLeft: 16,
  },
  spacer: {
    marginRight: 24,
  },
});
