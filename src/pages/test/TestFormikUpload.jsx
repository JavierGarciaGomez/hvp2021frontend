import { Box, Typography } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { DragImageUpload } from "../../components/formsUI/DragImageUpload";

export const TestFormikUpload = () => {
  return (
    <div>No pude</div>
    // <div className="container">
    //   <Formik
    //     initialValues={{ file: null }}
    //     onSubmit={(values) => {
    //       alert(
    //         JSON.stringify(
    //           {
    //             fileName: values.file.name,
    //             type: values.file.type,
    //             size: `${values.file.size} bytes`,
    //           },
    //           null,
    //           2
    //         )
    //       );
    //     }}
    //     validationSchema={Yup.object().shape({
    //       file: Yup.mixed().required(),
    //     })}
    //     render={({ values, handleSubmit, setFieldValue }) => {
    //       return (
    //         <form onSubmit={handleSubmit}>
    //           <Box  xs={12} md={6}>
    //             <Typography mb="2rem">Tarjeta de socio</Typography>
    //             <DragImageUpload
    //               files={[filesFcmPartner]}
    //               setFiles={setfilesFcmPartner}
    //               imgUrl={imgUrlPartnerCard}
    //               editable={isEditable}
    //             ></DragImageUpload>
    //           </Box>
    //           <div className="form-group">
    //             <label htmlFor="file">File upload</label>
    //             <input
    //               id="file"
    //               name="file"
    //               type="file"
    //               onChange={(event) => {
    //                 setFieldValue("file", event.currentTarget.files[0]);
    //               }}
    //               className="form-control"
    //             />
    //             {/* <Thumb file={values.file} /> */}
    //           </div>
    //           <button type="submit" className="btn btn-primary">
    //             submit
    //           </button>
    //         </form>
    //       );
    //     }}
    //   />
    // </div>
  );
};
