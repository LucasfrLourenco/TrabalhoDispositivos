import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Linking,
} from "react-native";

const Favoritos = ({ route }) => {
  const favoritos = route.params.favoritos || [];

  const handleOpenLink = (url) => {
    Linking.openURL(url)
      .then(() => console.log(`Opened URL: ${url}`))
      .catch((err) => console.error(`Error opening URL: ${url}`, err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Meus Animes Favoritos</Text>
      <FlatList
        data={favoritos}
        keyExtractor={(item) => item.mal_id.toString()}
        horizontal={true}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleOpenLink(item.url)}>
            <View style={styles.animeContainer}>
              <Image
                source={{ uri: item.images.jpg.image_url }}
                style={styles.image}
              />
              <Text style={styles.animeText}>{item.title}</Text>
              <TouchableOpacity onPress={() => handleOpenLink(item.url)}>
                <Text style={styles.animeLink}>{item.url}</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e2157",
  },
  flatListContainer: {
    padding: 10,
  },
  animeContainer: {
    width: 250,
    height: 500,
    marginHorizontal: 5,
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#0112ff",
    borderRadius: 15,
    padding: 30,
    backgroundColor: "#3f3f3f",
  },
  image: {
    width: 150,
    height: 270,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: "#cfcfcf",
  },
  animeText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  animeLink: {
    fontSize: 13,
    fontStyle: "italic",
    fontWeight: "300",
    color: "#000caf",
    padding: 5,
    marginTop: 10,
  },
});

export default Favoritos;
