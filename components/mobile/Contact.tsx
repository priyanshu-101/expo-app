import { Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Linking } from "react-native";
import styled from "styled-components/native";
import Navbar from "./Navbar";
import Footer from "./Footer";

const address = "4612/52 GROUND FLOOR, REGHAR PURA, KAROL BAGH-11005";
const phone = "01128724925";
const email = "d.d.bullions123@gmail.com";
const reference = "DD Bullion Pvt. Ltd";

const Contact = () => {
  const handleAddressClick = () => {
    const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(address)}`;
    Linking.openURL(mapsUrl);
  };

  const handlePhoneClick = () => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmailClick = () => {
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <Container>
        <Navbar />
      <Card>
        <Title>DD Bullion Pvt. Ltd</Title>
        
        <InfoGrid>
          {/* Address */}
          <InfoItem>
            <IconBox>
              <MaterialIcons name="location-on" size={32} color="#e53935" />
            </IconBox>
            <InfoText>
              <Label>Address</Label>
              <Value onPress={handleAddressClick}>
                {address}
              </Value>
            </InfoText>
          </InfoItem>

          {/* Phone */}
          <InfoItem>
            <IconBox>
              <FontAwesome name="phone" size={32} color="#e0e0e0" />
            </IconBox>
            <InfoText>
              <Label>Phone</Label>
              <Value onPress={handlePhoneClick}>
                {phone}
              </Value>
            </InfoText>
          </InfoItem>

          {/* Email */}
          <InfoItem>
            <IconBox>
              <Entypo name="email" size={32} color="#22c55e" />
            </IconBox>
            <InfoText>
              <Label>Email</Label>
              <Value onPress={handleEmailClick}>
                {email}
              </Value>
            </InfoText>
          </InfoItem>

          {/* Reference */}
          <InfoItem>
            <IconBox>
              <FontAwesome name="user" size={32} color="#2563eb" />
            </IconBox>
            <InfoText>
              <Label>Reference</Label>
              <Value>{reference}</Value>
            </InfoText>
          </InfoItem>
        </InfoGrid>
      </Card>
      <Footer />
    </Container>
  );
};

export default Contact;

// Styled Components
const Container = styled.ScrollView`
  flex: 1;
  background-color: #121212;
`;

const Card = styled.View`
  background-color: #1e1e1e;
  border-radius: 18px;
  elevation: 8;
  shadow-color: #000;
  shadow-offset: 0px 8px;
  shadow-opacity: 0.2;
  shadow-radius: 16px;
  padding: 32px 16px 24px 16px;
  margin: 24px 16px;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.Text`
  color: #e0e0e0;
  font-size: 28px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 18px;
  letter-spacing: 1px;
`;

const InfoGrid = styled.View`
  flex-direction: column;
  gap: 16px;
`;

const InfoItem = styled.View`
  flex-direction: row;
  align-items: flex-start;
  background-color: #2a2a2a;
  border-radius: 10px;
  padding: 16px 12px 16px 10px;
  margin-bottom: 8px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.2;
  shadow-radius: 2px;
`;

const IconBox = styled.View`
  margin-right: 16px;
  margin-top: 2px;
`;

const InfoText = styled.View`
  flex: 1;
`;

const Label = styled.Text`
  font-size: 15px;
  color: #a0a0a0;
  font-weight: 600;
  margin-bottom: 2px;
`;

const Value = styled.Text`
  font-size: 17px;
  color: #e0e0e0;
  font-weight: 500;
  margin-bottom: 2px;
`;