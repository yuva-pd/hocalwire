import React from 'react';
import {View, StyleSheet} from 'react-native';
import NewsList from './NewsList';
import Timer from './Timer'; // Make sure to adjust the path to the Timer component

const App = () => {
  return (
    <View style={styles.container}>
      

      <NewsList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
