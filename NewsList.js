import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
import axios from 'axios';
import Timer from './Timer';
const NewsList = () => {
  const [loading, setLoading] = useState(true);
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    fetchNewsData();
  }, []);

  const fetchNewsData = async () => {
    try {
      console.log('Making API request...');
      const response = await axios.get(
        'https://stagingsite.livelaw.in/dev/h-api/news',
        {
          headers: {
            's-id':
              'CKEY0F1HNJGSZHJFQPYB5HBMJEM79K26YQDJTY0RX7MVPHGHXTKALSTVARSDAYKUGF2Y',
          },
        },
      );
      setNewsData(response.data.news);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={newsData}
        // keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <View
            style={{
              top: 50,
             marginBottom:10,
              padding: 31,
              borderWidth: 5,
              borderColor: 'black',
              borderRadius: 31,
            }}>
            {/* {console.log("API response:", item)} */}

            <View style={{}}>
              {item.mediaId ? (
                <Image
                  source={{uri: item.mediaId}}
                  style={{width: 300, height: 250}}
                />
              ) : (
                <Image
                  source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
                  style={{width: 300, height: 250}}
                />
              )}
              <View style={{flexDirection: 'column'}}>
                <Text style={{fontWeight: 'bold'}}>
                  description:{item.description}/
                </Text>

                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
                    style={{width: 50, height: 50}}
                  />

                  <Text style={{top: 13, left: 5}}>{item.authorName}</Text>
                </View>
              </View>
            </View>
            <Text style={{left: 163}}>
              <Timer providedTime={item.date_news} />
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
  },
});

export default NewsList;
