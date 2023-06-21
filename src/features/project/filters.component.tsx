import React from 'react';

import { CircledLayout } from 'src/common/components/circled-layout.component';
import { Filter } from './filter.component';
import { STRINGS } from 'src/common/constants/strings.consts';
import { IMAGES } from 'src/common/constants/images.consts';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { COLORS } from 'src/common/constants/colors.consts';
import { TaskType } from 'src/common/types/task.types';

export interface FiltersProps {
  archiveCount: number;
  inProgressCount: number;
  reviewCount: number;
  doneCount: number;
  selected?: TaskType;
  onSelect: (filterType: TaskType) => void;
  style?: StyleProp<ViewStyle>;
}

export const Filters: React.FC<FiltersProps> = ({
  archiveCount,
  inProgressCount,
  reviewCount,
  doneCount,
  selected,
  onSelect,
  style,
}) => {
  return (
    <View style={[styles.sectionWrapper, style]}>
      <View style={styles.balancer} />
      <CircledLayout style={styles.wrapper} position="right">
        <Filter
          onPress={() => onSelect(TaskType.archived)}
          title={STRINGS.archive}
          count={archiveCount}
          selected={selected === TaskType.archived}
          source={IMAGES.archiveIndicator}
          style={styles.filter}
        />
        <Filter
          onPress={() => onSelect(TaskType.inProgress)}
          title={STRINGS.inProgress}
          count={inProgressCount}
          selected={selected === TaskType.inProgress}
          source={IMAGES.inProgressIndicator}
          style={styles.filter}
        />
        <Filter
          onPress={() => onSelect(TaskType.inReview)}
          title={STRINGS.inReview}
          count={reviewCount}
          selected={selected === TaskType.inReview}
          source={IMAGES.inReviewIndicator}
          style={styles.filter}
        />
        <Filter
          onPress={() => onSelect(TaskType.done)}
          title={STRINGS.done}
          count={doneCount}
          selected={selected === TaskType.done}
          source={IMAGES.doneIndicator}
          style={styles.filter}
        />
      </CircledLayout>
    </View>
  );
};

export const styles = StyleSheet.create({
  sectionWrapper: { flexDirection: 'row' },
  balancer: { flex: 1 },
  wrapper: {
    paddingTop: 8,
    paddingBottom: 12,
    paddingLeft: 16,
    flexDirection: 'row',
    borderWidth: 4,
    borderColor: COLORS.backgroundSecondary,
    justifyContent: 'flex-end',
  },
  filter: {
    marginRight: 8,
  },
});
