import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { HeaderRightButton } from "@react-navigation/elements";

const AnimesList = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Número de itens por página
  const [favoritos, setFavoritos] = useState([]); // Estado local para favoritos
  const navigation = useNavigation();

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

  const toggleFavorito = (anime) => {
    if (favoritos.some((item) => item.mal_id === anime.mal_id)) {
      // Se o anime já estiver na lista de favoritos, remova-o
      const novosFavoritos = favoritos.filter(
        (item) => item.mal_id !== anime.mal_id
      );
      setFavoritos(novosFavoritos);
    } else {
      // Caso contrário, adicione-o aos favoritos
      setFavoritos([...favoritos, anime]);
    }
  };

  const navigateToFavoritos = () => {
    // Passar os favoritos para a tela Favoritos ao navegar
    navigation.navigate("Favoritos", { favoritos });
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
            <TouchableOpacity onPress={() => toggleFavorito(item)}>
              <View
                style={[
                  styles.favoriteButton,
                  { flex: 0, alignSelf: "center" },
                ]}
              >
                <Text style={styles.favoriteButtonText}>
                  {favoritos.some((anime) => anime.mal_id === item.mal_id)
                    ? "Remover dos Favoritos"
                    : "Favoritar"}
                </Text>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.favoritesButton}
        onPress={navigateToFavoritos}
      >
        <Text style={styles.favoriteButtonText}>Favoritos</Text>
      </TouchableOpacity>

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
  favoritesButton: {
    backgroundColor: "#0d0e49",
    padding: 15,
    borderRadius: 8,
    marginTop: 16,
  },
  favoriteButton: {
    backgroundColor: "#3d0c0c",
    padding: 12,
    borderRadius: 10,
    marginTop: 0,
    marginBottom: 80,
  },
  favoriteButtonText: {
    fontSize: 18,
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
