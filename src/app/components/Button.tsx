type ButtonProps = {
  style: "clear" | "primary";
  children: any;
  onClick?: any;
};

export default function Button(
  { style, children, onClick }: ButtonProps
) {
  const styles = {
    clear: "flex items-center text-14 text-gray-500",
    primary: "flex items-center text-14 bg-primary-400 text-white-100",
  };
  return <button className={styles[style]} onClick={onClick}>{children}</button>;
}
