import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import axios from "axios";
import Words from "./words";
const Mainpage = () => {
  const { username } = useParams();
  const [isPending, setIsPending] = useState(true);
  const [form, setForm] = useState(false);
  const [plusone, setPlusone] = useState(null);
  const [allergy, setAllergy] = useState(null);
  const [attendance, setAttendance] = useState(null);

  useEffect(() => {
    axios
      .get("/form")
      .then((data) => {
        setIsPending(false);
        const { attendance, allergy, plusone } = data.data.rows;
        const attendanceFormName =
          attendance === 1 ? "Attending" : "Not Attending";
        setAttendance(attendanceFormName);
        setAllergy(allergy);
        setPlusone(plusone);
        setForm(true);
      })
      .catch((error) => console.log(error));
  }, []);

  const plusoneChange = ({ target }) => {
    setPlusone(target.value);
  };

  const attendanceChange = ({ target }) => {
    setAttendance(target.value);
  };

  const allergyChange = ({ target }) => {
    setAllergy(target.value);
  };

  const submitChanges = (event) => {
    event.preventDefault();
    const SQLAttendance = attendance.includes("Not") ? 0 : 1;
    axios
      .post("/form", {
        attendance: SQLAttendance,
        allergy: allergy,
        plusone: plusone,
      })
      .then((response) => {
        if (response.status === 200) {
          alert("Successfully sent data");
        } else {
          alert("Error, data not sent");
        }
      });
  };

  return (
    <section id="parent">
      <div id="wordcontainer">
        <Words letterstring={"Welcome "} />

        <Words letterstring={username} />
        <Words letterstring={"random"} />
      </div>

      <div id="child"> {isPending && <div> Loading... </div>} </div>
      <div id="formcontainer">
        {form && (
          <form id="form" onSubmit={submitChanges}>
            <label>
              Additional information (such as allergies):
              <textarea value={allergy} onChange={allergyChange} />
            </label>
            <select value={attendance} onChange={attendanceChange}>
              <option value="Attending"> Attending </option>
              <option value="Not Attending"> Not Attending </option>
            </select>

            <select value={plusone} onChange={plusoneChange}>
              {[...Array(10).keys()].map((number) => (
                <option key={number} value={number}>
                  {" "}
                  +{number}{" "}
                </option>
              ))}
            </select>
            <input type="submit" value="Submit" />
          </form>
        )}
      </div>
    </section>
  );
};

export default Mainpage;
