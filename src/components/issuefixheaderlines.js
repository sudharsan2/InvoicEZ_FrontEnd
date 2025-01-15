import React from 'react';
import {
  TextField,
  Dropdown,
  Stack,
  Label,
  DefaultButton,
} from '@fluentui/react';

// Sample options for dropdowns
const dropdownOptions = [
  { key: 'option1', text: 'Option 1' },
  { key: 'option2', text: 'Option 2' },
  { key: 'option3', text: 'Option 3' },
];

const HeaderForm = () => {
  return (
    <div style={{ padding: 20 }}>
      <Label style={{ fontSize: 20, fontWeight: 'bold' }}>Header</Label>
      <Stack horizontal wrap tokens={{ childrenGap: 10 }} styles={{ root: { marginTop: 10 } }}>
        {/* Row 1 */}
        <TextField label="Operating Unit" />
        <Dropdown label="Type" options={dropdownOptions} />
        <Dropdown label="PO Number" options={dropdownOptions} />
        <Dropdown label="Site" options={dropdownOptions} />
      </Stack>

      <Stack horizontal wrap tokens={{ childrenGap: 10 }} styles={{ root: { marginTop: 10 } }}>
        {/* Row 2 */}
        <TextField label="Invoice Date" type="date" />
        <TextField label="Invoice No" />
        <Dropdown label="Currency" options={dropdownOptions} />
        <TextField label="Amount" />
      </Stack>

      <Stack horizontal wrap tokens={{ childrenGap: 10 }} styles={{ root: { marginTop: 10 } }}>
        {/* Row 3 */}
        <TextField label="Tax amount" />
        <TextField label="Distribution Amount" />
      </Stack>

      {/* You can add buttons or other functionality below */}
      <Stack horizontal tokens={{ childrenGap: 10 }} styles={{ root: { marginTop: 20 } }}>
        <DefaultButton text="Submit" />
        <DefaultButton text="Reset" />
      </Stack>
    </div>
  );
};

export default HeaderForm;
