import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Select } from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";
import "react-datepicker/dist/react-datepicker.css";

import { getEndTimeByDuration } from "../../utils";
function ProfessionalModal() {
  const [services, setServices] = useState([]);
  const [profs, setProfs] = useState([]);
  const [newProf, setNewProf] = useState({});
  const [open, setOpen] = useState(false);
  const [serviceInfo, setServiceInfo] = useState(null);
  const [serviceOpts, setServiceOpts] = useState([]);
  const [serviceAvailableHours, setServiceAvailableHours] = useState([]);
  const [startFrom, setStartFrom] = useState("");

  useEffect(() => {
    getServices();
  }, [open]);


  const getServices = () => {
    let data = localStorage.getItem("bookingInfo");
    if (data) {
      let parsed = JSON.parse(data);
      if (parsed.services && parsed.services.length > 0) {
        setServices(parsed.services);
        setServiceAvailableHours(parsed.availableHours);
        setServiceOpts(
          parsed.services.map((ele) => {
            return {
              key: ele.id,
              value: ele.name,
              text: ele.name,
            };
          })
        );
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProf({ ...newProf, [name]: value });
  };

  const saveProfs = (newProf) => {
    console.log(newProf, "newProf");
    let data = localStorage.getItem("bookingInfo") || "{}";
    let newData = {};

    let parsed = JSON.parse(data);

    let profsData = [];

    if (parsed.profs) {
      profsData = parsed.profs;
    }

    profsData.push(newProf);

    newData = {
      ...parsed,
      profs: profsData,
    };

    localStorage.setItem("bookingInfo", JSON.stringify(newData));
  };

  console.log(serviceOpts, "startFrom");
  console.log(serviceInfo, "serviceInfo");
  console.log(serviceAvailableHours, "serviceAvailableHours");
  return (
    <Modal
      dimmer={"blurring"}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
      trigger={<Button>Create a professional</Button>}
    >
      <Modal.Header>Add a new professional</Modal.Header>
      <Modal.Content>
        <div>
          <Input
            value={newProf["name"]}
            onChange={handleChange}
            name="name"
            placeholder="Name"
          />
        </div>
        <div>
          <Input
            value={newProf["surname"]}
            onChange={handleChange}
            name="surname"
            placeholder="Surname"
          />
        </div>
        <div>
          <Select
            placeholder="Select service"
            options={serviceOpts}
            onChange={(e) => {
              let service = services.find(
                (ele) => ele.name === e.target.innerText
              );

              if (service) {
                setServiceInfo(service);
              }
            }}
          />
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button
          primary
          onClick={() => {
            if (
              !newProf.name ||
              newProf.name.length === 0 ||
              !newProf.surname ||
              newProf.surname.length === 0
            ) {
              alert("All fields are requried and shouldnt be empty");
              return; //fix this later
            }
            if (profs.find((ele) => ele.name === newProf.name)) {
              alert("this prof already exists");
              return;
            }

            let newProfData = {
              ...newProf,
              serviceId: serviceInfo.id,
              id: uuidv4(),
            };

            let newProfs = [...profs, { ...newProfData }];

            setProfs(newProfs);
            setOpen(false);
            saveProfs(newProfData);
            setNewProf({});
            setServiceInfo(null);
            setStartFrom(null);
          }}
        >
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ProfessionalModal;
