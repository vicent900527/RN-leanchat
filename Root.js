'use strict';

var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Text,
  ListView,
  View,
  TouchableHighlight,
  Navigator,
  NativeModules
} = React;

var SpringBoard = NativeModules.SpringBoard;

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

var ListViewWrapper = React.createClass({
    
    getInitialState: function() {
      this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      return {
        dataSource: this.ds.cloneWithRows([])
      };
    },

    componentDidMount: function() {
        this.loadItems();
    },

    handleItemClick: function(data) {
        this.props.navigator.push({
            name: "item",
            id: data.id,
            content: data.content
        });
    },

    renderRow: function(rowData) {
        return (
            <Button onClick={this.handleItemClick.bind(this, rowData)}>{rowData.content}#{rowData.id}</Button>
        );
    },

    loadItems: function() {
        fetch("https://api.leancloud.cn/1.1/classes/Post", {
            headers: {
                'Content-Type': 'application/json',
                'X-LC-Id': 'g1ivNRWAeYITzaQ5txkjG8IP',
                'X-LC-Key': 'xk1Sow3X9lkfvC4p2Nlflpx2',
            }
        }).then(function(response) {
            var data = JSON.parse(response._bodyInit);
            var dataSource = this.ds.cloneWithRows(data.results);
            this.setState({
                dataSource: dataSource
            });
        }.bind(this), function() {
            console.error("fail");
        });
    },

    addItem: function() {
        fetch("https://api.leancloud.cn/1.1/classes/Post", {
            method: "POST",
            headers: {
                'X-LC-Id': 'g1ivNRWAeYITzaQ5txkjG8IP',
                'X-LC-Key': 'xk1Sow3X9lkfvC4p2Nlflpx2',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: "hello",
                id: Math.ceil(Math.random() * 10000)
            })
        }).then(function() {
            this.loadItems();
        }.bind(this), function() {
            console.error("fail");
        });
    },
    
    render: function() {
      return (
        <View style={styles.container}>
            <View style={styles.list}>
                <ListView
                  dataSource={this.state.dataSource}
                  renderRow={this.renderRow}
                />
            </View>
            <Button onClick={this.addItem} style={styles.toolbar}>添加</Button>
        </View>
      );
    }
});

var TestView = React.createClass({
    handleClick: function() {
        var index = this.props.index + 1;
        if (index >= 4) {
            SpringBoard.gotoIM(function() {});
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

var LaunchView = React.createClass({
    gotoList: function() {
        var index = 1;
        this.props.navigator.push({name: "list"});
    },

    gotoIM: function() {
        console.log('goto IM');
        SpringBoard.gotoIM(function() {
            console.log('goto IM', 'done!');
        });
    },

    render: function() {
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <Button onClick={this.gotoList}>List</Button>
                    <Button onClick={this.gotoIM}>IM</Button>
                </View>
            </View>
        );   
    }
});


var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';

var LaunchView = React.createClass({
  statics: {
    title: '<TabBarIOS>',
    description: 'Tab-based navigation.',
  },

  displayName: 'TabBarExample',

  getInitialState: function() {
    return {
      selectedTab: 'blueTab',
      notifCount: 0,
      presses: 0,
    };
  },

  _renderContent: function(color: string, pageText: string, num?: number) {
    return (
      <View style={[styles.tabContent, {backgroundColor: color}]}>
        <Text style={styles.tabText}>{pageText}</Text>
        <Text style={styles.tabText}>{num} re-renders of the {pageText}</Text>
        <Button style={styles.button} onCllik={this.test}>test leancloud</Button>
      </View>
    );
  },

  _renderList: function() {
    return (<ListViewWrapper navigator={this.props.navigator}/>);
  },

  render: function() {
    return (
    <TabBarIOS
      tintColor="white"
      barTintColor="darkslateblue">
      <TabBarIOS.Item
        title="Blue Tab"
        icon={{uri: base64Icon, scale: 3}}
        selected={this.state.selectedTab === 'blueTab'}
        onPress={() => {
          this.setState({
            selectedTab: 'blueTab',
          });
        }}>
        {this._renderList()}
      </TabBarIOS.Item>
      <TabBarIOS.Item
        systemIcon="more"
        selected={this.state.selectedTab === 'greenTab'}
        onPress={() => {
          SpringBoard.gotoIM(function(){});
        }}>
          {this._renderContent('#21551C', 'Green Tab', this.state.presses)}
        </TabBarIOS.Item>
      </TabBarIOS>
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

var Root = React.createClass({
  render: function() {
    return (
      <Navigator 
        ref="navigator"
        initialRoute={{name: 'launch', index: 0}}
        renderScene={this.renderScene}
      />
    );
  },

  renderScene: function(route, navigator) {
    console.log(route);

    if (route.name === 'list') {
        return <ListViewWrapper navigator={navigator}/>
    }

    if (route.name === 'item') {
        return (
            <View style={styles.container}><Text>Item#{route.id}</Text></View>
        );
    }

    if (route.name === 'launch') {
        return <LaunchView navigator={navigator}/>
    }

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
  list: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',

  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F5FCFF',

  },
  toolbar: {
    padding: 12,
    backgroundColor: '#F5FCFF',
    height: 50
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
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});

//AppRegistry.registerComponent('AwesomeProject', () => Root);

module.exports = Root;

