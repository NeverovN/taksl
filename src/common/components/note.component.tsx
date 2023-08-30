import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { CircledLayout } from 'src/common/components/circled-layout.component';
import { Text12, Text16 } from 'src/common/components/text.component';
import { COLORS } from 'src/common/constants/colors.consts';

export interface IncomingNoteProps {
  text: string;
  initials?: string;
  style?: StyleProp<ViewStyle>;
}

export interface OutgoingNoteProps {
  text: string;
  style?: StyleProp<ViewStyle>;
}

export interface NoteProps {
  style?: StyleProp<ViewStyle>;
  incoming?: boolean;
  text: string;
  initials?: string;
}

export const Note: React.FC<NoteProps> = ({ incoming = false, ...rest }) => {
  return incoming ? <IncomingNote {...rest} /> : <OutgoingNote {...rest} />;
};

export const IncomingNote: React.FC<IncomingNoteProps> = ({
  initials,
  text,
  style,
}) => {
  return (
    <View style={styles.noteWrapper}>
      <CircledLayout
        position="left"
        style={[styles.incomingWrapper, style]}
        maxRadius={34}>
        <View style={styles.avatar}>
          <Text12 color="white">{initials}</Text12>
        </View>
        <Text16 color="title" style={styles.text}>
          {text}
        </Text16>
      </CircledLayout>
      <View style={styles.noteCompensator} />
    </View>
  );
};

export const OutgoingNote: React.FC<OutgoingNoteProps> = ({ text, style }) => {
  return (
    <View style={styles.noteWrapper}>
      <View style={styles.noteCompensator} />
      <CircledLayout
        position="right"
        style={[styles.outgoingWrapper, style]}
        maxRadius={34}>
        <Text16 color="title" style={styles.text}>
          {text}
        </Text16>
      </CircledLayout>
    </View>
  );
};

export const styles = StyleSheet.create({
  incomingWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: COLORS.backgroundSecondary,
    marginRight: 32,
  },
  outgoingWrapper: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.mobile,
    marginLeft: 32,
  },
  avatar: {
    marginRight: 12,
    height: 36,
    width: 36,
    borderRadius: Number.MAX_SAFE_INTEGER,
    backgroundColor: COLORS.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {},
  noteWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  noteCompensator: {
    flex: 1,
  },
});
