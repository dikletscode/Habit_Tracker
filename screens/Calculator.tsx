import React, { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import DisplayResult from "../components/calculator/DisplayResult";
import RenderBox from "../components/calculator/RenderBox";
import style from "./style/calculator";

const Calculator = ({ route }: { route: any }) => {
  const [result, setResult] = useState<string>("");
  const [numbers, setNumbers] = useState<string[]>([]);
  const lastIndex = numbers.length - 1;
  const numsPattern = /\d+/g;

  const handleNumber = (input: number | string) => {
    if (typeof input == "number") {
      setNumbers((prev) => [...prev, input.toString()]);
    } else {
      if (input == "=" && numbers[lastIndex].match(numsPattern)) {
        setResult(eval(numbers.join("")));
      } else if (input == "C") {
        setResult("");
        setNumbers([]);
      } else if (input == "del") {
        setNumbers(numbers.filter((item, index) => index != lastIndex));
      } else {
        if (numbers[lastIndex].match(numsPattern)) {
          if (input == "^") {
            setNumbers((prev) => [...prev, "**"]);
          } else {
            setNumbers((prev) => [...prev, input]);
          }
        }
      }
    }
  };

  const showSteps = () => {
    return numbers.map((item) => (item == "**" ? "^" : item)).join("");
  };

  useEffect(() => {
    if (numbers.length && numbers[lastIndex].match(numsPattern)) {
      setResult(eval(numbers.join("")));
    }
  }, [numbers, lastIndex]);

  return (
    <View style={style.container}>
      <View>
        <>
          <DisplayResult calculate={showSteps()} result={result} />

          <View style={style.numsContainer}>
            <RenderBox action={handleNumber} />
          </View>
        </>
      </View>
    </View>
  );
};
export default Calculator;
