import React, { useContext } from "react";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarDays,
  faCar,
  faLocationDot,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
// v.v.imp, gives error w/o locale
import { enUS } from "date-fns/locale"; // Import the locale
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openOptions, setOpenOptions] = useState(false);

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => ({
      //The function returns a new object (which will update the options state), created by using the spread operator (...prev).
      //The spread operator ...prev copies all the existing properties from the prev state object (e.g., adult, children, room) into the new object, which ensures that the other properties of options remain unchanged.The spread operator ...prev copies all the existing properties from the prev state object (e.g., adult, children, room) into the new object, which ensures that the other properties of options remain unchanged.
      ...prev,
      //The object initializer syntax also supports computed property names. That allows you to put an expression in square brackets [], that will be computed and used as the property name.

      //Since the name is a variable that changes depending on the button clicked, you need to access the property of prev using bracket notation, like this:
      //if name is children, then prev[name] is equivalent to prev.children
      [name]: operation === "i" ? prev[name] + 1 : prev[name] - 1,
    }));
  };

  const { dispatch } = useContext(SearchContext);

  /* This allows the /hotels page/component to access the state data (e.g., destination, date, and options) */
  /* In the /hotels page, you can access the state using the useLocation hook from React Router:*/
  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };

  return (
    <div className="Header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car Rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
        {type !== "list" && (
          //<> </> is a way to group a block of code
          <>
            <h1 className="headerTitle">Find your next stay</h1>
            <h2 className="subTitle">
              Search low prices on hotels, homes and much more...
            </h2>
            <button className="headerbtn">Sign in/Register</button>

            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >
                  {`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(
                    dates[0].endDate,
                    "dd/MM/yyyy"
                  )}`}
                </span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    locale={enUS} // Add the locale here
                    minDate={new Date()}
                  />
                )}
              </div>

              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.adult} adult | ${options.children} children | ${options.room} room`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCntr">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCntrBtn"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCntrNum">{options.adult}</span>
                        <button
                          className="optionCntrBtn"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCntr">
                        <button
                          disabled={options.children <= 0}
                          className="optionCntrBtn"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCntrNum">
                          {options.children}
                        </span>
                        <button
                          className="optionCntrBtn"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCntr">
                        <button
                          disabled={options.room <= 1}
                          className="optionCntrBtn"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCntrNum">{options.room}</span>
                        <button
                          className="optionCntrBtn"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button className="headerbtn" onClick={handleSearch}>
                Search
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
