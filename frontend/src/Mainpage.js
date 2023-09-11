import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMap, faCalendarTimes, faClock} from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import Words from "./words";
import ToggleButton from "./toggle";
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
    <>
      <ToggleButton />
      <section id="parent">
        {form && (
          <div id="wordcontainer">
            <Words
              letterstring={"Welcome"}
              OFFSET={15}
              color="blue"
              fontFamily="Anton"
            />

            <Words letterstring={username} OFFSET={20} color="black" />
          </div>
        )}
        {form && <section id="info">
          <div id="invite">You are cordially invited to my graduation party:</div>
          <ul>
            <li id="date"><FontAwesomeIcon icon={faCalendarTimes} />:</li>
            <li id="time"><FontAwesomeIcon icon={faClock} />: 15:00 onwards</li>
            <li id="place"><FontAwesomeIcon icon={faMap} />: Amiralsgatan 43C</li>
          
          </ul>
        </section>}
        <div id="child"> {isPending && <div> Loading... </div>} </div>
        <div id="formcontainer">
          {form && (
            <form id="form" onSubmit={submitChanges}>
              <div>
                Are you attending?&nbsp;
                <select value={attendance} onChange={attendanceChange}>
                  <option value="Attending"> Attending </option>
                  <option value="Not Attending"> Not Attending </option>
                </select>
              </div>

              <div>
                Sidekicks:&nbsp;
                <select value={plusone} onChange={plusoneChange}>
                  {[...Array(10).keys()].map((number) => (
                    <option key={number} value={number}>
                      {" "}
                      +{number}{" "}
                    </option>
                  ))}
                </select>
              </div>
            
              <label id="additionalinformation">
                Additional information (such as allergies):
                <textarea value={allergy} onChange={allergyChange} />
              </label>
              <input type="submit" value="Submit" />
            </form>
          )}
        </div>
      </section>
    </>
  );
};

export default Mainpage;
