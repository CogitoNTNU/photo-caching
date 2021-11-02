import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
} from "react-native";
import { Camera } from "expo-camera";
const MASK_DIMENSION = 100;
export const CameraView = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [showShutterButton, setShowShutterButton] = useState(false);
  const cameraRef = useRef();
useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
const handlePictureProcessing = async () => {
    goToEvaluationView();
};

const goToEvaluationView = () => {
    console.log('ok');
};

if (hasPermission === null) {
    return <View />;
}

if (hasPermission === false) {
    return <Text> No access to camera </Text>;
}

return (
    <React.Fragment>
      <StatusBar barStyle="light-content" />
      <View style={styles.safeArea}>
        <Camera
          ref={cameraRef}
          type={Camera.Constants.Type.back}
          whiteBalance={Camera.Constants.WhiteBalance.auto}
          onCameraReady={() => setShowShutterButton(true)}>
          <View style={styles.cameraView}>
            {/*<View style={styles.mask} />*/}
            {showShutterButton && (
              <TouchableOpacity
                style={styles.shutterButton}
                onPress={handlePictureProcessing}>
                <Text style={styles.shutterButtonText}>
                  Take a picture
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </Camera>
      </View>
    </React.Fragment>
  );
};
const styles = {
  safeArea: {
    backgroundColor: "#4d089a",
  },
  cameraView: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  mask: {
    height: MASK_DIMENSION,
    width: MASK_DIMENSION,
    borderWidth: 3,
    borderColor: "white",
    borderStyle: "dotted",
    borderRadius: 15,
  },
  shutterButton: {
    position: "absolute",
    bottom: 0,
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 15,
    marginBottom: 20,
  },
  shutterButtonText: {
    fontSize: 18,
    color: "white",
  },
};
CameraView.options = {
  statusBar: {
    backgroundColor: null,
  },
  topBar: {
    title: {
      text: "Take a picture",
      color: "white",
    },
    background: {
      color: "#4d089a",
    },
  },
  tapBar: {
    background: {
      color: "#4d089a",
    },
  },
};

export default CameraView