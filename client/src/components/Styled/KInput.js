import React from 'react';
import { Input, Label } from '@rebass/forms';
import { Box } from 'rebass';

export default function KInput({
  id,
  label,
  labelColor,
  type,
  placeholder,
  onChange,
  color = 'white',
  ...props
}) {
  return (
    <Box style={{ width: '100%', minWidth: '200px', maxWidth: '1000px' }}>
      <Label htmlFor={id} style={{ color: labelColor, fontStyle: 'italic' }}>
        {label}
      </Label>
      <Input
        id={id}
        name={type}
        type={type}
        placeholder={placeholder}
        style={{ color: color }}
        onChange={onChange}
        {...props}
        maxLength={200}
      />
    </Box>
  );
}
