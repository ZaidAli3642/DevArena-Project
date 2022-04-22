import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useFormikContext} from 'formik';

import PickerItem from './PickerItem';
import ErrorMessage from './ErrorMessage';

function AppFormPicker({name, color, item, onSelectLanguage}) {
  const {setFieldValue, errors} = useFormikContext();
  return (
    <View style={styles.container}>
      {item.map(i => (
        <PickerItem
          key={i.id}
          color={color}
          label={i.category}
          onPress={() => {
            onSelectLanguage();
            setFieldValue(name, i);
          }}
        />
      ))}
      <ErrorMessage error={errors[name]} />
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
export default AppFormPicker;
