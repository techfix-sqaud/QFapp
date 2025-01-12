import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  LayoutAnimation,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { useTheme } from "../../Helpers/theme/ThemeProvider";
import { faqKeywords, faqs } from "../../Helpers/data";
import { COLORS, icons } from "../../constants";

const FAQ = () => {
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<number>(-1);
  const [searchText, setSearchText] = useState<string>("");
  const { dark } = useTheme();

  const handleKeywordPress = (id: string) => {
    setSelectedKeywords((prevSelectedKeywords) => {
      const selectedKeyword = faqKeywords.find((keyword) => keyword.id === id);
      if (!selectedKeyword) return prevSelectedKeywords;

      if (prevSelectedKeywords.includes(selectedKeyword.name)) {
        return prevSelectedKeywords.filter(
          (keyword) => keyword !== selectedKeyword.name
        );
      } else {
        return [...prevSelectedKeywords, selectedKeyword.name];
      }
    });
  };

  const toggleExpand = (index: number): void => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prevExpanded) => (prevExpanded === index ? -1 : index));
  };

  return (
    <View>
      <View style={styles.keywordsContainer}>
        <FlatList
          data={faqKeywords}
          horizontal
          keyExtractor={(item) => item?.id?.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.keywordItem,
                {
                  backgroundColor: selectedKeywords.includes(item.name)
                    ? COLORS.primary
                    : "transparent",
                  borderColor: COLORS.primary,
                },
              ]}
              onPress={() => handleKeywordPress(item.id)}
            >
              <Text
                style={{
                  color: selectedKeywords.includes(item.name)
                    ? COLORS.white
                    : COLORS.primary,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View
        style={[
          styles.searchBar,
          { backgroundColor: dark ? COLORS.dark2 : COLORS.grayscale100 },
        ]}
      >
        <TouchableOpacity>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchIcon}
          />
        </TouchableOpacity>
        <TextInput
          style={[
            styles.input,
            { color: dark ? COLORS.greyscale600 : COLORS.grayscale400 },
          ]}
          placeholder="Search"
          placeholderTextColor={
            dark ? COLORS.greyscale600 : COLORS.grayscale400
          }
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {faqs
          .filter(
            (faq) =>
              selectedKeywords.length === 0 ||
              selectedKeywords.includes(faq?.type)
          )
          .filter((faq) =>
            faq.question.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((faq, index) => (
            <View
              key={index}
              style={[
                styles.faqContainer,
                { backgroundColor: dark ? COLORS.dark2 : COLORS.grayscale100 },
              ]}
            >
              <TouchableOpacity onPress={() => toggleExpand(index)}>
                <View style={styles.questionContainer}>
                  <Text
                    style={[
                      styles.questionText,
                      { color: dark ? COLORS.white : COLORS.black },
                    ]}
                  >
                    {faq.question}
                  </Text>
                  <Text
                    style={[
                      styles.iconText,
                      { color: dark ? COLORS.white : COLORS.black },
                    ]}
                  >
                    {expanded === index ? "-" : "+"}
                  </Text>
                </View>
              </TouchableOpacity>
              {expanded === index && (
                <Text
                  style={[
                    styles.answerText,
                    { color: dark ? COLORS.secondaryWhite : COLORS.gray2 },
                  ]}
                >
                  {faq.answer}
                </Text>
              )}
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  keywordsContainer: { marginVertical: 16 },
  keywordItem: {
    paddingHorizontal: 14,
    marginHorizontal: 5,
    borderRadius: 21,
    height: 39,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderRadius: 16,
    height: 56,
    marginVertical: 16,
  },
  searchIcon: { width: 24, height: 24, marginRight: 10 },
  input: { flex: 1 },
  scrollContainer: { marginVertical: 22 },
  faqContainer: { marginBottom: 20, borderRadius: 8, padding: 16 },
  questionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  questionText: { fontSize: 16, fontWeight: "600" },
  iconText: { fontSize: 18 },
  answerText: { marginTop: 10, fontSize: 14 },
});

export default FAQ;
