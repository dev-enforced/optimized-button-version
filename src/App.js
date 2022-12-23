import React, { useState, memo, useCallback } from "react";

export default function App() {
  const [inputFields, setInputFields] = useState({
    city: "kolkata",
    education: "MBA"
  });

  const toggleCity = () => {
    setInputFields((inputFields) => ({
      ...inputFields,
      city: inputFields.city === "kolkata" ? "delhi" : "kolkata"
    }));
  };
  const toggleEducation = () => {
    setInputFields((inputFields) => ({
      ...inputFields,
      education: inputFields.education === "B.Tech" ? "MBA" : "B.Tech"
    }));
  };
  const memoizedToggleCity = useCallback(toggleCity, []);
  const memoizedToggleEducation = useCallback(toggleEducation, []);

  return (
    <div className="App">
      <MemoizedCity city={inputFields.city} handleToggle={memoizedToggleCity} />
      <br />
      <br />
      <MemoizedEducation
        education={inputFields.education}
        handleToggle={memoizedToggleEducation}
      />
    </div>
  );
}

const City = ({ city, handleToggle }) => {
  console.log({ city });
  return <button onClick={handleToggle}>{city}</button>;
};

const Education = ({ education, handleToggle }) => {
  console.log({ education });
  return <button onClick={handleToggle}>{education}</button>;
};

const MemoizedCity = memo(City);
const MemoizedEducation = memo(Education);
