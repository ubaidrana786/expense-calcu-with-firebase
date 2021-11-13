import React, { useEffect, useState } from 'react'
import { auth, db } from "../../firebase";
import { Modal, Button, } from "react-bootstrap";
import { ShowModalBody } from './ShowModalBody';
import { toast } from 'react-toastify';
export const ExpenseList = () => {

  const [info, setInfo] = useState([]);
  const [user, setuser] = useState(null);
  const [modalShow, setModalShow] = React.useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setuser(user);
      } else setuser(null);
    });
  }, []);
  useEffect(() => {
    // getMarkers();
    const tests = []
    db.collection("expense_calculator").get()
     
      .then((Snapshot) => {
        Snapshot.docs.forEach((doc) => {
          tests.push({
            id: doc.id,
            datos: doc.data()
          });
          // let data = { ...element.data() };
          // array.push(data);
        });
        // setInfo(tests);
        // console.log(tests);
      });
      setInfo(tests)
      console.log(info)
  }, []);
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
            {/* {info.map((item) => {
                    // const { id, name, price, Type, date } = info[0];
                    return (
                      <tr key={item[0].id} >
                        <td>{item[0].name}</td>
                        <td>{item[0].price}</td>
                        <td>{item[0].Type}</td>
                        <td>{item[0].date}</td>
                      </tr>
                    );
                  })} */}
            {info.map((item,id) => {
              // const { id, name, price, Type, date } = info[0];
              return (
                <tr key={id}>
                  <td>{item.name}</td>
                  {/* <td>{item.data[0].price}</td>
                  <td>{item.data[0].Type}</td>
                  <td>{item.data[0].date}</td> */}
                  <button className="btn btn-primary" onClick={() => setModalShow(true)}>Edit</button>
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
  )
}
