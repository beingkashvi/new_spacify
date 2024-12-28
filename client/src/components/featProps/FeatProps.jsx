import React from "react";
import "./featProps.css";
import useFetch from "../../hooks/useFetch";

const FeatProps = () => {
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=4");
  return (
    <div className="featProps">
      {loading ? (
        "loading"
      ) : (
        <>
          {data.map((item) => (
            <div className="featItem" key={item._id}>
              <img src={item.photos[0]} alt="" className="featItemImg" />
              <span className="fpname">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">
                Starting from ${item.cheapestPrice}
              </span>
              {item.rating && (
                <span className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </span>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeatProps;
