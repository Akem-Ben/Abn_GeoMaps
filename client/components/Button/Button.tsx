import { useState } from "react";

interface Props {
  title?: string;
  text?: string;
  bg?: string;
  type?: any;
  onClick?: ()=>  any;
}

function Button(props: Props) {
  const [isHovered, setHovered] = useState(false);
  const buttonStyle = {
    backgroundColor: isHovered ? `${props.text}` : `${props.bg}`,
    color: isHovered ? `${props.bg}` : `${props.text}`,
    border: isHovered ? `0.1rem solid ${props.bg}` : `0.1rem solid ${props.bg}`,
  };
  return (
    <button
      type={props.type || 'button'}
      className={`flex h-12 py-2 px-4 justify-center items-center flex-shrink-0 rounded font-Inter`}
      style={buttonStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => props.onClick && props.onClick()}
    >
      {props.title}
    </button>
  );
}

export default Button;
