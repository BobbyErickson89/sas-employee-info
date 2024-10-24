import "./components.css";

interface DropdownProps {
  selectedValue: string | number;
  onChange: (e: any) => void;
  options: { value: string | number; label: string }[];
}

export default function SASDropdown({
  selectedValue,
  onChange,
  options,
}: DropdownProps) {
  return (
    <select className="sas-dropdown" value={selectedValue} onChange={onChange}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
