import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, Linking, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';

const logo = require('../../assets/images/logo.png');

const Footer = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const { width } = useWindowDimensions();

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    setStatus('');
    try {
      const res = await fetch('https://ddbullions.in/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('Thank you for your feedback!');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send feedback. Please try again.');
      }
    } catch {
      setStatus('Failed to send feedback. Please try again.');
    }
  };

  // Responsive columns: 4 on large, 2 on medium, 1 on small
  let columns = 4;
  if (width < 1024) columns = 2;
  if (width < 768) columns = 1;

  return (
    <View style={styles.footerWrapper}>
      <View style={styles.footer}>
        <View style={[styles.footerContent, {flexDirection: columns === 1 ? 'column' : 'row', flexWrap: 'wrap'}]}>
          {/* Company Info */}
          <View style={[styles.footerSection, {alignItems: 'flex-start'}]}> 
            <Image source={logo} style={styles.logo} resizeMode="contain" />
            <Text style={styles.companyName}>DD Bullions Pvt. Ltd</Text>
            <View style={styles.infoRow}>
              <Entypo name="location-pin" size={22} color="#e53935" style={styles.infoIcon} />
              <Text style={styles.infoText}>4612/52 GROUND FLOOR, REGHAR PURA, KAROL BAGH-11005</Text>
            </View>
            <TouchableOpacity style={styles.infoRow} onPress={() => Linking.openURL('tel:01128724925')}>
              <FontAwesome name="phone" size={20} color="#232323" style={styles.infoIcon} />
              <Text style={styles.infoText}>01128724925</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.infoRow} onPress={() => Linking.openURL('mailto:d.d.bullions123@gmail.com')}>
              <MaterialIcons name="email" size={20} color="#22c55e" style={styles.infoIcon} />
              <Text style={styles.infoText}>d.d.bullions123@gmail.com</Text>
            </TouchableOpacity>
          </View>

          {/* Quick Links */}
          <View style={[styles.footerSection, {alignItems: 'flex-start'}]}> 
            <Text style={styles.sectionTitle}>Quick Links</Text>
            <TouchableOpacity onPress={() => Linking.openURL('/')}><Text style={styles.link}>Home</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('/about')}><Text style={styles.link}>Services</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('/kyc')}><Text style={styles.link}>KYC</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('/bank-details')}><Text style={styles.link}>Bank Details</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('/contact')}><Text style={styles.link}>Contact</Text></TouchableOpacity>
          </View>

          {/* Business Hours */}
          <View style={[styles.footerSection, {alignItems: 'flex-start'}]}> 
            <Text style={styles.sectionTitle}>Business Hours</Text>
            <Text style={styles.infoText}><Text style={{fontWeight:'bold'}}>Monday - Friday</Text></Text>
            <Text style={styles.infoText}>09:00 AM - 8:00 PM</Text>
          </View>

          {/* Feedback Form */}
          <View style={[styles.footerSection, styles.feedbackSection, {alignItems: 'flex-start'}]}> 
            <Text style={styles.sectionTitle}>YOUR FEEDBACK</Text>
            <View style={styles.feedbackForm}>
              <TextInput
                style={styles.input}
                placeholder="Your Name"
                placeholderTextColor="#aaa"
                value={form.name}
                onChangeText={text => handleChange('name', text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Your Email"
                placeholderTextColor="#aaa"
                value={form.email}
                onChangeText={text => handleChange('email', text)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                style={[styles.input, {height: 80}]}
                placeholder="Your Feedback"
                placeholderTextColor="#aaa"
                value={form.message}
                onChangeText={text => handleChange('message', text)}
                multiline
                numberOfLines={4}
              />
              <TouchableOpacity style={styles.feedbackButton} onPress={handleSubmit}>
                <Text style={styles.feedbackButtonText}>Send Feedback</Text>
              </TouchableOpacity>
              {!!status && <Text style={styles.feedbackStatus}>{status}</Text>}
            </View>
          </View>
        </View>
        <View style={styles.footerBottom}>
          <Text style={styles.footerBottomText}>&copy; {new Date().getFullYear()} DD Bullion Pvt. Ltd. All Rights Reserved.</Text>
        </View>
        {/* <View style={styles.footerBottomContactHorizontalRight}>
          <TouchableOpacity
            style={[styles.contactIcon, styles.callIcon, styles.footerContactIcon]}
            onPress={() => Linking.openURL('tel:+919899781543')}
          >
            <FontAwesome name="phone" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.contactIcon, styles.whatsappIcon, styles.footerContactIcon]}
            onPress={() => Linking.openURL('https://wa.me/919899781543')}
          >
            <FontAwesome name="whatsapp" size={22} color="#fff" />
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerWrapper: {
    backgroundColor: '#121212',
    paddingTop: 32,
    paddingBottom: 16,
    position: 'relative',
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a2a2a',
    borderWidth: 1,
    borderColor: '#444',
    marginBottom: 8,
  },
  callIcon: {
    backgroundColor: '#007AFF',
  },
  whatsappIcon: {
    backgroundColor: '#25D366',
  },
  footer: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    marginHorizontal: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  footerContent: {
    justifyContent: 'space-between',
    gap: 16,
  },
  footerSection: {
    flex: 1,
    minWidth: 180,
    maxWidth: 260,
    margin: 8,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  companyName: {
    color: '#bfa14a',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'left',
    marginBottom: 12,
    fontFamily: 'Montserrat',
  },
  sectionTitle: {
    color: '#bfa14a',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 18,
    textAlign: 'left',
    fontFamily: 'Montserrat',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoIcon: {
    marginRight: 10,
  },
  infoText: {
    color: '#e0e0e0',
    fontSize: 18,
    flex: 1,
    textAlign: 'left',
    fontFamily: 'Montserrat',
  },
  link: {
    color: '#e0e0e0',
    fontSize: 20,
    marginBottom: 14,
    textAlign: 'left',
    fontFamily: 'Montserrat',
  },
  feedbackSection: {
    alignItems: 'flex-start',
  },
  feedbackForm: {
    width: '100%',
    marginTop: 4,
  },
  input: {
    width: '100%',
    backgroundColor: '#2a2a2a',
    color: '#e0e0e0',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'left',
    fontFamily: 'Montserrat',
  },
  feedbackButton: {
    backgroundColor: '#bfa14a',
    borderRadius: 6,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 6,
  },
  feedbackButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 20,
    fontFamily: 'Montserrat',
  },
  feedbackStatus: {
    marginTop: 8,
    fontSize: 16,
    color: '#34a853',
    textAlign: 'left',
  },
  footerBottom: {
    borderTopWidth: 1,
    borderTopColor: '#444',
    marginTop: 32,
    paddingTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  footerBottomText: {
    color: '#e0e0e0',
    fontSize: 18,
    textAlign: 'left',
    fontFamily: 'Montserrat',
  },
  footerBottomContact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  footerContactIcon: {
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  footerAppLinks: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  appLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 6,
  },
  ios: {
    borderWidth: 1.5,
    borderColor: '#bfa14a',
  },
  android: {
    borderWidth: 1.5,
    borderColor: '#34a853',
  },
  appLinkText: {
    color: '#232323',
    fontWeight: '700',
    fontSize: 15,
    marginLeft: 6,
    textAlign: 'left',
    fontFamily: 'Montserrat',
  },
  footerBottomContactHorizontalRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 12,
    gap: 10,
  },
});

export default Footer; 