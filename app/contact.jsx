import { Link } from 'expo-router'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Linking } from 'react-native'

const CONTACT_PHONE = '561-660-0995'
const CONTACT_EMAIL = 'info@greenviewRenovation.com'
const CONTACT_ADDRESS = '2500 Quantum Lakes Dr #203, Boynton Beach, FL 33426'

const Contact = () => {
  const handleCall = () => {
    Linking.openURL(`tel:${CONTACT_PHONE}`)
  }

  const handleEmail = () => {
    Linking.openURL(`mailto:${CONTACT_EMAIL}`)
  }

  const handleMap = () => {
    const encodedAddress = encodeURIComponent(CONTACT_ADDRESS)
    // Apple Maps for iOS; Google Maps if installed will also catch this
    Linking.openURL(`http://maps.apple.com/?address=${encodedAddress}`)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Greenview is here to help you throughout every step of the way
      </Text>

      <TouchableOpacity onPress={handleCall}>
        <Text style={styles.item}>Phone: {CONTACT_PHONE}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleEmail}>
        <Text style={styles.item}>Email: {CONTACT_EMAIL}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleMap}>
        <Text style={styles.item}>
          Location: {CONTACT_ADDRESS} (Open in Maps)
        </Text>
      </TouchableOpacity>

      <Link href="/" style={styles.link}>Back Home</Link>
    </View>
  )
}

export default Contact

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
  },
  item: {
    fontSize: 16,
    marginVertical: 8,
    textDecorationLine: 'underline',
  },
  link: {
    marginTop: 24,
    borderBottomWidth: 1,
  },
})