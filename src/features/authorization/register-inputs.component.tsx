import React, { Fragment } from 'react';
import { AuthorizationInput } from './input.component';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

type InputPair = {
  value?: string;
  setValue: (newValue: string) => void;
  placeholder: string;
  secure?: boolean;
};

export interface InputsProps {
  inputs: InputPair[];

  style?: StyleProp<ViewStyle>;
}

export const Inputs: React.FC<InputsProps> = ({ inputs, style }) => {
  return (
    <View style={style}>
      {inputs.map((pair, index) => {
        return (
          <Fragment key={pair.placeholder + Math.random()}>
            <AuthorizationInput
              secureTextEntry={pair.secure}
              value={pair.value}
              onChangeText={pair.setValue}
              placeholder={pair.placeholder}
            />
            {index + 1 !== inputs.length && <View style={styles.spacer} />}
          </Fragment>
        );
      })}
    </View>
  );
};

export const styles = StyleSheet.create({
  spacer: {
    height: 24,
  },
});
