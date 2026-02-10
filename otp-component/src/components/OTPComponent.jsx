import React, { useState, useRef, useEffect } from "react";

const OTPComponent = () => {
  const [OTP, setOTP] = useState(Math.floor(100000 + Math.random() * 900000));

  const [typedOtp, setTypedOtp] = useState(Array(6).fill(""));

  const inputRefs = useRef([]);

  useEffect(() => {
      inputRefs.current[0].focus()
  },[])

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    const regex = /^\d$/;
    if (!regex.test(value)) return;
    const tempOtp = [...typedOtp];
    tempOtp[index] = e.target.value;
    setTypedOtp(tempOtp);
    if (index + 1 < typedOtp.length) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // backspace key
    if (e.key === "Backspace") {
      e.preventDefault();

      const tempOtp = [...typedOtp];
      let moveToPreviousField = true;
      if (tempOtp[index]) {
        moveToPreviousField = false;
      }
      tempOtp[index] = "";
      setTypedOtp(tempOtp);
      if (index - 1 >= 0 && moveToPreviousField) {
        inputRefs.current[index - 1].focus();
      }
    }
    // arrow left key
    if (e.key === "ArrowLeft") {
      if (index - 1 >= 0) {
        inputRefs.current[index - 1].focus();
      }
    }
    // arrow right key
    if (e.key === "ArrowRight") {
      if (index + 1 <= typedOtp.length) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const data = e.clipboardData.getData("text");
    if (data.length === 6) {
      const values = data.split("");
      setTypedOtp(values);
    }
  };

  const handleVerify = () => {
    const invalidOtp = typedOtp.some((otp) => otp === "");
    if (invalidOtp) {
      alert("Please enter all 6 digits of the OTP.");
      return;
    }
    const enteredOtp = typedOtp.join("");
    if (enteredOtp === OTP.toString()) {
      alert("OTP verified successfully!");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const isDisabled = typedOtp.some((otp) => otp === "");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(OTP);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div>OTP: {OTP}</div>
      <button onClick={handleCopy}>Copy</button>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "8px",
            border: "1px solid",
            width: "max-content",
            padding: "16px",
            borderRadius: "8px",
          }}
        >
          {typedOtp.map((field, index) => (
            <input
              type="text"
              inputMode="numeric"
              value={field}
              maxLength="1"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={(e) => handlePaste(e)}
              key={index}
              style={{ maxWidth: "40px", height: "40px", textAlign: "center" }}
            />
          ))}
        </div>
        <button
          style={{ display: "block", margin: "16px auto" }}
          disabled={isDisabled}
          onClick={handleVerify}
        >
          Verify
        </button>
      </div>
    </>
  );
};

export default OTPComponent;
