import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CircledLayout } from 'src/common/components/circled-layout.component';
import { Text12, Text16 } from 'src/common/components/text.component';
import { COLORS } from 'src/common/constants/colors.consts';

export interface IncomingNoteProps {
  text: string;
  initials: string;
}

export interface OutgoingNoteProps {
  text: string;
}

export interface NoteProps {
  incoming: boolean;
  text: string;
  initials: string;
}

export const Note: React.FC<NoteProps> = ({ incoming, ...rest }) => {
  return incoming ? <IncomingNote {...rest} /> : <OutgoingNote {...rest} />;
};

export const IncomingNote: React.FC<IncomingNoteProps> = ({
  initials,
  text,
}) => {
  return (
    <CircledLayout
      position="left"
      style={styles.incomingWrapper}
      maxRadius={34}>
      <View style={styles.avatar}>
        <Text12 color="white">{initials}</Text12>
      </View>
      <Text16 color="title" style={styles.text}>
        {text}
      </Text16>
    </CircledLayout>
  );
};

export const OutgoingNote: React.FC<OutgoingNoteProps> = ({ text }) => {
  return (
    <CircledLayout
      position="right"
      style={styles.outgoingWrapper}
      maxRadius={34}>
      <Text16 color="title" style={styles.text}>
        {text}
      </Text16>
    </CircledLayout>
  );
};

export const styles = StyleSheet.create({
  incomingWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'flex-start',
    backgroundColor: COLORS.backgroundSecondary,
    marginRight: 32,
  },
  outgoingWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'flex-start',
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
  text: {
    flex: 1,
  },
});
