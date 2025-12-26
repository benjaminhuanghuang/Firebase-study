import { View, Text, Button, TextInput } from "react-native";
import React, { useEffect } from "react";
import { db } from "../../firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";

type Props = {
  navigation: any;
};

const List = ({ navigation }: Props) => {
  const [todos, setTodos] = React.useState<
    Array<{ id: string; title: string; completed: boolean }>
  >([]);
  const [todo, setTodo] = React.useState<string>("");
  useEffect(() => {
    // console.log("List component mounted");
  }, []);

  const addTodo = async () => {
    try {
      const docRef = await addDoc(collection(db, "todos"), {
        title: todo,
        completed: false,
      });
      setTodo("");
    } catch (e) {
      console.error("Error adding document ");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Enter todo title"
          onChangeText={(text) => {
            setTodo(text);
          }}
          value={todo}
        />
        <Button onPress={addTodo} title="Add Todo" disabled={todo === ""} />
      </View>
    </View>
  );
};

export default List;

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    flex: 1,
  },
};
