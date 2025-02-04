import { useEffect, useState } from 'react'
import axios from 'axios'

import './App.css'
import Header from '../components/header';
import Footer from '../components/footer';

function App() {

  const [headerMessage, setHeaderMessage] = useState(""); // header message
  const [imageFile, setImageFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState("waiting for image...");



  useEffect(() => {
    document.title = "dogsmuffinsdogsmuffins"
  }, []);

  useEffect(() => {
    fetch("https://muffindog-back.fly.dev")
      .then((res) => res.json())
      .then((data) => {
        setHeaderMessage(data.message);
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
    };

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      console.log("calling backend")
      const response = await axios.post("https://muffindog-back.fly.dev/upload", formData,
        {
          headers: {
            'Content-Type' : 'multipart/form-data',
          },
        }
      );

      if (response.data.message) {
        const message = response.data.message;
        setResponseMessage(message);
      };
    } catch (error){
      console.log("error", error.message);
      setResponseMessage("something went sour")
    }
  };


  return (
    <>
      <div>
      <Header message = {headerMessage} />
      <p>file input header</p>
      <p>button</p>
      <input type="file" onChange={handleFileChange}/>
      <div>
      <button onClick={handleSubmit}>Upload image</button>
      </div>
      <div>
        <p>{responseMessage}</p>
      </div>
    </div>
      <Footer />


    </>
  )
}

export default App
