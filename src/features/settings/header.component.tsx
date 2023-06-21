import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Avatar } from 'src/common/components/avatar.component';
import { UserInfo } from 'src/common/components/user-info.component';

export interface HeaderProps {
  style?: StyleProp<ViewStyle>;
  name: string;
  role: string;
  setName: (newName: string) => void;
  setRole: (newRole: string) => void;
  editable?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  style,
  name,
  role,
  setName,
  setRole,
  editable = true,
}) => {
  return (
    <View style={[styles.wrapper, style]}>
      <Avatar style={styles.avatar} />
      <UserInfo
        editable={editable}
        name={name}
        role={role}
        style={styles.userInfo}
        setName={setName}
        setRole={setRole}
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
});
