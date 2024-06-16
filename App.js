import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";

export default function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [userGuess, setUserGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");

  useEffect(() => {
    generateRandomNumber();
  }, []);

  const generateRandomNumber = () => {
    const min = 1;
    const max = 100;
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    setRandomNumber(randomNum);
    setFeedback("");
    setUserGuess("");
  };

  const handleGuess = () => {
    const guess = parseInt(userGuess);
    if (isNaN(guess)) {
      Alert.alert("Invalid input", "Please enter a valid number");
      return;
    }

    if (guess < randomNumber) {
      setFeedback("Too low!");
      setFeedbackType("low");

      setUserGuess("");
    } else if (guess > randomNumber) {
      setFeedback("Too high!");
      setFeedbackType("high");
      setUserGuess("");
    } else {
      setFeedback(
        "Correct! The number was " + randomNumber + ". Starting a new game..."
      );

      setFeedbackType("correct");

      setTimeout(() => {
        generateRandomNumber();
      }, 4000);
    }
  };

  const getFeedbackStyle = () => {
    switch (feedbackType) {
      case "low":
        return styles.feedbackLow;
      case "high":
        return styles.feedbackHigh;
      case "correct":
        return styles.feedbackCorrect;
      default:
        return styles.feedback;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text>Guess a number between 1-100</Text>
        <View style={styles.inputButton}>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={userGuess}
            onChangeText={setUserGuess}
            placeholder="Your number"
          />
          <View style={styles.button}>
            <Button title="Go" color="white" onPress={handleGuess} />
          </View>
        </View>
        <View style={styles.feedbackContainer}>
          {feedback ? <Text style={getFeedbackStyle()}>{feedback}</Text> : null}
        </View>

        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputButton: {
    flex: "row",
  },
  input: {
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    borderRadius: 0,
  },
  feedback: {
    color: "red",
    marginTop: 10,
    fontSize: 18,
  },
  feedbackLow: {
    marginTop: 10,
    fontSize: 16,
    color: "red",
  },
  feedbackHigh: {
    marginTop: 10,
    fontSize: 16,
    color: "orange",
  },
  feedbackCorrect: {
    marginTop: 10,
    fontSize: 16,
    color: "green",
  },
  feedbackContainer: {
    maxWidth: 200,
  },
});
