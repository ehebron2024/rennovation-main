
import { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const NewInquiry = () => {
  const { user, db } = useAuth();
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [budget, setBudget] = useState('');
  const [startDate, setStartDate] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async () => {
    if (!firstName || !lastName || !email || !projectDescription) {
        setError('Please fill out all required fields.');
        return;
    }
    setLoading(true);
    setError('');
    setSuccess('');
    try {
        await addDoc(collection(db, "inquiries"), {
            uid: user.uid,
            firstName,
            lastName,
            email,
            phone,
            address,
            postalCode,
            budget,
            startDate,
            projectDescription,
            createdAt: serverTimestamp()
        });
        setSuccess('Your project inquiry has been submitted successfully!');
        // Clear form
        setFirstName('');
        setLastName('');
        setPhone('');
        setAddress('');
        setPostalCode('');
        setBudget('');
        setStartDate('');
        setProjectDescription('');
    } catch (err) {
        setError('Failed to submit inquiry. Please try again.');
        console.error(err);
    }
    setLoading(false);
  };

  if (user === null) {
    return (
      <View style={styles.signInPrompt}>
        <Text style={styles.signInText}>Please sign in or sign up to create a new inquiry.</Text>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => router.push('/signIn')}
        >
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => router.push('/signUp')}
        >
          <Text style={styles.signInButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>New Project Inquiry</Text>
      <Text style={styles.subheader}>
        Greenview is here to help you throughout every step of the way. Tell us
        about your project and we’ll get back to you shortly.
      </Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {success ? <Text style={styles.success}>{success}</Text> : null}

      <View style={styles.row}>
        <View style={[styles.inputGroup, styles.rowItem]}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First name"
          />
        </View>
        <View style={[styles.inputGroup, styles.rowItem]}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Last name"
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          editable={false} // User's email is not editable
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="561-660-0995"
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Street address"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Postal / ZIP Code</Text>
        <TextInput
          style={styles.input}
          value={postalCode}
          onChangeText={setPostalCode}
          placeholder="ZIP / Postal code"
          keyboardType="numbers-and-punctuation"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Approximate Budget</Text>
        <TextInput
          style={styles.input}
          value={budget}
          onChangeText={setBudget}
          placeholder="$25,000"
          keyboardType="numbers-and-punctuation"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Desired Project Start Date</Text>
        <TextInput
          style={styles.input}
          value={startDate}
          onChangeText={setStartDate}
          placeholder="MM/DD/YYYY or Month/Year"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Describe Your Project</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={projectDescription}
          onChangeText={setProjectDescription}
          placeholder="Tell us about the rooms, materials, timeline, and any details we should know."
          multiline
          numberOfLines={5}
          textAlignVertical="top"
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitText}>Submit Inquiry</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default NewInquiry;

const styles = StyleSheet.create({
    container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  subheader: {
    fontSize: 14,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  rowItem: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    minHeight: 120,
  },
  submitButton: {
    marginTop: 16,
    backgroundColor: '#0E3A32',
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  signInPrompt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  signInText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  signInButton: {
    backgroundColor: '#0E3A32',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 999,
    marginBottom: 10,
  },
    signUpButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 999,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
      color: 'red',
      marginBottom: 10,
      textAlign: 'center',
  },
  success: {
      color: 'green',
      marginBottom: 10,
      textAlign: 'center',
  }
});
