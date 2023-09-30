import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Segment, Header } from "semantic-ui-react";

function Service() {
  const { id } = useParams();
  const [profData, setProfData] = useState([]);

  useEffect(() => {
    getProfs();
  }, []);

  const navigate = useNavigate();

  const getProfs = () => {
    let data = localStorage.getItem("bookingInfo");
    if (data) {
      let parsed = JSON.parse(data);
      if (parsed.availableHours && parsed.availableHours.length > 0) {
        const matchingAvailableHours = parsed.availableHours.filter(
          (entry) => entry.serviceId === id
        );

        const uniqueProfIds = [
          ...new Set(matchingAvailableHours.map((entry) => entry.profId)),
        ];

        const professionalsAndTheirHours = uniqueProfIds
          .map((profId) => {
            const professional = parsed.profs.find(
              (prof) => prof.id === profId
            );

            return professional;
          })
          .filter(Boolean);

        setProfData(professionalsAndTheirHours);
      }
    }
  };

  return (
    <Container>
      {profData.length === 0 ? (
        <div>No professionals for this service</div>
      ) : (
        <div>
          <Header>Select a professional</Header>
          {
            profData.map((item) => {
              return (
                <Segment
                  key={item.id}
                  onClick={() =>
                    navigate(`/services/${id}/professional/${item?.id}`)
                  }
                >
                  <span>{item?.name}</span> <span>{item?.surname}</span>
                </Segment>
              );
            })
          }
        </div>
      )}
    </Container>
  );
}

export default Service;
