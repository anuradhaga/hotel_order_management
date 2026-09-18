"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = React.memo(({ value, onChange }) => {
  // Local state mirrors input for instant UI feedback
  const [inputValue, setInputValue] = useState<string>(value ?? '');

  // Keep local state in sync if parent value changes externally
  useEffect(() => {
    setInputValue(value ?? '');
  }, [value]);

  // Debounce the value to limit expensive operations
  const debouncedValue = useDebouncedValue(inputValue, 300);

  // Notify parent only when debounced value updates
  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  return (
    <div className="datatable-search">
      <div className="input-group input-group-flat w-auto">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          aria-controls="DataTables_Table_0"
          value={inputValue}
          onChange={handleInputChange}
        />
        <span className="input-group-text">
          <i className="icon-search text-dark" />
        </span>
      </div>
    </div>
  );

});

export default SearchInput;
