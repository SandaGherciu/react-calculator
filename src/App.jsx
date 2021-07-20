import React, { useState } from "react";
import Button from "./components/button";
import BoxContainer from "./components/boxContainer";
import ToggleButton from "./components/toggleButton";
import ButtonsContainer from "./components/buttonsContainer";
import DisplayContainer from "./components/displayContainer";
import ButtonsRow from "./components/buttonsRow";

function App() {
  const [previousVal, setPreviousVal] = useState(0);
  const [currentVal, setCurrentValue] = useState(0);
  const [operator, setOperator] = useState("");
  const [themeToggle, setThemeToggle] = useState(false);

  const handleChange = (event) => {
    setCurrentValue(event.target.value);
  };

  const handleNumber = (event) => {
    if (currentVal.toString().length < 15) {
      setCurrentValue((v) => {
        const newVal = v + event.target.value;

        return newVal.replace(/^0+/, "") || "0";
      });
    }
  };

  const handleToggle = () => {
    setThemeToggle((t) => !t);
  };

  const handleClear = () => {
    setCurrentValue(0);
  };

  const handleAllClear = () => {
    setPreviousVal(0);
    setOperator("");
    setCurrentValue(0);
  };

  const handlePositiveNegative = () => {
    setCurrentValue((v) => -v);
  };

  const handlePercentage = () => {
    setCurrentValue((previousVal * currentVal) / 100);
  };

  const handleOperators = (event) => {
    const { value } = event.target;
    if (previousVal) {
      if (/\s[+\-=/]\s/g.test(previousVal)) {
        setPreviousVal(currentVal);
      } else {
        const evaluationResult = calculate[operator](
          Number(previousVal),
          Number(currentVal)
        );
        setPreviousVal(evaluationResult);
      }
    } else {
      setPreviousVal(currentVal);
    }
    setOperator(value);
    setCurrentValue(0);
  };

  const handleEvaluate = () => {
    if (operator) {
      const evaluationResult = calculate[operator](
        Number(previousVal),
        Number(currentVal)
      );

      setPreviousVal(`${previousVal} ${operator} ${currentVal}`);
      setOperator("");
      setCurrentValue(evaluationResult);
    } else {
      setPreviousVal(0);
      setCurrentValue((v) => v);
    }
  };

  const handleDecimalPoint = (event) => {
    const { value } = event.target;
    if (/\./g.test(currentVal)) return;
    if (value === 0) {
      setCurrentValue((v) => v.toString() + "0");
    }
    setCurrentValue((v) => v + value);
  };

  const handleDelete = () => {
    setCurrentValue((v) => v.slice(0, -1) || "0");
  };

  const arr = [
    [
      currentVal
        ? {
            id: "clear",
            value: "C",
            onClick: handleClear,
          }
        : {
            id: "all-clear",
            value: "AC",
            onClick: handleAllClear,
          },
      {
        id: "plus-minus",
        symbol: "\u00B1",
        onClick: handlePositiveNegative,
      },
      {
        id: "percentage",
        symbol: "\u0025",
        onClick: handlePercentage,
      },
      {
        id: "divide",
        className: "operations",
        value: "/",
        symbol: "\u00F7",
        onClick: handleOperators,
      },
    ],
    [
      {
        id: "seven",
        className: "numbers",
        value: "7",
        onClick: handleNumber,
      },
      {
        id: "eight",
        className: "numbers",
        value: "8",
        onClick: handleNumber,
      },
      {
        id: "nine",
        className: "numbers",
        value: "9",
        onClick: handleNumber,
      },
      {
        id: "multiply",
        className: "operations",
        value: "*",
        symbol: "\u00D7",
        onClick: handleOperators,
      },
    ],
    [
      {
        id: "four",
        className: "numbers",
        value: "4",
        onClick: handleNumber,
      },
      {
        id: "five",
        className: "numbers",
        value: "5",
        onClick: handleNumber,
      },
      {
        id: "six",
        className: "numbers",
        value: "6",
        onClick: handleNumber,
      },
      {
        id: "subtract",
        className: "operations",
        value: "-",
        symbol: "\u0082",
        onClick: handleOperators,
      },
    ],
    [
      {
        id: "one",
        className: "numbers",
        value: "1",
        onClick: handleNumber,
      },
      {
        id: "two",
        className: "numbers",
        value: "2",
        onClick: handleNumber,
      },
      {
        id: "three",
        className: "numbers",
        value: "3",
        onClick: handleNumber,
      },
      {
        id: "add",
        className: "operations",
        value: "+",
        symbol: "\u002B",
        onClick: handleOperators,
      },
    ],
    [
      {
        id: "delete",
        symbol: "\u232B",
        onClick: handleDelete,
      },
      {
        id: "zero",
        className: "numbers",
        value: "0",
        onClick: handleNumber,
      },
      {
        id: "decimal-point",
        className: "numbers",
        value: ".",
        onClick: handleDecimalPoint,
      },
      {
        id: "equals",
        symbol: "\u003D",
        onClick: handleEvaluate,
      },
    ],
  ];

  return (
    <div className="App">
      <BoxContainer id="container" hasLightTheme={themeToggle}>
        <div id="toggle-button">
          <ToggleButton
            hasLightTheme={themeToggle}
            className={`toggles`}
            onClick={handleToggle}
          >
            {themeToggle ? "\u263e" : "\u263c"}
          </ToggleButton>
        </div>

        <DisplayContainer>
          <div onChange={handleChange}>
            <p style={{ "font-size": "16px" }}>
              {previousVal} {operator}
            </p>
          </div>
          <div onChange={handleChange}>{currentVal}</div>
        </DisplayContainer>

        <ButtonsContainer>
          {arr.map((list, i) => (
            <ButtonsRow key={i}>
              {list.map(({ symbol, ...props }) => (
                <Button
                  key={props.id}
                  {...props}
                  hasLightTheme={themeToggle}
                  style={styles[props.id]}
                >
                  {symbol || props.value}
                </Button>
              ))}
            </ButtonsRow>
          ))}
        </ButtonsContainer>
      </BoxContainer>
    </div>
  );
}

const calculate = {
  "+": (previousVal, currentVal) => previousVal + currentVal,
  "-": (previousVal, currentVal) => previousVal - currentVal,
  "*": (previousVal, currentVal) => previousVal * currentVal,
  "/": (previousVal, currentVal) => previousVal / currentVal,
};

const styles = {
  "all-clear": { "border-radius": "16px 0 0 0", color: "#d97543" },
  clear: { "border-radius": "16px 0 0 0", color: "#d97543" },
  "plus-minus": { color: "#d97543" },
  percentage: { color: "#d97543" },
  divide: { "border-radius": "0 16px 0 0", color: "#d97543" },
  multiply: { color: "#d97543" },
  subtract: { color: "#d97543" },
  add: { color: "#d97543" },
  equals: {
    "border-radius": "0 0 16px 0",
    "background-color": "#d97543",
    "font-size": "24px",
  },
  delete: { "border-radius": "0 0 0 16px" },
};

export default App;
