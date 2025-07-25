import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BottomNavigation from './BottomNavigation';
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
  <View style={styles.container}>
    <View style={styles.section}>
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
    </View>
    <BottomNavigation activeRoute="service" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  section: {
    flex: 1,
       backgroundColor: '#000000',
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: '#bfa14a',
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 0,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 20,
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
    paddingVertical: 20,
    paddingHorizontal: 14,
    minWidth: 160,
    maxWidth: 280,
    flex: 1,
    alignItems: 'center',
    margin: 8,
  },
  icon: {
    marginBottom: 10,
  },
  cardTitle: {
    color: '#bfa14a',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  desc: {
    color: '#e0e0e0',
    fontSize: 14,
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