import PropTypes from 'prop-types';

const Connection = ({ message }) => {

  return (
    <div className="backendmessage">
      <p>{message ? message : 'Connecting to backend...'}</p>
    </div>
  );
};

Connection.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Connection;
