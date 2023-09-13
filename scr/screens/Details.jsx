import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

const Details = ({ route }) => {
  const { anime } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: anime.images.jpg.image_url }}
        style={styles.animeImage}
      />
      <Text style={styles.animeName}>{anime.title}</Text>
      <Text style={styles.animeText}>Ano: {anime.year}</Text>
      <Text style={styles.animeText}>Episódios: {anime.episodes}</Text>
      <Text style={styles.animeText}>Sinopse: {anime.synopsis}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginBottom: 10,
    marginTop: 0,
    backgroundColor: "#0c0f20",
  },
  animeImage: {
    width: 300,
    height: 400,
    resizeMode: "cover",
    marginBottom: 16,
  },
  animeName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "white",
  },
  animeText: {
    fontSize: 18,
    marginBottom: 16,
    color: "white",
  },
  // Outros estilos...
});

export default Details;
