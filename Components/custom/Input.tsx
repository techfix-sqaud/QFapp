import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Animated,
} from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import { useTheme } from "../../Helpers/theme/ThemeProvider";

interface InputProps {
  id: string;
  icon?: any;
  label?: string;
  editable?: boolean;
  placeholder?: string;
  placeholderTextColor?: string;
  errorText?: string[];
  onInputChanged: (id: string, text: string) => void;
  onChangeText?: (text: string) => void;
  value?: string;
  [key: string]: any;
}

const Input = (props: InputProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { dark } = useTheme();
  const disabled = props.editable !== false;
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChangeText = (text: string) => {
    if (props.onChangeText) {
      props.onChangeText(text);
    }
    props.onInputChanged(props.id, text);
  };

  const labelStyle = {
    top: -10,
    fontSize: 12,
    zIndex: 10,
    color: dark ? COLORS.white : COLORS.primary,
    backgroundColor: dark ? "transparent" : COLORS.white,
  };

  return (
    <View style={[styles.container]}>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: !disabled
              ? COLORS.gray3
              : isFocused
              ? COLORS.primary
              : dark
              ? COLORS.dark2
              : COLORS.greyscale500,
            backgroundColor: !disabled
              ? COLORS.gray3
              : isFocused
              ? COLORS.tansparentPrimary
              : dark
              ? COLORS.dark2
              : COLORS.greyscale500,
          },
        ]}
      >
        {props.icon && (
          <Image
            source={props.icon}
            style={[
              styles.icon,
              {
                tintColor: isFocused ? COLORS.primary : "#BCBCBC",
              },
            ]}
          />
        )}
        <Animated.Text style={[styles.label, labelStyle]}>
          {props.label}
        </Animated.Text>
        <TextInput
          {...props}
          editable={disabled}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          keyboardType={"default"}
          style={[
            styles.input,
            { color: dark ? COLORS.white : COLORS.black },
            !disabled ? styles.disabledInput : styles.input,
          ]}
          placeholder={props.placeholder}
          placeholderTextColor={props.placeholderTextColor}
          autoCapitalize="none"
        />
      </View>
      {props.errorText && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText[0]}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: SIZES.padding,
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 5,
    flexDirection: "row",
    height: 52,
    alignItems: "center",
    position: "relative",
  },
  icon: {
    marginRight: 10,
    height: 20,
    width: 20,
    tintColor: "#BCBCBC",
  },
  label: {
    position: "absolute",
    left: SIZES.padding,
    backgroundColor: "transparent",
    paddingHorizontal: 4,
  },
  input: {
    flex: 1,
    fontFamily: "regular",
    fontSize: 14,
    paddingTop: 0,
    paddingBottom: 0,
  },
  errorContainer: {
    marginVertical: 4,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  disabledInput: {
    backgroundColor: COLORS.gray3,
  },
});

export default Input;
