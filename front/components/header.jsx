
const Header = ({ message }) => {

  return (
    <header>
      <h1>{message ? message : 'Loading message...'}</h1>
    </header>
  );
};

export default Header;
