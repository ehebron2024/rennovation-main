import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, useColorScheme } from 'react-native';
import { Link, useRouter } from 'expo-router';
import Logo from '../assets/icon.png';
import { Colors } from '../constants/Colors';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'] ?? Colors.light;

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error("Failed to log out: ", error);
    }
  };

  return (
    <ScrollView style={styles.root}>
      {/* Top dark green header bar */}
      <View style={styles.header}>
        <Text style={styles.logoText}>GREENVIEW{
'\n'}RENOVATION</Text>

        <TouchableOpacity style={styles.callButton}>
          <Text style={styles.callButtonText}>561-660-0955</Text>
        </TouchableOpacity>
      </View>

      {/* Main content */}
      <View style={styles.content}>
        <Image source={Logo} style={styles.img} />
        <Text style={styles.sectionLabel}>Greenview Renovation</Text>
        <Text style={styles.title}>
          Home Remodeling and{
'\n'}Renovation Contractors
        </Text>

        <Text style={styles.bodyText}>
          Greenview Renovation is your trusted local home remodeling company with
          over 15 years of experience in transforming living spaces. Our team is fully
          licensed, bonded and insured. We are here to build lifetime relationships
          with all of our clients.
        </Text>

        <TouchableOpacity style={styles.primaryButton}>
          <Link href="/about" style={styles.primaryButtonText}>About Us</Link>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryButton}>
          <Link href="/new_inquiry" style={styles.primaryButtonText}>
            New Project Inquiry
          </Link>
        </TouchableOpacity>

        {user && (
            <TouchableOpacity style={styles.primaryButton}>
                <Link href="/inquiries" style={styles.primaryButtonText}>My Inquiries</Link>
            </TouchableOpacity>
        )}

        {user ? (
          <TouchableOpacity style={styles.primaryButton} onPress={handleLogout}>
            <Text style={styles.primaryButtonText}>Sign Out</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.primaryButton}>
            <Link href="/signIn" style={styles.primaryButtonText}>Sign In</Link>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.primaryButton}>
          <Link href="/contact" style={styles.primaryButtonText}>Contact Us</Link>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
  },
  callButton: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 999,
  },
  callButtonText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  sectionLabel: {
    color: Colors.accent,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  title: {
    color: Colors.textMain,
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 32,
    marginBottom: 16,
  },
  bodyText: {
    color: Colors.textSub,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 999,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  img: {
    width: 120,
    height: 120,
    marginBottom: 16,
    resizeMode: 'contain',
  },
});
