import React, { useState } from "react";
import { auth, db, storage } from "../../firebase";
export const ImageUpload = () => {
  const [image, setimage] = useState(null);
  const [showInput,setShowInput] = useState(false);
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setimage(e.target.files[0]);
    }
  };
  const handleUpload = (e) => {
    e.preventDefault();
    const uploadTask = storage.ref(`/images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        setShowInput(false);
        //takes a snap shot of the process as it is happening
        console.log(snapShot);
      },
      (err) => {
        //catches the errors
        console.log(err);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            setimage(fireBaseUrl);
            //  setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
          });
      }
    );
  };
  return (
    <div>
      {showInput &&
      <>
      <input
        type="file"
        className="form-control"
        height="50px"
        width="50px"
        onChange={handleChange}
      />
      <button className="btn btn-primary mt-5" onClick={handleUpload}>
        Upload
      </button>
      </>
}
      <img onClick={() =>setShowInput(true) } src={image} alt="" height="50px" width="50px" />
    </div>
  );
};
