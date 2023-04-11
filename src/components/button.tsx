import { MouseEventHandler } from "react";

interface ButtonProps {
  buttonText: string,
  action: MouseEventHandler<HTMLButtonElement> | undefined
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <button className='rounded-xl bg-neutral-900 px-4 py-2 font-medium text-white hover:bg-black/80' onClick={props.action}>{props.buttonText}</button>
  )
}
export default Button