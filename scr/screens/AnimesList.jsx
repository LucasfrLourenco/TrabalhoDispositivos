import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image, Button } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const navigation = useNavigation();

const AnimesList = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Número de itens por página

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.jikan.moe/v4/anime", {
          params: {
            page: currentPage,
            limit: itemsPerPage,
          },
        });
        const animeData = response.data.data;
        setData(animeData);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  const navigateToDetails = (anime) => {
    navigation.navigate("Details", { anime });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Lista de Animes</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.mal_id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToDetails(item)}>
            <View style={styles.animeContainer}>
              <Image
                source={{ uri: item.images.jpg.image_url }}
                style={styles.animeImage}
              />
              <Text style={styles.animeName}>{item.title}</Text>
              <Text style={styles.animeYear}>Ano: {item.year}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <View style={styles.pagination}>
        <Button
          style={styles.paginationButton}
          title="Anterior"
          onPress={() => {
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1);
            }
          }}
        />

        <Text>Página {currentPage}</Text>
        <Button
          style={styles.paginationButton}
          title="Próxima"
          onPress={() => {
            setCurrentPage(currentPage + 1);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a0101",
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    color: "white",
  },
  animeContainer: {
    backgroundColor: "#423a3a",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 5,
    borderRadius: 10,
    padding: 20,
    borderColor: "red",
  },
  animeImage: {
    width: 150,
    height: 270,
    resizeMode: "cover",
  },
  animeName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "white",
  },
  animeYear: {
    fontSize: 16,
    color: "white",
  },
  pagination: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },

  paginationButton: {
    fontSize: 10,
    color: "white",
  },
});

export default AnimesList;
