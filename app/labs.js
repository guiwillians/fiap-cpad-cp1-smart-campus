import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function LabsScreen() {
  const router = useRouter();
  
  // Estados para controlar o andar, o loading e os dados dos laboratórios
  const [andar, setAndar] = useState(1);
  const [loading, setLoading] = useState(false);
  const [labsData, setLabsData] = useState([]);

  // Efeito que roda toda vez que o 'andar' é alterado (Aula 04)
  useEffect(() => {
    setLoading(true);
    
    // Simulando a busca nos sensores IoT da FIAP
    setTimeout(() => {
      const finaisSalas = [0, 1, 2, 3, 4, 5, 6, 7];
      
      // Criando o array de laboratórios com dados dinâmicos
      const novosLabs = finaisSalas.map((final) => {
        const numeroLab = (andar * 100) + final;
        
        return {
          id: numeroLab,
          isLivre: numeroLab % 2 === 0, // Par é livre, ímpar é ocupado
          // Simula uma temperatura do ar condicionado entre 18°C e 26°C
          temperatura: Math.floor(Math.random() * (26 - 18 + 1)) + 18 
        };
      });

      setLabsData(novosLabs);
      setLoading(false);
    }, 400); 
  }, [andar]);

  // Função para mudar a cor do ícone de acordo com a temperatura
  const getCorTemperatura = (temp) => {
    if (temp <= 20) return '#4FC3F7'; // Frio (Azul)
    if (temp <= 24) return '#4CAF50'; // Agradável (Verde)
    return '#FF9800';                 // Quente (Laranja)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Reservar Labs 💻</Text>
      <Text style={styles.descricao}>Selecione o andar para consultar:</Text>

      {/* Botões dos Andares usando Flexbox Row */}
      <View style={styles.andaresContainer}>
        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
          <TouchableOpacity
            key={num}
            style={[styles.btnAndar, andar === num && styles.btnAndarAtivo]}
            onPress={() => setAndar(num)}
          >
            <Text style={[styles.txtAndar, andar === num && styles.txtAndarAtivo]}>
              {num}º
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Grid de Laboratórios */}
      <View style={styles.labsContainer}>
        {loading ? (
          <Text style={styles.loadingText}>Lendo sensores do {andar}º andar...</Text>
        ) : (
          labsData.map((lab) => (
            <View key={lab.id} style={styles.labCard}>
              
              {/* Header do Card com Nome e Temperatura lado a lado (Flexbox) */}
              <View style={styles.cardHeader}>
                <Text style={styles.labNome}>Lab {lab.id}</Text>
                
                {/* Ícone e Temperatura */}
                <View style={styles.tempContainer}>
                  <Text style={{ fontSize: 16 }}>{lab.temperatura <= 20 ? '❄️' : '🌡️'}</Text>
                  <Text style={[styles.tempTexto, { color: getCorTemperatura(lab.temperatura) }]}>
                    {lab.temperatura}°C
                  </Text>
                </View>
              </View>
              
              {/* Botão de Reserva */}
              <TouchableOpacity 
                style={[styles.btnStatus, { backgroundColor: lab.isLivre ? '#4CAF50' : '#F44336' }]}
                disabled={!lab.isLivre}
              >
                <Text style={styles.btnStatusText}>
                  {lab.isLivre ? 'Reservar Agora' : 'Em Uso'}
                </Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>

      {/* Botão de Voltar */}
      <TouchableOpacity style={styles.btnVoltar} onPress={() => router.back()}>
        <Text style={styles.btnTextVoltar}>Voltar para Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20, paddingTop: 60 },
  titulo: { fontSize: 28, fontWeight: 'bold', color: '#E83D84', marginBottom: 5 },
  descricao: { fontSize: 16, color: '#555', marginBottom: 20 },
  
  // Seletor de Andares
  andaresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 12,
    marginBottom: 20,
  },
  btnAndar: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8 },
  btnAndarAtivo: { backgroundColor: '#E83D84' },
  txtAndar: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  txtAndarAtivo: { color: '#FFF' },

  // Grid de Labs (Aula 03 - Flexbox Wrap)
  labsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
    flex: 1,
  },
  loadingText: { color: '#555', fontSize: 16, width: '100%', textAlign: 'center', marginTop: 50 },
  
  // Estilo do Card do Laboratório
  labCard: {
    width: '48%', 
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    justifyContent: 'space-between'
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  labNome: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  
  // Estilo da Temperatura
  tempContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tempTexto: { fontSize: 14, fontWeight: 'bold', marginLeft: 4 },

  btnStatus: { paddingVertical: 10, borderRadius: 6, width: '100%', alignItems: 'center' },
  btnStatusText: { color: '#FFF', fontWeight: 'bold', fontSize: 12, textTransform: 'uppercase' },

  btnVoltar: { marginTop: 'auto', padding: 15, alignItems: 'center' },
  btnTextVoltar: { color: '#E83D84', fontSize: 16, fontWeight: 'bold' }
});