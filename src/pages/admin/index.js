import { Container } from "semantic-ui-react";

import ServiceModal from "../../components/service-modal";
import ProfessionalModal from "../../components/professionals-modal";
import AvailableHourModal from "../../components/available-hour-modal";


function Admin() {
  return (
    <Container>
      <ServiceModal />
      <ProfessionalModal />
      <AvailableHourModal />
    </Container>
  );
}

export default Admin;
