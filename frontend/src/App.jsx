import { useEffect, useState } from 'react'
import axios from 'axios'

import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import Connection from './components/Connection';

function App() {
  const [backEndMessage, setBackEndMessage] = useState(""); // header message
  const [imageFile, setImageFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState("waiting for image...");


  useEffect(() => {
    document.title = "dogsmuffinsdogsmuffins"
  }, []);

  useEffect(() => {
    fetch("https://muffindog-back.fly.dev")
      .then((res) => res.json())
      .then((data) => {
        setBackEndMessage(data.message);
      });
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setImageFile(file);
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!imageFile) {
      alert("select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      console.log("calling backend");
      const response = await axios.post("https://muffindog-back.fly.dev/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.message) {
        setResponseMessage(response.data.message);
      }
    } catch (error) {
      console.log("error", error.message);
      setResponseMessage("something went sour");
    }
  };

  return (
    <>
      <Header />
      
      <div className="container">
        <div className="container-content">
          <Connection className = "connectionmsg" message={backEndMessage} />
          <input type="file" onChange={handleFileChange} />
          <div className="button-container">
            <button className="upload-btn" onClick={handleSubmit}>Upload image</button>
          </div>
          <div className="response-message">
            <p>{responseMessage}</p>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}

export default App;

