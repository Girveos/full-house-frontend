import React, { useState, useEffect } from "react";
import "./Pqrsf.scss";
import { Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { PqrsfForm } from "./PqrsfForm";

const Pqrsf = () => {
  const [activeButton, setActiveButton] = useState("PQRSF");

  return (
    <div className="Pqrsf-container">
      <div className="PQRSF">
        <div className="PQRSF-Form">
          <div className="PQRSF-Form-content">
            <div className="PQRSF-Form-content-title">
              <label className="PQRSF-Form-content-title-label">PQRSF</label>
            </div>
            <PqrsfForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pqrsf;
