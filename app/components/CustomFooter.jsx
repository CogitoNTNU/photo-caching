import React, { useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import {
  BottomSheetFooter,
  useBottomSheet,
} from '@gorhom/bottom-sheet';
import { RectButton } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { toRad } from 'react-native-redash';

const AnimatedRectButton = Animated.createAnimatedComponent(RectButton);

const CustomFooter = ({ animatedFooterPosition }) => {
  //#region hooks
  // we need the bottom safe insets to avoid bottom notches.
  const { bottom: bottomSafeArea } = useSafeAreaInsets();
  // extract animated index and other functionalities
  const { expand, collapse, animatedIndex } = useBottomSheet();
  //#endregion

  // create the content animated style reacting to the
  // sheet index.
  const containerAnimatedStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(
        animatedIndex.value,
        [-0.85, 0],
        [0, 1],
        Extrapolate.CLAMP
      ),
    }),
    [animatedIndex]
  );
  const containerStyle = useMemo(
    () => [containerAnimatedStyle, styles.container],
    [containerAnimatedStyle]
  );
  //#endregion

  //#region callbacks
  const handleArrowPress = useCallback(() => {
    console.log('ok');
  });
    /*
    // if sheet is collapsed, then we extend it,
    // or the opposite.
    if (animatedIndex.value === 0) {
      expand();
    } else {
      collapse();
    }
  }, [expand, collapse, animatedIndex]);
  //#endregion
*/
  return (
    <BottomSheetFooter
      // we pass the bottom safe inset
      bottomInset={bottomSafeArea}
      // we pass the provided `animatedFooterPosition`
      animatedFooterPosition={animatedFooterPosition}
    >
      <AnimatedRectButton style={containerStyle} onPress={handleArrowPress}>
      <FontAwesome5 name={'camera-retro'} style={styles.icon}/>
        <Animated.Text style={styles.icon}>
            Cache
        </Animated.Text>
      </AnimatedRectButton>
    </BottomSheetFooter>
  );
};

// footer style
const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 24,
    marginBottom: 0,
    width: 200,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#80f',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8.0,

    elevation: 8,
  },
  icon: {
    fontSize: 20,
    height: 20,
    textAlignVertical: 'center',
    fontWeight: '900',
    color: '#fff',
  },
});

export default CustomFooter;