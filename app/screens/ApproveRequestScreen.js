import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import ItemSeperator from '../components/ItemSeperator';

import ApproveRequestItem from './../components/ApproveRequestItem';
import apiClient from './../api/client';
import AuthContext from '../context/AuthContext';

function ApproveRequestScreen() {
  const [requests, setRequests] = useState([]);
  const [text, setText] = useState(false);

  const {user} = useContext(AuthContext);

  const getRequests = async () => {
    try {
      const response = await apiClient.get(`/request/${user.user_id}`);

      setRequests(response.data.allRequests);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  const approveRequest = async join_id => {
    try {
      await apiClient.patch(`/approve/${join_id}`);
      setText(text => ({
        ...text,
        [join_id]: !text[join_id],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={requests}
        keyExtractor={request => request.join_id.toString()}
        renderItem={({item}) => (
          <ApproveRequestItem
            join_id={item.join_id}
            name={item.joined_firstname}
            message={item.message}
            groupName={item.joined_group_name}
            requested_user_id={item.joined_user_id}
            approveRequest={() => approveRequest(item.join_id)}
            text={text[item.join_id]}
          />
        )}
        ItemSeparatorComponent={ItemSeperator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default ApproveRequestScreen;
