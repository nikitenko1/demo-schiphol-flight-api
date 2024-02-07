import { useState } from "react";
import { ImSearch } from "react-icons/im";
import { toast } from "react-toastify";
import styled from "styled-components";

const Search = ({ dataArrival, dataDeparture, setFilteredData, arrival }) => {
  const [inputValue, setInputValue] = useState("");

  const searchFilterHandler = (e) => {
    setInputValue("");
    setFilteredData("");
    e.preventDefault();

    if (inputValue.length > 0) {
      setFilteredData(
        !arrival
          ? dataDeparture.filter((departure) => {
              return departure?.flightName.toLowerCase() === inputValue.toLowerCase();
            })
          : dataArrival.filter((arrival) => {
              return arrival?.flightName.toLowerCase() === inputValue.toLowerCase();
            })
      );
    } else {
      toast.warn("Enter a Flight Name", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <SearchContainer>
      <form onSubmit={searchFilterHandler}>
        <SearchFilter
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={"Enter Flight Name"}
        />
        <ImSearch size={"1.2rem"} style={btnStyle} type={"submit"} onClick={searchFilterHandler} />
      </form>
    </SearchContainer>
  );
};

export default Search;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const SearchFilter = styled.input`
  padding-left: 1rem;
  width: 22rem;
  margin-left: 0.5rem;
  height: 3.3rem;
  border-radius: 1rem;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  font-size: 1rem;
  font-weight: 600;
`;

const btnStyle = {
  position: "absolute",
  right: "1rem",
  top: "37%",
  cursor: "pointer",
  backgroundColor: "#141251",
  padding: "0.5rem",
  color: "#fff",
  width: "20px",
  height: "20px",
  borderRadius: "50%",
};
