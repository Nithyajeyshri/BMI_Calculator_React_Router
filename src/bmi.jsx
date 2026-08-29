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