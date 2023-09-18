import { useState, useEffect } from "react";
//import { useParams } from "react-router-dom";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  faMap,
  faCalendarTimes,
  faClock,
} from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import Words from "./words";

const Mainpage = () => {
  //const { username } = useParams();

  const [isPending, setIsPending] = useState(true);
  const [form, setForm] = useState(false);
  const [plusone, setPlusone] = useState(null);
  const [allergy, setAllergy] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    axios
      .get("/form")
      .then((data) => {
        setIsPending(false);
        const { attendance, allergy, plusone, username } = data.data.rows;

        const attendanceFormName =
          attendance === 1 ? "Attending" : "Not Attending";
        setAttendance(attendanceFormName);
        setAllergy(allergy);
        setPlusone(plusone);
        setUsername(username);
        setForm(true);
      })
      .catch((error) => console.log(error));
  }, []);

  const plusoneChange = ({ target }) => {
    setPlusone(target.value);
  };

  const attendanceChange = ({ target }) => {
    console.log(target.value);
    setAttendance(target.value);
  };

  const allergyChange = ({ target }) => {
    console.log(target.value);
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
      {form && (
        <div id="wordcontainer">
          <Words letterstring={"Welcome"} OFFSET={20} color="#40fd02" />

          <Words letterstring={username} OFFSET={25} color="#7e20cf" />
        </div>
      )}
      <section id="mainpage">
        {form && (
          <section id="info">
            <div id="invite">
              You are cordially invited to my graduation party:
            </div>
            <div id="datetimeplace">
              <ul>
                <li id="date">
                  <FontAwesomeIcon icon={faCalendarTimes} className="icon" />
                </li>
                <li id="time">
                  <FontAwesomeIcon icon={faClock} className="icon" /> 15:00
                  onwards
                </li>
                <li id="place">
                  <FontAwesomeIcon icon={faMap} className="icon" />
                  Amiralsgatan 43C
                </li>
              </ul>
            </div>
          </section>
        )}
        <div id="child" style={{ display: isPending ? "block" : "none" }}>
          {" "}
          <div> Loading... </div>
        </div>
        <div id="formcontainer">
          {form && (
            <Form id="form" onSubmit={submitChanges}>
              <div>
                Are you attending?&nbsp;
                <Form.Select value={attendance} onChange={attendanceChange}>
                  <option value="Attending"> Yes </option>
                  <option value="Not Attending"> No </option>
                </Form.Select>
              </div>

              <div>
                Sidekicks:&nbsp;
                <Form.Select value={plusone} onChange={plusoneChange}>
                  {[...Array(10).keys()].map((number) => (
                    <option key={number} value={number}>
                      {" "}
                      +{number}{" "}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <Form.Label>
                {" "}
                Additional information (such as allergies):
              </Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
                value={allergy}
                onChange={allergyChange}
              />

              <Button type="submit" value="Submit">
                Submit
              </Button>
            </Form>
          )}
        </div>
      </section>
    </>
  );
};

export default Mainpage;
