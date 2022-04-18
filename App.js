import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import formatTime from 'minutes-seconds-milliseconds';
const App = () => {
  const [intervalID, setIntervalID = useState({});
  const [state, setState] = useState({
    timeElapsed: null,
    running: false,
    startTime: null,
    laps: [],
  });
  const laps = () => {
    return state.laps.map((time, index) => {
      return (
        <View key={index} style={styles.lap}>
          <Text style={styles.lapText}>Lap#{index + 1}</Text>
          <Text style={styles.lapText}>{formatTime(time)}</Text>
        </View>
      );
    });
  };
  const handleStartPress = () => {
    if (state.running) {
      clearInterval(intervalID);
      setState({...state, running: false});
      return;
    }
    setState({...state, startTime: new Date()});
    let interval = setInterval(() => {
      setState(prevState => ({
        ...prevState,
        timeElapsed: new Date() - prevState.startTime,
        running: true,
      }));
    }, 30);
    setIntervalID(interval);
  };
  const handleLapPress = () => {
    let lap = state.timeElapsed;
    setState(prevState => ({
      ...prevState,
      startTime: new Date(),
      laps: [...prevState.laps, lap],
    }));
  };
  const switchStartStopButton = () => {
    let styleButton = state.running ? styles.stopButton : styles.startButton;
    return (
      <TouchableOpacity
        onPress={handleStartPress}
        style={[styles.button, styleButton]}>
        <Text style={styles.buttonText}>
          {state.running ? 'Stop' : 'Start'}
        </Text>
      </TouchableOpacity>
    );
  };
  const lapDisplay = () => {
    return (
      <TouchableOpacity onPress={handleLapPress} style={styles.button}>
        <Text style={styles.buttonText}>Lap</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.timeWrapper}>
          <Text style={styles.timeText}>{formatTime(state.timeElapsed)}</Text>
        </View>
        <View style={styles.buttonContainer}>
          {lapDisplay()}
          {switchStartStopButton()}
        </View>
      </View>
      <ScrollView style={styles.footer}>{laps()}</ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  timeWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flex: 1,
  },
  footer: {
    flex: 1,
  },
  buttonContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: 'orange',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  timeText: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  lap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'lightgray',
    padding: 10,
    marginTop: 20,
  },
  lapText: {
    fontSize: 30,
  },
  startButton: {
    backgroundColor: 'green',
  },
  stopButton: {
    backgroundColor: 'red',
  },
});
export default App;
