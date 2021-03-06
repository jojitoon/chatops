import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import UserRows from './UserRows';
import { joinChat } from '../../store/actions/chat';


class AllUsers extends Component {
state = {
      filter: '',
  }

  static navigationOptions = {
    title: 'Users',
  };

  gotoMessage = (id, name) => this.props.dispatch(joinChat(id, this.props.navigation, name))
  render() {
    const users = (this.props.allUsers && this.props.allUsers[0]) && this.props.allUsers.filter(user => {
      return !this.state.filter || 
        user.username.toLowerCase().indexOf(this.state.filter.toLowerCase()) > -1
    });
    return (
      <View style={{flex: 1, backgroundColor: '#fff', marginTop: 20}}>
        <TextInput 
        style={styles.input} 
        placeholder="Search User"
        onChangeText={
          text => {this.setState({ filter: text });
        }}
        value={this.state.search}
        />
        <KeyboardAwareScrollView style={{margin: 0, padding: 0}}>
        {users ? <FlatList 
          style={{margin: 0, padding: 0}}
          data={users}
          renderItem={({item, index}) => <UserRows user={item} toMessage={() => this.gotoMessage(item.id, item.username)} />}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text style={{alignSelf: 'center', color: '#ccc', fontSize: 18, fontWeight: 'bold', marginTop:20}}>No such user found :(</Text>}
        />: <Text style={{alignSelf: 'center', color: '#ccc', fontSize: 18, fontWeight: 'bold', marginTop:20}}>No user to chat with :( </Text>}
        </KeyboardAwareScrollView>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  head: {
    marginTop: 50,
    marginBottom: 10,
  },
  title: {
    marginTop: 20,
    padding:10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555'
  },
  input: {
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 15,
    color: '#444',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff'

  }
});

const mapStateToProps = (state) => {
  const { allUsers } = state.users;
  return { allUsers }
};

export default connect(mapStateToProps)(AllUsers);