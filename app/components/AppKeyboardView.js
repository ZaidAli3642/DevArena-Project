import React from 'react';
import {KeyboardAvoidingView, ScrollView} from 'react-native';

function AppKeyboardView({children}) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="handled">
      <KeyboardAvoidingView style={{flex: 1}}>{children}</KeyboardAvoidingView>
    </ScrollView>
  );
}

export default AppKeyboardView;
