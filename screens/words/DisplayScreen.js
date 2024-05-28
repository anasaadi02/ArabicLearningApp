import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { fetchImage } from "./unsplashService";
import wordsData from "./words";

export default function DisplayScreen({ route }) {
  const { letter } = route.params;
  //   const words = wordsData[letter] || [];
  const words = wordsData[letter];
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      const newImages = {};
      for (const word of words) {
        const imageUrl = await fetchImage(word.meaning);
        newImages[word.meaning] = imageUrl;
      }
      setImages(newImages);
      setLoading(false);
    };

    loadImages();
  }, [letter]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {loading ? (
        <ActivityIndicator size="large" color="orange" />
      ) : (
        <>
          <Image source={{ uri: images[item.meaning] }} style={styles.image} />
          <Text style={styles.wordText}>{item.word}</Text>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Words for "{letter}"</Text>
      <FlatList
        data={words}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  itemContainer: {
    marginBottom: 16,
    alignItems: "center",
  },
  wordText: {
    fontSize: 18,
    marginBottom: 8,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    borderColor: "orange",
    borderWidth: 2,
  },
});
