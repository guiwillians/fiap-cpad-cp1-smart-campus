import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function CantinaScreen() {
  const router = useRouter();

  // Estados para controlar o carrinho e o fluxo de pagamento
  const [qtdItens, setQtdItens] = useState(0);
  const [total, setTotal] = useState(0);
  const [etapa, setEtapa] = useState('menu');
  const [metodoPagamento, setMetodoPagamento] = useState('');

  // Função para adicionar itens ao carrinho
  const adicionarItem = (preco) => {
    setQtdItens(qtdItens + 1);
    setTotal(total + preco);
  };

  // Funções de navegação entre as etapas do pedido
  const irParaPagamento = () => { if (qtdItens > 0) setEtapa('pagamento'); };
  const confirmarPedido = () => { if (metodoPagamento !== '') setEtapa('sucesso'); };

  const reiniciar = () => { 
    setQtdItens(0); 
    setTotal(0); 
    setMetodoPagamento(''); 
    setEtapa('menu'); 
  };

  // Componente interno para renderizar os produtos (Utiliza imagens da web para não dar erro)
  const ItemCard = ({ imagemUrl, nome, preco, valor }) => (
    <View style={styles.itemCard}>
      <Image source={{ uri: imagemUrl }} style={styles.itemImage} resizeMode="cover" />
      <View style={styles.itemDetails}>
        <View>
          <Text style={styles.itemNome}>{nome}</Text>
          <Text style={styles.itemPreco}>{preco}</Text>
        </View>
        <TouchableOpacity style={styles.btnAdd} onPress={() => adicionarItem(valor)}>
          <Text style={styles.btnTextAdd}>+ ADD</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // --- ECRÃ 1: MENU ---
  if (etapa === 'menu') {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Cantina Express 🍔</Text>
        <Text style={styles.descricao}>Adicione itens ao carrinho</Text>

        {/* Produtos com URLs de imagens fiáveis para funcionar em qualquer PC */}
        <ItemCard 
          imagemUrl="https://receitas123.com/wp-content/uploads/2023/04/massa-para-salgado-assado.png" 
          nome="Salgado Assado" 
          preco="R$ 8,00" 
          valor={8} 
        />
        <ItemCard 
          imagemUrl="https://imagens.jotaja.com/produtos/78565ea2-23ac-4ef5-91a9-25565ccedda4.jpg" 
          nome="Refrigerante Lata" 
          preco="R$ 6,00" 
          valor={6} 
        />
        <ItemCard 
          imagemUrl="https://panutti.com.br/arquivos/produtos/imagens_adicionais/P%C3%A3o%20de%20Queijo-210.jpg" 
          nome="Pão de Queijo" 
          preco="R$ 5,00" 
          valor={5} 
        />

        <View style={styles.carrinhoFooter}>
          <View>
            <Text style={styles.carrinhoTexto}>{qtdItens} itens selecionados</Text>
            <Text style={styles.carrinhoTotal}>Total: R$ {total.toFixed(2)}</Text>
          </View>
          <TouchableOpacity 
            style={[styles.btnPagar, qtdItens === 0 && styles.btnDesativado]} 
            onPress={irParaPagamento} 
            disabled={qtdItens === 0}
          >
            <Text style={styles.btnTextAdd}>PAGAR ➔</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.btnVoltar} onPress={() => router.back()}>
          <Text style={styles.btnTextVoltar}>Voltar para Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // --- ECRÃ 2: PAGAMENTO ---
  if (etapa === 'pagamento') {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Pagamento 💳</Text>
        <Text style={styles.descricao}>Total a pagar: R$ {total.toFixed(2)}</Text>

        <Text style={styles.labelPagamento}>Selecione o método:</Text>
        
        <TouchableOpacity 
          style={[styles.btnMetodo, metodoPagamento === 'PIX' && styles.btnMetodoAtivo]} 
          onPress={() => setMetodoPagamento('PIX')}
        >
          <Text style={styles.txtMetodo}>PIX (Aprovação Imediata)</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.btnMetodo, metodoPagamento === 'CARTAO' && styles.btnMetodoAtivo]} 
          onPress={() => setMetodoPagamento('CARTAO')}
        >
          <Text style={styles.txtMetodo}>Cartão de Crédito / Débito</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.btnMetodo, metodoPagamento === 'SALDO' && styles.btnMetodoAtivo]} 
          onPress={() => setMetodoPagamento('SALDO')}
        >
          <Text style={styles.txtMetodo}>Saldo Estudante FIAP</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.btnConfirmar, metodoPagamento === '' && styles.btnDesativado]} 
          onPress={confirmarPedido} 
          disabled={metodoPagamento === ''}
        >
          <Text style={styles.btnTextAdd}>CONFIRMAR PEDIDO</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnVoltar} onPress={() => setEtapa('menu')}>
          <Text style={styles.btnTextVoltar}>Cancelar e Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // --- ECRÃ 3: SUCESSO ---
  return (
    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <Text style={{ fontSize: 80, marginBottom: 20 }}>✅</Text>
      <Text style={styles.titulo}>Pedido Confirmado!</Text>
      <Text style={[styles.descricao, { textAlign: 'center', marginBottom: 40 }]}>
        O pagamento via {metodoPagamento} foi aprovado. Retire no balcão express!
      </Text>

      <TouchableOpacity style={styles.btnConfirmar} onPress={reiniciar}>
        <Text style={styles.btnTextAdd}>Novo Pedido</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnVoltar} onPress={() => router.replace('/home')}>
        <Text style={styles.btnTextVoltar}>Voltar para Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1A1A', padding: 20, paddingTop: 60 },
  titulo: { fontSize: 28, fontWeight: 'bold', color: '#ED145B', marginBottom: 5 },
  descricao: { fontSize: 16, color: '#AAA', marginBottom: 20 },

  itemCard: { backgroundColor: '#2A2A2A', padding: 15, borderRadius: 12, marginBottom: 15, flexDirection: 'row', alignItems: 'center', borderLeftWidth: 3, borderLeftColor: '#ED145B' },
  itemImage: { width: 70, height: 70, borderRadius: 8, marginRight: 15 },
  itemDetails: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemNome: { fontSize: 16, fontWeight: 'bold', color: '#FFF' },
  itemPreco: { fontSize: 16, color: '#ED145B', marginTop: 4, fontWeight: 'bold' },

  btnAdd: { backgroundColor: '#ED145B', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 8 },
  btnTextAdd: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },

  carrinhoFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#333', padding: 20, borderRadius: 12, marginTop: 20 },
  carrinhoTexto: { color: '#AAA', fontSize: 14 },
  carrinhoTotal: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  btnPagar: { backgroundColor: '#4CAF50', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 8 },
  btnDesativado: { backgroundColor: '#555' },

  labelPagamento: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 15 },
  btnMetodo: { backgroundColor: '#333', padding: 20, borderRadius: 8, marginBottom: 15, borderWidth: 2, borderColor: 'transparent' },
  btnMetodoAtivo: { borderColor: '#ED145B', backgroundColor: '#2A2A2A' },
  txtMetodo: { color: '#FFF', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },

  btnConfirmar: { backgroundColor: '#ED145B', padding: 20, borderRadius: 8, alignItems: 'center', marginTop: 20, width: '100%' },
  btnVoltar: { marginTop: 'auto', padding: 15, alignItems: 'center' },
  btnTextVoltar: { color: '#ED145B', fontSize: 16, fontWeight: 'bold' }
});