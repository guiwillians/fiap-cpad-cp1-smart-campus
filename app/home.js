import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.saudacao}>Olá, Guilherme!</Text>
        <Text style={styles.curso}>Ciência da Computação</Text>
      </View>

      <Text style={styles.sectionTitle}>Acesso Rápido</Text>

      {/* Usando Flexbox row para criar um grid (Aula 03/04) */}
      <View style={styles.grid}>
        
        <TouchableOpacity style={styles.card} onPress={() => router.push('/notas')}>
             <Text style={styles.cardIcon}>📊</Text>
            <Text style={styles.cardTitle}>Notas e Faltas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/cronograma')}>
            <Text style={styles.cardIcon}>📅</Text>
            <Text style={styles.cardTitle}>Cronograma</Text>
        </TouchableOpacity>

       <TouchableOpacity style={styles.card} onPress={() => router.push('/kitchenette')}>
            <Text style={styles.cardIcon}>🍔</Text>
            <Text style={styles.cardTitle}>Kitchenette</Text>
        </TouchableOpacity>
       <TouchableOpacity style={styles.card} onPress={() => router.push('/labs')}>
            <Text style={styles.cardIcon}>💻</Text>
            <Text style={styles.cardTitle}>Reservar Labs</Text>
        </TouchableOpacity>

      </View>
      
      {/* Botão de Logout */}
      <TouchableOpacity style={styles.btnLogout} onPress={() => router.replace('/')}>
        <Text style={styles.btnTextLogout}>Sair da Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20, paddingTop: 60 },
  header: { marginBottom: 30 },
  saudacao: { fontSize: 28, fontWeight: 'bold', color: '#1A1A1A' },
  curso: { fontSize: 16, color: '#ED145B', fontWeight: '600', marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  
  // Flexbox para o Grid
  grid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between' 
  },
  card: {
    backgroundColor: '#FFF',
    width: '47%', // Deixa dois cards lado a lado com um pequeno espaço
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Sombra para Android
  },
  cardIcon: { fontSize: 32, marginBottom: 10 },
  cardTitle: { fontSize: 14, fontWeight: 'bold', color: '#333', textAlign: 'center' },
  
  btnLogout: { marginTop: 'auto', padding: 15, alignItems: 'center' },
  btnTextLogout: { color: '#ED145B', fontSize: 16, fontWeight: 'bold' }
});