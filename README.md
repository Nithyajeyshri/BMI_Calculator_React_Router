# Ex06 BMI Calculator
## Date:29-08-2026
## AIM:
To develop a responsive and interactive Body Mass Index (BMI) Calculator using React that allows users to input their height and weight, and calculates their BMI to categorize their health status (e.g., Underweight, Normal, Overweight, Obese).

## DESIGN STEPS:
## STEP 1: Initialize React Project
Create a new React app using create-react-app.
Install React Router using:
npm install react-router-dom
### STEP 2: Set Up Routing
Create routing structure with react-router-dom:

Home route (/) – Intro or Navigation
BMI Calculator route (/bmi)
Result route (/result)
### STEP 3: Design the BMI Form Page
Create a form to accept Height (in cm or m) and Weight (in kg).
On form submit, navigate to the result page with entered values via URL query params or context/state.
### STEP 4: Handle Input Validation
Check if height and weight are valid numbers.
Optionally, show error messages for invalid inputs.
### STEP 5: Perform BMI Calculation
In the result component:
Extract height and weight from the route (URL or passed state).
Apply the BMI formula:
image​

Convert height from cm to m if needed.
### STEP 6: Display Result
Show calculated BMI.
Show category based on BMI range:
Underweight, Normal, Overweight, Obese, etc.
### STEP 7: Navigation Options
Provide a button to go back to the BMI form to calculate again.
### STEP 8: Enhancements
Add styling using CSS or Tailwind.
## PROGRAM:
```
import React, { useState } from "react";
import {BrowserRouter,Routes,Route,Link,useNavigate,useLocation} from "react-router-dom";

import "./style2.css";

function Home() {
  return (
    <div className="bmi-page">

      <div className="bmi-glow glow-one"></div>
      <div className="bmi-glow glow-two"></div>

      <div className="home-card">

        <div className="home-icon">
          ⚖️
        </div>

        <span className="welcome-text">
          WELCOME TO
        </span>

        <h1>
          BMI <span>CALCULATOR</span>
        </h1>

        <p>
          Calculate your Body Mass Index and understand
          your BMI category using a simple and interactive
          calculator.
        </p>

        <Link to="/bmi" className="start-button">
          START CALCULATING
          <span>→</span>
        </Link>

        <div className="home-info">

          <div>
            <strong>01</strong>
            <small>ENTER DATA</small>
          </div>

          <div>
            <strong>02</strong>
            <small>CALCULATE</small>
          </div>

          <div>
            <strong>03</strong>
            <small>VIEW RESULT</small>
          </div>

        </div>

      </div>

    </div>
  );
}

function BMICalculator() {

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();


  const calculateBMI = (e) => {

    e.preventDefault();

    setError("");

    const heightValue = Number(height);
    const weightValue = Number(weight);


    if (!height || !weight) {
      setError("Please enter both height and weight.");
      return;
    }


    if (heightValue <= 0 || weightValue <= 0) {
      setError("Height and weight must be greater than zero.");
      return;
    }


    if (heightValue < 50 || heightValue > 250) {
      setError("Please enter a valid height between 50 and 250 cm.");
      return;
    }


    if (weightValue < 10 || weightValue > 300) {
      setError("Please enter a valid weight between 10 and 300 kg.");
      return;
    }


    const heightInMeters = heightValue / 100;

    const bmi =
      weightValue /
      (heightInMeters * heightInMeters);


    navigate(
      `/result?bmi=${bmi.toFixed(1)}&height=${heightValue}&weight=${weightValue}`
    );
  };


  return (
    <div className="bmi-page">

      <div className="bmi-glow glow-one"></div>
      <div className="bmi-glow glow-two"></div>


      <div className="calculator-card">

        {/* Header */}

        <div className="calculator-top">

          <Link to="/" className="back-home">
            ← Home
          </Link>

          <div className="scale-icon">
            ⚖
          </div>

        </div>


        <div className="calculator-title">

          <span>HEALTH CHECK</span>

          <h1>
            BMI <span>Calculator</span>
          </h1>

          <p>
            Enter your details to calculate your BMI
          </p>

        </div>


        {/* Form */}

        <form onSubmit={calculateBMI}>

          <div className="input-group">

            <label>
              HEIGHT
              <span>cm</span>
            </label>

            <div className="input-box">

              <span>↕</span>

              <input
                type="number"
                placeholder="Enter your height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />

              <strong>CM</strong>

            </div>

          </div>


          <div className="input-group">

            <label>
              WEIGHT
              <span>kg</span>
            </label>

            <div className="input-box">

              <span>⚖</span>

              <input
                type="number"
                placeholder="Enter your weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />

              <strong>KG</strong>

            </div>

          </div>


          {error && (
            <div className="error-message">
              ⚠ {error}
            </div>
          )}


          <button
            type="submit"
            className="calculate-button"
          >
            CALCULATE BMI
            <span>→</span>
          </button>

        </form>


        <div className="formula">

          <span>BMI FORMULA</span>

          <strong>
            Weight (kg) ÷ Height² (m)
          </strong>

        </div>

      </div>

    </div>
  );
}

function Result() {

  const location = useLocation();

  const navigate = useNavigate();


  const params = new URLSearchParams(
    location.search
  );


  const bmi = Number(params.get("bmi"));

  const height = params.get("height");

  const weight = params.get("weight");


  let category = "";

  let emoji = "";

  let message = "";


  if (bmi < 18.5) {

    category = "Underweight";
    emoji = "🌱";
    message =
      "Your BMI is below the normal range.";

  } else if (bmi < 25) {

    category = "Normal";
    emoji = "✨";
    message =
      "Your BMI is within the normal range.";

  } else if (bmi < 30) {

    category = "Overweight";
    emoji = "💪";
    message =
      "Your BMI is above the normal range.";

  } else {

    category = "Obese";
    emoji = "❤️";
    message =
      "Your BMI is in the obese range.";

  }


  return (
    <div className="bmi-page">

      <div className="bmi-glow glow-one"></div>
      <div className="bmi-glow glow-two"></div>


      <div className="result-card">

        <div className="result-icon">
          {emoji}
        </div>


        <span className="result-small">
          YOUR BMI RESULT
        </span>


        <h1 className="bmi-number">
          {bmi || "--"}
        </h1>


        <div className="category">
          {category}
        </div>


        <p className="result-message">
          {message}
        </p>


        {/* Details */}

        <div className="details">

          <div className="detail-box">

            <span>HEIGHT</span>

            <strong>
              {height || "--"} cm
            </strong>

          </div>


          <div className="detail-box">

            <span>WEIGHT</span>

            <strong>
              {weight || "--"} kg
            </strong>

          </div>

        </div>


        {/* BMI Scale */}

        <div className="scale">

          <div className="scale-title">
            BMI RANGE
          </div>

          <div className="scale-bar">

            <div className="underweight">
              <span>18.5</span>
            </div>

            <div className="normal">
              <span>25</span>
            </div>

            <div className="overweight">
              <span>30</span>
            </div>

            <div className="obese">
              <span>+</span>
            </div>

          </div>

          <div className="scale-labels">

            <span>Under</span>
            <span>Normal</span>
            <span>Over</span>
            <span>Obese</span>

          </div>

        </div>


        <button
          className="calculate-button"
          onClick={() => navigate("/bmi")}
        >
          CALCULATE AGAIN
          <span>↻</span>
        </button>


        <Link
          to="/"
          className="result-home"
        >
          ← Back to Home
        </Link>

      </div>

    </div>
  );
}

function BMI() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/bmi"
          element={<BMICalculator />}
        />

        <Route
          path="/result"
          element={<Result />}
        />

      </Routes>

    </BrowserRouter>

  );
}


export default BMI;

style.css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Segoe UI", Arial, sans-serif;
}

.bmi-page {
  min-height: 100vh;

  display: flex;

  justify-content: center;

  align-items: center;

  padding: 30px;

  position: relative;

  overflow: hidden;

  background:
    radial-gradient(
      circle at 10% 15%,
      #7c3aed,
      transparent 32%
    ),

    radial-gradient(
      circle at 90% 85%,
      #06b6d4,
      transparent 32%
    ),

    linear-gradient(
      135deg,
      #070b1c,
      #151536,
      #061b2b
    );
}

.bmi-glow {
  position: absolute;

  border-radius: 50%;

  pointer-events: none;
}


.glow-one {
  width: 300px;

  height: 300px;

  top: -120px;

  right: -80px;

  background: #8b5cf6;

  filter: blur(100px);

  opacity: 0.45;
}


.glow-two {
  width: 280px;

  height: 280px;

  bottom: -120px;

  left: -80px;

  background: #06b6d4;

  filter: blur(100px);

  opacity: 0.35;
}

.home-card {
  width: 100%;

  max-width: 650px;

  padding: 55px;

  text-align: center;

  border-radius: 35px;

  background:
    rgba(255, 255, 255, 0.1);

  border:
    1px solid rgba(255, 255, 255, 0.2);

  backdrop-filter: blur(25px);

  -webkit-backdrop-filter: blur(25px);

  box-shadow:
    0 30px 80px rgba(0, 0, 0, 0.5);

  position: relative;

  z-index: 2;

  animation: cardAppear 0.7s ease;
}


@keyframes cardAppear {

  from {
    opacity: 0;

    transform:
      translateY(25px)
      scale(0.97);
  }

  to {
    opacity: 1;

    transform:
      translateY(0)
      scale(1);
  }

}

.home-icon {
  width: 75px;

  height: 75px;

  margin: 0 auto 20px;

  display: flex;

  justify-content: center;

  align-items: center;

  border-radius: 24px;

  font-size: 35px;

  background:
    linear-gradient(
      135deg,
      #8b5cf6,
      #06b6d4
    );

  box-shadow:
    0 12px 35px rgba(124, 58, 237, 0.4);
}
.welcome-text {
  color: #67e8f9;

  font-size: 11px;

  font-weight: bold;

  letter-spacing: 4px;
}


.home-card h1 {
  margin: 10px 0;

  color: white;

  font-size: 48px;

  letter-spacing: 2px;
}


.home-card h1 span {
  color: #a78bfa;
}


.home-card p {
  max-width: 480px;

  margin: 0 auto 30px;

  color: #b8c2d9;

  line-height: 1.7;

  font-size: 14px;
}

.start-button {
  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 20px;

  padding: 16px 25px;

  border-radius: 16px;

  color: white;

  text-decoration: none;

  font-size: 13px;

  font-weight: bold;

  letter-spacing: 1px;

  background:
    linear-gradient(
      135deg,
      #7c3aed,
      #06b6d4
    );

  box-shadow:
    0 12px 30px rgba(124, 58, 237, 0.35);

  transition: 0.3s;
}


.start-button span {
  font-size: 20px;
}


.start-button:hover {
  transform: translateY(-4px);

  box-shadow:
    0 18px 35px rgba(6, 182, 212, 0.35);
}

.home-info {
  display: flex;

  justify-content: center;

  gap: 50px;

  margin-top: 40px;

  padding-top: 25px;

  border-top:
    1px solid rgba(255, 255, 255, 0.1);
}


.home-info div {
  display: flex;

  flex-direction: column;

  gap: 5px;
}


.home-info strong {
  color: white;

  font-size: 18px;
}


.home-info small {
  color: #8793ad;

  font-size: 9px;

  letter-spacing: 1px;
}

.calculator-card {
  width: 100%;

  max-width: 500px;

  padding: 35px;

  border-radius: 30px;

  background:
    rgba(255, 255, 255, 0.1);

  border:
    1px solid rgba(255, 255, 255, 0.2);

  backdrop-filter: blur(25px);

  -webkit-backdrop-filter: blur(25px);

  box-shadow:
    0 30px 80px rgba(0, 0, 0, 0.5);

  position: relative;

  z-index: 2;

  animation: cardAppear 0.6s ease;
}

.calculator-top {
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 25px;
}


.back-home {
  color: #aab4cc;

  text-decoration: none;

  font-size: 12px;

  transition: 0.2s;
}


.back-home:hover {
  color: white;
}


.scale-icon {
  width: 45px;

  height: 45px;

  display: flex;

  justify-content: center;

  align-items: center;

  border-radius: 14px;

  color: white;

  font-size: 22px;

  background:
    linear-gradient(
      135deg,
      #7c3aed,
      #06b6d4
    );
}

.calculator-title span {
  color: #67e8f9;

  font-size: 10px;

  font-weight: bold;

  letter-spacing: 3px;
}


.calculator-title h1 {
  margin: 8px 0;

  color: white;

  font-size: 36px;
}


.calculator-title h1 span {
  color: #a78bfa;
}


.calculator-title p {
  margin: 0 0 30px;

  color: #aab5ce;

  font-size: 13px;
}

.input-group {
  margin-bottom: 20px;
}


.input-group label {
  display: flex;

  justify-content: space-between;

  margin-bottom: 8px;

  color: #dce3f3;

  font-size: 11px;

  font-weight: bold;

  letter-spacing: 2px;
}


.input-group label span {
  color: #74809d;

  letter-spacing: 0;
}

.input-box {
  height: 65px;

  display: flex;

  align-items: center;

  gap: 12px;

  padding: 0 18px;

  border-radius: 17px;

  background:
    rgba(0, 0, 0, 0.3);

  border:
    1px solid rgba(255, 255, 255, 0.1);

  transition: 0.3s;
}


.input-box:focus-within {
  border-color: #8b5cf6;

  box-shadow:
    0 0 20px rgba(139, 92, 246, 0.2);
}


.input-box > span {
  color: #8b5cf6;

  font-size: 20px;
}


.input-box input {
  flex: 1;

  width: 100%;

  border: none;

  outline: none;

  color: white;

  font-size: 18px;

  background: transparent;
}


.input-box input::placeholder {
  color: #65718e;

  font-size: 13px;
}


.input-box input::-webkit-inner-spin-button,
.input-box input::-webkit-outer-spin-button {
  -webkit-appearance: none;

  margin: 0;
}


.input-box input {
  appearance: textfield;

  -moz-appearance: textfield;
}


.input-box strong {
  color: #64708b;

  font-size: 11px;

  letter-spacing: 1px;
}

.error-message {
  margin-bottom: 18px;

  padding: 12px;

  border-radius: 12px;

  color: #fecaca;

  background:
    rgba(239, 68, 68, 0.12);

  border:
    1px solid rgba(239, 68, 68, 0.2);

  font-size: 12px;
}

.calculate-button {
  width: 100%;

  height: 58px;

  display: flex;

  justify-content: center;

  align-items: center;

  gap: 20px;

  border: none;

  border-radius: 16px;

  color: white;

  font-size: 12px;

  font-weight: bold;

  letter-spacing: 2px;

  cursor: pointer;

  background:
    linear-gradient(
      135deg,
      #7c3aed,
      #06b6d4
    );

  box-shadow:
    0 10px 25px rgba(124, 58, 237, 0.3);

  transition: 0.3s;
}


.calculate-button span {
  font-size: 20px;
}


.calculate-button:hover {
  transform: translateY(-3px);

  box-shadow:
    0 15px 30px rgba(6, 182, 212, 0.3);
}


.calculate-button:active {
  transform: scale(0.97);
}

.formula {
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-top: 25px;

  padding-top: 20px;

  border-top:
    1px solid rgba(255, 255, 255, 0.1);
}


.formula span {
  color: #71809c;

  font-size: 9px;

  letter-spacing: 2px;
}


.formula strong {
  color: #aab5cd;

  font-size: 11px;
}

.result-card {
  width: 100%;

  max-width: 500px;

  padding: 40px;

  text-align: center;

  border-radius: 30px;

  background:
    rgba(255, 255, 255, 0.1);

  border:
    1px solid rgba(255, 255, 255, 0.2);

  backdrop-filter: blur(25px);

  -webkit-backdrop-filter: blur(25px);

  box-shadow:
    0 30px 80px rgba(0, 0, 0, 0.5);

  position: relative;

  z-index: 2;

  animation: cardAppear 0.6s ease;
}

.result-icon {
  width: 65px;

  height: 65px;

  display: flex;

  justify-content: center;

  align-items: center;

  margin: 0 auto 15px;

  border-radius: 50%;

  font-size: 28px;

  background:
    rgba(255, 255, 255, 0.1);
}


.result-small {
  color: #67e8f9;

  font-size: 10px;

  font-weight: bold;

  letter-spacing: 3px;
}

.bmi-number {
  margin: 5px 0;

  color: white;

  font-size: 72px;

  line-height: 1;

  font-weight: 700;
}


.category {
  display: inline-block;

  padding: 8px 20px;

  border-radius: 30px;

  color: white;

  font-size: 12px;

  font-weight: bold;

  letter-spacing: 1px;

  background:
    linear-gradient(
      135deg,
      #7c3aed,
      #06b6d4
    );
}


.result-message {
  margin: 15px 0 25px;

  color: #abb6cd;

  font-size: 13px;
}

.details {
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 12px;

  margin-bottom: 25px;
}


.detail-box {
  padding: 17px;

  border-radius: 15px;

  background:
    rgba(0, 0, 0, 0.2);

  border:
    1px solid rgba(255, 255, 255, 0.08);
}


.detail-box span {
  display: block;

  margin-bottom: 5px;

  color: #73809b;

  font-size: 9px;

  letter-spacing: 2px;
}


.detail-box strong {
  color: white;

  font-size: 16px;
}
.scale {
  margin-bottom: 25px;

  text-align: left;
}


.scale-title {
  margin-bottom: 8px;

  color: #78849e;

  font-size: 9px;

  letter-spacing: 2px;
}


.scale-bar {
  height: 12px;

  display: flex;

  overflow: hidden;

  border-radius: 20px;
}


.scale-bar div {
  flex: 1;
}


.underweight {
  background: #38bdf8;
}


.normal {
  background: #22c55e;
}


.overweight {
  background: #f59e0b;
}


.obese {
  background: #ef4444;
}


.scale-labels {
  display: flex;

  justify-content: space-between;

  margin-top: 7px;

  color: #77839d;

  font-size: 8px;
}

.result-home {
  display: block;

  margin-top: 18px;

  color: #8995ae;

  text-decoration: none;

  font-size: 11px;

  transition: 0.2s;
}


.result-home:hover {
  color: white;
}

@media (max-width: 600px) {

  .bmi-page {
    padding: 20px 15px;
  }


  .home-card {
    padding: 35px 25px;
  }


  .home-card h1 {
    font-size: 36px;
  }


  .home-card p {
    font-size: 13px;
  }


  .home-info {
    gap: 20px;
  }


  .calculator-card,
  .result-card {
    padding: 28px 22px;
  }


  .calculator-title h1 {
    font-size: 30px;
  }


  .bmi-number {
    font-size: 60px;
  }


  .formula {
    flex-direction: column;

    gap: 8px;
  }

}


@media (max-width: 400px) {

  .home-card h1 {
    font-size: 30px;
  }


  .home-info {
    gap: 12px;
  }


  .home-info small {
    font-size: 7px;
  }


  .input-box {
    height: 58px;
  }


  .bmi-number {
    font-size: 52px;
  }

}
```

## OUTPUT:
![alt text](<Screenshot 2026-08-29 170034.png>)

## RESULT:
The BMI Calculator successfully takes user input for height and weight, performs the BMI calculation in real-time using React state and event handling, and displays the BMI value along with the corresponding health category.
