import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Header, Table } from "semantic-ui-react";

function Home() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getServices();
  }, []);

  const getServices = () => {
    let data = localStorage.getItem("bookingInfo");
    if (data) {
      let parsed = JSON.parse(data);
      if (parsed.services && parsed.services.length > 0) {
        setServices(parsed.services);
      }
    }
  };

  return (
    <Container>
      <Header>Select a service</Header>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Service Name</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            services?.map((item) => {
              return (
                <Table.Row
                  key={item.id}
                  onClick={() => {
                    navigate(`/services/${item.id}`);
                  }}
                >
                  <Table.Cell>{item.name}</Table.Cell>
                </Table.Row>
              )
            })
          }
        </Table.Body>
      </Table>
    </Container>
  );
}

export default Home;
