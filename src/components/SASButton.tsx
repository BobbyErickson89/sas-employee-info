import "./components.css";

interface ButtonProps {
  text: string;
  onClick: () => any;
}

export default function SASButton({ text, onClick }: ButtonProps) {
  return (
    <button className="sas-button" onClick={onClick}>
      {text}
    </button>
  );
}
