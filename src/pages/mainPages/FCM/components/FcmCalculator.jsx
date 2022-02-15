import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getCalcItems, getFCMTotal } from "../../../../helpers/utilites";
import { useForm } from "../../../../hooks/useForm";
import { procedureTypes } from "../../../../types/types";
import {
  Box,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Switch,
  Tooltip,
} from "@mui/material";
import { Check, Info } from "@mui/icons-material";

export const initialState = {
  puppiesNum: 0,
  partnerNum: 0,
  olderThan3Months: false,
  transfersNum: 0,
  sedationIsNeeded: false,
};
export const FcmCalculator = ({ recProcedure = {} }) => {
  console.log("recProcedure", recProcedure);
  const [procedureSelection, setProcedureSelection] = useState(recProcedure);
  const [procedure, setprocedure] = useState({});

  const [calcItems, setcalcItems] = useState([]);

  const { values, handleInputChange, reset, setFullValues } =
    useForm(initialState);

  const handleChange = (event) => {
    reset();
    setProcedureSelection(event.target.value);
  };

  useEffect(() => {
    setprocedure(procedureTypes[procedureSelection]);
    // if (procedureSelection !== "")
    //   setquestions(procedureTypes[procedureSelection].questions);
  }, [procedureSelection]);

  useEffect(() => {
    setcalcItems(getCalcItems(procedure, values));
  }, [procedure, values]);

  console.log(
    "DATA",
    "procedure",
    procedureSelection,
    "values",
    values,
    "procedure",
    procedure,
    "calcitems",
    calcItems
  );
  return (
    <div className="mp-FCM__section-calc mb-5r">
      <h4 className="mp-FCM__section-heading">Calculadora de costos</h4>
      <div className="mp-FCM__calc-disclaimer mb-3r">
        <span>Nota:</span> Los costos de esta calculadora son con respecto a los
        trámites de la FCM, pero pueden haber costos adicionales.
      </div>
      <div className="mp-FCM__calc-select d-flex justify-content-center mb-3r">
        <FormControl
          sx={{
            m: 1,
            minWidth: "30rem",
            fontSize: "3.6rem",
          }}
        >
          <InputLabel id="demo-simple-select-label" sx={{ fontSize: "1.6rem" }}>
            Trámite
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={procedureSelection}
            label="Trámite"
            onChange={handleChange}
            sx={{ fontSize: "1.6rem" }}
          >
            {Object.keys(procedureTypes).map((key) => {
              return (
                <MenuItem
                  key={key}
                  value={procedureTypes[key].value}
                  sx={{ fontSize: "1.6rem" }}
                >
                  {procedureTypes[key].title}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>

      <div className="mp-FCM__calc-form mb-3r">
        <form>
          <div className="mp-FCM__calc-questions-container">
            {procedure?.questions &&
              procedure.questions.map((question) => {
                if (!question.isBoolean) {
                  return (
                    <div className="mp-FCM__calc-question">
                      <label htmlFor="" className="mp-FCM__calc-label">
                        {question.question}&nbsp;
                        <Tooltip
                          title={
                            <span style={{ fontSize: "1.6rem", lineHeight: 1 }}>
                              {question.tooltip}
                            </span>
                          }
                        >
                          <Info />
                        </Tooltip>
                      </label>
                      <input
                        type={question.type}
                        name={question.name}
                        value={values[question.name]}
                        onChange={handleInputChange}
                        className="mp-FCM__calc-input form-control"
                      />
                    </div>
                  );
                }
                return (
                  <div className="mp-FCM__calc-question">
                    <label htmlFor="" className="mp-FCM__calc-label">
                      {question.question} &nbsp;
                      <Tooltip
                        title={
                          <span style={{ fontSize: "1.6rem", lineHeight: 1 }}>
                            {question.tooltip}
                          </span>
                        }
                      >
                        <Info />
                      </Tooltip>
                    </label>
                    <Switch
                      checked={values[question.name]}
                      onChange={handleInputChange}
                      name={question.name}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </div>
                );
              })}
          </div>
        </form>
      </div>
      {/* Calculations */}
      {calcItems && (
        <div className="mp-FCM__calc-calculations  mb-3r">
          <table className="mp-FCM__calc-table">
            <thead className="mp-FCM__calc-tablehead">
              <tr>
                <th>Concepto</th>
                <th>Cantidad</th>
                <th>Monto</th>
                <th>Subtotal</th>
              </tr>
            </thead>

            <tbody>
              {calcItems.map((calcItem) => {
                return (
                  <tr>
                    <th>{calcItem.text}</th>
                    <td>{calcItem.qty}</td>
                    <td>{calcItem.price}</td>
                    <td>$ {calcItem.subtotal}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* TOTAL */}
      {calcItems && (
        <div className="mp-FCM__calc-total mb-3r">
          <div className="mp-FCM__calc-totalBox">
            <div>TOTAL</div>
            <div>$ {getFCMTotal(calcItems)}</div>
          </div>
        </div>
      )}
    </div>
  );
};
