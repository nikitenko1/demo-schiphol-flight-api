import { useState } from "react";
import styled from "styled-components";
import { FaArrowCircleUp } from "react-icons/fa";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <Button>
      <FaArrowCircleUp onClick={scrollToTop} style={{ display: visible ? "inline" : "none" }} />
    </Button>
  );
};

export default ScrollButton;

const Button = styled.div`
  position: fixed;
  width: 100%;
  bottom: 4rem;
  left: 90vw;
  height: 1rem;
  font-size: 3rem;
  z-index: 1;
  cursor: pointer;
  color: rgb(20, 18, 81);
  @media (max-width: 768px) {
    left: 85vw;
  }
`;
