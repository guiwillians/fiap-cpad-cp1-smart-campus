import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function NotasScreen() {
  const router = useRouter();

  // Dados extraídos das suas imagens (Resumidos para o MVP)
  const disciplinas = [
    { nome: 'CROSS-PLATFORM APP DEV', faltas1: 0, faltas2: 0, aulas: 80, presenca: '100%' },
    { nome: 'APPLICATION DEVELOPMENT', faltas1: 2, faltas2: 0, aulas: 80, presenca: '97.5%' },
    { nome: 'DATA SCIENCE AND ANALYTICS', faltas1: 2, faltas2: 0, aulas: 80, presenca: '97.5%' },
    { nome: 'EDGE COMPUTING', faltas1: 4, faltas2: 0, aulas: 80, presenca: '95%' },
    { nome: 'OBJECT-ORIENTED PROGRAMMING', faltas1: 2, faltas2: 0, aulas: 80, presenca: '97.5%' },
    { nome: 'OPERATING SYSTEMS', faltas1: 2, faltas2: 0, aulas: 80, presenca: '97.5%' },
    { nome: 'SOFTWARE ENGINEERING', faltas1: 2, faltas2: 0, aulas: 80, presenca: '97.5%' },
  ];

  // Estado para controlar qual disciplina está sendo exibida na tela (Aula 04)
  const [indexAtual, setIndexAtual] = useState(0);

  const materiaAtual = disciplinas[indexAtual];

  // Funções para navegar entre as matérias
  const proximaMateria = () => {
    if (indexAtual < disciplinas.length - 1) {
      setIndexAtual(indexAtual + 1);
    }
  };

  const materiaAnterior = () => {
    if (indexAtual > 0) {
      setIndexAtual(indexAtual - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Boletim 📊</Text>
        <Text style={styles.subtitulo}>2CCPG • 2026</Text>
      </View>

      {/* Navegador de Disciplinas usando Flexbox Row */}
      <View style={styles.seletorContainer}>
        <TouchableOpacity onPress={materiaAnterior} disabled={indexAtual === 0} style={styles.btnNav}>
          <Text style={[styles.txtNav, indexAtual === 0 && styles.txtNavDisabled]}>{'<'}</Text>
        </TouchableOpacity>
        
        <View style={styles.materiaBox}>
          <Text style={styles.materiaTexto} numberOfLines={2} adjustsFontSizeToFit>
            {materiaAtual.nome}
          </Text>
        </View>

        <TouchableOpacity onPress={proximaMateria} disabled={indexAtual === disciplinas.length - 1} style={styles.btnNav}>
          <Text style={[styles.txtNav, indexAtual === disciplinas.length - 1 && styles.txtNavDisabled]}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* Painel de Desempenho */}
      <View style={styles.dashboard}>
        {/* 1º Semestre */}
        <View style={styles.cardSemestre}>
          <Text style={styles.cardTitulo}>1º Semestre</Text>
          <View style={styles.rowStats}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>CP</Text>
              <Text style={styles.statValor}>-</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>GS</Text>
              <Text style={styles.statValor}>-</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Faltas</Text>
              <Text style={styles.statValorDestaque}>{materiaAtual.faltas1}</Text>
            </View>
          </View>
        </View>

        {/* 2º Semestre */}
        <View style={styles.cardSemestre}>
          <Text style={styles.cardTitulo}>2º Semestre</Text>
          <View style={styles.rowStats}>
             <View style={styles.statItem}>
              <Text style={styles.statLabel}>CP</Text>
              <Text style={styles.statValor}>-</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>GS</Text>
              <Text style={styles.statValor}>-</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Faltas</Text>
              <Text style={styles.statValorDestaque}>{materiaAtual.faltas2}</Text>
            </View>
          </View>
        </View>

        {/* Resumo Anual */}
        <View style={styles.cardResumo}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Total de Aulas</Text>
            <Text style={styles.statValor}>{materiaAtual.aulas}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Presença</Text>
            <Text style={[styles.statValor, { color: '#4CAF50' }]}>{materiaAtual.presenca}</Text>
          </View>
        </View>
      </View>

      {/* Botão de Voltar */}
      <TouchableOpacity style={styles.btnVoltar} onPress={() => router.back()}>
        <Text style={styles.btnTextVoltar}>Voltar para Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1A1A', padding: 20, paddingTop: 60 },
  header: { marginBottom: 30, alignItems: 'center' },
  titulo: { fontSize: 28, fontWeight: 'bold', color: '#ED145B' },
  subtitulo: { fontSize: 16, color: '#AAA', marginTop: 5, letterSpacing: 1 },

  // Navegador de matérias
  seletorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
  },
  btnNav: { padding: 15 },
  txtNav: { color: '#ED145B', fontSize: 24, fontWeight: 'bold' },
  txtNavDisabled: { color: '#555' },
  materiaBox: { flex: 1, alignItems: 'center', paddingHorizontal: 10 },
  materiaTexto: { color: '#FFF', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },

  // Dashboard de Notas
  dashboard: { flex: 1 },
  cardSemestre: {
    backgroundColor: '#2A2A2A',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderLeftWidth: 3,
    borderLeftColor: '#ED145B',
  },
  cardTitulo: { color: '#AAA', fontSize: 14, fontWeight: 'bold', marginBottom: 15 },
  rowStats: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 },
  
  cardResumo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ED145B',
    padding: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  
  statItem: { alignItems: 'center' },
  statLabel: { color: '#FFF', fontSize: 12, marginBottom: 5, opacity: 0.8 },
  statValor: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  statValorDestaque: { color: '#ED145B', fontSize: 20, fontWeight: 'bold' },

  btnVoltar: { padding: 15, alignItems: 'center', marginTop: 10 },
  btnTextVoltar: { color: '#ED145B', fontSize: 16, fontWeight: 'bold' }
});