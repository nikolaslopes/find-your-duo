import { useEffect, useState } from "react";
import { View, Image, FlatList } from "react-native";

import { GameCard } from "../../components/GameCard";
import { Heading } from "../../components/Heading";

import { styles } from "./styles";
import logoImg from "../../assets/images/logo-nlw-esports.png";
import { FetchGameCardsResponseProps } from "../../types/gameCard";

async function fetchGames() {
  const response = await fetch("http://127.0.0.1:3333/games");
  const data: FetchGameCardsResponseProps = await response.json();

  return data;
}

export const Home = () => {
  const [games, setGames] = useState<FetchGameCardsResponseProps>([]);

  async function updateGamesData() {
    const data = await fetchGames();

    setGames(data);
  }

  useEffect(() => {
    updateGamesData();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={logoImg} style={styles.logo} />

      <Heading
        title="Encontre seu duo!"
        subtitle="Selecione o game que deseja jogar..."
      />

      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GameCard data={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentList}
      />
    </View>
  );
};
