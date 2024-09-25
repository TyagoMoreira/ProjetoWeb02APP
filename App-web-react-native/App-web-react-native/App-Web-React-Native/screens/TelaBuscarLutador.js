import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TelaBuscarLutador() {
  const [piloto, setPiloto] = useState(null);  
  const [searchQuery, setSearchQuery] = useState('');  
  const [loading, setLoading] = useState(false);  
  const [favoritos, setFavoritos] = useState([]);  

 
  const buscarPiloto = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://v1.formula-1.api-sports.io/drivers', {
        headers: {
          'x-apisports-key': 'ce5d352d10d3f1eea47de248b153832c',
        },
        params: {
          name: searchQuery,
        },
      });

      if (response.data.response.length > 0) {
        setPiloto(response.data.response[0]);  
      } else {
        setPiloto(null);  
      }
    } catch (error) {
      console.error('Erro ao buscar pilotos:', error);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    const carregarFavoritos = async () => {
      try {
        const favoritosSalvos = await AsyncStorage.getItem('favoritos');
        if (favoritosSalvos) {
          setFavoritos(JSON.parse(favoritosSalvos));
        }
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
      }
    };
    carregarFavoritos();
  }, []);

  
  const adicionarFavorito = async (piloto) => {
    const novosFavoritos = [...favoritos, piloto];
    setFavoritos(novosFavoritos);
    try {
      await AsyncStorage.setItem('favoritos', JSON.stringify(novosFavoritos));
    } catch (error) {
      console.error('Erro ao salvar favoritos:', error);
    }
  };

  
  const renderFavorito = ({ item }) => (
    <View style={styles.favoritoItem}>
      <Text style={styles.favoritoNome}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pesquisa de Pilotos</Text>

      
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do piloto"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />


      <Button title="Buscar" onPress={buscarPiloto} color="#007bff" />

     
      {loading ? <Text style={styles.loading}>Carregando...</Text> : null}

      
      {piloto ? (
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.textContainer}>
              <Text style={styles.name}>{piloto.name}</Text>
              <Text style={styles.teamText}>
                Equipe: {piloto.teams && piloto.teams[0]?.team?.name || 'Desconhecida'}
              </Text>
              <TouchableOpacity onPress={() => adicionarFavorito(piloto)} style={styles.button}>
                <Text style={styles.buttonText}>Adicionar aos favoritos</Text>
              </TouchableOpacity>
            </View>
            <Image source={{ uri: piloto.image }} style={styles.image} />
          </View>
        </View>
      ) : (
        !loading && <Text style={styles.noResult}>Nenhum piloto encontrado.</Text>
      )}

      <Text style={styles.favoritosTitle}>Pilotos Favoritados:</Text>
      <FlatList
        data={favoritos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderFavorito}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  card: {
    padding: 15,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  teamText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  loading: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
  },
  noResult: {
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
    marginTop: 20,
  },
  favoritosTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  favoritoItem: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 5,
  },
  favoritoNome: {
    fontSize: 16,
  },
});
