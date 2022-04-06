import React from 'react';
import {KeyboardAvoidingView, ScrollView} from 'react-native';

function AppKeyboardView({children}) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}>
      <KeyboardAvoidingView style={{flex: 1}}>{children}</KeyboardAvoidingView>
    </ScrollView>
  );
}

export default AppKeyboardView;
