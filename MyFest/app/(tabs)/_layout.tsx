import { Tabs } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons'; 

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: 'white', // Couleur du texte actif en blanc
          tabBarInactiveTintColor: 'white', // Couleur du texte inactif en blanc
          headerShown: false,
          tabBarStyle: {
            backgroundColor: 'transparent', // Fond transparent pour voir la vague en arrière-plan
            borderTopColor: 'transparent', // Supprimer la bordure supérieure
          },
          tabBarLabelStyle: {
            fontSize: 14, // Taille de la police
            fontWeight: 'bold', // Gras
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Accueil', // Nom de l'onglet
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} /> // Icône de plage
            ),
          }}
        />
        <Tabs.Screen
          name="concerts"
          options={{
            title: 'Concerts', // Nom de l'onglet
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Favoris', // Nom de l'onglet
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'star' : 'star-outline'} color={color} /> // Icône de cocktail
            ),
          }}
        />
      </Tabs>
      <View style={styles.wave}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  wave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150, // Hauteur de la vague
    backgroundColor: '#ff6347', // Fond blanc pour la vague
    borderTopLeftRadius: 100, // Angle arrondi supérieur gauche
    borderTopRightRadius: 100, // Angle arrondi supérieur droit
    zIndex: -1, // Mettre la vague en arrière-plan
  },
});
