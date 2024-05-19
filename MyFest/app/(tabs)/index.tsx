import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-deck-swiper';

interface Artist {
  name: string;
  stage: string;
  day: string;
  image: string;
}

const festivalsData = [
  {
    name: 'Marsatac 2023',
    date: '14 - 16 Juin 2023',
    artists: [
      { name: 'Werenoï', stage: 'Le Château', day: 'VENDREDI 14 JUIN', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Werenoi.jpg/800px-Werenoi.jpg' },
      { name: 'Zola', stage: 'Le Château', day: 'VENDREDI 14 JUIN', image: 'https://www.arkeaarena.com/app/uploads/2023/03/AA_SI_SQR_-10.jpg' },
      { name: 'Zamdane', stage: 'Le Château', day: 'VENDREDI 14 JUIN', image: 'https://core.colorsxstudios.com/wp-content/uploads/2024/01/COLORSxSTUDIOS_Announcement_Zamdane-768x960.jpg' },
      { name: 'Kobosil', stage: 'Le Lac', day: 'VENDREDI 14 JUIN', image: 'https://images.sk-static.com/images/media/img/col4/20230925-140719-892452.png' },
      { name: 'Patrick Mason', stage: 'Le Lac', day: 'VENDREDI 14 JUIN', image: 'https://enfntsterribles.com/wp-content/uploads/2023/03/ENFNTS-TERRIBLES-patrick-mason-interview-zalando-03-934x1400.jpg' },
      { name: 'Daria Kolosova', stage: 'Le Lac', day: 'VENDREDI 14 JUIN', image: 'https://paradisecity.be/uploads/artists_pc/daria.jpg' },
      { name: 'Lesram', stage: 'Le Château', day: 'VENDREDI 14 JUIN', image: 'https://views.fr/wp-content/uploads/2024/01/LESRAM002.jpg' },
      { name: 'Selug & $enar', stage: 'La Prairie', day: 'VENDREDI 14 JUIN', image: 'https://legrandmix.com/sites/default/files/legrandmix/styles/galerie_photos/public/ged/cover-1_selug_senar.jpg?itok=gt8_cBzZ' },
      { name: 'Train Fantôme', stage: 'La Prairie', day: 'VENDREDI 14 JUIN', image: 'https://manifesto-21.com/wp-content/uploads/2020/12/2-3-768x1024.jpg' },
      { name: 'Baby Volcano', stage: 'La Prairie', day: 'VENDREDI 14 JUIN', image: 'https://www.europavox.com/wp-content/uploads/2023/05/577EC1EF-CA1A-4A6D-BBF2-C8D9DBE5D5A5_1_201_a-scaled.jpeg' },
      { name: 'Crams', stage: 'La Prairie', day: 'VENDREDI 14 JUIN', image: 'https://marsatac.com/wp-content/uploads/2024/01/stony-stone-web-700x450.jpg' },
      { name: 'Ke:tr', stage: 'La Frappe', day: 'VENDREDI 14 JUIN', image: 'https://example.com/ketr.jpg' },
      { name: 'Siloh', stage: 'La Prairie', day: 'VENDREDI 14 JUIN', image: 'https://example.com/siloh.jpg' },
      { name: 'Stony Stone', stage: 'Le Château', day: 'VENDREDI 14 JUIN', image: 'https://example.com/stonystone.jpg' },
      { name: 'Vost', stage: 'Le Lac', day: 'VENDREDI 14 JUIN', image: 'https://example.com/vost.jpg' },
      { name: 'Yenkov', stage: 'Le Lac', day: 'VENDREDI 14 JUIN', image: 'https://example.com/yenkov.jpg' },
      { name: 'La Frappe', stage: 'La Frappe', day: 'VENDREDI 14 JUIN', image: 'https://example.com/lafrappe.jpg' },
      { name: 'Menace Santana', stage: 'La Prairie', day: 'SAMEDI 15 JUIN', image: 'https://example.com/menacesantana.jpg' },
      { name: 'Luidji', stage: 'Le Château', day: 'SAMEDI 15 JUIN', image: 'https://example.com/luidji.jpg' },
      { name: 'Luther', stage: 'Le Château', day: 'SAMEDI 15 JUIN', image: 'https://example.com/luther.jpg' },
      { name: 'Shay', stage: 'Le Château', day: 'SAMEDI 15 JUIN', image: 'https://example.com/shay.jpg' },
      { name: 'Boys Noize', stage: 'Le Lac', day: 'SAMEDI 15 JUIN', image: 'https://example.com/boysnoize.jpg' },
      { name: 'DJ Heartstring', stage: 'Le Lac', day: 'SAMEDI 15 JUIN', image: 'https://example.com/djheartstring.jpg' },
      { name: 'Achim', stage: 'Le Château', day: 'SAMEDI 15 JUIN', image: 'https://example.com/achim.jpg' },
      { name: 'Jersey', stage: 'La Prairie', day: 'SAMEDI 15 JUIN', image: 'https://example.com/jersey.jpg' },
      { name: 'Mcr-t', stage: 'Le Lac', day: 'SAMEDI 15 JUIN', image: 'https://example.com/mcrt.jpg' },
      { name: 'Roland Cristal', stage: 'La Prairie', day: 'SAMEDI 15 JUIN', image: 'https://example.com/rolandcristal.jpg' },
      { name: 'Salome', stage: 'Le Lac', day: 'SAMEDI 15 JUIN', image: 'https://example.com/salome.jpg' },
      { name: 'Winnterzuko', stage: 'La Prairie', day: 'SAMEDI 15 JUIN', image: 'https://example.com/winnterzuko.jpg' },
      { name: 'Arøne', stage: 'La Prairie', day: 'SAMEDI 15 JUIN', image: 'https://example.com/arone.jpg' },
      { name: 'Joube', stage: 'La Frappe', day: 'SAMEDI 15 JUIN', image: 'https://example.com/joube.jpg' },
      { name: 'Kay The Prodigy', stage: 'Le Château', day: 'SAMEDI 15 JUIN', image: 'https://example.com/kaytheprodigy.jpg' },
      { name: 'Sana', stage: 'Le Lac', day: 'SAMEDI 15 JUIN', image: 'https://example.com/sana.jpg' },
      { name: 'Surusinghe', stage: 'Le Lac', day: 'SAMEDI 15 JUIN', image: 'https://example.com/surusinghe.jpg' },
      { name: 'La Frappe', stage: 'La Frappe', day: 'SAMEDI 15 JUIN', image: 'https://example.com/lafrappe.jpg' },
      { name: 'Collectif K-Waï', stage: 'La Prairie', day: 'SAMEDI 15 JUIN', image: 'https://example.com/collectifkwaï.jpg' },
      { name: 'Houdi', stage: 'La Prairie', day: 'DIMANCHE 16 JUIN', image: 'https://example.com/houdi.jpg' },
      { name: 'Morad', stage: 'Le Château', day: 'DIMANCHE 16 JUIN', image: 'https://example.com/morad.jpg' },
      { name: 'SDM', stage: 'Le Château', day: 'DIMANCHE 16 JUIN', image: 'https://example.com/sdm.jpg' },
      { name: 'Tif', stage: 'La Prairie', day: 'DIMANCHE 16 JUIN', image: 'https://example.com/tif.jpg' },
      { name: 'Marlon Hoffstadt', stage: 'Le Lac', day: 'DIMANCHE 16 JUIN', image: 'https://example.com/marlonhoffstadt.jpg' },
      { name: 'VTSS', stage: 'Le Lac', day: 'DIMANCHE 16 JUIN', image: 'https://example.com/vtss.jpg' },
      { name: 'Isha X Limsa D’aulnay', stage: 'Le Château', day: 'DIMANCHE 16 JUIN', image: 'https://example.com/ishaxlimsadaulnay.jpg' },
      { name: 'Malugi', stage: 'Le Lac', day: 'DIMANCHE 16 JUIN', image: 'https://example.com/malugi.jpg' },
      { name: 'Marie Davidson', stage: 'La Prairie', day: 'DIMANCHE 16 JUIN', image: 'https://example.com/mariedavidson.jpg' },
      { name: 'Miss Bashful X Dbbd', stage: 'Le Lac', day: 'DIMANCHE 16 JUIN', image: 'https://example.com/missbashfulxdbbd.jpg' },
      { name: 'Filante', stage: 'Le Lac', day: 'DIMANCHE 16 JUIN', image: 'https://example.com/filante.jpg' },
      { name: 'DJ Sebb', stage: 'La Frappe', day: 'DIMANCHE 16 JUIN', image: 'https://example.com/djsebb.jpg' },
      { name: 'La Valentina', stage: 'Le Château', day: 'DIMANCHE 16 JUIN', image: 'https://example.com/lavalentina.jpg' },
      { name: 'Violet Indigo', stage: 'La Prairie', day: 'DIMANCHE 16 JUIN', image: 'https://example.com/violetindigo.jpg' },
      { name: 'Jean', stage: 'La Prairie', day: 'DIMANCHE 16 JUIN', image: 'https://example.com/jean.jpg' },
      { name: 'La Frappe', stage: 'La Frappe', day: 'DIMANCHE 16 JUIN', image: 'https://example.com/lafrappe.jpg' }
    ]
  }
];

const FestivalScreen = () => {
  const [selectedFestival] = useState(festivalsData[0]);
  const [favoriteArtists, setFavoriteArtists] = useState<Artist[]>([]);
  const [dislikedArtists, setDislikedArtists] = useState<Artist[]>([]);

  const handleSwipeRight = (index: number) => {
    setFavoriteArtists([...favoriteArtists, selectedFestival.artists[index]]);
  };

  const handleSwipeLeft = (index: number) => {
    setDislikedArtists([...dislikedArtists, selectedFestival.artists[index]]);
  };

  const handleAddToFavorites = (artist: Artist) => {
    setFavoriteArtists([...favoriteArtists, artist]);
  };

  const renderCard = (artist: Artist) => (
    <View style={styles.card}>
      <Image source={{ uri: artist.image }} style={styles.artistImage} resizeMode="cover" />
      <TouchableOpacity style={styles.favoriteButton} onPress={() => handleAddToFavorites(artist)}>
        <Text style={styles.favoriteButtonText}>Ajouter aux favoris</Text>
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.artistName}>{artist.name}</Text>
        <Text style={styles.artistDetails}>{artist.stage} - {artist.day}</Text>
      </View>
    </View>
  );

  return (
      <View style={styles.content}>
        <Text style={styles.title}>{selectedFestival.name}</Text>
        <Text style={styles.date}>{selectedFestival.date}</Text>
        <Swiper
          cards={selectedFestival.artists}
          renderCard={renderCard}
          onSwipedRight={handleSwipeRight}
          onSwipedLeft={handleSwipeLeft}
          cardIndex={0}
          backgroundColor={'#f5f5f5'}
          stackSize={3}
          verticalSwipe={false}
          verticalThreshold={0}
        />
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
    paddingVertical: 10,
    paddingHorizontal: 10,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  card: {
    flex: 1,
    marginBottom: 70,
    borderRadius: 8,
    overflow: 'hidden',
  },
  artistImage: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  artistName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  artistDetails: {
    fontSize: 16,
    color: '#fff',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ff6347',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  favoriteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },

});

export default FestivalScreen;