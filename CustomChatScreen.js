import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";

const CustomChatScreen = ({
  initialMessages = [],
  placeholderText = "Type a message...",
  sendButtonText = "Send",
  chatBackgroundColor = "#f5f5f5",
  userMessageStyle = {},
  containerStyle = {},
  onSendMessage,
}) => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState("");

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage = { id: messages.length + 1, text: inputText };
      setMessages([...messages, newMessage]);
      setInputText("");

      if (onSendMessage) {
        onSendMessage(newMessage);
      }
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: chatBackgroundColor }, containerStyle]}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={[styles.message, userMessageStyle]}>{item.text}</Text>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder={placeholderText}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendText}>{sendButtonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  message: {
    padding: 10,
    backgroundColor: "#4caf50",
    color: "white",
    marginVertical: 5,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ddd",
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  sendButton: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#2196F3",
    borderRadius: 20,
  },
  sendText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CustomChatScreen;
