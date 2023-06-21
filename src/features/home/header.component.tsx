import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Source } from 'react-native-fast-image';
import { Avatar } from 'src/common/components/avatar.component';
import { IconButton } from 'src/common/components/button.component';
import { UserInfo } from 'src/common/components/user-info.component';

export interface HeaderProps {
  style?: StyleProp<ViewStyle>;
  source?: Source;
  name: string;
  role: string;
  onPress: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  style,
  name,
  role,
  source,
  onPress,
}) => {
  return (
    <View style={[styles.wrapper, style]}>
      <Avatar source={source} style={styles.avatar} />
      <UserInfo name={name} role={role} style={styles.userInfo} />
      <IconButton
        name="settings"
        size={32}
        style={styles.button}
        color={'title'}
        onPress={onPress}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },
  avatar: {
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
    marginVertical: 4,
  },
  button: {
    margin: 6,
  },
});
