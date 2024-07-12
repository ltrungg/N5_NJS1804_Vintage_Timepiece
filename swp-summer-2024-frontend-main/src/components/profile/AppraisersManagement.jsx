import React, { useEffect, useState } from "react";
import EmptyOrderImage from "../../assets/images/profile/empty-order.webp";
import SingleTimepiece from "./SingleTimepiece";
import { Pagination, Modal, Input } from "antd";
import { getRequestStatus } from "../certificate/getRequestStatus";
import axios from "axios";

export default function Appraisers() {
  const [list, setList] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  const [reason, setReason] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [isAcceptModalVisible, setIsAcceptModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const defaultPageSize = 8;
  const [pagingState, setPagingState] = useState({
    min: 0,
    max: defaultPageSize,
  });

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/product');
      setList(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const getStatus = (product) => {
    switch (product.status) {
      case "IN APPRAISAL":
        return (
          <button className="w-40 bg-amber-600 hover:bg-amber-500 rounded-[30px] flex items-center justify-center text-white font-bold py-2">
            IN APPRAISAL
          </button>
        );
      case "APPROVED":
        return (
          <button className="w-40 bg-green-600 hover:bg-green-500 rounded-[30px] flex items-center justify-center text-white font-bold py-2">
            APPROVED
          </button>
        );
      case "REJECTED":
        return (
          <button className="w-40 bg-red-600 hover:bg-red-500 rounded-[30px] flex items-center justify-center text-white font-bold py-2">
            REJECTED
          </button>
        );
      default:
        return null;
    }
  };

  const handlePageChange = (page) => {
    setPagingState({
      min: (page - 1) * defaultPageSize,
      max: page * defaultPageSize,
    });
  };

  const approveItem = (item) => {
    setSelectedItem(item);
    setIsAcceptModalVisible(true);
  };

  const rejectItem = (item) => {
    setSelectedItem(item);
    setIsRejectModalVisible(true);
  };

  const handleRejectOk = async () => {
    if (selectedItem) {
      await getRequestStatus(selectedItem.id, 'REJECTED', reason);
      setReason('');
      setSelectedItem(null);
      setIsRejectModalVisible(false);
      fetchProducts(); 
    }
  };

  const handleRejectCancel = () => {
    setReason("");
    setSelectedItem(null);
    setIsRejectModalVisible(false);
  };

  const handleAcceptOk = async () => {
    if (selectedItem) {
      await getRequestStatus(selectedItem.id, 'APPROVED', startingPrice);
      setStartingPrice('');
      setSelectedItem(null);
      setIsAcceptModalVisible(false);
      fetchProducts(); 
    }
  };

  const handleAcceptCancel = () => {
    setStartingPrice("");
    setSelectedItem(null);
    setIsAcceptModalVisible(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filteredList = list.filter(
      (item) => ["IN APPRAISAL", "APPROVED", "REJECTED"].includes(item.status.toUpperCase())
    );
    setCurrentList(filteredList);
    setPagingState({
      min: 0,
      max: defaultPageSize,
    });
  }, [list]);

  return (
    <div className="relative w-full min-h-full bg-white rounded-xl">
      {currentList.length === 0 ? (
        <div className="w-full h-[40vh] flex flex-col items-center justify-center gap-4">
          <img src={EmptyOrderImage} alt="" className="w-24" />
          <p>There are no products to appraisal at this time</p>
        </div>
      ) : (
        <div className="w-full flex flex-col items-start justify-start gap-2 p-4">
          <div className="w-full min-h-[40vh] flex flex-col items-center justify-start">
            {currentList
              .slice(pagingState.min, pagingState.max)
              .map((item) => (
                <div key={item.id} className="w-full flex flex-col items-start gap-4 border-b border-gray-300 py-4">
                  <SingleTimepiece product={item} getStatus={getStatus} />
                  <div className="flex items-center gap-4">
                    {item.status === "IN APPRAISAL" && (
                      <>
                        <button
                          onClick={() => approveItem(item)}
                          className="bg-green-600 hover:bg-green-800 text-white rounded-xl px-4 py-2"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => rejectItem(item)}
                          className="bg-red-600 hover:bg-red-800 text-white rounded-xl px-4 py-2"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            <Pagination
              total={currentList.length}
              pageSize={defaultPageSize}
              hideOnSinglePage
              size="default"
              onChange={handlePageChange}
              className="mt-8"
            />
          </div>
        </div>
      )}

      <Modal
        title="Reject Reason"
        visible={isRejectModalVisible}
        onOk={handleRejectOk}
        onCancel={handleRejectCancel}
      >
        <Input.TextArea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={4}
          placeholder="Enter the reason for rejection"
        />
      </Modal>

      <Modal
        title="Approve Request"
        visible={isAcceptModalVisible}
        onOk={handleAcceptOk}
        onCancel={handleAcceptCancel}
      >
        <Input
          value={startingPrice}
          onChange={(e) => setStartingPrice(e.target.value)}
          placeholder="Enter starting price"
        />
      </Modal>
    </div>
  );
}
