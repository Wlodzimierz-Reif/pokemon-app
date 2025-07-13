import { useRef } from "react";
import { Animated } from "react-native";

const useFadeAnimation = () => {
  const animated = useRef(new Animated.Value(1)).current;

  const fadeIn = () => {
    Animated.timing(animated, {
      toValue: 0.4,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return { animated, fadeIn, fadeOut };
};

export default useFadeAnimation;
