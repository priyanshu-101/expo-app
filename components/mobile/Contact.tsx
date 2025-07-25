import { Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Linking } from "react-native";
import styled from "styled-components/native";
import BottomNavigation from "./BottomNavigation";
import Navbar from "./Navbar";

const address = "4612/52 GROUND FLOOR, REGHAR PURA, KAROL BAGH-11005";
const phone = " 9899781543 , 8376008198";
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
    <MainContainer>
      <Navbar />
      <ContentContainer>
        <Card>
          <Title>DD Bullion Pvt. Ltd</Title>
          
          <InfoGrid>
            <InfoItem>
              <IconBox>
                <MaterialIcons name="location-on" size={28} color="#e53935" />
              </IconBox>
              <InfoText>
                <Label>Address</Label>
                <Value onPress={handleAddressClick}>
                  {address}
                </Value>
              </InfoText>
            </InfoItem>

            <InfoItem>
              <IconBox>
                <FontAwesome name="phone" size={28} color="#e0e0e0" />
              </IconBox>
              <InfoText>
                <Label>Phone</Label>
                <Value onPress={handlePhoneClick}>
                  {phone}
                </Value>
              </InfoText>
            </InfoItem>

            <InfoItem>
              <IconBox>
                <Entypo name="email" size={28} color="#22c55e" />
              </IconBox>
              <InfoText>
                <Label>Email</Label>
                <Value onPress={handleEmailClick}>
                  {email}
                </Value>
              </InfoText>
            </InfoItem>

            <InfoItem>
              <IconBox>
                <FontAwesome name="user" size={28} color="#2563eb" />
              </IconBox>
              <InfoText>
                <Label>Reference</Label>
                <Value>{reference}</Value>
              </InfoText>
            </InfoItem>
          </InfoGrid>
        </Card>
      </ContentContainer>
      <BottomNavigation activeRoute="contact" />
    </MainContainer>
  );
};

export default Contact;

const MainContainer = styled.View`
  flex: 1;
  background-color: #000000;
`;

const ContentContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const Card = styled.View`
  background-color: #1e1e1e;
  border-radius: 18px;
  elevation: 8;
  shadow-color: #000;
  shadow-offset: 0px 8px;
  shadow-opacity: 0.2;
  shadow-radius: 16px;
  padding: 20px 16px;
  margin: 0;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;
  width: 100%;
`;

const Title = styled.Text`
  color: #e0e0e0;
  font-size: 24px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 12px;
  letter-spacing: 1px;
  font-family: 'Montserrat';
`;

const InfoGrid = styled.View`
  flex-direction: column;
  gap: 12px;
`;

const InfoItem = styled.View`
  flex-direction: row;
  align-items: flex-start;
  background-color: #2a2a2a;
  border-radius: 10px;
  padding: 12px 10px;
  margin-bottom: 4px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.2;
  shadow-radius: 2px;
`;

const IconBox = styled.View`
  margin-right: 12px;
  margin-top: 2px;
`;

const InfoText = styled.View`
  flex: 1;
`;

const Label = styled.Text`
  font-size: 14px;
  color: #a0a0a0;
  font-weight: 600;
  margin-bottom: 2px;
  font-family: 'Montserrat';
`;

const Value = styled.Text`
  font-size: 15px;
  color: #e0e0e0;
  font-weight: 500;
  margin-bottom: 2px;
  font-family: 'Montserrat';
`;