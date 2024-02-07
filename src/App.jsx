import { useEffect, useState } from "react";
import styled from "styled-components";
import flag from "./assets/dutchflag.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImCalendar } from "react-icons/im";
import Time from "./components/Time";
import BoardTypeButtons from "./components/BoardTypeButtons";
import Search from "./components/SearchFilter/Search";
import Board from "./components/Board";
import LaterButton from "./components/LaterButton";
import ScrollButton from "./components/ScrollButton";
import DateSelect from "./components/DateSelect";

const App = () => {
  const [dataArrival, setDataArrival] = useState([]);
  const [dataDeparture, setDataDeparture] = useState([]);
  const [page, setPage] = useState(0);
  const [arrival, setArrival] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  let date = new Date();
  date.setHours(date.getHours() + 2);
  date.setMinutes(date.getMinutes() + 60);

  const dateNow = currentDate;

  const day = String(dateNow.getDate()).padStart(2, "0");
  const month = String(dateNow.getMonth() + 1).padStart(2, "0");
  const year = +String(dateNow.getFullYear()).padStart(2, "0");

  const fetchData = async (date) => {
    const tomorrow = new Date(Number(date));
    tomorrow.setDate(tomorrow.getDate() + 1);

    setLoading(true);

    const url = `/api/flights?flightDirection=${arrival ? "A" : "D"}&fromDateTime=${
      date.toJSON().split(".")[0]
    }&toDateTime=${
      tomorrow.toJSON().split(".")[0]
    }&searchDateTimeField=scheduleDateTime&page=${page}&sort=+scheduleDate, +scheduleTime`;

    // fromDateTime Format: yyyy-MM-dd'T'HH:mm:ss
    // toDateTime Format: yyyy-MM-dd'T'HH:mm:ss
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        app_id: process.env.PUBLIC_APP_ID,
        app_key: process.env.PUBLIC_APP_KEY,
        ResourceVersion: "v4",
      },
    });

    const data = await res.json();
    console.log(data);
    arrival ? setDataArrival([...data?.flights]) : setDataDeparture([...data?.flights]);

    setTimeout(() => {
      setLoading(false);
    }, 100);
  };

  const nextPageFetchData = () => {
    setPage((current) => current + 1);
  };

  const dates = [0, 1, 2, 3, 4, 5, 6, 7];

  const selectDateHandler = (e) => {
    const selectedDate = new Date();
    selectedDate.setDate(selectedDate.getDate() + Number(e.target.value));
    setCurrentDate(selectedDate);
  };

  useEffect(() => {
    fetchData(currentDate);
  }, [page, arrival, currentDate]);

  return (
    <MainContainer>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <DateContainer>
        <DateView>
          <ImCalendar />
          {day}.{month}.{year}
        </DateView>
        <TitleContainer>
          <FlagImage src={flag} />
          <MainTitle>Schipol Airport Flights</MainTitle>
        </TitleContainer>
        <Time />
      </DateContainer>
      <MiddleContainer>
        <SearchContainer>
          <BoardTypeButtons arrival={arrival} setArrival={setArrival} />
          <DateSelect dates={dates} selectDateHandler={selectDateHandler} />
          <Search
            arrival={arrival}
            setArrival={setArrival}
            filteredData={filteredData}
            setFilteredData={setFilteredData}
            dataArrival={dataArrival}
            dataDeparture={dataDeparture}
          />
        </SearchContainer>
      </MiddleContainer>
      {arrival ? (
        <Board arrival={arrival} data={dataArrival} filteredData={filteredData} />
      ) : (
        <Board arrival={arrival} data={dataDeparture} filteredData={filteredData} />
      )}
      {!filteredData.length ? (
        <LaterButton loading={loading} nextPageFetchData={nextPageFetchData} page={page} />
      ) : null}
      <ScrollButton />
    </MainContainer>
  );
};

export default App;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  justify-content: space-evenly;
  width: 94%;
  padding: 1rem;
  flex-wrap: wrap;
  background-color: #fff;
  border-radius: 1rem;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
  }
`;

const DateView = styled.h2`
  font-size: 2rem;
  margin: 0;
  outline-offset: 0.8rem;
  border-radius: 1rem;
  color: #141251;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const FlagImage = styled.img`
  height: 50px;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
  margin-top: 2rem;
`;

const MainTitle = styled.h1`
  font-size: 2rem;
  line-height: 1.069;
  max-width: 26.875rem;
  color: #141251;
`;

const MiddleContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
`;
