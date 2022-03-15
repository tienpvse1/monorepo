interface IsProps {
  condition: boolean;
}

export const Is: React.FC<IsProps> = ({ children, condition }) => {
  return <>{condition && children}</>;
};
