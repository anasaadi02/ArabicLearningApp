// palmService.js
import axios from "axios";

const PALM_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent"; // Replace with the actual endpoint
const API_KEY = "AIzaSyBniqya5Recf3KlH3__fihuMuAoVFxgl0E"; // Replace with your API key

export const sendMessageToPaLM = async (message) => {
  try {
    const response = await axios.post(
      PALM_API_URL,
      {
        prompt: message,
        max_tokens: 150,
        temperature: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.choices[0].text;
  } catch (error) {
    console.error("Error sending message to PaLM:", error);
    throw error;
  }
};

// import axios from "axios";

// const apiKey = "AIzaSyBniqya5Recf3KlH3__fihuMuAoVFxgl0E"; // Replace with your actual API key

// const requestOptions = {
//   method: "POST",
//   url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBniqya5Recf3KlH3__fihuMuAoVFxgl0E", // Replace with the PaLM API endpoint
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${apiKey}`, // Or use 'X-API-Key' if needed
//   },
//   // data: {
//   //   // Your request data
//   // },
//   // return response.data.choices[0].text;
// };

// axios(requestOptions)
//   .then((response) => {
//     console.log(response.data.choices[0].text); // Process the response from PaLM
//   })
//   .catch((error) => {
//     console.error("eerp" + error);
//   });
