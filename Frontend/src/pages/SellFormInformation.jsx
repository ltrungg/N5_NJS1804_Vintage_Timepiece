import axios from "axios";
import { useEffect } from "react";
export default function SellFormInformation() {
  const formInfomation = async () => {
    await axios
    .get("http://localhost:3000/sell/form")
    .then((res) => {
      setFormInformation(res.data);
    })
    .then((err) => console.log(err));
  };
  useEffect(() =>{
    formInfomation();
  })
  return{
    
  }
}
