import React, {useContext, useState, useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import ApproveRequestItem from '../components/ApproveRequestItem';
import ItemSeperator from '../components/ItemSeperator';
import AuthContext from '../context/AuthContext';
import apiClient from './../api/client';

function FollowRequests() {
  const [followRequests, setFollowRequests] = useState([]);
  const [accepted, setAccepted] = useState(false);

  const {user} = useContext(AuthContext);

  const getFollowRequests = async () => {
    try {
      const response = await apiClient.get(`/follow_request/${user.user_id}`);
      setFollowRequests(response.data.allRequests);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFollowRequests();
  }, []);

  const acceptFollowRequest = follow_id => {
    console.log(follow_id);
    setAccepted(accepted => ({
      ...accepted,
      [follow_id]: !accepted[follow_id],
    }));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={followRequests}
        keyExtractor={followRequest => followRequest.follow_id.toString()}
        renderItem={({item}) => (
          <ApproveRequestItem
            name={item.follow_firstname}
            requested_user_id={item.follow_user_id}
            acceptFollowRequest={() => acceptFollowRequest(item.follow_id)}
            accepted={accepted[item.follow_id]}
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
export default FollowRequests;
