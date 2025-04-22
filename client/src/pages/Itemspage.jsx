import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select, Table } from "antd";

const Itemspage = () => {
  const dispatch = useDispatch();
  const [itemsData, setItemsData] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const getAllItems = async () => {
    try {
      dispatch({ type: "SHOW_LOADING" });
      const { data } = await axios.get(
        "http://localhost:8080/api/items/get-item"
      );
      setItemsData(data);
      dispatch({ type: "HIDE_LOADING" });
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchItems = async () => {
      try {
        dispatch({ type: "SHOW_LOADING" });
        const { data } = await axios.get(
          "http://localhost:8080/api/items/get-item",
          { signal: controller.signal }
        );
        setItemsData(data);
        dispatch({ type: "HIDE_LOADING" });
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching items:", error);
        }
      }
    };

    fetchItems();

    return () => {
      controller.abort(); //  Cleanup
    };
  }, [dispatch]);

  const handleSubmit = async (values) => {
    if (editItem === null) {
      try {
        dispatch({ type: "SHOW_LOADING" });
        await axios.post("http://localhost:8080/api/items/add-item", values);
        message.success("Item added successfully");
        getAllItems();
        dispatch({ type: "HIDE_LOADING" });
        setPopupModal(false);
      } catch (error) {
        message.error("Something went wrong");
        console.error("Error adding item:", error);
      }
    } else {
      try {
        dispatch({ type: "SHOW_LOADING" });
        await axios.put("http://localhost:8080/api/items/edit-item", {
          ...values,
          itemId: editItem._id,
        });
        message.success("Item updated successfully");
        getAllItems();
        dispatch({ type: "HIDE_LOADING" });
        setPopupModal(false);
      } catch (error) {
        message.error("Something went wrong");
        console.error("Error updating item:", error);
      }
    }
  };
  // delete 
  const handleDelete = async(record) =>{
    try {
      dispatch({ type: "SHOW_LOADING" });
      await axios.delete(`http://localhost:8080/api/items/delete-item/${record._id}`);
      message.success("Item deleted successfully");
      getAllItems();
      dispatch({ type: "HIDE_LOADING" });
      setPopupModal(false);
    } catch (error) {
      message.error("Something went wrong");
      console.error("Error adding item:", error);
    }
  }

  // Select structure
  const columns = [
    { title: "Name", dataIndex: "name" },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt={record.name} height="60" width="60" />
      ),
    },
    { title: "Price", dataIndex: "price" },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <DeleteOutlined
            style={{ cursor: "pointer", marginRight: 10 }}
            onClick={() => {
              handleDelete(record);
            }}
          />
          <EditOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              setEditItem(record);
              setPopupModal(true);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Item List</h1>
        <Button
          type="primary"
          onClick={() => {
            setEditItem(null);
            setPopupModal(true);
          }}
        >
          Add Item
        </Button>
      </div>

      <Table columns={columns} dataSource={itemsData} bordered rowKey="_id" />

      {popupModal && (
        <Modal
          title={editItem !== null ? "Edit Item" : "Add New Item"}
          open={popupModal}
          onCancel={() => {
            setEditItem(null);
            setPopupModal(false);
          }}
          footer={null}
        >
          <Form
            layout="vertical"
            initialValues={
              editItem || { name: "", price: "", image: "", category: "" }
            }
            onFinish={handleSubmit}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[
                { required: true, message: "Please enter the item name" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: "Please enter the price" }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item name="image" label="Image URL">
              <Input />
            </Form.Item>
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: "Please select a category" }]}
            >
              <Select>
                <Select.Option value="drinks">Drinks</Select.Option>
                <Select.Option value="rice">Rice</Select.Option>
                <Select.Option value="noodles">Noodles</Select.Option>
              </Select>
            </Form.Item>

            <div className="d-flex justify-content-end">
              <Button type="primary" htmlType="submit">
                SAVE
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default Itemspage;
