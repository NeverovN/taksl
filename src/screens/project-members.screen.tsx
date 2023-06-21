import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderWithButtons } from 'src/common/components/header-with-buttons.component';
import { structuredScreens } from 'src/common/constants/screens.consts';
import { STRINGS } from 'src/common/constants/strings.consts';
import { ProjectMembersList } from 'src/features/project-members/project-members.component';
import { SortItems } from 'src/features/project-members/sort-items.component';
import { MembersRoute, RootNavigationProp } from 'src/routes/root/root.types';

export interface ProjectMembersProps {}

export const ProjectMembersScreen: React.FC = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const {
    params: { projectId },
  } = useRoute<MembersRoute>();
  const ref = useRef<TextInput>(null);
  const [focused, setFocused] = useState<boolean>(false);

  const [value, setValue] = useState<string>(STRINGS.projectMembers);

  const [performanceSelected, setPerformanceSelected] = useState<0 | 1 | 2>(0);

  const performancePressHandler = () => {
    setPerformanceSelected(prev => {
      const currState = ((prev + 1) % 3) as 0 | 1 | 2;

      // switch (currState) {
      //   case 0:
      //     setFilteredTasks(tasks);
      //     break;
      //   case 1:
      //     setFilteredTasks([...tasks].sort((a, b) => a.weight - b.weight));
      //     break;
      //   case 2:
      //     setFilteredTasks([...tasks].sort((a, b) => b.weight - a.weight));
      // }
      return currState;
    });
  };

  const memberPressHandler = (id: string) => {
    navigation.navigate(structuredScreens.projectMember, {
      projectId,
      userId: id,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.wrapper} edges={['top']}>
        <HeaderWithButtons
          focused={focused}
          setFocused={setFocused}
          ref={ref}
          title={value}
          icons={[
            {
              icon: 'search',
              onPress: () => ref.current?.focus(),
            },
          ]}
          onChangeText={setValue}
          style={styles.header}
        />
        <SortItems
          style={styles.sortItems}
          performanceSelected={performanceSelected}
          onPerformancePress={performancePressHandler}
        />

        <ProjectMembersList
          members={[
            {
              id: '0',
              capacity: 12,
              name: 'Siarhei Halavachanka',
              initials: 'SH',
              role: 'FE Developer',
            },
            {
              id: '1',
              capacity: 12,
              name: 'Pawel Zlomaniec',
              initials: 'PZ',
              role: 'BE Developer',
            },
            {
              id: '2',
              capacity: 12,
              name: 'Nastya Soldatenko',
              initials: 'NS',
              role: 'UX/UI Designer',
            },
            {
              id: '3',
              capacity: 12,
              name: 'Nastya Soldatenko',
              initials: 'NS',
              role: 'UX/UI Designer',
            },
            {
              id: '4',
              capacity: 12,
              name: 'Nastya Soldatenko',
              initials: 'NS',
              role: 'UX/UI Designer',
            },
            {
              id: '5',
              capacity: 12,
              name: 'Nastya Soldatenko',
              initials: 'NS',
              role: 'UX/UI Designer',
            },
            {
              id: '6',
              capacity: 12,
              name: 'Nastya Soldatenko',
              initials: 'NS',
              role: 'UX/UI Designer',
            },
            {
              id: '7',
              capacity: 12,
              name: 'Nastya Soldatenko',
              initials: 'NS',
              role: 'UX/UI Designer',
            },
            {
              id: '8',
              capacity: 12,
              name: 'Nastya Soldatenko',
              initials: 'NS',
              role: 'UX/UI Designer',
            },
          ]}
          onPress={memberPressHandler}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  header: {
    padding: 16,
  },
  sortItems: {
    marginTop: 8,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
});
