import React,{useState} from 'react'
import { auth, db,storage } from "../../firebase";
export const ImageUpload = () => {
    const [image, setimage] = useState(null)
    const handleChange = (e)=>{
        if (e.target.files[0]) {
          setimage(e.target.files[0])
        }
      }
    const handleUpload =(e)=>{
      e.preventDefault();
      const uploadTask = storage.ref(`/images/${image.name}`).put(image)
      uploadTask.on('state_changed', 
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot)
      }, (err) => {
        //catches the errors
        console.log(err)
      }, () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage.ref('images').child(image.name).getDownloadURL()
         .then(fireBaseUrl => {
          //  setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
         })
      })
    }
    return (
        <div>
              <input
                    type="file"
                    className="form-control"
                    id="inputPassword4"
                    placeholder="image"
                    onChange={handleChange}
                    // onChange={(e) => setenteredDate(e.target.value)}
                   
                  />
                   <button className="btn btn-primary mt-5" onClick={handleUpload}>
                  Upload
                </button>
        </div>
    )
}
