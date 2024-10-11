import React, { useState, useCallback } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";

const ecopontos = [
  {
    latitude: -23.549062,
    longitude: -46.341875,
    title: 'ECOPONTO PARQUE MARIA HELENA',
    description: 'Rua Antônio Francisco dos Santos, 186 – Parque Maria Helena',
    horario: 'Seg-Sex: 8h às 19h',
    materiais: 'Resíduos da Construção Civil, Móveis, Eletroeletrônicos, etc.',
  },
  {
    latitude: -23.536752,
    longitude: -46.311259,
    title: 'ECOPONTO MARGINAL DO UNA',
    description: 'Rua Afonso Nícola Redondo, s/n – Vila Figueira',
    horario: 'Seg-Sex: 8h às 19h',
    materiais: 'Resíduos da Construção Civil, Eletroeletrônicos, Recicláveis, etc.',
  },
  {
    latitude: -23.560915,
    longitude: -46.293845,
    title: 'ECOPONTO DONA BENTA',
    description: 'Estrada Takashi Kobata, 183- Jardim Dona Benta',
    horario: 'Seg-Sex: 8h às 19h',
    materiais: 'Resíduos da Construção Civil, Móveis, Eletroeletrônicos, etc.',
  },
  {
    latitude: -23.563815,
    longitude: -46.297098,
    title: 'ECOPONTO BOA VISTA',
    description: 'Rua Vitor Miguelino, 553 – Boa Vista',
    horario: 'Seg-Sex: 8h às 19h',
    materiais: 'Resíduos da Construção Civil, Móveis, Eletroeletrônicos, etc.',
  },
  {
    latitude: -23.576323,
    longitude: -46.327983,
    title: 'CENTRAL DE TRIAGEM – Colorado',
    description: 'R. Profa. Luisa Idaka, 398-482',
    horario: 'Seg-Sex: 8h às 19h',
    materiais: 'Resíduos de construção civil, Recicláveis, etc.',
  },
  {
    latitude: -23.520091,
    longitude: -46.185218,
    title: 'Ecoponto Jardim Armênia',
    description: 'Rua Júlio Perotti, 353 - Jardim Armênia',
    horario: 'Sex-Qua: 8h às 18h',
    materiais: 'Recicláveis, Eletroeletrônicos, Móveis, Pneus, etc.',
  },
  {
    latitude: -23.524892,
    longitude: -46.198482,
    title: 'Ecoponto Jundiapeba',
    description: 'Rua Manoel Fernandes, 44 - Nova Jundiapeba',
    horario: 'Todos os dias: 8h às 18h, exceto quintas',
    materiais: 'Recicláveis, Eletroeletrônicos, Móveis, Pneus, etc.',
  },
  {
    latitude: -23.511345,
    longitude: -46.172845,
    title: 'Ecoponto Parque Olímpico (Fechado)',
    description: 'Avenida Prefeito Maurílio de Souza Leite Filho',
    horario: 'Temporariamente fechado para reformas',
    materiais: 'Reforma em andamento',
  },
];

export default function App() {
  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleMarkerPress = useCallback((ponto) => {
    if (selectedMarker && selectedMarker.title === ponto.title) {
      setSelectedMarker(null); // Fecha se já estiver aberto
    } else {
      setSelectedMarker(ponto);
    }
  }, [selectedMarker]);

  const renderCard = (ponto) => {
    const isSelected = selectedMarker && selectedMarker.title === ponto.title;
    return (
      <TouchableOpacity
        key={ponto.title}
        style={[styles.card, isSelected && styles.selectedCard]}
        onPress={() => handleMarkerPress(ponto)}
      >
        <Text style={styles.cardTitle}>{ponto.title}</Text>
        <Text>{ponto.description}</Text>
        <Text>Horário: {ponto.horario}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -23.5226,
          longitude: -46.1853,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {ecopontos.map((ponto, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: ponto.latitude, longitude: ponto.longitude }}
            title={ponto.title}
            description={ponto.description}
            onPress={() => handleMarkerPress(ponto)}
          />
        ))}
      </MapView>

      {selectedMarker && (
        <View style={styles.markerDetails}>
          <Text style={styles.title}>{selectedMarker.title}</Text>
          <Text>{selectedMarker.description}</Text>
          <Text>Horário: {selectedMarker.horario}</Text>
          <Text>Materiais: {selectedMarker.materiais}</Text>
          <TouchableOpacity onPress={() => setSelectedMarker(null)}>
            <Text style={styles.closeButton}>Fechar</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView style={styles.info}>
        <Text style={styles.sectionTitle}>Ecopontos</Text>
        {ecopontos.map(renderCard)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  map: {
    width: '100%',
    height: '50%',
  },
  info: {
    padding: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  selectedCard: {
    backgroundColor: '#e0f7fa', // Cor diferente para o cartão selecionado
  },
  markerDetails: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 10,
    color: 'red',
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
