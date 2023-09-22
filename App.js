import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Routes } from "./src/routes";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light"  backgroundColor={"transparent"} barStyle="ligth-content" translucent={true} />
      <Routes />
    </NavigationContainer>
  );
}
