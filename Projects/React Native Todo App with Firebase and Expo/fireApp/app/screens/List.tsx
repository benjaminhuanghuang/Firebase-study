import { View, Text, Button } from "react-native";
import React from "react";

type Props = {
  navigation: any;
};

const List = ({ navigation }: Props) => {
  return (
    <View>
      <Text>List</Text>
      <Button
        onPress={() => navigation.navigate("Details")}
        title="Go to Details"
      />
    </View>
  );
};

export default List;
