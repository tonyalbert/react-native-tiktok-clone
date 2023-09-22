import { View, StyleSheet, Text, Pressable, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { useRef, useState } from 'react';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

const {height: heightScreen} = Dimensions.get('window');
export const FeedItem = ({ data }) => {
    const video = useRef(null);
    const [status, setStatus] = useState({});

    const [liked, setLiked] = useState(false);

    function likeButton() {
        if (liked) {
            return <Ionicons name="heart" size={35} color="#DC143C" />
        }
            return <Ionicons name="heart" size={35} color="#fff" />
    }

    function handlePlayer() {
        if (status.isPlaying) {
            video.current.pauseAsync();
        } else {
            video.current.playAsync();
        }
    }
    return (
        <Pressable onPress={handlePlayer}>

            <View style={[styles.info, 
                {
                    bottom: 60,
                }]}>
                <Text style={styles.name}>{data?.name}</Text>
                <Text numberOfLines={2} style={styles.description}>{data?.description}</Text>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity onPress={() => setLiked(!liked)}>
                    {likeButton()}
                    <Text style={styles.actionText}>10</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="chatbubble-ellipses" size={35} color="#fff" />
                    <Text style={styles.actionText}>10</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="bookmark" size={35} color="#fff" />
                    <Text style={styles.actionText}>10</Text>
                </TouchableOpacity>
            </View>

            <Video 
            ref={video}
            style={{ width: '100%', height: heightScreen }}
            source={{ uri: data?.video }}
            resizeMode='cover'
            shouldPlay={false}
            isMuted={false}
            isLooping
            onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    info: {
        position: 'absolute',
        zIndex: 99,
        left: 8,
        padding: 8,
    },
    name: {
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 4,
        textShadowColor: 'rgba(0, 0, 0, 0.90)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 8,
    },
    description: {
        color: '#fff',
        marginRight: 14,
        textShadowColor: 'rgba(0, 0, 0, 0.20)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 8
    },
    actions: {
        position: 'absolute',
        zIndex: 99,
        right: 16,
        bottom: Platform.OS === 'android' ? 120 : 170,
        gap: 26,
        shadowOpacity:  0.17,
        shadowRadius: 3.05,
        elevation: 4
    },
    actionText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    }
})
