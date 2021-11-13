import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { Modal, Button } from "react-bootstrap";
import { ShowModalBody } from "./ShowModalBody";
import { toast } from "react-toastify";

export const ExpenseList = () => {
  const [info, setInfo] = useState([]);
  const [user, setuser] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setuser(user);
      } else setuser(null);
    });
  }, []);

  useEffect(() => {
    if (user) {
    const tests = [];
    
    db.collection("expense_calculator")
      .get()
      .then((Snapshot) => {
        Snapshot.docs.forEach((doc) => {
          if(doc.id === user.uid){
            setInfo( Object.values(doc.data()));

            
          }

          // let data = { ...element.data() };
          // array.push(data);
        });
        
       
      });
    
   // console.log(info);
    }
  }, [user]);
  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter ">
            Update Expenses
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ShowModalBody />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  return (
    <div className="mt-4">
      <h1>Recent Expenses</h1>
      <div className="" style={{ margin: "auto" }}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Price</th>
              <th scope="col">Type</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>       
            {info.length > -1 && info.map((item) => {
              // const { id, name, price, Type, date } = info[0];
              return (
                <tr key={item.id}>
                  {/* <td>{item.name}</td> */}
                   <td>{item.price}</td>
                  <td>{item.Type}</td>
                  <td>{item.date}</td> 
                  <button
                    className="btn text-white" style={{ backgroundColor: "#192bc2" }}
                    onClick={() => setModalShow(true)}
                  >
                    Edit
                  </button>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};
