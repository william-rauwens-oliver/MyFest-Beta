import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

interface Artist {
  name: string;
  stage: string;
  day: string;
}

const festivalsData = [
  {
    name: 'Marsatac 2023',
    date: '14 - 16 Juin 2023',
    artists: [
      { name: 'Werenoï', stage: 'Le Château', day: 'VENDREDI 14 JUIN' },
      { name: 'Zola', stage: 'Le Château', day: 'VENDREDI 14 JUIN' },
      // Ajoutez d'autres artistes ici...
    ]
  }
];

const FestivalScreen = () => {
  const [favoriteArtists, setFavoriteArtists] = useState<Artist[]>([]);

  const renderArtistItem = ({ item }: { item: Artist }) => (
    <View style={styles.artist}>
      <Text style={styles.artistName}>{item.name}</Text>
      <Text style={styles.artistDetails}>{item.stage} - {item.day}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <Text style={styles.navText}>Favoris</Text>
      </View>
      <View style={styles.content}>
        <FlatList
          data={favoriteArtists}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderArtistItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  navBar: {
    backgroundColor: '#333',
    paddingVertical: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  navText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  artist: {
    marginBottom: 15,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  artistName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  artistDetails: {
    fontSize: 14,
    color: '#666',
  },
});

export default FestivalScreen;
