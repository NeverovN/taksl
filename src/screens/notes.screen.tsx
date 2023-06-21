import React, { useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  ListRenderItem,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PressableOpacity } from 'src/common/components/button.component';
import { MessageInput } from 'src/common/components/message-input.component';
import { Note, NoteProps } from 'src/common/components/note.component';
import { COLORS } from 'src/common/constants/colors.consts';

export const NotesScreen: React.FC = () => {
  const inputRef = useRef<TextInput>(null);
  const [note, setNote] = useState<string>('');

  const renderItem: ListRenderItem<NoteProps & { id: number }> = ({ item }) => {
    return (
      <PressableOpacity>
        <Note {...item} incoming={false} />
      </PressableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.wrapper} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={'padding'}
        keyboardVerticalOffset={16}>
        <FlatList
          data={mockNotes.reverse()}
          ItemSeparatorComponent={() => <View style={styles.noteSeparator} />}
          renderItem={renderItem}
          scrollEventThrottle={100}
          inverted
        />
        <MessageInput
          ref={inputRef}
          onPress={() => null}
          value={note}
          onChangeText={setNote}
          style={styles.noteInput}
          inputStyle={styles.inputField}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingBottom: 16,
    backgroundColor: COLORS.backgroundSecondary,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  noteSeparator: {
    height: 16,
  },
  noteInput: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  inputField: {
    backgroundColor: COLORS.background,
  },
});

const mockNotes = [
  {
    userId: 0,
    id: 0,
    initials: 'SG',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.sdfsdfasdfsdfsd',
    incoming: true,
  },
  {
    userId: 0,
    id: 1,
    initials: 'SG',
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a g alley of type and scrambled it to make a type specimen book.",
    incoming: false,
  },
  {
    userId: 0,
    id: 2,
    initials: 'SG',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    incoming: true,
  },
  {
    userId: 0,
    id: 3,
    initials: 'SG',
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a g alley of type and scrambled it to make a type specimen book.",
    incoming: false,
  },
  {
    userId: 0,
    id: 4,
    initials: 'SG',
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a g alley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a g alley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a g alley of type and scrambled it to make a type specimen book.",
    incoming: false,
  },
];
