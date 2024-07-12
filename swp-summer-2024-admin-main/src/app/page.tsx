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
  const [todayActiveAccountList, setTodayActiveAccountList] = useState([]);
  const [timepieceList, setTimepieceList] = useState([]);
  const [requestList, setRequestList] = useState([]);
  const [reportList, setReportList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [adminSignIn, setAdminSignIn] = useState();

  useEffect(() => {}, []);

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

  const getTodayActiveAccountData = async () => {
    setIsLoading(true);
    await axios
      .get("http://localhost:3000/auth/active_today")
      .then((res) => {
        setTodayActiveAccountList(res.data);
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

  const getRequestData = async () => {
    setIsLoading(true);
    await axios
      .get("http://localhost:3000/sellerRequest/pending")
      .then((res) => {
        setRequestList(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const getReportData = async () => {
    setIsLoading(true);
    await axios
      .get("http://localhost:3000/report")
      .then((res) => {
        setReportList(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (sessionStorage.adminSignIn)
      setAdminSignIn(JSON.parse(sessionStorage.adminSignIn));
    else {
      setSignInFormOpen(true);
    }
    getAccountData();
    getTodayActiveAccountData();
    getTimepieceData();
    getRequestData();
    getReportData();
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
          <Cards
            totalAccount={accountList}
            totalTodayActiveAccount={todayActiveAccountList}
            totalTimepiece={timepieceList}
            totalRequest={requestList}
            totalReport={reportList}
          />
          <p className="font-bold text-xl px-4 mt-8">GENERAL</p>
          <div className="w-full flex justify-center">
            <ActionList />
          </div>
        </div>
      )}
    </>
  );
}
