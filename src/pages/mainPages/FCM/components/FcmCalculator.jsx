import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getCalcItems, getFCMTotal } from "../../../../helpers/utilities";
import { useForm } from "../../../../hooks/useForm";
import { procedureTypes } from "../../../../types/types";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Tooltip,
} from "@mui/material";
import { Info } from "@mui/icons-material";

export const initialState = {
  puppiesNum: 0,
  partnerNum: 0,
  tattosNum: 0,
  olderThan3Months: false,
  transfersNum: 0,
  sedationIsNeeded: false,
};
export const FcmCalculator = ({ recProcedure = {} }) => {
  const [procedureSelection, setProcedureSelection] = useState(recProcedure);
  const [procedure, setprocedure] = useState({});

  const [calcItems, setcalcItems] = useState([]);

  const { values, handleInputChange, reset } = useForm(initialState);

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

  return (
    <div className="mb-5r">
      <h4 className="heading--tertiary mb-3r">Calculadora de costos</h4>
      <div className="c-card mb-3r">
        <p>
          <span className="fw-bold">Nota:</span> Los costos de esta calculadora
          son con respecto a los trámites de la FCM, pero pueden haber costos
          adicionales, especialmente lo relativo a la sedación en caso de perros intranquilos. De igual forma los precios dependen de la FCM, por lo que están sujetos a cambios sin previo aviso.
        </p>
      </div>
      {/* Select procedure */}
      <div className="l-flex mb-3r">
        <FormControl
          sx={{
            m: 1,
            minWidth: "30rem",
          }}
        >
          <InputLabel id="demo-simple-select-label">Trámite</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={procedureSelection}
            label="Trámite"
            onChange={handleChange}
          >
            {Object.keys(procedureTypes).map((key) => {
              return (
                <MenuItem key={key} value={procedureTypes[key].value}>
                  {procedureTypes[key].title}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>

      <div className="mb-3r">
        <form>
          <div className="fcmCalcInputsWrapper">
            {procedure?.questions &&
              procedure.questions.map((question) => {
                if (!question.isBoolean) {
                  return (
                    <div className="fcmCalcInput">
                      <label htmlFor="" className="fcmCalcInput_label">
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
                        className="fcmCalcInput_input form-control"
                      />
                    </div>
                  );
                }
                return (
                  <div className="fcmCalcInput">
                    <label htmlFor="" className="fcmCalcInput_label">
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
        <div className="mb-3r">
          <table className="fcmCalcTable">
            <thead className="">
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
                    <td>{calcItem.text}</td>
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
        <div className="l-flex mb-3r">
          <div className="fcmCalcTotal">
            <div>TOTAL</div>
            <div>$ {getFCMTotal(calcItems)}</div>
          </div>
        </div>
      )}
    </div>
  );
};
