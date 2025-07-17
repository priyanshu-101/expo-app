import * as DocumentPicker from 'expo-document-picker';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Footer from './Footer';
import Navbar from './Navbar';

type KYCFile = {
  uri: string;
  name: string;
  type: string;
};

type KYCFormState = {
  name: string;
  companyName: string;
  mobile: string;
  email: string;
  address: string;
  city: string;
  pinCode: string;
  gst: string;
  natureOfBusiness: string;
  logisticsService: string;
  proprietor1: string;
  proprietor2: string;
  proprietorMobile1: string;
  proprietorMobile2: string;
  bankAccountNo: string;
  bankName: string;
  ifsc: string;
  bankAccountName: string;
  branch: string;
  deliveryPerson1: string;
  deliveryPerson2: string;
  deliveryPerson3: string;
  deliveryPerson4: string;
  docIncorporation: KYCFile | null;
  docAddressProof: KYCFile | null;
  docCompanyPan: KYCFile | null;
  docMemorandum: KYCFile | null;
  docGstCertificate: KYCFile | null;
  docAuthPerson1Photo: KYCFile | null;
  docAuthPerson2Photo: KYCFile | null;
  docAuthPerson3Photo: KYCFile | null;
  docAuthPerson4Photo: KYCFile | null;
};

const initialState: KYCFormState = {
  name: '',
  companyName: '',
  mobile: '',
  email: '',
  address: '',
  city: '',
  pinCode: '',
  gst: '',
  natureOfBusiness: '',
  logisticsService: '',
  proprietor1: '',
  proprietor2: '',
  proprietorMobile1: '',
  proprietorMobile2: '',
  bankAccountNo: '',
  bankName: '',
  ifsc: '',
  bankAccountName: '',
  branch: '',
  deliveryPerson1: '',
  deliveryPerson2: '',
  deliveryPerson3: '',
  deliveryPerson4: '',
  docIncorporation: null,
  docAddressProof: null,
  docCompanyPan: null,
  docMemorandum: null,
  docGstCertificate: null,
  docAuthPerson1Photo: null,
  docAuthPerson2Photo: null,
  docAuthPerson3Photo: null,
  docAuthPerson4Photo: null,
};

