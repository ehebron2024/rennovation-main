import { Link } from 'expo-router'
import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import { Colors } from './constants/Colors'

export default function About() {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.title }]}>
        About Greenview Renovation
      </Text>

      <Link href="/" style={styles.link}>
        <Text style={{ color: theme.text }}>Home page</Text>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8F5E9',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  link: {
    marginVertical: 10,
    borderBottomWidth: 1,
  },
})
