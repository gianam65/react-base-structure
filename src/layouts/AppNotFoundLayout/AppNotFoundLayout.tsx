interface IProps {
  children: React.ReactNode;
}

const AppNotFoundLayout = ({ children }: IProps) => {
  return <div className="app__not-found--layout">{children}</div>;
};

export default AppNotFoundLayout;
