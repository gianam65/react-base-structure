interface IProps {
  children: React.ReactNode;
}

const AppBaseLayout = ({ children }: IProps) => {
  return (
    <div className="app__base-layout">
      This is app base layout
      <div className="app__base-layout--content">{children}</div>
    </div>
  );
};

export default AppBaseLayout;
