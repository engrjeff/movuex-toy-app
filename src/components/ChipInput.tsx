import { useRadioGroup } from "@mui/material/RadioGroup";
import { visuallyHidden } from "@mui/utils";
import Chip from "@mui/material/Chip";

interface ChipInputProps {
  label: string;
  value: string;
}

export default function ChipInput(props: ChipInputProps) {
  const radioGroup = useRadioGroup();

  if (!radioGroup) return null;

  const { name, value: currentValue, onChange } = radioGroup;

  const isSelected = props.value === currentValue;

  return (
    <label>
      <input
        style={visuallyHidden}
        name={name}
        type='radio'
        value={props.value}
        onChange={(e) => onChange(e, props.value || "")}
        checked={isSelected}
      />
      <Chip
        clickable
        label={props.label}
        color={isSelected ? "primary" : "default"}
        variant={isSelected ? "filled" : "outlined"}
      />
    </label>
  );
}
