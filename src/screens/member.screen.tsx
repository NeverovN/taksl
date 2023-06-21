import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { Pressable } from 'src/common/components/button.component';
import { HeaderWithButtons } from 'src/common/components/header-with-buttons.component';
import { Text18 } from 'src/common/components/text.component';
import { COLORS } from 'src/common/constants/colors.consts';
import { ICON_NAMES } from 'src/common/constants/icon-names.consts';
import { structuredScreens } from 'src/common/constants/screens.consts';
import { STRINGS } from 'src/common/constants/strings.consts';
import { ContactItem } from 'src/features/contact-preferences/contact-item.component';
import { ProjectList } from 'src/features/member/project-list.component';
import { Header } from 'src/features/settings/header.component';
import { UPDATE_USER } from 'src/redux/user/user.actions';
import { rootUserSelector } from 'src/redux/user/user.selectors';
import { RootNavigationProp } from 'src/routes/root/root.types';

export const MemberScreen: React.FC = () => {
  const { loading, data } = useSelector(rootUserSelector);
  const dispatch = useDispatch();
  const navigation = useNavigation<RootNavigationProp>();

  const [name, setName] = useState<string>(data.username);
  const [role, setRole] = useState<string>(data.role);
  const [phone, setPhone] = useState<string>(data.phone);
  const [email, setEmail] = useState<string>(data.email);
  const [telegram, setTelegram] = useState<string>(data.telegram);

  const projectPressHandler = (projectId: string) => {
    navigation.push(structuredScreens.project, { projectId });
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
        <HeaderWithButtons
          title={STRINGS.member}
          editable={false}
          style={styles.navBar}
          onBackPress={backNavigationHandler}
          icons={[
            { icon: ICON_NAMES.filter, onPress: () => {} },
            { icon: ICON_NAMES.search, onPress: () => {} },
          ]}
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
            editable={false}
          />
          <ContactItem
            iconName={ICON_NAMES.mail}
            value={email}
            onChangeText={setEmail}
            placeholder={STRINGS.mail}
            style={styles.contactItem}
            editable={false}
          />
          <ContactItem
            iconName={ICON_NAMES.telegram}
            value={telegram}
            onChangeText={setTelegram}
            placeholder={STRINGS.telegram}
            editable={false}
          />
        </View>
        <Text18 style={styles.projectsHeader} color="black">
          {STRINGS.projects}
        </Text18>
        <ProjectList
          style={styles.listCompensation}
          projects={[
            {
              id: '0',
              name: 'Project 1',
              description: 'Description',
              progress: 20,
              numberOfTasks: 6,
            },
            {
              id: '1',
              name: 'Project 1',
              description: 'Description',
              progress: 20,
              numberOfTasks: 6,
            },
            {
              id: '3',
              name: 'Project 1',
              description: 'Description',
              progress: 20,
              numberOfTasks: 6,
            },
            {
              id: '4',
              name: 'Project 1',
              description: 'Description',
              progress: 20,
              numberOfTasks: 6,
            },
          ]}
          onPress={projectPressHandler}
        />
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
  },
  navBar: {
    marginBottom: 8,
  },
  header: {
    marginBottom: 30,
  },
  contactPreferencesSection: {
    marginBottom: 38,
  },
  projectsHeader: { marginBottom: 16 },
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
  listCompensation: {
    marginLeft: -16,
  },
});
