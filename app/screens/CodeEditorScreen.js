import React, {useState} from 'react';
import {View, Modal, StyleSheet, ScrollView} from 'react-native';
import * as yup from 'yup';
import {languageOptions} from '../components/languages';
import {Buffer} from 'buffer';

import AppButton from '../components/AppButton';
import AppForm from '../components/AppForm';
import AppFormField from '../components/AppFormField';
import AppFormPicker from '../components/AppFormPicker';
import AppPostInput from '../components/AppPostInput';
import AppKeyboardView from '../components/AppKeyboardView';
import SubmitButton from '../components/SubmitButton';
import colors from '../config/colors';
import AppText from '../components/AppText';
import axios from 'axios';

const validationSchema = yup.object().shape({
  code: yup.string().required().label('Code'),
  language: yup.object().nullable().required().label('Language'),
});

function CodeEditorScreen() {
  const [visible, setVisible] = useState(false);
  const [outputVisible, setOutputVisible] = useState(false);
  const [result, setResult] = useState(null);

  const RAPID_API_HOST = 'judge0-ce.p.rapidapi.com';
  const RAPID_API_KEY = '27cce2b2b6msh942c39ba5e2a96ep14e9e2jsn331f0655d783';
  const RAPID_API_URL = 'https://judge0-ce.p.rapidapi.com/submissions';

  const checkStatus = async token => {
    const options = {
      method: 'GET',
      url: RAPID_API_URL + '/' + token,
      params: {base64_encoded: 'true', fields: '*'},
      headers: {
        'X-RapidAPI-Host': RAPID_API_HOST,
        'X-RapidAPI-Key': RAPID_API_KEY,
      },
    };

    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        console.log(response.data);

        setOutputVisible(true);
        outputDisplay(response.data);

        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const outputDisplay = response => {
    let statusId = response?.status?.id;
    console.log(statusId);
    if (statusId === 6) {
      // compilation error
      let output = Buffer.from(response?.compile_output, 'base64').toString(
        'ascii',
      );
      setResult(output);
    } else if (statusId === 3) {
      let output = Buffer.from(response?.stdout, 'base64').toString('ascii');
      setResult(output);
    } else if (statusId === 5) {
      setResult('Time Limit Exceeded');
    } else {
      let output = Buffer.from(response?.stderr, 'base64').toString('ascii');
      console.log(output);
      setResult(output);
    }
  };

  const handleCompile = values => {
    const formData = {
      language_id: values.language.id,
      // encode source code in base64
      source_code: Buffer.from(values.code).toString('base64'),
    };
    const options = {
      method: 'POST',
      url: RAPID_API_URL,
      params: {base64_encoded: 'true', fields: '*'},
      headers: {
        'content-type': 'application/json',
        'Content-Type': 'application/json',
        'X-RapidAPI-Host': RAPID_API_HOST,
        'X-RapidAPI-Key': RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(response => {
        console.log(response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <AppKeyboardView>
        <AppForm
          initialValues={{code: '', language: ''}}
          onSubmit={handleCompile}
          validationSchema={validationSchema}>
          <AppFormField
            name="code"
            placeholder="Write Code"
            multiline
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
                <ScrollView>
                  <AppFormPicker
                    onSelectLanguage={() => setVisible(false)}
                    item={languageOptions}
                    color={colors.mediumGrey}
                    name="language"
                  />
                </ScrollView>
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
                <AppText>{result}</AppText>
              </View>
            </Modal>
            {!visible && <SubmitButton />}
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
