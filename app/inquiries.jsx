import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { useRouter } from 'expo-router';

const MyInquiries = () => {
  const { user, db } = useAuth();
  const router = useRouter();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInquiries = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const q = query(
          collection(db, "inquiries"),
          where("uid", "==", user.uid),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const userInquiries = [];
        querySnapshot.forEach((doc) => {
          userInquiries.push({ id: doc.id, ...doc.data() });
        });
        setInquiries(userInquiries);
      } catch (err) {
        setError('Failed to fetch inquiries.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, [user, db]);

  if (loading) {
    return <ActivityIndicator style={styles.centered} size="large" />;
  }

  if (!user) {
    return (
      <View style={styles.signInPrompt}>
        <Text style={styles.signInText}>Please sign in to view your inquiries.</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/signIn')}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <FlatList
      data={inquiries}
      keyExtractor={(item) => item.id}
      style={styles.container}
      ListHeaderComponent={() => (
        <Text style={styles.header}>My Project Inquiries</Text>
      )}
      renderItem={({ item }) => (
        <View style={styles.inquiryCard}>
          <Text style={styles.inquiryTitle}>Inquiry from {item.createdAt?.toDate().toLocaleDateString()}</Text>
          <Text>Name: {item.firstName} {item.lastName}</Text>
          <Text>Budget: {item.budget}</Text>
          <Text>Description: {item.projectDescription}</Text>
        </View>
      )}
      ListEmptyComponent={() => (
        <Text style={styles.emptyText}>You have not submitted any inquiries yet.</Text>
      )}
    />
  );
};

export default MyInquiries;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
  inquiryCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  inquiryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
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
  button: {
    backgroundColor: '#0E3A32',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 999,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
