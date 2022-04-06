import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Formik} from 'formik';

function AppForm({initialValues, validationSchema, onSubmit, children}) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {() => <>{children}</>}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {},
});
export default AppForm;
