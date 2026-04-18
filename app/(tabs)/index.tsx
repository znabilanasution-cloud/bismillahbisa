import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";

export default function App() {
  const [screen, setScreen] = useState("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^[0-9]{10,}$/.test(phone);
  };

  const handleRegister = () => {
    if (!name || !email || !phone || !password || !confirm) {
      Alert.alert("Error", "Semua field wajib diisi!");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Email tidak valid!");
      return;
    }

    if (!validatePhone(phone)) {
      Alert.alert("Error", "Phone harus angka & min 10 digit!");
      return;
    }

    if (password !== confirm) {
      Alert.alert("Error", "Password tidak sama!");
      return;
    }

    Alert.alert("Success", "Register berhasil!");
    setScreen("home");
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Isi email & password!");
      return;
    }

    setScreen("home");
  };

  const handleReset = () => {
    setScreen("login");
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirm("");
  };

  /* ================= LOGIN ================= */
  if (screen === "login") {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.title}>Login</Text>

          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setScreen("register")}>
            <Text style={styles.link}>Daftar Disini</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  /* ================= REGISTER ================= */
  if (screen === "register") {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.title}>Register</Text>

          <TextInput placeholder="Nama" style={styles.input} value={name} onChangeText={setName} />
          <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
          <TextInput placeholder="Phone" style={styles.input} value={phone} onChangeText={setPhone} keyboardType="numeric" />
          <TextInput placeholder="Password" style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
          <TextInput placeholder="Confirm Password" style={styles.input} secureTextEntry value={confirm} onChangeText={setConfirm} />

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setScreen("login")}>
            <Text style={styles.link}>Kembali ke Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  /* ================= HOME ================= */
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {name || "User"} 🎉</Text>

      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ================= STYLE ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2b2b4d",
    justifyContent: "center",
  },
  scroll: {
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    color: "#e8ff3c",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#b4b4d5",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#7f7f8b",
  },
  button: {
    backgroundColor: "#e8ff3c",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
  link: {
    color: "#3cffa0",
    textAlign: "center",
    marginTop: 15,
  },
});