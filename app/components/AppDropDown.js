import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useFormikContext} from 'formik';
import DropDownPicker from 'react-native-dropdown-picker';

import ErrorMessage from './ErrorMessage';

function AppDropDown({name}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {categoryId: 1, label: 'Software Engineer', value: 'Software Engineer'},
    {categoryId: 2, label: 'Coding Tester', value: 'Coding Tester'},
    {categoryId: 3, label: 'Learner', value: 'Learner'},
  ]);

  const {setFieldValue, errors} = useFormikContext();

  return (
    <View style={styles.container}>
      <DropDownPicker
        containerStyle={{
          marginTop: 20,
          marginBottom: 10,
        }}
        open={open}
        value={value}
        onSelectItem={item => setFieldValue(name, item)}
        setOpen={() => setOpen(true)}
        setValue={item => setValue(item)}
        items={items}
        onClose={() => setOpen(false)}
      />

      <ErrorMessage error={errors[name]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1000,
    width: '100%',
  },
});
export default AppDropDown;
