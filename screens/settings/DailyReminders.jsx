import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DailyReminders = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Daily Reminders</Text>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({});
export default DailyReminders;
