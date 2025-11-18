import { useState } from 'react'
import { StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity } from 'react-native'
import { Link } from 'expo-router'

const NewInquiry = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [budget, setBudget] = useState('')
  const [startDate, setStartDate] = useState('')
  const [projectDescription, setProjectDescription] = useState('')

  const handleSubmit = () => {
    // For now just log; later you can POST to an API / email, etc.
    console.log({
      firstName,
      lastName,
      email,
      phone,
      address,
      postalCode,
      budget,
      startDate,
      projectDescription,
    })
    // You might show an alert or clear fields here
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>New Project Inquiry</Text>
      <Text style={styles.subheader}>
        Greenview is here to help you throughout every step of the way.
        Tell us about your project and we’ll get back to you shortly.
      </Text>

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

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit Inquiry</Text>
      </TouchableOpacity>

      <Link href="/" style={styles.backLink}>Back Home</Link>
    </ScrollView>
  )
}

export default NewInquiry

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
  backLink: {
    marginTop: 16,
    textDecorationLine: 'underline',
    alignSelf: 'center',
  },
})