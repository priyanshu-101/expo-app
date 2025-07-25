import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BottomNavigation from './BottomNavigation';
import Navbar from './Navbar';

const BANK_DETAILS = {
  accountNumber: '020561900002621',
  ifsc: 'YESB0000205',
  bank: 'YES BANK',
  branch: 'KAROL BAGH NEW DELHI 110005',
  phone: '+91-9999398278',
};

const BANK_DETAILS_2 = {
  accountName: 'HDFC BANK',
  accountNumber: '99999899781543',
  ifsc: 'HDFC0002008',
  bank: 'HDFC Bank',
  branch: 'KAROL BAGH',
};

const BankDetails = () => (
  <View style={styles.container}>
    <Navbar />
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.title}>Bank Details - YES BANK</Text>
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

      <View style={styles.card}>
        <Text style={styles.title}>Bank Details - HDFC BANK</Text>
        <View style={styles.list}>
          <View style={styles.item}>
            <FontAwesome name="hashtag" style={styles.icon} />
            <Text style={styles.label}>A/c No.:</Text>
            <Text style={styles.value}>{BANK_DETAILS_2.accountNumber}</Text>
          </View>
          <View style={styles.item}>
            <FontAwesome5 name="address-card" style={styles.icon} />
            <Text style={styles.label}>IFSC:</Text>
            <Text style={styles.value}>{BANK_DETAILS_2.ifsc}</Text>
          </View>
          <View style={styles.item}>
            <FontAwesome name="university" style={styles.icon} />
            <Text style={styles.label}>Bank:</Text>
            <Text style={styles.value}>{BANK_DETAILS_2.bank}</Text>
          </View>
          <View style={styles.item}>
            <FontAwesome5 name="code-branch" style={styles.icon} />
            <Text style={styles.label}>Branch:</Text>
            <Text style={styles.value}>{BANK_DETAILS_2.branch}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
    <BottomNavigation activeRoute="bank-details" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 20,
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 18,
    padding: 20,
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
    fontSize: 22,
    fontWeight: '700',
    color: '#bfa14a',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 1,
  },
  list: {
    flexDirection: 'column',
    gap: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    fontSize: 16,
    backgroundColor: '#232323',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 6,
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