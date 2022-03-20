import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

export const DragImageUpload = ({
  files,
  setFiles,
  imgUrl,
  setimgUrl,
  editable = true,
}) => {
  const images = files.map((file) => (
    <div key={file.name}>
      <img src={file.preview} style={{ width: "100%" }} alt="preview" />
    </div>
  ));

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    maxSize: 1000000,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  return (
    <div>
      {editable ? (
        <div {...getRootProps({ className: "c-dropzone" })}>
          <input {...getInputProps()} />

          {files.length > 0 ? (
            <div>{images}</div>
          ) : imgUrl ? (
            <img src={imgUrl} />
          ) : (
            <p>Arrastra acá la imagen o da click para seleccionar una</p>
          )}
        </div>
      ) : (
        <div className="">
          <img src={imgUrl} />
        </div>
      )}
    </div>
  );
};
