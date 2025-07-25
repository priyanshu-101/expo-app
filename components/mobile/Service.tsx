import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Footer from './Footer';
import Navbar from './Navbar';

const services = [
  {
    icon: <FontAwesome5 name="shopping-cart" size={40} color="#bfa14a" />,
    title: 'We Buy/Sell Gold & Silver',
    description: 'Transparent and fair buying/selling of gold and silver.'
  },
  {
    icon: <FontAwesome5 name="search-dollar" size={40} color="#bfa14a" />,
    title: 'Instant Gold Check',
    description: 'Quick and reliable gold purity checking service.'
  },
];

const aboutParagraph =
  'We are committed to providing top-notch gold and silver services, including exchange, melting, buying, selling, and instant gold checking. Our processes adhere to the highest international standards, ensuring trust, transparency, and satisfaction for all our clients. Whether you are looking to refine old gold, check purity, or trade precious metals, our expert team is here to assist you every step of the way.';

const Service = () => (
  <ScrollView style={styles.section} contentContainerStyle={{paddingBottom: 32}}>
    <Navbar /> 
    <View style={styles.header}>
      <Text style={styles.title}>Our Services</Text>
    </View>
    <View style={styles.cardsContainer}>
      {services.map((service, idx) => (
        <View style={styles.card} key={idx}>
          <View style={styles.icon}>{service.icon}</View>
          <Text style={styles.cardTitle}>{service.title}</Text>
          <Text style={styles.desc}>{service.description}</Text>
        </View>
      ))}
    </View>
    {/*
    <View style={styles.paragraphCard}>
      <Text>{aboutParagraph}</Text>
    </View>
    */}
    <Footer />
  </ScrollView>
);

const styles = StyleSheet.create({
  section: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    color: '#bfa14a',
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 0,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#bfa14a',
    shadowColor: '#fbbf24',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 32,
    paddingVertical: 24,
    paddingHorizontal: 16,
    minWidth: 180,
    maxWidth: 320,
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
  icon: {
    marginBottom: 12,
  },
  cardTitle: {
    color: '#bfa14a',
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  desc: {
    color: '#e0e0e0',
    fontSize: 15,
    textAlign: 'center',
  },
  paragraphCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 18,
    maxWidth: 600,
    alignSelf: 'center',
    marginTop: 24,
    padding: 16,
    color: '#e0e0e0',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Service; 