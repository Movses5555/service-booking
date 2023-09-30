import React, { useEffect, useState } from "react";
import { Button, Input, Modal } from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";
function ServiceModal() {
  const [services, setServices] = useState([]);
  const [serviceModal, setServiceModal] = useState(false);
  const [newService, setNewService] = useState({});
  useEffect(() => {
    getServices();
  }, []);

  const saveServices = (newServices) => {
    let data = localStorage.getItem("bookingInfo") || "{}";
    let newData = {};

    let parsed = JSON.parse(data);
    newData = {
      ...parsed,
      services: newServices,
    };

    localStorage.setItem("bookingInfo", JSON.stringify(newData));
  };
  const getServices = () => {
    let data = localStorage.getItem("bookingInfo");
    if (data) {
      let parsed = JSON.parse(data);
      if (parsed.services && parsed.services.length > 0) {
        setServices(parsed.services);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  return (
    <Modal
      dimmer={"blurring"}
      onClose={() => setServiceModal(false)}
      onOpen={() => setServiceModal(true)}
      open={serviceModal}
      size="small"
      trigger={<Button>Create a service</Button>}
    >
      <Modal.Header>Add a new service</Modal.Header>
      <Modal.Content>
        <div>
          <Input
            value={newService["name"]}
            onChange={handleChange}
            name="name"
            placeholder="Name"
          />
        </div>

        <div>
          <Input
            onChange={handleChange}
            value={newService["price"]}
            name="price"
            step="1000"
            min="1000"
            placeholder="Price"
            type="number"
          />
        </div>

        <div>
          <Input
            onChange={handleChange}
            labelPosition="right"
            value={newService["duration"]}
            name="duration"
            min="30"
            max="90"
            step="5"
            defaultValue="30"
            placeholder="Duration"
            label="min"
            type="number"
          />
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button
          primary
          onClick={() => {
            console.log(newService, "new");
            if (!newService.name.length === 0 || !newService.price) {
              alert("All fields are requried and shouldnt be empty");
              return; //fix this later
            }
            if (services.find((ele) => ele.name === newService.name)) {
              alert("this service already exists");
              return;
            }
            let newServices = [
              ...services,
              {
                ...newService,
                id: uuidv4(),
                duration: newService.duration || "30",
              },
            ];

            setServices(newServices);
            setServiceModal(false);
            saveServices(newServices);
            setNewService({});
          }}
        >
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ServiceModal;
