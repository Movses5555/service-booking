import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Segment } from "semantic-ui-react";

function Professional() {
  const { id, serviceId } = useParams();
  const [hours, setHours] = useState([]);
  useEffect(() => {
    getHours();
  }, []);

  const getHours = () => {
    let data = localStorage.getItem("bookingInfo");
    if (data) {
      let parsed = JSON.parse(data);
      if (parsed.availableHours && parsed.availableHours.length > 0) {
        console.log(parsed.availableHours, "hours");
        let finalData = parsed.availableHours.filter((ele) => {
          return ele.profId === id && ele.serviceId === serviceId;
        });
        setHours(finalData);
        console.log(finalData, "finalData");
      }
    }
  };
  return (
    <Container>
      {hours.map((ele) => {
        let bookedHours = JSON.parse(
          localStorage.getItem("bookedHours") || "[]"
        );
        let isBooked = bookedHours.find((hour) => hour === ele.id);
        return (
          <Segment
            className={`${!!isBooked ? "isBooked" : ""}`}
            onClick={() => {
              console.log("a");
              const bool = window.confirm(
                "Book this professional for this time?"
              );

              if (bool) {
                let bookedHours = localStorage.getItem("bookedHours") || "[]";
                let data = JSON.parse(bookedHours);
                data.push(ele.id);
                localStorage.setItem("bookedHours", JSON.stringify(data));
                alert("Successfuly booked the service!");
              }
            }}
          >
            <span>{ele.startFrom}</span>
            {" - "}
            <span>{ele.end}</span>
          </Segment>
        );
      })}
    </Container>
  );
}

export default Professional;
