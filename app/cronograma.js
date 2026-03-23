import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function CronogramaScreen() {
  const router = useRouter();
  
  // Estado para controlar qual dia da semana está selecionado (padrão: Segunda)
  const [diaSelecionado, setDiaSelecionado] = useState('SEG');

  // Base de dados das suas aulas extraída do portal da FIAP
  const aulas = {
    SEG: [
      { id: 1, materia: 'OBJECT-ORIENTED PROGRAMMING', prof: 'YGOR MORAES MARTINS DOS ANJOS', horario: '08H10 ÀS 09H50', tipo: 'PRESENCIAL', local: 'LAB. 302 - ANDAR 3 - PAULISTA' },
      { id: 2, materia: 'CROSS-PLATFORM APPLICATION DEVELOPMENT', prof: 'HERCULES LIMA RAMOS', horario: '10H10 ÀS 11H50', tipo: 'PRESENCIAL', local: 'LAB. 302 - ANDAR 3 - PAULISTA' }
    ],
    TER: [], // Você não tem aula neste dia
    QUA: [
      { id: 3, materia: 'OPERATING SYSTEMS AND COMPUTER NETWORKS', prof: 'VICTOR RIBEIRO FERNANDES', horario: '08H10 ÀS 09H50' },
      { id: 4, materia: 'SOFTWARE ENGINEERING', prof: 'HERNANI BERNARDO MARQUES', horario: '10H10 ÀS 11H50' }
    ],
    QUI: [
      { id: 5, materia: 'APPLICATION DEVELOPMENT', prof: 'ALLAN ROBERTO MOLTO', horario: '08H10 ÀS 09H50' },
      { id: 6, materia: 'DATA SCIENCE AND ANALYTICS', prof: 'ROBERTO GUTIERREZ BERALDO', horario: '10H10 ÀS 11H50' }
    ],
    SEX: [
      { id: 7, materia: 'APRENDIZADO PROFUNDO COM REDES NEURAIS...', prof: 'FERNANDO NASCIMENTO DA SILVA', horario: '08H10 ÀS 09H50' },
      { id: 8, materia: 'EDGE COMPUTING', prof: 'LUCAS GOMES MOREIRA', horario: '10H10 ÀS 11H50' }
    ]
  };

  const diasDaSemana = ['SEG', 'TER', 'QUA', 'QUI', 'SEX'];
  const aulasDoDia = aulas[diaSelecionado];

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cronograma 📅</Text>
      
      {/* Seletor de Dias da Semana (Flexbox Row) */}
      <View style={styles.seletorContainer}>
        {diasDaSemana.map((dia) => (
          <TouchableOpacity 
            key={dia} 
            style={[styles.btnDia, diaSelecionado === dia && styles.btnDiaAtivo]}
            onPress={() => setDiaSelecionado(dia)}
          >
            <Text style={[styles.txtDia, diaSelecionado === dia && styles.txtDiaAtivo]}>
              {dia}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Renderização Condicional das Aulas */}
      <View style={styles.listaAulas}>
        {aulasDoDia.length === 0 ? (
          <View style={styles.semAulaContainer}>
            <Text style={styles.semAulaTexto}>VOCÊ NÃO TEM AULA NESTE DIA</Text>
          </View>
        ) : (
          aulasDoDia.map((aula) => (
            <View key={aula.id} style={styles.cardAula}>
              {/* Badge de Presencial (se houver) */}
              {aula.tipo && (
                <View style={styles.badgePresencial}>
                  <Text style={styles.badgeTexto}>{aula.tipo}</Text>
                </View>
              )}
              {aula.local && <Text style={styles.localTexto}>{aula.local}</Text>}
              
              <Text style={styles.materiaTexto}>{aula.materia}</Text>
              <Text style={styles.profTexto}>{aula.prof}</Text>
              
              <View style={styles.horarioContainer}>
                <Text style={styles.horarioIcone}>🕒</Text>
                <Text style={styles.horarioTexto}>{aula.horario}</Text>
              </View>
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
  container: { flex: 1, backgroundColor: '#1A1A1A', padding: 20, paddingTop: 60 },
  titulo: { fontSize: 28, fontWeight: 'bold', color: '#ED145B', marginBottom: 20 },
  
  // Estilos do Seletor de Dias
  seletorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 5,
    marginBottom: 20,
  },
  btnDia: { paddingVertical: 10, paddingHorizontal: 15, borderRadius: 6 },
  btnDiaAtivo: { backgroundColor: '#ED145B' },
  txtDia: { color: '#AAA', fontWeight: 'bold', fontSize: 14 },
  txtDiaAtivo: { color: '#FFF' },

  // Estilos da Lista de Aulas
  listaAulas: { flex: 1 },
  semAulaContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  semAulaTexto: { color: '#555', fontSize: 16, fontWeight: 'bold' },
  
  // Estilo do Cartão de Aula inspirado no Dark Mode da FIAP
  cardAula: {
    backgroundColor: '#2A2A2A',
    borderLeftWidth: 4,
    borderLeftColor: '#ED145B',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  badgePresencial: {
    backgroundColor: '#ED145B',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginBottom: 5,
  },
  badgeTexto: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  localTexto: { color: '#ED145B', fontSize: 12, fontWeight: 'bold', marginBottom: 10 },
  materiaTexto: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  profTexto: { color: '#AAA', fontSize: 12, marginBottom: 15 },
  horarioContainer: { flexDirection: 'row', alignItems: 'center' },
  horarioIcone: { fontSize: 14, marginRight: 5 },
  horarioTexto: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },

  btnVoltar: { padding: 15, alignItems: 'center', marginTop: 10 },
  btnTextVoltar: { color: '#ED145B', fontSize: 16, fontWeight: 'bold' }
});