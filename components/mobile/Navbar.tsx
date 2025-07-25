import { FontAwesome } from '@expo/vector-icons';
import React from "react";
import { Linking } from "react-native";
import styled from "styled-components/native";

const logo = require('../../assets/images/logo.png');

const Navbar: React.FC = () => {
  const handlePhoneCall = () => {
    Linking.openURL('tel:+919899781543');
  };

  const handleWhatsApp = () => {
    Linking.openURL('https://wa.me/919899781543');
  };

  return (
    <NavbarContainer>
      <HeaderSection>
        <CallIcon onPress={handlePhoneCall}>
          <FontAwesome name="phone" size={18} color="#fff" />
        </CallIcon>

        <CenterSection>
          <Logo source={logo} resizeMode="contain" />
        </CenterSection>

        <WhatsappIcon onPress={handleWhatsApp}>
          <FontAwesome name="whatsapp" size={18} color="#fff" />
        </WhatsappIcon>
      </HeaderSection>
    </NavbarContainer>
  );
};

export default Navbar;

// Styled Components

const NavbarContainer = styled.View`
  width: 100%;
  background-color: #000000;
  padding-top: 40px;
  padding-bottom: 20px;
`;

const HeaderSection = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 20px;
  padding-vertical: 20px;
`;

const CallIcon = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  background-color: #2a2a2a;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: #444;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.4;
  shadow-radius: 10px;
  elevation: 10;
`;

const WhatsappIcon = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  background-color: #25D366;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: #444;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.4;
  shadow-radius: 10px;
  elevation: 10;
`;

const CenterSection = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.Image`
  height: 100px;
  width: 280px;
`;