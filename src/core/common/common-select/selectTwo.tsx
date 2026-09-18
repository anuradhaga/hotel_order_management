"use client";

import React from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";
import "antd/dist/reset.css";

export interface Option {
  value: string;
  label: string;
}

interface SelectTwoProps {
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SelectTwo: React.FC<SelectTwoProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select",
  className="common-select-two",
}) => {
  return (
    <Select
      className={className}
      value={value}
      placeholder={placeholder}

      /* 🔥 ENABLE SEARCH INPUT */
      showSearch

      /* 🔥 SEARCH BEHAVIOR */
      filterOption={(input, option) =>
        (option?.label ?? "")
          .toLowerCase()
          .includes(input.toLowerCase())
      }

      /* 🔥 OPTIONS */
      options={options}

      /* 🔥 SELECT2-LIKE UI */
      dropdownClassName="select2-dropdown"
      popupMatchSelectWidth={false}

      onChange={onChange}

      style={{ width: 234 }}
    />
  );
};

export default SelectTwo;
