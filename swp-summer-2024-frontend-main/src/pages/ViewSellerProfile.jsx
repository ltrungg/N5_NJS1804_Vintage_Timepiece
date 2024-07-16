import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  List,
  Avatar,
  Card,
  Button,
  Input,
  Rate,
  Tooltip,
  Pagination,
  Modal,
  message,
} from "antd";
import { useParams } from "react-router-dom";
import moment from "moment";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import dateFormat from "../assistants/date.format";
import CurrencySplitter from "../assistants/currencySpliter";
import Loading from "../components/loading/Loading";
import SingleFeedback from "../components/feedback/SingleFeedback";
import ReportModal from "../components/productDetail/ReportModal";

const { TextArea } = Input;

const ViewSellerProfile = () => {
  const user = sessionStorage.signInUser
    ? JSON.parse(sessionStorage.signInUser)
    : null;
  const { id } = useParams();
  const [seller, setSeller] = useState();
  const [products, setProducts] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentFeedbackList, setCurrentFeedbackList] = useState([]);
  const [feedbackSummary, setFeedbackSummary] = useState();
  const [newFeedback, setNewFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [followHovered, setFollowHovered] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isShowingPhoneNumber, setIsShowingPhoneNumber] = useState(false);
  const [isReporting, setIsReporting] = useState(false);

  const pageSize = 9;

  const fetchSellerData = async () => {
    try {
      // Fetch seller's profile information
      const sellerResponse = await axios.get(
        `http://localhost:3000/account/${id}`
      );
      setSeller(sellerResponse.data);

      // Fetch seller's products
      const productsResponse = await axios.get(
        `http://localhost:3000/product/user/${id}`
      );
      setProducts(productsResponse.data);

      // Fetch feedbacks for the seller
      const feedbacksResponse = await axios.get(
        `http://localhost:3000/feedback/evaluated/${id}`
      );
      console.log("Feedbacks: ", feedbacksResponse.data);
      setFeedbacks(feedbacksResponse.data);
      setCurrentFeedbackList(feedbacksResponse.data.slice(0, 4));

      await axios
        .get(`http://localhost:3000/feedback/average-rate/${id}`)
        .then((res) => {
          setFeedbackSummary(res.data);
        });
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSellerData();
  }, [id]);

  const handleFeedbackSubmit = async () => {
    if (!user) {
      window.location.href = "/signin";
    } else {
      if (rating === 0) {
        message.warning({
          key: "rating",
          content: "Please rate with stars!",
          duration: 5,
        });
        document.getElementById("star-rating").focus();
        return;
      } else {
        await axios
          .post(`http://localhost:3000/feedback`, {
            evaluator: user.id,
            evaluated: id,
            comment: newFeedback,
            rating,
          })
          .then((res) => {
            fetchSellerData();
            setNewFeedback("");
            setRating(0);
            message.success({
              key: "rating",
              content: "Your feedback is successfully recorded.",
              duration: 5,
            });
          })
          .catch((error) => {
            console.log("Error submitting feedback:", error);
          });
      }
    }
  };

  const handleReportSeller = () => {
    // Handle reporting seller
    setIsReporting(true);
  };

  const handleFollowSeller = () => {
    // Handle follow seller
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const copyPhoneNumber = () => {
    const phone = document.getElementById("phone-number");
    phone.select();
    navigator.clipboard.writeText(phone.value);
    message.success({
      key: "copyPhoneNumber",
      content: "Copied phone number to clipboard!",
      duration: 5,
    });
  };

  if (!seller) return <Loading />;
  else
    return (
      <div className="flex flex-wrap justify-center p-6 space-y-6 md:space-y-0 md:space-x-6 bg-slate-100 w-full">
        <div className="w-1/4 md:w-1/4 relative flex flex-col gap-4 py-2">
          <div className="w-full flex flex-col items-start gap-2 font-montserrat bg-white p-4 rounded-xl">
            <Avatar src={seller.avatar} alt="" size={160} />
            <Tooltip title={seller.username}>
              <p className="text-[1.2em] font-semibold text-center max-w-[15em] text-nowrap overflow-hidden text-ellipsis font-montserrat">
                {seller.username}
              </p>
            </Tooltip>
            {feedbackSummary && feedbackSummary.countRating === 0 ? (
              <p className="font-light text-xs">There is no rating yet!</p>
            ) : (
              <p className="flex items-center text-xs">
                &#40;
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  className="fill-yellow-400"
                >
                  <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path>
                </svg>
                {feedbackSummary &&
                  Math.round(feedbackSummary.averageRate * 100) / 100}
                , average of {feedbackSummary && feedbackSummary.countRating}{" "}
                rating
                <span
                  className={`${
                    feedbackSummary &&
                    feedbackSummary.countRating < 2 &&
                    "hidden"
                  }`}
                >
                  s
                </span>
                &#41;
              </p>
            )}
            {/* <div className="w-full h-full bg-blue text-center">
            <Button
              type="text"
              icon={<PlusOutlined />}
              style={{ backgroundColor: '#2FE1E2', color: '#ffffff' }}
              onClick={handleFollowSeller}
              onMouseEnter={() => setFollowHovered(true)}
              onMouseLeave={() => setFollowHovered(false)}
              className={followHovered ? 'animate-bounce' : ''}
            >
              Follow
            </Button>
          </div> */}
            <div className="w-full flex flex-col items-center gap-4 pt-4">
              <Tooltip title="Show phone number" mouseEnterDelay={0.5}>
                <button
                  onClick={() => {
                    if (seller.phone === "") {
                      message.warning({
                        key: "emptyPhoneNumber",
                        content: "This user yet provided a phone number.",
                        duration: 5,
                      });
                      return;
                    } else setIsShowingPhoneNumber(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 p-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="currentColor"
                  >
                    <path d="M9.36556 10.6821C10.302 12.3288 11.6712 13.698 13.3179 14.6344L14.2024 13.3961C14.4965 12.9845 15.0516 12.8573 15.4956 13.0998C16.9024 13.8683 18.4571 14.3353 20.0789 14.4637C20.599 14.5049 21 14.9389 21 15.4606V19.9234C21 20.4361 20.6122 20.8657 20.1022 20.9181C19.5723 20.9726 19.0377 21 18.5 21C9.93959 21 3 14.0604 3 5.5C3 4.96227 3.02742 4.42771 3.08189 3.89776C3.1343 3.38775 3.56394 3 4.07665 3H8.53942C9.0611 3 9.49513 3.40104 9.5363 3.92109C9.66467 5.54288 10.1317 7.09764 10.9002 8.50444C11.1427 8.9484 11.0155 9.50354 10.6039 9.79757L9.36556 10.6821ZM6.84425 10.0252L8.7442 8.66809C8.20547 7.50514 7.83628 6.27183 7.64727 5H5.00907C5.00303 5.16632 5 5.333 5 5.5C5 12.9558 11.0442 19 18.5 19C18.667 19 18.8337 18.997 19 18.9909V16.3527C17.7282 16.1637 16.4949 15.7945 15.3319 15.2558L13.9748 17.1558C13.4258 16.9425 12.8956 16.6915 12.3874 16.4061L12.3293 16.373C10.3697 15.2587 8.74134 13.6303 7.627 11.6707L7.59394 11.6126C7.30849 11.1044 7.05754 10.5742 6.84425 10.0252Z"></path>
                  </svg>
                  <p>Show phone number</p>
                </button>
              </Tooltip>
              <Modal
                open={isShowingPhoneNumber}
                onCancel={(e) => {
                  e.stopPropagation();
                  setIsShowingPhoneNumber(false);
                }}
                footer={null}
                centered
                closeIcon={null}
              >
                <div className="w-full flex items-center justify-center gap-4">
                  <button onClick={copyPhoneNumber}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="fill-gray-500 hover:fill-black"
                    >
                      <path d="M7 4V2H17V4H20.0066C20.5552 4 21 4.44495 21 4.9934V21.0066C21 21.5552 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5551 3 21.0066V4.9934C3 4.44476 3.44495 4 3.9934 4H7ZM7 6H5V20H19V6H17V8H7V6ZM9 4V6H15V4H9Z"></path>
                    </svg>
                  </button>
                  <p className="font-semibold text-2xl font-montserrat">
                    {seller.phone}
                  </p>
                  <input
                    id="phone-number"
                    type="text"
                    value={seller.phone}
                    hidden
                  />
                </div>
              </Modal>
              <p className="text-xs">
                Joined since: {dateFormat(seller.createdAt, "dd mmmm yyyy")}
              </p>
            </div>
            <div className="text-red absolute top-4 right-4 mt-2 mr-2">
              <Tooltip title="Report this account">
                <Button
                  type="text"
                  icon={<ExclamationCircleOutlined style={{ color: "red" }} />}
                  onClick={async () => {
                    await axios
                      .get(
                        `http://localhost:3000/report/check/${user.id}/${seller.id}`
                      )
                      .then((res) => {
                        if (res.data)
                          message.warning({
                            key: "report",
                            content:
                              "Your report on this product has already been recorded.",
                            duration: 5,
                          });
                        else {
                          setIsReporting(true);
                        }
                      })
                      .catch((err) => console.log(err));
                  }}
                />
              </Tooltip>
              <ReportModal
                on="user"
                object={seller}
                open={isReporting}
                setOpen={setIsReporting}
              />
            </div>
          </div>

          <Card
            title={
              <p className="text-gray-600 font-light font-montserrat">
                Leave a feedback about{" "}
                <span className="font-semibold text-black">
                  {seller.username}
                </span>
              </p>
            }
          >
            <button
              onClick={() => (window.location.href = "/signin")}
              className={`font-montserrat hover:underline ${user && "hidden"}`}
            >
              Please sign in to leave any feedbacks!
            </button>
            <div
              className={`w-full space-y-4 font-montserrat ${
                !user && "hidden"
              }`}
            >
              <span>Rate: </span>
              <Rate
                id="star-rating"
                value={rating}
                onChange={setRating}
                className="px-8"
              />
              <div className="flex">
                <Avatar size={32} src={user ? user.avatar : ""} />
                <TextArea
                  rows={4}
                  value={newFeedback}
                  onChange={(e) => setNewFeedback(e.target.value)}
                  placeholder="Your feedback here..."
                  style={{ marginLeft: "10px", width: "calc(100% - 42px)" }}
                  className="font-montserrat"
                />
              </div>
              <button
                onClick={handleFeedbackSubmit}
                className="w-full p-2 bg-sky-600 hover:bg-sky-800 duration-150 rounded-xl text-white font-semibold mx-auto"
              >
                Submit
              </button>
            </div>
          </Card>
        </div>

        <div className="w-3/5 md:w-3/5 space-y-6">
          <Card
            className="mb-4"
            title={
              <p className="font-montserrat">
                All watches{" "}
                <span className="text-gray-500 font-light">
                  &#40;{products.length} item
                  <span className={`${products.length < 2} && "invisible"`}>
                    s
                  </span>
                  &#41;
                </span>
              </p>
            }
          >
            <List
              grid={{ gutter: 16, column: 3 }}
              dataSource={products.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
              )}
              renderItem={(product) => (
                <List.Item key={product.id}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={product.name}
                        src={product.image}
                        className="w-full h-48 object-cover"
                      />
                    }
                    onClick={() =>
                      (window.location.href = `/product/${product.id}`)
                    }
                  >
                    <Card.Meta
                      title={product.name}
                      description={
                        <div className="w-full flex items-center justify-between">
                          <span style={{ fontWeight: "bold", color: "red" }}>
                            ${" "}
                            {CurrencySplitter(
                              Math.round(product.price * 100) / 100
                            )}
                          </span>
                          {moment(product.createdAt).fromNow()}
                        </div>
                      }
                    />
                  </Card>
                </List.Item>
              )}
            />
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              hideOnSinglePage
              total={products.length}
              onChange={onPageChange}
              style={{ marginTop: "20px", textAlign: "center" }}
            />
          </Card>

          <Card title="Previous Feedbacks" className="font-montserrat">
            {feedbacks.length === 0 ? (
              <div>There is no feedback yet!</div>
            ) : (
              <div className="w-full relative max-h-[60vh] overflow-y-auto">
                <List
                  itemLayout="horizontal"
                  dataSource={currentFeedbackList}
                  renderItem={(feedback) => (
                    <SingleFeedback key={feedback.id} feedback={feedback} />
                  )}
                />
                <button
                  onClick={() => {
                    if (currentFeedbackList.length === feedbacks.length) {
                      setCurrentFeedbackList(feedbacks.slice(0, 4));
                    } else {
                      setCurrentFeedbackList(feedbacks);
                    }
                  }}
                  className=""
                >
                  {feedbackSummary &&
                  currentFeedbackList.length < feedbacks.length
                    ? `View ${
                        feedbackSummary.countRating - currentFeedbackList.length
                      } more feedbacks`
                    : "Show less"}
                </button>
              </div>
            )}
          </Card>
        </div>
      </div>
    );
};

export default ViewSellerProfile;
