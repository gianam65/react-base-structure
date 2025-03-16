interface IProps {
  children: React.ReactNode;
}

const AppLoginLayout = ({ children }: IProps) => {
  return (
    <div className="app__login-layout">
      This is login layout
      <div className="app__login-layout--content">{children}</div>
    </div>
  );
};

export default AppLoginLayout;
