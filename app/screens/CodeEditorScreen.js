import React, {useState} from 'react';
import {View, Modal, StyleSheet} from 'react-native';
import * as yup from 'yup';

import AppButton from '../components/AppButton';
import AppForm from '../components/AppForm';
import AppFormField from '../components/AppFormField';
import AppFormPicker from '../components/AppFormPicker';
import AppPostInput from '../components/AppPostInput';
import AppKeyboardView from '../components/AppKeyboardView';
import SubmitButton from '../components/SubmitButton';
import colors from '../config/colors';
import AppText from '../components/AppText';

const validationSchema = yup.object().shape({
  code: yup.string().required().label('Code'),
  language: yup.object().nullable().required().label('Language'),
});

const languages = [
  {id: 1, category: 'C'},
  {id: 2, category: 'C++'},
  {id: 3, category: 'Python'},
];

function CodeEditorScreen() {
  const [visible, setVisible] = useState(false);
  const [outputVisible, setOutputVisible] = useState(false);

  return (
    <View style={styles.container}>
      <AppKeyboardView>
        <AppForm
          initialValues={{code: '', language: ''}}
          onSubmit={values => console.log(values)}
          validationSchema={validationSchema}>
          <AppFormField
            autoFocus
            name="code"
            placeholder="Write Code"
            style={styles.inputForm}
          />
          <View style={styles.actionButtons}>
            {!visible && (
              <AppPostInput
                textStyle={styles.textStyle}
                style={styles.postInput}
                placeholder="Select Language"
                onPress={() => setVisible(true)}
              />
            )}
            <Modal visible={visible} transparent={true} animationType="slide">
              <View
                style={{
                  backgroundColor: colors.white,
                  height: '50%',
                  marginTop: 'auto',
                  paddingLeft: 10,
                }}>
                <AppButton
                  title="CLOSE"
                  color={colors.red}
                  onPress={() => setVisible(false)}
                />
                <AppFormPicker
                  onSelectLanguage={() => setVisible(false)}
                  item={languages}
                  color={colors.mediumGrey}
                  name="language"
                />
              </View>
            </Modal>
            <Modal
              visible={outputVisible}
              transparent={true}
              animationType="slide">
              <View
                style={{
                  backgroundColor: colors.white,
                  height: '50%',
                  marginTop: 'auto',
                  paddingLeft: 10,
                }}>
                <AppButton
                  title="CLOSE"
                  color={colors.red}
                  onPress={() => setOutputVisible(false)}
                />
                <AppText>Output</AppText>
              </View>
            </Modal>
            {!visible && (
              <SubmitButton onSubmitCode={() => setOutputVisible(true)} />
            )}
          </View>
        </AppForm>
      </AppKeyboardView>
    </View>
  );
}

const styles = StyleSheet.create({
  actionButtons: {
    position: 'absolute',
    bottom: 0,
    padding: 7,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    paddingLeft: 10,
  },
  inputForm: {
    borderRadius: 0,
    borderWidth: 0,
    justifyContent: 'flex-start',
  },
  postInput: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'dodgerblue',
  },
  textStyle: {
    color: colors.white,
  },
});
export default CodeEditorScreen;
