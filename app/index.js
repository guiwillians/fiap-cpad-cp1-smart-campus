import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  
  // Estado para guardar o RM e Senha (Aula 04)
  const [rm, setRm] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    // Como ainda não tem verificação real, apenas conferimos se os campos não estão vazios
    if (rm !== '' && senha !== '') {
      // Usamos replace em vez de push para o usuário não conseguir "voltar" pro login
      router.replace('/home'); 
    } else {
      alert('Por favor, preencha o RM e a senha!');
    }
  };

  return (
    <View style={styles.container}>
      {/* Um espaço para o Logo do app */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>FIAP</Text>
        <Text style={styles.subLogo}>Portal do Aluno</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>RM</Text>
        <TextInput 
          style={styles.input}
          placeholder="Ex: 99999"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={rm}
          onChangeText={setRm}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput 
          style={styles.input}
          placeholder="Sua senha do portal"
          placeholderTextColor="#999"
          secureTextEntry={true} // Esconde a senha com asteriscos
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.btnEntrar} onPress={handleLogin}>
          <Text style={styles.btnText}>ENTRAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1A1A', justifyContent: 'center', padding: 30 },
  logoContainer: { alignItems: 'center', marginBottom: 50 },
  logoText: { fontSize: 48, fontWeight: 'bold', color: '#ED145B' },
  subLogo: { fontSize: 18, color: '#FFF', letterSpacing: 2 },
  form: { width: '100%' },
  label: { color: '#FFF', fontSize: 16, marginBottom: 8, fontWeight: 'bold' },
  input: { 
    backgroundColor: '#333', 
    color: '#FFF', 
    padding: 16, 
    borderRadius: 8, 
    marginBottom: 20,
    fontSize: 16 
  },
  btnEntrar: { 
    backgroundColor: '#ED145B', 
    padding: 16, 
    borderRadius: 8, 
    alignItems: 'center',
    marginTop: 10
  },
  btnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});