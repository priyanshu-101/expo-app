import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions } from "react-native";
import styled from "styled-components/native";

// Replace with your local logo asset
// import logo from '../../assets/images/icon.png';
const logo = require('../../assets/images/logo.png');

const NAV_LINKS = [
  { label: "Services", route: "/service" },
  { label: "KYC", route: "/kyc" }, // Added KYC link
  { label: "Bank Details", route: "/bank-details" },
  { label: "Contact", route: "/contact" },
];

// Updated flag URLs with better sources and fallbacks
const FLAG_URLS = {
  india: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IN.svg",
  us: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/US.svg",
  uk: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GB.svg",
};

// Alternative flag URLs as backup
const FLAG_URLS_BACKUP = {
  india: "https://flagsapi.com/IN/flat/32.png",
  us: "https://flagsapi.com/US/flat/32.png",
  uk: "https://flagsapi.com/GB/flat/32.png",
};

const MOBILE_BREAKPOINT = 768;

// Define the stack param list
type MainStackParamList = {
  Home: undefined;
  Contact: undefined;
  BankDetails: undefined;
};

const Navbar: React.FC = () => {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState({
    india: "",
    us: "",
    uk: "",
  });
  
  // State to track flag loading errors
  const [flagErrors, setFlagErrors] = useState({
    india: false,
    us: false,
    uk: false,
  });

  // For marquee animation
  const scrollX = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true };
      function formatTimeUppercase(timeString: string) {
        return timeString.replace(/(am|pm)/i, match => match.toUpperCase());
      }
      setCurrentTime({
        india: formatTimeUppercase(now.toLocaleTimeString("en-IN", { ...options, timeZone: "Asia/Kolkata" })),
        us: formatTimeUppercase(now.toLocaleTimeString("en-US", { ...options, timeZone: "America/New_York" })),
        uk: formatTimeUppercase(now.toLocaleTimeString("en-GB", { ...options, timeZone: "Europe/London" })),
      });
    };
    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  // Marquee animation
  useEffect(() => {
    let isMounted = true;
    const animate = () => {
      if (!isMounted) return;
      Animated.sequence([
        Animated.timing(scrollX, {
          toValue: -screenWidth,
          duration: 12000,
          useNativeDriver: true,
        }),
        Animated.timing(scrollX, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]).start(() => animate());
    };
    animate();
    return () => { isMounted = false; };
  }, [screenWidth, scrollX]);

  // Navigation handler for Expo Router
  const handleNav = (route: string) => {
    router.push(route as any);
  };

  // Handle flag image loading errors
  const handleFlagError = (country: keyof typeof flagErrors) => {
    setFlagErrors(prev => ({ ...prev, [country]: true }));
  };

  // Get flag source with fallback
  const getFlagSource = (country: keyof typeof FLAG_URLS) => {
    if (flagErrors[country]) {
      return { uri: FLAG_URLS_BACKUP[country] };
    }
    return { uri: FLAG_URLS[country] };
  };

  // For demo, set 'Home' as active
  const activeRoute = "/home";

  return (
    <NavbarOuter>
      {/* Logo Centered Above Navbar */}
      <LogoSection>
        <Logo source={logo} resizeMode="contain" />
      </LogoSection>
      {/* Navbar Links Row */}
      <NavbarLinksRow>
        <NavLinks>
          <NavLink key="/home" onPress={() => handleNav('/')}>
            <NavLinkText>Home</NavLinkText>
          </NavLink>
          {NAV_LINKS.map(link => (
            <NavLink key={link.route} onPress={() => handleNav(link.route)}>
              <NavLinkText>{link.label}</NavLinkText>
            </NavLink>
          ))}
        </NavLinks>
      </NavbarLinksRow>
      {/* Clocks Row (Marquee) - keep as is */}
      <NavbarBottomRow>
        <MarqueeContainer>
          <Animated.View style={{ flexDirection: "row", transform: [{ translateX: scrollX }] }}>
            <ClocksAnimated>
              <ClockItem>
                <Flag 
                  source={getFlagSource('india')} 
                  onError={() => handleFlagError('india')}
                />
                <ClockText>{currentTime.india}</ClockText>
              </ClockItem>
              <ClockItem>
                <Flag 
                  source={getFlagSource('us')} 
                  onError={() => handleFlagError('us')}
                />
                <ClockText>{currentTime.us}</ClockText>
              </ClockItem>
              <ClockItem>
                <Flag 
                  source={getFlagSource('uk')} 
                  onError={() => handleFlagError('uk')}
                />
                <ClockText>{currentTime.uk}</ClockText>
              </ClockItem>
              <RatesMessage>
                Rates are perfect at time : <Highlight>2PM to 8PM</Highlight>
              </RatesMessage>
            </ClocksAnimated>
          </Animated.View>
        </MarqueeContainer>
      </NavbarBottomRow>
    </NavbarOuter>
  );
};

export default Navbar;

// Styled Components

const NavbarOuter = styled.View`
  width: 100%;
`;

const LogoSection = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 18px;
  margin-bottom: 12px;
`;

const Logo = styled.Image`
  height: 100px;
  width: 2000px;
`;

const NavbarLinksRow = styled.View`
  width: 100%;
  background-color: #222;
  border-top-width: 2px;
  border-bottom-width: 2px;
  border-color: #fff;
  padding-vertical: 0px;
`;

const NavLinks = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-vertical: 4px;
`;

const NavLink = styled.TouchableOpacity``;

const NavLinkText = styled.Text<{ active?: boolean }>`
  color: #fff;
  font-weight: bold;
  font-size: 13px;
  padding-horizontal: 4px;
  ${(props: { active?: boolean }) => props.active && 'text-decoration: underline;'}
`;

const NavbarBottomRow = styled.View`
  background: #1e1e1e;
  border-bottom-width: 1.5px;
  border-bottom-color: #444;
  min-height: 48px;
  overflow: hidden;
  padding: 5px 20px;
  margin-top: 15px;
`;

const MarqueeContainer = styled.View`
  width: 100%;
  overflow: hidden;
`;

const ClocksAnimated = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 24px;
`;

const ClockItem = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  background: #2a2a2a;
  border-radius: 8px;
  padding: 2px 16px;
  margin-right: 12px;
  margin-top: 5px;
`;

const ClockText = styled.Text`
  color: #e0e0e0;
  font-size: 16px;
  font-weight: 500;
`;

const Flag = styled.Image`
  width: 32px;
  height: 24px;
  border-radius: 2px;
  background-color: #3a3a3a;
`;

const RatesMessage = styled.Text`
  margin-left: 24px;
  color: #e0e0e0;
  font-weight: 500;
  font-size: 17px;
  letter-spacing: 0.5px;
`;

const Highlight = styled.Text`
  color: #fbbf24;
  font-weight: 600;
`;