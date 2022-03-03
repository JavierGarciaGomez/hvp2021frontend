import React, { Fragment } from "react";

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { createFcmPartner } from "../../actions/fcmActions";
import { InputGroupNew } from "../../components/ui/InputGroupNew";
import { uploadImg } from "../../helpers/uploadImg";
import {
  fireSwalError,
  trimAllElements,
  trimAllValues,
} from "../../helpers/utilities";
import { useForm } from "../../hooks/useForm";

let initialValues = {
  firstName: "",
  paternalSurname: "",
  maternalSurname: "",
  partnerNum: "",
  expirationDate: "",
  street: "",
  number: "",
  suburb: "",
  postalCode: "",
  city: "",
  state: "Yucatán",
  country: "México",
  homePhone: "",
  mobilePhone: "",
  email: "",
  url: "",
};

export const FcmPartnerForm = () => {
  const dispatch = useDispatch();
  console.log("initial", initialValues);
  const { values, handleInputChange, reset, setFullValues } =
    useForm(initialValues);

  console.log("estos son values,", values);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedValues = trimAllValues(values);

    // Validation
    let errors = [];
    let formIsValid = false;

    // first_name
    if (trimmedValues.firstName.length < 2) {
      errors.push("El nombre no puede estar vacío.");
    }
    if (trimmedValues.paternalSurname.length < 2) {
      errors.push("El apellido no puede estar vacío.");
    }
    if (trimmedValues.partnerNum.length < 4) {
      errors.push("El número de socio tiene muy pocos carácteres.");
    }
    if (trimmedValues.expirationDate.length < 4) {
      errors.push("La fecha de expiración debe estar seleccionada.");
    }
    if (trimmedValues.mobilePhone.length < 7) {
      errors.push("El número telefónico es muy corto.");
    }
    if (trimmedValues.email.length < 4) {
      errors.push("El email no puede estar vacío.");
    }
    if (trimmedValues.url.length < 4) {
      errors.push("Se debe anexar una fotografía de la tarjeta.");
    }

    if (errors.length > 0) {
      return fireSwalError(errors.join(" "));
    }

    dispatch(createFcmPartner(values));
  };
  const handleFileChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (file) {
      if (file.size > 1000000) {
        e.target.value = "";
        return fireSwalError("El archivo no puede ser superior a 1mb");
      }
      if (file["type"].split("/")[0] !== "image") {
        e.target.value = "";
        return fireSwalError("El archivo tiene que ser una imagen");
      }
      const tempImgUrl = await uploadImg(file);
      setFullValues({ ...values, url: tempImgUrl });
    }
  };

  return (
    <Fragment>
      {/* vincular luego */}
      <h2 className="heading--tertiary">Agrega una identificación de socio</h2>

      <div className="c-card mb-5r">
        <h4 className="heading--quaternary">Nota:</h4>
        <p>
          Solo es necesario llenar los datos marcados con un asterisco cuando se
          trate de vincular una tarjeta ajena a la cuenta.
        </p>
        <p>
          Cuando se trate de una tarjeta propia, de una nueva tarjeta o de una
          renovación, se deberán llenar todos los datos.
        </p>
      </div>

      <form className="row" onSubmit={handleSubmit}>
        {/* TARJETA */}
        <h4 className="heading--quaternary">Tarjeta</h4>
        <div className="col-md-6 mb-3">
          <label htmlFor="" className="form-label mb-3">
            Imagen de la tarjeta*
          </label>
          <input
            className="form-control"
            type="file"
            accept="image/*"
            id="file"
            onChange={handleFileChange}
            name="file"
          />
        </div>
        <div className="col-md-6 mb-3">
          {/* todo classname */}
          <img className="" src={values.url} alt="" />
        </div>
        <h4 className="heading--quaternary">Datos de identificación</h4>
        <InputGroupNew
          containerClasses="col-md-4 mb-3"
          label="Nombre (s)*"
          type="text"
          name="firstName"
          value={values.firstName}
          onChange={handleInputChange}
          required={true}
        />
        <InputGroupNew
          containerClasses="col-md-4 mb-3"
          label="Apellido paterno*"
          type="text"
          name="paternalSurname"
          value={values.paternalSurname}
          onChange={handleInputChange}
          required={true}
        />
        <InputGroupNew
          containerClasses="col-md-4 mb-3"
          label="Apellido materno*"
          type="text"
          name="maternalSurname"
          value={values.maternalSurname}
          onChange={handleInputChange}
          required={true}
        />

        <InputGroupNew
          containerClasses="col-md-6 mb-3"
          label="Número de socio*"
          type="text"
          name="partnerNum"
          value={values.partnerNum}
          onChange={handleInputChange}
          required={true}
        />

        <InputGroupNew
          containerClasses="col-md-6 mb-3"
          label="Fecha de expiración*"
          type="date"
          name="expirationDate"
          value={values.expirationDate}
          onChange={handleInputChange}
          required={true}
        />

        <h4 className="heading--quaternary u-mt-5r">Dirección</h4>
        <InputGroupNew
          containerClasses="col-md-3 mb-3"
          label="Calle"
          type="text"
          name="street"
          value={values.street}
          onChange={handleInputChange}
        />

        <InputGroupNew
          containerClasses="col-md-3 mb-3"
          label="Número"
          type="text"
          name="number"
          value={values.number}
          onChange={handleInputChange}
        />
        <InputGroupNew
          containerClasses="col-md-3 mb-3"
          label="Colonia o fraccionamiento"
          type="text"
          name="suburb"
          value={values.suburb}
          onChange={handleInputChange}
        />
        <InputGroupNew
          containerClasses="col-md-3 mb-3"
          label="Código postal"
          type="text"
          name="postalCode"
          value={values.postalCode}
          onChange={handleInputChange}
        />
        <InputGroupNew
          containerClasses="col-md-4 mb-3"
          label="Ciudad"
          type="text"
          name="city"
          value={values.city}
          onChange={handleInputChange}
        />
        <InputGroupNew
          containerClasses="col-md-4 mb-3"
          label="Estado"
          type="text"
          name="state"
          value={values.state}
          onChange={handleInputChange}
        />
        <InputGroupNew
          containerClasses="col-md-4 mb-3"
          label="País"
          type="text"
          name="country"
          value={values.country}
          onChange={handleInputChange}
        />

        <h4 className="heading--quaternary u-mt-5r">Contacto</h4>
        <InputGroupNew
          containerClasses="col-md-4 mb-3"
          label="Teléfono"
          type="text"
          name="homePhone"
          value={values.homePhone}
          onChange={handleInputChange}
        />
        <InputGroupNew
          containerClasses="col-md-4 mb-3"
          label="Teléfono móvil*"
          type="text"
          name="mobilePhone"
          value={values.mobilePhone}
          onChange={handleInputChange}
          required={true}
        />
        <InputGroupNew
          containerClasses="col-md-4 mb-3"
          label="Correo electrónico*"
          type="email"
          name="email"
          value={values.email}
          onChange={handleInputChange}
          required={true}
        />

        <div className="d-flex justify-content-evenly u-mt-3r">
          <button className="btn btn-primary" type="submit">
            Guardar
          </button>
          <Link to={`/dashboard/documentation`}>
            <button className="btn btn-danger" type="button">
              Cancelar
            </button>
          </Link>
        </div>
      </form>
    </Fragment>
  );
};
