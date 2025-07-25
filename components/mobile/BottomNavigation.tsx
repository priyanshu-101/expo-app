import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface BottomNavigationProps {
  activeRoute?: string;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeRoute }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (route: string) => {
    switch (route) {
      case 'home':
        router.push('/home');
        break;
      case 'service':
        router.push('/service');
        break;
      case 'kyc':
        router.push('/kyc');
        break;
      case 'bank-details':
        router.push('/bank-details');
        break;
      case 'contact':
        router.push('/contact');
        break;
      default:
        break;
    }
  };

  const isActive = (route: string) => {
    if (activeRoute) {
      return activeRoute === route;
    }
    // Auto-detect active route based on current pathname
    return pathname === `/${route}`;
  };

  const navigationItems = [
    { route: 'home', icon: '🏠', label: 'Home' },
    { route: 'service', icon: '🛎️', label: 'Services' },
    { route: 'kyc', icon: '👤', label: 'KYC' },
    { route: 'bank-details', icon: '🏦', label: 'Bank Details' },
    { route: 'contact', icon: '📞', label: 'Contact' },
  ];

  return (
    <View style={styles.bottomNavigation}>
      {navigationItems.map((item) => (
        <TouchableOpacity
          key={item.route}
          style={[styles.navItem, isActive(item.route) && styles.activeNavItem]}
          onPress={() => handleNavigation(item.route)}
        >
          <Text style={styles.navIcon}>{item.icon}</Text>
          <Text style={[styles.navText, isActive(item.route) && styles.activeNavText]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    paddingVertical: 15,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  activeNavItem: {
    backgroundColor: '#333333',
    borderRadius: 8,
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  navText: {
    color: '#888888',
    fontSize: 11,
    textAlign: 'center',
    fontWeight: '500',
  },
  activeNavText: {
    color: '#ffffff',
  },
});

export default BottomNavigation;
