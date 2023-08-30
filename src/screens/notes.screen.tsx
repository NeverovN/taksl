import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  ListRenderItem,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { userApi } from 'src/api/user/user.api';
import { UserNote } from 'src/api/user/user.types';
import { PressableOpacity } from 'src/common/components/button.component';
import { Error } from 'src/common/components/error.component';
import { Loading } from 'src/common/components/loading.component';
import { MessageInput } from 'src/common/components/message-input.component';
import { Note, NoteProps } from 'src/common/components/note.component';
import { COLORS } from 'src/common/constants/colors.consts';

export const NotesScreen: React.FC = () => {
  const inputRef = useRef<TextInput>(null);
  const [note, setNote] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [notes, setNotes] = useState<UserNote[]>();

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      Promise.all([fetchNotes()]).finally(() => setLoading(false));
    }, []),
  );

  const fetchNotes = async () => {
    const notesResp = await userApi.getUserNotes();
    if (notesResp.error) {
      setError(notesResp.error);
    } else {
      setNotes(notesResp.data.reverse());
    }
  };

  const sendNoteHandler = () => {
    userApi.addUserNote(note).finally(() => fetchNotes());
    setNote('');
  };

  const renderItem: ListRenderItem<NoteProps & { id: string }> = ({ item }) => {
    return (
      <PressableOpacity>
        <Note {...item} incoming={false} />
      </PressableOpacity>
    );
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <SafeAreaView style={styles.wrapper} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={'padding'}
        keyboardVerticalOffset={16}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={notes}
          ItemSeparatorComponent={() => <View style={styles.noteSeparator} />}
          renderItem={renderItem}
          scrollEventThrottle={100}
          inverted
        />
        <MessageInput
          ref={inputRef}
          onPress={sendNoteHandler}
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
