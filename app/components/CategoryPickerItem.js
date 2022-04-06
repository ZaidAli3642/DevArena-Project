import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useFormikContext} from 'formik';

import PickerItem from './PickerItem';

function CategoryPickerItem({name, item}) {
  const {setFieldValue} = useFormikContext();
  return (
    <View style={styles.container}>
      {item.map(i => (
        <PickerItem
          key={i.id}
          label={i.category}
          onPress={() => setFieldValue(name, i)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 20,
    paddingLeft: 10,
  },
});
export default CategoryPickerItem;
