import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native';

const FloatingContact = () => {
  return (
    <View style={styles.floatingContact}>
      <TouchableOpacity
        style={[styles.contactIcon, styles.callIcon]}
        onPress={() => Linking.openURL('tel:+919899781543')}
      >
        <FontAwesome name="phone" size={18} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.contactIcon, styles.whatsappIcon]}
        onPress={() => Linking.openURL('https://wa.me/919899781543')}
      >
        <FontAwesome name="whatsapp" size={18} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingContact: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    flexDirection: 'column',
    gap: 12,
    zIndex: 1000,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 22.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a2a2a',
    borderWidth: 1,
    borderColor: '#444',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  callIcon: {
    backgroundColor: '#2a2a2a',
  },
  whatsappIcon: {
    backgroundColor: '#25D366',
  },
});

export default FloatingContact;
