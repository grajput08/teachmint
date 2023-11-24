import { useEffect, useState } from "react";
import axios from "axios";
import { TIME_API_BASE_URL, DEFAULT_COUNTRY } from "@/utils/constants";

interface Country {
  value: string;
  label: string;
}

const ClockTime: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] =
    useState<string>(DEFAULT_COUNTRY);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isClockRunning, setIsClockRunning] = useState<boolean>(true);

  useEffect(() => {
    // Fetch the list of countries
    axios
      .get<string[]>(`${TIME_API_BASE_URL}`)
      .then((response) =>
        setCountries(
          response.data.map((country) => ({ value: country, label: country }))
        )
      )
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  useEffect(() => {
    // Fetch the current time for the selected country
    const fetchTime = async () => {
      try {
        const response = await axios.get(
          `${TIME_API_BASE_URL}/timezone/${selectedCountry}`
        );
        const formattedTime = response.data.datetime
          ?.split("T")[1]
          .split(".")[0];
        setCurrentTime(formattedTime);
      } catch (error) {
        console.error("Error fetching current time:", error);
      }
    };

    if (isClockRunning) {
      fetchTime();
      const intervalId = setInterval(fetchTime, 1000);

      return () => clearInterval(intervalId);
    }
  }, [selectedCountry, isClockRunning]);

  useEffect(() => {
    // Fetch the list of countries
    axios
      .get<string[]>(`${TIME_API_BASE_URL}/api/timezone`)
      .then((response) =>
        setCountries(
          response.data.map((country) => ({ value: country, label: country }))
        )
      )
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };

  const toggleClock = () => {
    setIsClockRunning(!isClockRunning);
  };

  return (
    <div className="d-flex align-items-center flex-wrap justify-content-end">
      <div className="mb-3">
        <select onChange={handleCountryChange} value={selectedCountry}>
          <option value="" disabled>
            Select a country
          </option>
          {countries.map((country) => (
            <option key={country.value} value={country.value}>
              {country.label}
            </option>
          ))}
        </select>
      </div>
      <div className="d-flex align-items-center mb-3">
        <div className="digital-clock">{currentTime}</div>
        <button className="btn btn-dark" onClick={toggleClock}>
          {isClockRunning ? "Pause" : "Start"}
        </button>
      </div>
    </div>
  );
};

export default ClockTime;
