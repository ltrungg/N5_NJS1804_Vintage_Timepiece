import React, { useState } from "react";
import styles from "../../styles/ContactStyle.module.css";
import { Content } from "antd/es/layout/layout";
export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  // useEffect(() => {
  //   fetch("http://localhost:3000/contact/report")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setProducts(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching Contact", error);
  //     });
  // }, []);
  return (
    <Content className={styles.contentForm}>
      <div className={styles.containerContact}>
        <h1 className={styles.h1Contact}>Contact Us</h1>
        <form onSubmit={handleSubmit} className={styles.formContact}>
          <label htmlFor="name" className={styles.labelContact}>
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
    <div>
            <label htmlFor="email" className={styles.labelContact}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="message" className={styles.labelContact}>
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className={styles.buttonContact}>
            Submit
          </button>
        </form>
      </div>
    </Content>
  );
}
