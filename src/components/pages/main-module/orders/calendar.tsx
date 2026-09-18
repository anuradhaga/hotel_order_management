"use client";
import React, { useState, useEffect } from "react";

const Calculator: React.FC = () => {
  const [value, setValue] = useState("");

  // Append character
  const dis = (val: string) => {
    setValue((prev) => prev + val);
  };

  // Clear input
  const clr = () => {
    setValue("");
  };

  // Backspace
  const back = () => {
    setValue((prev) => prev.slice(0, -1));
  };

  // Solve expression safely
  const solve = () => {
    try {
      // eslint-disable-next-line no-new-func
      const result = new Function(`return ${value}`)();
      setValue(String(result));
    } catch (error) {
      setValue("Error");
    }
  };

  // Keyboard Support
  const handleKey = (event: KeyboardEvent) => {
    if (/[0-9+\-*/%.]/.test(event.key)) {
      setValue((prev) => prev + event.key);
    } else if (event.key === "Backspace" || event.key === "Delete") {
      back();
    } else if (event.key === "Enter") {
      solve();
    } else if (event.key.toLowerCase() === "c") {
      clr();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="modal-body py-0">
      <div className="calculator-wrap">

        {/* Input */}
        <div>
          <label className="form-label">
            Amount <span className="text-danger">*</span>
          </label>
          <input
            className="input form-control"
            type="text"
            placeholder="Amount or %"
            readOnly
            value={value}
          />
        </div>

        {/* Calculator Grid */}
        <div className="calculator-body d-flex justify-content-between mt-3">

          {/* Column 1 */}
          <div className="text-center">
            <button className="btn btn-clear" onClick={clr}>C</button>
            <button className="btn btn-number" onClick={() => dis("7")}>7</button>
            <button className="btn btn-number" onClick={() => dis("4")}>4</button>
            <button className="btn btn-number" onClick={() => dis("1")}>1</button>
            <button className="btn btn-number" onClick={() => dis(",")}>,</button>
          </div>

          {/* Column 2 */}
          <div className="text-center">
            <button className="btn btn-expression" onClick={() => dis("/")}>÷</button>
            <button className="btn btn-number" onClick={() => dis("8")}>8</button>
            <button className="btn btn-number" onClick={() => dis("5")}>5</button>
            <button className="btn btn-number" onClick={() => dis("2")}>2</button>
            <button className="btn btn-number" onClick={() => dis("00")}>00</button>
          </div>

          {/* Column 3 */}
          <div className="text-center">
            <button className="btn btn-expression" onClick={() => dis("%")}>%</button>
            <button className="btn btn-number" onClick={() => dis("9")}>9</button>
            <button className="btn btn-number" onClick={() => dis("6")}>6</button>
            <button className="btn btn-number" onClick={() => dis("3")}>3</button>
            <button className="btn btn-number" onClick={() => dis(".")}>.</button>
          </div>

          {/* Column 4 */}
          <div className="text-center">
            <button className="btn btn-clear" onClick={back}>
              <i className="icon-arrow-left" />
            </button>
            <button className="btn btn-expression" onClick={() => dis("*")}>x</button>
            <button className="btn btn-expression" onClick={() => dis("-")}>-</button>
            <button className="btn btn-expression" onClick={() => dis("+")}>+</button>
            <button className="btn btn-clear" onClick={solve}>=</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Calculator;
