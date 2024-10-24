import "./components.css";

interface ButtonProps {
  text: string;
  onClick: () => any;
}

export default function Button({ text, onClick }: ButtonProps) {
  return (
    <button className="sas-button" onClick={onClick}>
      {text}
    </button>
  );
}
