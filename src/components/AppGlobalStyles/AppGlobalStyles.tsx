import "./index.scss";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const GlobalStyles: React.FC<Props> = ({ children }) => {
  return children;
};

export default GlobalStyles;
