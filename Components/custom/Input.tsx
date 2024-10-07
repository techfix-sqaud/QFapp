import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import { useTheme } from "../../Helpers/theme/ThemeProvider";

interface InputProps {
  id: string;
  icon?: any;
  placeholder?: string;
  placeholderTextColor?: string;
  errorText?: string[];
  onInputChanged: (id: string, text: string) => void;
  onChangeText?: (text: string) => void;
  [key: string]: any;
}

const Input = (props: InputProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { dark } = useTheme();

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

  return (
    <View style={[styles.container]}>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: isFocused
              ? COLORS.primary
              : dark
              ? COLORS.dark2
              : COLORS.greyscale500,
            backgroundColor: isFocused
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
        <TextInput
          {...props}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={[styles.input, { color: dark ? COLORS.white : COLORS.black }]}
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
    paddingVertical: SIZES.padding2,
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 5,
    flexDirection: "row",
    height: 52,
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
    height: 20,
    width: 20,
    tintColor: "#BCBCBC",
  },
  input: {
    color: COLORS.black,
    flex: 1,
    fontFamily: "regular",
    fontSize: 14,
    paddingTop: 0,
  },
  errorContainer: {
    marginVertical: 4,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
});

export default Input;
