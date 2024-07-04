"use client";
import Navbar from "@/components/navbar/Navbar";
import Cards from "@/components/overview/Cards";
import Sidebar from "@/components/sidebar/Sidebar";
import AdminSignInForm from "@/components/overview/AdminSignInForm";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/loading/Loading";
import ActionList from "@/components/overview/ActionList";

export default function Home() {
  const [signInFormOpen, setSignInFormOpen] = useState(false);
  const [accountList, setAccountList] = useState([]);
  const [timepieceList, setTimepieceList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const adminSignIn = sessionStorage.adminSignIn
    ? JSON.parse(sessionStorage.adminSignIn)
    : null;

  const getAccountData = async () => {
    setIsLoading(true);
    await axios
      .get("http://localhost:3000/auth/accounts")
      .then((res) => {
        setAccountList(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const getTimepieceData = async () => {
    setIsLoading(true);
    await axios
      .get("http://localhost:3000/product")
      .then((res) => {
        setTimepieceList(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!adminSignIn) {
      setSignInFormOpen(true);
    }
    getAccountData();
    getTimepieceData();
  }, []);

  if (isLoading) return <Loading />;
  return (
    <>
      <Navbar />
      <AdminSignInForm modalOpen={signInFormOpen} />
      <Sidebar />
      {adminSignIn === null ? null : (
        <div className="flex flex-col items-start justify-start gap-4 p-4">
          <p className="font-bold text-xl px-4">OVERVIEW STATISTICS</p>
          <Cards totalAccount={accountList} totalTimepiece={timepieceList} />
          <p className="font-bold text-xl px-4 mt-8">GENERAL</p>
          <div className="w-full flex justify-center">
            <ActionList />
          </div>
        </div>
      )}
    </>
  );
}
