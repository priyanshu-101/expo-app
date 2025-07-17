import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Navbar from './Navbar';

const BANK_DETAILS = {
  accountNumber: '020561900002621',
  ifsc: 'YESB0000205',
  bank: 'YES BANK',
  branch: 'KAROL BAGH NEW DELHI 110005',
  phone: '+91-9999398278',
};

const BankDetails = () => (
  <View style={styles.section}>
    <Navbar />
    <View style={styles.card}>
      <Text style={styles.title}>Bank Details</Text>
      <View style={styles.list}>
        <View style={styles.item}>
          <FontAwesome name="hashtag" style={styles.icon} />
          <Text style={styles.label}>A/c No.:</Text>
          <Text style={styles.value}>{BANK_DETAILS.accountNumber}</Text>
        </View>
        <View style={styles.item}>
          <FontAwesome5 name="address-card" style={styles.icon} />
          <Text style={styles.label}>IFSC:</Text>
          <Text style={styles.value}>{BANK_DETAILS.ifsc}</Text>
        </View>
        <View style={styles.item}>
          <FontAwesome name="university" style={styles.icon} />
          <Text style={styles.label}>Bank:</Text>
          <Text style={styles.value}>{BANK_DETAILS.bank}</Text>
        </View>
        <View style={styles.item}>
          <FontAwesome5 name="code-branch" style={styles.icon} />
          <Text style={styles.label}>Branch:</Text>
          <Text style={styles.value}>{BANK_DETAILS.branch}</Text>
        </View>
        <View style={styles.item}>
          <FontAwesome name="phone" style={styles.icon} />
          <Text style={styles.label}>Phone:</Text>
          <TouchableOpacity onPress={() => Linking.openURL(`tel:${BANK_DETAILS.phone.replace(/[^\d+]/g, '')}`)}>
            <Text style={[styles.value, styles.link]}>{BANK_DETAILS.phone}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  section: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 20,
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 18,
    padding: 24,
    maxWidth: 400,
    width: '100%',
    margin: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 32,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#bfa14a',
    marginBottom: 24,
    textAlign: 'center',
    letterSpacing: 1,
  },
  list: {
    flexDirection: 'column',
    gap: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    fontSize: 18,
    backgroundColor: '#232323',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#232323',
    shadowColor: '#bfa14a',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    color: '#bfa14a',
    fontSize: 24,
    minWidth: 24,
  },
  label: {
    fontWeight: '600',
    color: '#e0e0e0',
    minWidth: 80,
  },
  value: {
    fontWeight: '500',
    color: '#fff',
    flexShrink: 1,
  },
  link: {
    color: '#bfa14a',
    textDecorationLine: 'underline',
  },
});

export default BankDetails; 