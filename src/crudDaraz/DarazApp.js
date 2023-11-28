import React from "react";
import { useState, useEffect } from "react";
import "./styleDaraz.css";

const DarazApp = () => {
  const [data, setData] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [inputs, setInputs] = useState({
    title: "",
    price: "",
    image: "",
    category: "",
  });

  // useEffect
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3001/products");
      const newData = await response.json();
      setData(newData);
    };
    fetchData();
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // Add Product
  const addProduct = async (inputs) => {
    if (inputs.id) {
      // Updating an existing product
      const response = await fetch(
        `http://localhost:3001/products/${inputs.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            title: inputs.title,
            image: inputs.image,
            category: inputs.category,
            price: inputs.price,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );

      if (response.ok) {
        setData((previousData) => {
          const updatedData = previousData.map((item) =>
            item.id === inputs.id ? { ...item, ...inputs } : item
          );
          return updatedData;
        });
      }
    } else {
      // Adding a new product
      const response = await fetch("http://localhost:3001/products", {
        method: "POST",
        body: JSON.stringify({
          image: `${inputs.image}`,
          title: `${inputs.title}`,
          category: `${inputs.category}`,
          price: `${inputs.price}`,
        }),
        headers: {
          "content-type": "application/json",
        },
      });

      if (response.ok) {
        setData((previous) => {
          return [...previous, inputs];
        });
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addProduct(inputs);
    setIsOpenModal(false);
    setInputs({
      title: "",
      price: "",
      image: "",
      category: "",
    });
  };

  const deleteStudentHandler = async (DataId) => {
    console.log("Deleted", DataId);
    const response = await fetch(`http://localhost:3001/products/${DataId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      const newData = data.filter((item) => item.id !== DataId);
      setData(newData);
    }
  };

  const updateHandler = async (itemToBeUpdated) => {
    setInputs(itemToBeUpdated);
    setIsOpenModal(true);
  };
  /////////////////////////////////////////////////////////////////////////////////////////

  //   const filteredData = data.filter(
  //     (item) =>
  //     item.category === "electronics"
  //      //&& item.price >= 110 && item.price <= 500
  //   );

  return (
    <>
      <div className="Header1">
        <h1>DARAZ</h1>
      </div>
      <div className="Header2">
        <div>
          <p style={{ color: "Orange" }}>On Safe Now</p>
        </div>
        <div className="Endingin">
          <p style={{ color: "Black" }}>Ending in </p>
        </div>
        <p className="smallbox">1</p>
        <p className="smallbox">2</p>
        <p className="smallbox">3</p>
        <div className="Box">
          <p style={{ color: "Orange" }}>Shop More </p>
        </div>
      </div>
      <div>
        <button className="ButtonStyle" onClick={() => setIsOpenModal(true)}>
          ADD PRODUCT
        </button>
        <div className="cart">
          {data.map((item) => (
            <div className="cart_box">
              <img src={item.image} alt="jacket"></img>
              <p>Title: {item.title}</p>
              <p>Category: {item.category}</p>
              <p style={{ color: "orangered" }}>Price: {item.price} /-</p>
              <button
                style={{ backgroundColor: "green" }}
                onClick={() => updateHandler(item)}
              >
                Edit
              </button>
              {/* //////////////////////////////////////// */}
              <button
                style={{ backgroundColor: "red" }}
                onClick={() => deleteStudentHandler(item.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {isOpenModal && (
        <div
          style={{
            border: " 2px solid orangered",
            backgroundColor: " #67bdda",
            position: "fixed",
            top: "20%",
            left: "40%",
          }}
        >
          <div
            className="closebutton"
            style={{ backgroundColor: "rgb(241, 188, 153)" }}
          >
            <button
              // style={{ backgroundColor: "red", margin: "10px" }}
              onClick={() => setIsOpenModal(false)}
            >
              X
            </button>
          </div>
          <div className="formDesign">
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label>Enter Title:</label>
              <input
                type="text"
                name="title"
                value={inputs.title}
                onChange={handleChange}
              />

              <label>Enter Price:</label>
              <input
                type="number"
                name="price"
                value={inputs.price}
                onChange={handleChange}
              />
              <label>Add Image:</label>
              <input
                type="string"
                name="image"
                value={inputs.image}
                onChange={handleChange}
                width="100"
              />
              <label>Enter Category:</label>
              <input
                type="text"
                name="category"
                value={inputs.category}
                onChange={handleChange}
              />
              <input
                style={{
                  fontFamily: "Times New Roman",
                  fontSize: "18px",
                  margin: "18px",
                  padding: "8px",
                  borderRadius: "35px",
                  backgroundColor: "rgb(255, 94, 14)",
                }}
                type="submit"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default DarazApp;
