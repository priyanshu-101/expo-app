import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import BankDetails from '../components/mobile/BankDetails';
import Navbar from '../components/mobile/Navbar';

const BankDetailsScreen = () => (
  <View style={styles.container}>
    <Navbar />
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <BankDetails />
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
});

export default BankDetailsScreen; 