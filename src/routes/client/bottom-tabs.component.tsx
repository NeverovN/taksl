import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { IconButton, Pressable } from 'src/common/components/button.component';

import { COLORS } from 'src/common/constants/colors.consts';
import { ICON_NAMES } from 'src/common/constants/icon-names.consts';
import { structuredScreens } from 'src/common/constants/screens.consts';
import { CREATE_PROJECT } from 'src/redux/project/project.actions';

export const BottomTabs: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const dispatch = useDispatch();

  const newProjectHandler = () => {
    dispatch(
      CREATE_PROJECT.TRIGGER({
        callback: id =>
          navigation.navigate(structuredScreens.project, { projectId: id }),
      }),
    );
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.mainContainer}>
      <View style={styles.row}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <View key={index} style={[styles.mainItemContainer]}>
              <Pressable
                onPress={onPress}
                style={[
                  isFocused ? styles.activeTab : styles.inactiveTab,
                  styles.indicator,
                ]}>
                {options.tabBarIcon?.({
                  focused: isFocused,
                  color: '',
                  size: 24,
                })}
              </Pressable>
            </View>
          );
        })}
      </View>
      <IconButton
        containerStyle={styles.iconButtonWrapper}
        name={ICON_NAMES.plus}
        size={24}
        color={'background'}
        onPress={newProjectHandler}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    paddingTop: 12,
  },
  mainItemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 1,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    height: 40,
    width: 40,
  },
  row: {
    flexDirection: 'row',
  },
  activeTab: {
    backgroundColor: COLORS.backgroundSecondary,
  },
  inactiveTab: {
    backgroundColor: COLORS.background,
  },
  indicator: {
    paddingVertical: 4,
    paddingHorizontal: 20,
    borderRadius: Number.MAX_SAFE_INTEGER,
  },
  iconButtonWrapper: {
    height: 56,
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.main,
    borderRadius: Number.MAX_SAFE_INTEGER,
  },
});
