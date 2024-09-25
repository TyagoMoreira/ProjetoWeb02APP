import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function TelaLogin({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Buscar Lutador</Text>
      <Button
        title="ENTRAR"
        color="#007b"
        onPress={() => navigation.navigate("FightFinder")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  welcomeText: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: "center",
  },
});
