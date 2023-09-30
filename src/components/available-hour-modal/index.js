import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Modal, Select } from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";
import "react-datepicker/dist/react-datepicker.css";

import ReactDatePicker from "react-datepicker";
import { getEndTimeByDuration } from "../../utils";



function AvailableHourModal() {
  const [services, setServices] = useState([]);
  const [profs, setProfs] = useState([]);
  const [newProf, setNewProf] = useState({});
  const [open, setOpen] = useState(false);
  const [serviceInfo, setServiceInfo] = useState(null);
  const [serviceOpts, setServiceOpts] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [profOpts, setPrefOpts] = useState([]);
  const [serviceAvailableHours, setServiceAvailableHours] = useState([]);
  const [startFrom, setStartFrom] = useState("");
  const datepickerRef = useRef();

  useEffect(() => {
    getServices();
  }, [open]);


  useEffect(() => {
    filterProf();
  }, [selectedService]);


  const filterProf = () => {
    
  }

  const getServices = () => {
    let data = localStorage.getItem("bookingInfo");
    if (data) {
      let parsed = JSON.parse(data);
      if (parsed.services && parsed.services.length > 0) {
        setServices(parsed.services);
        setServiceAvailableHours(parsed.availableHours);
        console.log(parsed.services, "services");
        setServiceOpts(
          parsed.services.map((ele) => {
            return {
              key: ele.id,
              value: ele.name,
              text: ele.name,
            };
          })
        );
        setPrefOpts(
          parsed.profs.map((ele) => {
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

    let availableHours = [];

    let profsData = [];

    if (parsed.availableHours) {
      availableHours = parsed.availableHours;
    }

    if (parsed.profs) {
      profsData = parsed.profs;
    }

    profsData.push(newProf);

    availableHours.push({
      id: uuidv4(),
      profId: newProf.id,
      serviceId: serviceInfo.id,
      startFrom,
      end: getEndTimeByDuration(startFrom, serviceInfo.duration),
    });

    newData = {
      ...parsed,
      profs: profsData,
      availableHours,
    };

    localStorage.setItem("bookingInfo", JSON.stringify(newData));
  };

  console.log(selectedService, "selectedService");
  console.log(services, "services");
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
      trigger={<Button>Add available hour</Button>}
    >
      <Modal.Header>Add a new available hour</Modal.Header>
      <Modal.Content>
        <div>
          <Select
            placeholder="Select service"
            options={serviceOpts}
            onChange={(e) => {
              
              console.log(e.target.value, "target");
              console.log(e.target.innerText, "innreTExt");

              let service = services.find(
                (ele) => ele.name === e.target.innerText
              );

              console.log(services, "services========");
              if (service) {
                setServiceInfo(service);
                setSelectedService(service.id)
              }
            }}
          />
        </div>
        {!!serviceInfo && (
          <div ref={datepickerRef}>
            <ReactDatePicker
              showTimeSelectOnly
              onChange={(date) => {
                console.log(date, "date");
                const hours = date.getHours();
                const minutes = date.getMinutes().toString().padStart(2, "0");
                setStartFrom(hours + ":" + minutes);
              }}
              showTimeSelect
              timeFormat="HH:mm"
            />
            <span>{startFrom}</span>
          </div>
        )}
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

export default AvailableHourModal;
