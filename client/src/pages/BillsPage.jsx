import React, { useEffect, useRef, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import axios from "axios";
import { EyeOutlined } from "@ant-design/icons";
import { Button, Modal, Table } from "antd";
import { useReactToPrint } from "react-to-print";

const BillsPage = () => {
  const dispatch = useDispatch();
  const componentRef = useRef(null);
  const [billsData, setBillsData] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [popupModal, setPopupModal] = useState(false);

  const getAllBills = async () => {
    try {
      dispatch({ type: "SHOW_LOADING" });
      const { data } = await axios.get("http://localhost:8080/api/bills/get-bills");
      setBillsData(data);
      dispatch({ type: "HIDE_LOADING" });
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    getAllBills();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Invoice",
    onBeforePrint: () => console.log("Starting print..."),
    onPrintError: (error) => console.error("Print error:", error),
  });

  // Table columns configuration
  const columns = [
    { title: "ID", dataIndex: "_id" },
    { title: "Customer Name", dataIndex: "customerName" },
    { title: "Contact Number", dataIndex: "customerContact" },
    { title: "Sub Total", dataIndex: "subTotal" },
    { title: "TAX", dataIndex: "tax" },
    { title: "Total Amount", dataIndex: "totalAmount" },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <EyeOutlined
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectedBill(record);
            setPopupModal(true);
          }}
        />
      ),
    },
  ];

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Invoice List</h1>
      </div>

      <Table columns={columns} dataSource={billsData} bordered rowKey="_id" />

      {popupModal && selectedBill && (
        <Modal
          title="Invoice Details"
          open={popupModal}
          onCancel={() => setPopupModal(false)}
          footer={null}
          afterOpenChange={(open) => {
            if (open) {
              console.log("Modal opened, componentRef should now be assigned");
            }
          }}
        >
          <div id="invoice-POS" ref={componentRef}>
            <center id="top">
              <div className="info">
                <h2>MBET POS</h2>
                <p>Contact: 1234567890 | Karad Maharashtra</p>
              </div>
            </center>
            <div className="mid">
              <div className="mt-2">
                <p>
                  Customer Name : <b>{selectedBill?.customerName}</b>
                  <br />
                  Phone No : <b>{selectedBill?.customerContact}</b>
                  <br />
                  Date :
                  <b>{selectedBill?.createdAt ? new Date(selectedBill.createdAt).toISOString().substring(0, 10) : "N/A"}</b>
                  <br />
                </p>
                <hr style={{ margin: "5px" }} />
              </div>
            </div>
            <div id="bot">
              <div id="table">
                <table>
                  <tbody>
                    <tr className="tabletitle">
                      <td className="item"><h2>Item</h2></td>
                      <td className="Hours fieldName"><h2>Quantity</h2></td>
                      <td className="Rate fieldName"><h2>Price</h2></td>
                      <td className="Rate fieldName"><h2>Total</h2></td>
                    </tr>
                    {selectedBill?.cartItems?.map((item, index) => (
                      <tr key={index} className="service">
                        <td className="tableitem"><p className="itemtext">{item.name}</p></td>
                        <td className="tableitem"><p className="itemtext">{item.quantity}</p></td>
                        <td className="tableitem"><p className="itemtext">{item.price}</p></td>
                        <td className="tableitem"><p className="itemtext">{item.quantity * item.price}</p></td>
                      </tr>
                    ))}
                    <tr className="tabletitle">
                      <td />
                      <td />
                      <td className="Rate fieldName"><h2>TAX</h2></td>
                      <td className="payment"><h2>${selectedBill?.tax}</h2></td>
                    </tr>
                    <tr className="tabletitle">
                      <td />
                      <td />
                      <td className="Rate fieldName"><h2>Grand Total</h2></td>
                      <td className="payment"><h2><b>${selectedBill?.totalAmount}</b></h2></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-3">
            <Button type="primary" onClick={handlePrint}>Print</Button>
          </div>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default BillsPage;
