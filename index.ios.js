/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Navigator
} = React;

/*
var AwesomeProject = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <Text style={styles.instructions}>
            From: Javis Young
        </Text>
      </View>
    );
  }
});
*/

var Button = React.createClass({
    handlePress: function() {
        this.props.onClick();
    },
    render: function() {
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={this.handlePress}>
                    <Text style={styles.button}>{this.props.children}</Text>
                </TouchableHighlight>
            </View>
        );
    }
});

var TestView = React.createClass({
    handleClick: function() {
        var index = this.props.index + 1;
        if (index >= 4) {
            this.props.navigator.push({name: "IM"});
        } else {
            this.props.navigator.push({name: "Scene#" + index, index: index});
        }
    },

    onBack: function() {
        this.props.navigator.pop();
    },

    render: function() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>{this.props.name}</Text>
                <View style={styles.row}>
                    <Button onClick={this.onBack}>back</Button>
                    <Button onClick={this.handleClick}>next</Button>
                </View>
            </View>
        );   
    }
});

var IMView = React.createClass({
    render: function() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>IM View</Text>
            </View>
        );   
    }
});

var AwesomeProject = React.createClass({
  render: function() {
    return (
      <Navigator 
        ref="navigator"
        initialRoute={{name: 'Scene#0', index: 0}}
        renderScene={this.renderScene}
      />
    );
  },

  renderScene: function(route, navigator) {
    console.log(route);

    if (route.name === 'IM') {
        return <IMView/>
    }

    return (
      <TestView navigator={navigator} name={route.name} index={route.index}/>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',

  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    fontSize: 12,
    textAlign: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
