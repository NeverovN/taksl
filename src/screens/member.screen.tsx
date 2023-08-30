import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Keyboard, RefreshControl, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { userApi } from 'src/api/user/user.api';
import { Member } from 'src/api/user/user.types';
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
import { MemberRoute, RootNavigationProp } from 'src/routes/root/root.types';

export const MemberScreen: React.FC = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const {
    params: { userId },
  } = useRoute<MemberRoute>();

  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [, setError] = useState<Error | null>(null);
  const [user, setUser] = useState<Member>();

  const projectPressHandler = (projectId: string) => {
    navigation.push(structuredScreens.project, { projectId });
  };

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshHandler = () => {
    setRefreshing(true);
    loadUser().finally(() => setRefreshing(false));
  };

  const loadUser = async () => {
    setLoading(true);
    fetchMember().finally(() => setLoading(false));
  };

  const fetchMember = async () => {
    const response = await userApi.getUserById(userId);

    if (response.error) {
      setError(response.error);
      return;
    }

    setUser(response.data);
  };

  const backNavigationHandler = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const getContent = () => {
    return (
      <View style={styles.wrapper}>
        <HeaderWithButtons
          title={STRINGS.member}
          editable={false}
          style={styles.navBar}
          onBackPress={backNavigationHandler}
        />
        <Header
          username={user?.username}
          role={user?.role}
          style={styles.header}
          editable={false}
        />
        <View style={styles.contactPreferencesSection}>
          <ContactItem
            iconName={ICON_NAMES.phone}
            value={user?.phoneNumber}
            placeholder={STRINGS.phone}
            style={styles.contactItem}
            editable={false}
          />
          <ContactItem
            iconName={ICON_NAMES.mail}
            value={user?.email}
            placeholder={STRINGS.mail}
            style={styles.contactItem}
            editable={false}
          />
          <ContactItem
            iconName={ICON_NAMES.telegram}
            value={user?.telegram}
            placeholder={STRINGS.telegram}
            editable={false}
          />
        </View>
        <Text18 style={styles.projectsHeader} color="black">
          {STRINGS.projects}
        </Text18>
      </View>
    );
  };

  if (loading && !refreshing) {
    return null;
  }

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.keyboardAvoiding}>
      <SafeAreaView edges={['top', 'bottom']} style={styles.wrapper}>
        <ProjectList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={getContent()}
          style={styles.listCompensation}
          projects={user?.mutualProjects || []}
          onPress={projectPressHandler}
          refreshControl={
            <RefreshControl
              onRefresh={refreshHandler}
              refreshing={refreshing}
            />
          }
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
