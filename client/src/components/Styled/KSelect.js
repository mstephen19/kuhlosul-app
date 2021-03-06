import React from 'react';
import { Select, Label } from '@rebass/forms';
import { Box } from 'rebass';
import { v4 as uuidv4 } from 'uuid';

export default function KSelect({
  options,
  id,
  label,
  labelColor,
  name,
  onChange,
  color = 'white',
  ...props
}) {
  return (
    <Box style={{ width: '100%', minWidth: '200px', maxWidth: '1000px' }}>
      <Label htmlFor={id} style={{ color: labelColor, fontStyle: 'italic' }}>
        {label}
      </Label>
      <Select
        id={id}
        name={name}
        style={{ color: color }}
        onChange={onChange}
        {...props}
      >
        {options.map((option) => {
          return <option key={uuidv4()}>{option}</option>;
        })}
      </Select>
    </Box>
  );
}
