// import { View, ViewStyle } from "react-native";
// import React from "react";
// import { COLORS } from "../../constants";

// interface DotsViewProps {
//   progress: number;
//   dotSize?: number;
//   dotSpacing?: number;
//   dotColor?: string;
//   activeDotColor?: string;
//   numDots?: number;
// }

// const DotsView: React.FC<DotsViewProps> = ({
//   progress,
//   dotSize = 10,
//   dotSpacing = 5,
//   dotColor = "gray",
//   activeDotColor = COLORS.primary,
//   numDots = 3,
// }) => {
//   const dots = [];

//   for (let i = 0; i < numDots; i++) {
//     const dotStyle: ViewStyle[] = [
//       {
//         borderWidth: 1,
//         borderColor: "transparent",
//         width: dotSize,
//         height: dotSize,
//         borderRadius: dotSize / 2,
//         marginHorizontal: dotSpacing / 2,
//       },
//       progress >= i / (numDots - 1)
//         ? { backgroundColor: activeDotColor }
//         : { backgroundColor: dotColor },
//     ];

//     dots.push(<View key={i} style={dotStyle} />);
//   }

//   return (
//     <View style={{ flexDirection: "row", justifyContent: "center" }}>
//       {dots}
//     </View>
//   );
// };

// export default DotsView;

import { View, ViewStyle } from "react-native";
import React from "react";
import { COLORS } from "../../constants";

interface DotsViewProps {
  progress: number;
  dotSize?: number;
  dotSpacing?: number;
  dotColor?: string;
  activeDotColor?: string;
  numDots?: number;
}

const DotsView: React.FC<DotsViewProps> = ({
  progress,
  dotSize = 10,
  dotSpacing = 5,
  dotColor = "gray",
  activeDotColor = COLORS.primary,
  numDots = 3,
}) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      {Array.from({ length: numDots }).map((_, i) => (
        <View
          key={i}
          style={[
            {
              width: dotSize,
              height: dotSize,
              borderRadius: dotSize / 2,
              marginHorizontal: dotSpacing / 2,
              backgroundColor: i <= progress ? activeDotColor : dotColor, // ✅ Fix: Only color seen dots
            },
          ]}
        />
      ))}
    </View>
  );
};

export default DotsView;
