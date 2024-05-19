import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';

interface Artist {
  id: string;
  name: string;
  image: string;
}

interface Album {
  id: string;
  name: string;
  image: string;
}

const getToken = async () => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa('d8219c18651c4639959e1d8dd8892215:90a520c1522844f59ecba200af8cca63'),
    },
    body: 'grant_type=client_credentials',
  });
  const data = await response.json();
  return data.access_token;
};

const ArtistSearch: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [artists, setArtists] = useState<Artist[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const fetchToken = async () => {
      const newToken = await getToken();
      setToken(newToken);
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (selectedArtist) {
      fetchArtistDetails(selectedArtist.id);
    }
  }, [selectedArtist]);

  const searchArtists = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch artists');
      }

      const data = await response.json();
      const artistItems = data.artists.items.map((artist: any) => ({
        id: artist.id,
        name: artist.name,
        image: artist.images.length > 0 ? artist.images[0].url : '',
      }));
      setArtists(artistItems);
    } catch (error) {
      console.error('Error searching artists:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchArtistDetails = async (artistId: string) => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch artist details');
      }

      const data = await response.json();
      const albumsData = data.items.map((album: any) => ({
        id: album.id,
        name: album.name,
        image: album.images.length > 0 ? album.images[0].url : '',
      }));
      setAlbums(albumsData);
    } catch (error) {
      console.error('Error fetching artist details:', error);
    }
  };

  const openSpotifyAlbum = (albumId: string) => {
    Linking.openURL(`https://open.spotify.com/album/${albumId}`);
  };

  return (
    <View style={styles.container}>
      {selectedArtist ? (
        <View style={styles.artistDetails}>
          <Text style={styles.artistTitle}>Artiste : {selectedArtist.name}</Text>
          <Text style={styles.albumsTitle}>Albums :</Text>
          <FlatList
            data={albums}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.albumContainer} onPress={() => openSpotifyAlbum(item.id)}>
                <Image source={{ uri: item.image }} style={styles.albumCover} />
                <Text style={styles.albumName}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={[styles.backButton, { backgroundColor: '#ff6347', marginBottom: 20 }]} onPress={() => setSelectedArtist(null)}>
            <Text style={styles.backButtonText}>Retour</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Recherchez un artiste"
            value={query}
            onChangeText={setQuery}
          />
          <Button title="Rechercher" onPress={searchArtists} color="#ff6347" />
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
          ) : (
            <FlatList
              style={styles.artistList}
              data={artists}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.artistContainer} onPress={() => setSelectedArtist(item)}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                  <Text style={styles.artistName}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  artistList: {
    flex: 1,
  },
  artistContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  artistName: {
    fontWeight: 'bold',
    flex: 1,
    color: '#333333',
  },
  artistDetails: {
    flex: 1,
  },
  artistTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  albumsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666666',
  },
  albumContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  albumCover: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  albumName: {
    marginBottom: 5,
    color: '#666666',
  },
  backButton: {
    backgroundColor: '#cccccc',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  backButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  loadingIndicator: {
    marginTop: 20,
  },
});

export default ArtistSearch;
