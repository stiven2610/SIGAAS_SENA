import React, { useState, useEffect } from "react";
import Modal from "./modalsesion"; 

const InactivityTimer = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  let inactivityTimeout;

  useEffect(() => {
    const resetTimer = () => {
      if (showModal) return; 
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(() => setShowModal(true), 300000); 
    };

    const events = [
      "load",
      "mousemove",
      "mousedown",
      "click",
      "scroll",
      "keypress",
    ];

    const handleUserActivity = () => {
      resetTimer();
    };

    events.forEach((event) => {
      window.addEventListener(event, handleUserActivity);
    });

    resetTimer();

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });
      clearTimeout(inactivityTimeout);
    };
  }, [showModal]);

  const closeModal = () => {
    setShowModal(false);
    clearTimeout(inactivityTimeout); 
    inactivityTimeout = setTimeout(() => setShowModal(true), 300000); 
  };

  return (
    <>
      {children}
      <Modal showModal={showModal} onClose={closeModal} />
    </>
  );
};

export default InactivityTimer;
