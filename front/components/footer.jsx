
const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p style={styles.text}>Made with ❤️ by heinohen</p>
        <p>model trained by me, from utu comp vis course assignment</p>
        <div style={styles.links}>
          <a href="https://github.com/heinohen" target="_blank" rel="noopener noreferrer" style={styles.link}>
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#282c34',
    color: 'white',
    padding: '20px',
    textAlign: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    margin: 0,
    fontSize: '14px',
  },
  links: {
    marginTop: '10px',
  },
  link: {
    color: '#61dafb',
    textDecoration: 'none',
    margin: '0 10px',
  },
  separator: {
    color: '#fff',
    margin: '0 10px',
  }
};

export default Footer;
