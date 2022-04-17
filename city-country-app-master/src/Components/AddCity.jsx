import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export const AddCity = () => {
  const [cities, setCities] = useState({
    country: "",
    city: "",
    population: "",
  });
  const [countries, setCountries] = useState([]);
  let navigate = useNavigate();
  function handleCity(e) {
    const { id, value } = e.target;
    console.log(id, value);
    setCities({ ...cities, [id]: value });
  }
  function handleSubmit() {
    axios.post("http://localhost:5000/cities", cities).then((res) => {
      alert("Data  added sucessfully");
      setCities({
        country: "",
        city: "",
        population: "",
      });
      navigate("/");
    });
  }

  function getCountriesData() {
    axios.get("http://localhost:5000/countries").then((res) => {
      console.log(res.data);
      setCountries([...res.data]);
    });
  }
  useEffect(() => {
    getCountriesData();
  }, []);
  function handleNavigateUrl(value) {
    if (value === 1) {
      navigate("/add-country");
    } else {
      navigate("/");
    }
  }

  return (
    <>
      <Stack spacing={2} direction="row" style={{ "margin-left": "30%" }}>
        <Button variant="text" onClick={() => handleNavigateUrl(1)}>
          Add Country
        </Button>
        <Button variant="text" onClick={() => handleNavigateUrl(2)}>
          List of Cities
        </Button>
      </Stack>
      <h1>ADD CITY</h1>
      <label>Country: </label>
      <select name="" id="country" onChange={handleCity}>
        <option>Select Country</option>

        <option value="india">India</option>
        <option value="US">US</option>

        {countries.map((e) => {
          return (
            <>
              <option value={e.country}>{e.country}</option>
            </>
          );
        })}
      </select>

      <br />
      <input
        type="text"
        value={cities.cities}
        id="city"
        required
        placeholder="enter cities name"
        onChange={(e) => {
          handleCity(e);
        }}
      />
      <br />
      <input
        type="number"
        value={cities.population}
        id="population"
        placeholder="enter population"
        onChange={(e) => {
          handleCity(e);
        }}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};
