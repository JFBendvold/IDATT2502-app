import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faArrowRight, faStickyNote, faTrash, faBottleWater, faWineGlass } from '@fortawesome/free-solid-svg-icons';
import info from '../../utils/info.json';

const window = Dimensions.get('window');

function ResultScreen({ navigation, route }) {
    const [data, setData] = useState([]); // [ { class: '...', probability: 0.0, image: '...' }, ... ]
    const [image, setImage] = useState(null);
    const [num, setNum] = useState(0); // Index of the image to display in data[num]
    const [total, setTotal] = useState(0); // Total number of images in data[]
    const [category, setCategory] = useState(null); // Category of the image in data[num]
    const [probability, setProbability] = useState(0.0); // Probability of the image in data[num]
    const [description, setDescription] = useState(null); // Description of the category in data[num]
    const [recyclingGuide, setRecyclingGuide] = useState(null); // Recycling guide of the category in data[num]
    const [icon, setIcon] = useState(faTrash); // Icon of the category in data[num]

    // Calculate the dimensions of the screen and image
    const screenWidth = window.width;
    const screenHeight = window.height;

    // Since the image will be rotated 90 degrees, the width and height are swapped
    const rotatedWidth = screenHeight;
    const rotatedHeight = screenWidth;

    useEffect(() => {
        const data = route.params.data;
        data.forEach((item) => {
            item.image = "data:image/jpeg;base64," + item.image;
        });

        // Change position of the first image to the end of the array
        const firstImage = data.shift();
        data.push(firstImage);

        setData(data);
        setTotal(data.length-1); // Last image is the original image

        setImage(data[0].image);
        setCategory(data[0].class.toUpperCase());
        setProbability(data[0].probability.toFixed(2));
        setDescription(info.materials[data[0].class].description);
        setRecyclingGuide(info.materials[data[0].class].recyclingGuide);
        setIcon(findIcon(data[0].class));
    }, []);

    function next() {
        if (num < total) {
            setNum(num+1);
            setImage(data[num+1].image);
            setInfo(num+1);
        }
    }

    function previous() {
        if (num > 0) {
            setNum(num-1);
            setImage(data[num-1].image);
            setInfo(num-1);
        }
    }

    function setInfo(num) {
        setCategory(data[num].class.toUpperCase());
        setProbability(data[num].probability.toFixed(2));
        setDescription(info.materials[data[num].class].description);
        setRecyclingGuide(info.materials[data[num].class].recyclingGuide);
        setIcon(findIcon(data[num].class));
    }

    function findIcon(category) {
        if (category === "cardboard" || category === "paper") {
            return faStickyNote;
        }
        else if (category === "plastic") {
            return faBottleWater;
        }
        else if (category === "glass") {
            return faWineGlass;
        }
        else {
            return faTrash;
        }
    }

    return (
        
    <View style={styles.container}>
        <Image
                source={{ uri: image }}
                style={[styles.image, {
                    /*
                    width: rotatedHeight,
                    height: rotatedHeight,
                    */
                    transform: [{ rotate: '90deg' }],
                }]}
            />
        <View style={styles.infoContainer}>
            <View style={styles.probabilityContainer}>
                <FontAwesomeIcon icon={icon} size={28} color="#073B4C" />
                <Text style={styles.probabilityText}>{category} {probability}%</Text>
            </View>
            <ScrollView style={styles.scrollView}>
            <Text style={{ color: '#FDFEFE', fontSize: 24, fontWeight: 'bold', margin: 10 }}>Description</Text>
            <Text style={{ color: '#FDFEFE', fontSize: 18, margin: 10 }}>{description}</Text>
            <Text style={{ color: '#FDFEFE', fontSize: 24, fontWeight: 'bold', margin: 10 }}>Recycling Guide</Text>
            <Text style={{ color: '#FDFEFE', fontSize: 18, margin: 10, paddingBottom: 100 }}>{recyclingGuide}</Text>
            </ScrollView>
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={previous} style={styles.button}>
                <View style={styles.buttonIconContainer}>
                    <FontAwesomeIcon icon={faArrowLeft} size={28} color="#073B4C" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={next} style={styles.button}>
                <View style={styles.buttonIconContainer}>
                    <FontAwesomeIcon icon={faArrowRight} size={28} color="#073B4C" />
                </View>
            </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#06D6A0',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
    },
    image: {
        flex: 1,
        width: '100%',
        resizeMode: 'contain',
    },
    infoContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    probabilityContainer: {
        backgroundColor: '#FDFEFE',
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
        position: 'absolute',
        top: -50,
    },
    probabilityText: {
        color: '#073B4C',
        fontSize: 24,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        position: 'absolute',
        bottom: 20,
    },
    button: {
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        padding: 20,
    },
    buttonIconContainer: {
        backgroundColor: '#FDFEFE',
        padding: 10,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    scrollView: {
        flex: 1,
        margin: 10,
        backgroundColor: '#06D6A0',
    },
});

export default ResultScreen;
