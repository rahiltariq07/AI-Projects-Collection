# Sentiment Analysis Project

A full-stack sentiment analysis application built with **.NET 9 Web API** (backend) and **React.js** (frontend).
The API processes user-input text and returns sentiment scores. The React app provides a user-friendly interface to interact with the API.

---

## 📂 Project Structure

```
root/
│
├── SentimentApi/      # .NET 9 Web API backend
│   ├── Controllers
│   ├── DTOs
│   ├── Program.cs
│   └── ...
│
└── sentiment-app/             # React frontend
    ├── src/
    ├── public/
    └── package.json
```

---

## 🚀 Features

* **Backend (.NET 9 API)**

  * Endpoint for analyzing sentiment.
  * Uses AI sentiment analysis logic.
  * CORS enabled for frontend integration.

* **Frontend (React.js)**

  * Input field for entering text.
  * Displays sentiment results (Positive, Neutral, Negative).
  * User-friendly UI.

---

## ⚙️ Setup Instructions

### 1️⃣ Backend Setup (API)

1. Open the `SentimentApi` folder in Visual Studio.
2. Restore NuGet packages:

   ```bash
   dotnet restore
   ```
3. Run the API:

   ```bash
   dotnet run
   ```
4. The API will be available at:

   ```
   https://localhost:5001
   ```

---

### 2️⃣ Frontend Setup (React App)

1. Navigate to the `sentiment-app` folder:

   ```bash
   cd sentiment-app
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the React app:

   ```bash
   npm start
   ```
4. Open in your browser:

   ```
   http://localhost:3000
   ```

---

## 🔗 API Endpoint

**POST** `/api/sentiment/analyze`
Request body:

```json
{
  "text": "Your text here"
}
```

Response:

```json
{
  "sentiment": "Positive",
  "score": 0.85
}
```

---

## 🛠 Notes

* If accessing the app on another device, ensure both devices are on the same network and replace `localhost` with your PC's **IPv4 address**.
* CORS must be enabled in the backend for cross-device requests.
* The sentiment analysis results may vary depending on the AI model logic.

---

## 📄 License

This project is for educational purposes.
