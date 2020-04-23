import React, {useState} from 'react';
import {View} from 'react-native';
import {useActionSheet} from '@expo/react-native-action-sheet';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import i18n from 'i18n-js';

const MAX_IMAGE_HEIGHT = 6000;

function PhotoUpload(props) {
  const {showActionSheetWithOptions} = useActionSheet();
  const [image, setImage] = useState(null);

  const askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };

  const resizeImage = async image => {
    return await ImageManipulator.manipulateAsync(image.uri, [
      {resize: {height: MAX_IMAGE_HEIGHT}},
    ]);
  };

  const launchCamera = async () => {
    await askPermissionsAsync();

    let result = await ImagePicker.launchCameraAsync({
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      const newImage =
        result.height > MAX_IMAGE_HEIGHT ? await resizeImage(result) : result;

      setImage(newImage.uri);
      addImage(newImage);
    }
  };

  const launchLibrary = async () => {
    await askPermissionsAsync();

    let result = await ImagePicker.launchImageLibraryAsync({
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      const newImage =
        result.height > MAX_IMAGE_HEIGHT ? await resizeImage(result) : result;

      setImage(newImage.uri);
      addImage(newImage);
    }
  };

  const addImage = newImage => {
    props.onAddImage(newImage.uri);
  };

  const _onOpenActionSheet = () => {
    const options = ['CANCEL', 'From Library', 'From Camera'];
    const cancelButtonIndex = 0;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 1:
            launchLibrary();
            break;
          case 2:
            launchCamera();
            break;
        }
      },
    );
  };

  return (
    <View>
      {React.Children.map(props.children, (child, i) => {
        return React.cloneElement(child, {onPress: () => _onOpenActionSheet()});
      })}
    </View>
  );
}

export default PhotoUpload;
