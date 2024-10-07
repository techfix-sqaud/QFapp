import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { TextInput, Button, Card } from "react-native-paper";
import { useRouter } from "expo-router";

const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [Id, setId] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [signUpAsProvider, setSignUpAsProvider] = useState<boolean>(false);
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.cardContent}>
          <Image
            source={require("../../assets/icon.png")}
            style={styles.logo}
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => setSignUpAsProvider(!signUpAsProvider)}
          >
            <Text>sign up as provider?</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(email) => setEmail(email)}
          style={styles.input}
        />
        <TextInput
          label="First Name"
          value={email}
          onChangeText={(email) => setEmail(email)}
          style={styles.input}
        />
        <TextInput
          label="Last Name"
          value={email}
          onChangeText={(email) => setEmail(email)}
          style={styles.input}
        />
        <TextInput
          label="Password"
          value={password}
          secureTextEntry={!showPassword}
          onChangeText={(password) => setPassword(password)}
          right={
            <TextInput.Icon
              icon={showPassword ? "eye-off" : "eye"}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
          style={styles.input}
        />
        {signUpAsProvider && (
          <TextInput
            label="ID"
            value={Id}
            //onChangeText={(password) => setPassword(password)}

            style={styles.input}
          />
        )}
        <Button
          icon="login"
          mode="contained"
          onPress={() => console.log("Pressed")}
          style={styles.button}
        >
          Sign up
        </Button>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    fontColor: "#081c4b",
  },
  card: {
    width: 350,
    padding: 16,
    alignItems: "center",
  },
  cardContent: {
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    width: 110,
    height: 110,
  },
  heading: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: 300,
    marginBottom: 16,
  },
  button: {
    width: 300,
    backgroundColor: "#081c4b",
  },
});

export default SignUp;
