import React, { useEffect, useState, useContext } from "react";
import { auth, db } from "../../firebase";
import { Modal, Button } from "react-bootstrap";
import { ShowModalBody } from "./ShowModalBody";
import { toast } from "react-toastify";
import AuthContext from "../../store/auth-contex";

export const ExpenseList = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const [info, setInfo] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [money, setmoney] = useState(0)
  useEffect(() => {
    if (isLoggedIn) {
      const tests = [];

      db.collection("expense_calculator")
        .get()
        .then((Snapshot) => {
          Snapshot.docs.forEach((doc) => {
            if (doc.id === isLoggedIn.uid) {
              setInfo(Object.values(doc.data()));
            }

          });
        });


    }
  }, [isLoggedIn]);
  const OnDlete = (id) => {
   
     db.collection("expense_calculator").doc(id).delete()



  }
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
          <ShowModalBody/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <div className="mt-4">
      <h1>Recent Expenses <span className="text-success">{isLoggedIn.displayName}</span>  </h1>

      <div className="" style={{ margin: "auto" }}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Price (Rs)</th>
              <th scope="col">Type</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {info.map((item) => {

              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.Type}</td>
                  <td>{item.date}</td>
                  <button
                    className="btn text-white" style={{ backgroundColor: "#192bc2" }}
                    onClick={() => setModalShow(true)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn text-white" style={{ backgroundColor: "#192bc2" }}
                    onClick={() => OnDlete(item.id)}
                  >
                    Dlete
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
