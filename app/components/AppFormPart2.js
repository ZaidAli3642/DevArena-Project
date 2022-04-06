import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useFormikContext} from 'formik';
import AppFormPicker from './AppFormPicker';

import AppHeadingText from './AppHeadingText';
import AppText from './AppText';
import colors from '../config/colors';

const categories = [
  {id: 1, category: 'Learner'},
  {id: 2, category: 'Software Engineer'},
  {id: 3, category: 'Coding Tester'},
];

function AppFormPart2() {
  const {values} = useFormikContext();

  return (
    <View style={{width: '100%'}}>
      <AppHeadingText>Choose Category</AppHeadingText>
      <AppFormPicker name="category" item={categories} />
      <View style={styles.textContainer}>
        {values['category'] && (
          <AppText style={styles.text}>{values['category'].category}</AppText>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  text: {
    flexShrink: 1,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 40,
    backgroundColor: colors.lightBrown,
  },
});
export default AppFormPart2;
