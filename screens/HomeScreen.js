import React from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  AsyncStorage
} from 'react-native';
import { NavigationActions, } from 'react-navigation'

// import { MonoText } from '../components/StyledText';
import { Login } from '../components/Login';

const navigateAction = NavigationActions.navigate({

  routeName: 'Home',

  params: {},

  action: NavigationActions.navigate({ routeName: 'Links'})
})

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };



  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/images/background.jpg')} style={styles.backgroundImage}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}>

            <View style={styles.welcomeContainer}>
              <Image
                source={require('../assets/images/expo-icon.jpg')}
                style={styles.welcomeImage}/>
            </View>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} onChangeText={(username) => this.setState({username})} value={this.state.username} placeholder="username">

              </TextInput>
              <TextInput secureTextEntry={true} style={styles.input} onChangeText={(password) => this.setState({password})} value={this.state.password} placeholder="password">

              </TextInput>

            </View>

            <TouchableOpacity onPress={this.login} style={styles.buttonContainer}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>

          </ScrollView>
        </Image>
      </View>   );
  }

  constructor(props){
  	super(props);
  	this.state = {username: '', password: ''};
  }

  login = () => {
      fetch('http://172.20.10.6:3000/users', {
        method: 'POST',
          headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state. password,
          })
      })

      .then((response) => response.json())
      .then((res) => {
        if (res.success === true) {
          var username = res.message;
          AsyncStorage.setItem('username', username);
          // AsyncStorage.setItem('password', password);
          alert(username);
          // navigationActions.navigate("Links");




        } else {
          alert(res.message);
        }
      })
      .done();
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // backgroundColor: '#fff',
  },
  backgroundImage: {
    flex: 1,
    alignSelf: "stretch",
    width: null,
    justifyContent: 'center'
  },
  contentContainer: {
    paddingTop: 80,
  },
  welcomeContainer: {
    alignItems: 'center',
    // marginTop: 10,
    // marginBottom: 20,
  },
  welcomeImage: {
    width: 140,
    height: 48,
    // resizeMode: 'contain',
    // marginTop: 3,
    // marginLeft: -10,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  navigationFilename: {
    marginTop: 5,
  },
  inputContainer: {
    margin: 20,
    marginBottom: 0,
    padding: 20,
    paddingBottom: 10,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  input: {
    fontSize: 16,
    height: 40,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  buttonContainer: {
    margin: 20,
    padding: 20,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});