const KYC = () => {
  const [form, setForm] = useState<KYCFormState>(initialState);
  const [status, setStatus] = useState('');

  const handleChange = (name: keyof KYCFormState, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleFilePick = async (name: keyof KYCFormState) => {
    const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      setForm({ ...form, [name]: { uri: asset.uri, name: asset.name ?? 'file', type: asset.mimeType ?? 'application/octet-stream' } });
    }
  };

  const handleSubmit = async () => {
    setStatus('');
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key.startsWith('doc') && value && typeof value === 'object' && 'uri' in value) {
        data.append(key, value as any);
      } else if (!key.startsWith('doc') && value !== null && value !== undefined) {
        data.append(key, value as string);
      }
    });
    try {
      const res = await fetch('http://localhost:5000/api/kyc', {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.ok) {
        setStatus('KYC submitted successfully!');
        setForm(initialState);
      } else {
        setStatus('Submission failed. Please try again.');
      }
    } catch {
      setStatus('Submission failed. Please try again.');
    }
  };

  const renderFileButton = (label: string, name: keyof KYCFormState) => (
    <TouchableOpacity style={styles.fileButton} onPress={() => handleFilePick(name)}>
      <Text style={styles.fileButtonText}>{form[name] && typeof form[name] === 'object' && 'name' in form[name] ? (form[name] as KYCFile).name : label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Navbar />
      <Text style={styles.title}>KYC Details</Text>
      {/* Company Details */}
      <View style={styles.fieldset}>
        <Text style={styles.legend}>Company Details</Text>
        <View style={styles.grid}>
          <View style={styles.group}><Text style={styles.label}>Name*</Text><TextInput style={styles.input} value={form.name} onChangeText={v => handleChange('name', v)} /></View>
          <View style={styles.group}><Text style={styles.label}>Company Name</Text><TextInput style={styles.input} value={form.companyName} onChangeText={v => handleChange('companyName', v)} /></View>
          <View style={styles.group}><Text style={styles.label}>Mobile*</Text><TextInput style={styles.input} value={form.mobile} onChangeText={v => handleChange('mobile', v)} keyboardType="phone-pad" /></View>
          <View style={styles.group}><Text style={styles.label}>Email</Text><TextInput style={styles.input} value={form.email} onChangeText={v => handleChange('email', v)} keyboardType="email-address" /></View>
          <View style={styles.group}><Text style={styles.label}>Address</Text><TextInput style={styles.input} value={form.address} onChangeText={v => handleChange('address', v)} /></View>
          <View style={styles.group}><Text style={styles.label}>City</Text><TextInput style={styles.input} value={form.city} onChangeText={v => handleChange('city', v)} /></View>
          <View style={styles.group}><Text style={styles.label}>Pin Code</Text><TextInput style={styles.input} value={form.pinCode} onChangeText={v => handleChange('pinCode', v)} keyboardType="number-pad" /></View>
          <View style={styles.group}><Text style={styles.label}>GST No*</Text><TextInput style={styles.input} value={form.gst} onChangeText={v => handleChange('gst', v)} /></View>
          <View style={styles.group}><Text style={styles.label}>Nature of Business</Text><TextInput style={styles.input} value={form.natureOfBusiness} onChangeText={v => handleChange('natureOfBusiness', v)} /></View>
          <View style={styles.group}><Text style={styles.label}>Is Logistics Service required?</Text>
            <View style={styles.pickerRow}>
              <TouchableOpacity style={[styles.pickerButton, form.logisticsService === 'yes' && styles.pickerButtonActive]} onPress={() => handleChange('logisticsService', 'yes')}><Text style={styles.pickerButtonText}>Yes</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.pickerButton, form.logisticsService === 'no' && styles.pickerButtonActive]} onPress={() => handleChange('logisticsService', 'no')}><Text style={styles.pickerButtonText}>No</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {/* Proprietor/Partners */}
      <View style={styles.fieldset}>
        <Text style={styles.legend}>Proprietor/Partners</Text>
        <View style={styles.grid}>
          <View style={styles.group}><Text style={styles.label}>Name 1</Text><TextInput style={styles.input} value={form.proprietor1} onChangeText={v => handleChange('proprietor1', v)} /></View>
          <View style={styles.group}><Text style={styles.label}>Name 2</Text><TextInput style={styles.input} value={form.proprietor2} onChangeText={v => handleChange('proprietor2', v)} /></View>
          <View style={styles.group}><Text style={styles.label}>Mobile 1</Text><TextInput style={styles.input} value={form.proprietorMobile1} onChangeText={v => handleChange('proprietorMobile1', v)} keyboardType="phone-pad" /></View>
          <View style={styles.group}><Text style={styles.label}>Mobile 2</Text><TextInput style={styles.input} value={form.proprietorMobile2} onChangeText={v => handleChange('proprietorMobile2', v)} keyboardType="phone-pad" /></View>
        </View>
      </View>
      {/* Bank Details */}
      <View style={styles.fieldset}>
        <Text style={styles.legend}>Bank Details</Text>
        <View style={styles.grid}>
          <View style={styles.group}><Text style={styles.label}>Account No.</Text><TextInput style={styles.input} value={form.bankAccountNo} onChangeText={v => handleChange('bankAccountNo', v)} keyboardType="number-pad" /></View>
          <View style={styles.group}><Text style={styles.label}>Bank Name</Text><TextInput style={styles.input} value={form.bankName} onChangeText={v => handleChange('bankName', v)} /></View>
          <View style={styles.group}><Text style={styles.label}>IFSC Code</Text><TextInput style={styles.input} value={form.ifsc} onChangeText={v => handleChange('ifsc', v)} /></View>
          <View style={styles.group}><Text style={styles.label}>Bank Account Name</Text><TextInput style={styles.input} value={form.bankAccountName} onChangeText={v => handleChange('bankAccountName', v)} /></View>
          <View style={styles.group}><Text style={styles.label}>Branch</Text><TextInput style={styles.input} value={form.branch} onChangeText={v => handleChange('branch', v)} /></View>
        </View>
      </View>
      {/* Persons Authorized for Delivery */}
      <View style={styles.fieldset}>
        <Text style={styles.legend}>Persons Authorized for Delivery</Text>
        <View style={styles.grid}>
          <View style={styles.group}><Text style={styles.label}>Name 1</Text><TextInput style={styles.input} value={form.deliveryPerson1} onChangeText={v => handleChange('deliveryPerson1', v)} /></View>
          <View style={styles.group}><Text style={styles.label}>Name 2</Text><TextInput style={styles.input} value={form.deliveryPerson2} onChangeText={v => handleChange('deliveryPerson2', v)} /></View>
          <View style={styles.group}><Text style={styles.label}>Name 3</Text><TextInput style={styles.input} value={form.deliveryPerson3} onChangeText={v => handleChange('deliveryPerson3', v)} /></View>
          <View style={styles.group}><Text style={styles.label}>Name 4</Text><TextInput style={styles.input} value={form.deliveryPerson4} onChangeText={v => handleChange('deliveryPerson4', v)} /></View>
        </View>
      </View>
      {/* Documents Required */}
      <View style={styles.fieldset}>
        <Text style={styles.legend}>Documents Required</Text>
        <View style={styles.grid}>
          {renderFileButton('Company Incorporation Certificate/Partnership Deed', 'docIncorporation')}
          {renderFileButton('Communication Address Proof', 'docAddressProof')}
          {renderFileButton('Company PAN', 'docCompanyPan')}
          {renderFileButton('Memorandum of Association', 'docMemorandum')}
          {renderFileButton('GST Certificate', 'docGstCertificate')}
          {renderFileButton('Authorised Person 1 Photo', 'docAuthPerson1Photo')}
          {renderFileButton('Authorised Person 2 Photo', 'docAuthPerson2Photo')}
          {renderFileButton('Authorised Person 3 Photo', 'docAuthPerson3Photo')}
          {renderFileButton('Authorised Person 4 Photo', 'docAuthPerson4Photo')}
        </View>
      </View>
      <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit KYC</Text>
      </TouchableOpacity>
      {!!status && <Text style={styles.status}>{status}</Text>}
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#181818',
    flexGrow: 1,
  },
  title: {
    textAlign: 'center',
    color: '#e0e0e0',
    marginBottom: 24,
    fontWeight: '800',
    fontSize: 28,
    letterSpacing: 1,
  },
  fieldset: {
    borderWidth: 2,
    borderColor: '#bfa14a',
    borderRadius: 12,
    backgroundColor: '#232323',
    marginBottom: 24,
    padding: 16,
    shadowColor: '#bfa14a',
    shadowOpacity: 0.07,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 2 },
  },
  legend: {
    fontSize: 18,
    fontWeight: '700',
    color: '#bfa14a',
    marginBottom: 12,
    backgroundColor: '#181c1c',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginLeft: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  group: {
    width: '48%',
    marginBottom: 16,
  },
  label: {
    fontWeight: '600',
    color: '#e0e0e0',
    marginBottom: 4,
  },
  input: {
    padding: 10,
    borderWidth: 1.5,
    borderColor: '#444',
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#2a2a2a',
    color: '#e0e0e0',
    marginBottom: 2,
  },
  pickerRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  pickerButton: {
    backgroundColor: '#2a2a2a',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderWidth: 1.5,
    borderColor: '#444',
    marginRight: 8,
  },
  pickerButtonActive: {
    backgroundColor: '#bfa14a',
    borderColor: '#bfa14a',
  },
  pickerButtonText: {
    color: '#e0e0e0',
    fontWeight: '600',
  },
  fileButton: {
    backgroundColor: '#bfa14a',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    width: '48%',
    alignItems: 'center',
  },
  fileButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  submit: {
    marginTop: 24,
    backgroundColor: '#bfa14a',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
  status: {
    marginTop: 16,
    textAlign: 'center',
    color: '#34a853',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default KYC; 