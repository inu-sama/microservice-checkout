import React, { useState, useEffect } from "react";
import VoucherList from "./VoucherList";
import { useSearchParams } from "react-router-dom";

export default function Testing() {
  const [searchParams] = useSearchParams();
  const [thanhtoan, setThanhtoan] = useState({});
  const [discount, setDiscount] = useState(0);
  const orderId = searchParams.get("OrderID") || "";

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://voucher-server-alpha.vercel.app/api/vouchers/getPartNerRequestByOrderId/${orderId}`,
          {
            method: "POST",
          }
        );
        const data = await response.json();
        setThanhtoan(data.partNerRequest || {});
        console.log(data.partNerRequest);
      } catch {
        console.error("Error fetching data");
      }
    })();
  }, [orderId]);

  const calculateTotal = () => {
    const total = thanhtoan.TotalMoney || 0;
    return total - (total * discount) / 100;
  };

  return (
    <div className="border border-pink-200 rounded-lg mx-auto h-fit bg-gradient-to-b text-left p-4 from-pink-300 py-6 px-10">
      <div className="h-full">
        <h1 className="text-4xl text-center text-white font-bold">
          THANH TOÁN
        </h1>
      </div>
      <div className="bg-white p-6 mb-6 w-full mt-4 mx-auto rounded-xl ">
        <p className="text-center p-4 text-2xl font-bold text-pink-300">
          Thông tin đơn hàng
        </p>
        <div className="py-4 shadow-md shadow-pink-300 mx-2 px-4 rounded-md grid grid-cols-2">
          <div className="flex py-4">
            <span className="text-xl text-slate-500">Mã Đơn Hàng:</span>
            <span className="text-xl px-2">{thanhtoan.ServiceCode}</span>
          </div>
          <div className="flex py-4">
            <span className="text-xl text-slate-500">Tên dịch vụ:</span>
            <span className="text-xl px-2">{thanhtoan.ServiceName}</span>
          </div>
          <div className="flex py-4">
            <span className="text-xl text-slate-500">Tên công ty: </span>
            <span className="text-xl px-2">{thanhtoan.PartnerName}</span>
          </div>
          <div className="flex py-4">
            <span className="text-xl text-slate-500">Mã Khách hàng: </span>
            <span className="text-xl px-2">{thanhtoan.CustomerCode}</span>
          </div>
          <div className="flex py-4">
            <span className="text-xl text-slate-500">Tên khách hàng: </span>
            <span className="text-xl px-2">{thanhtoan.CustomerName}</span>
          </div>
          <div className="flex py-4">
            <span className="text-xl text-slate-500">Mô tả: </span>
            <span className="text-xl px-2">{thanhtoan.Description}</span>
          </div>
        </div>
        <div className="py-4 shadow-md shadow-pink-300 mx-2 px-4 mt-12 rounded-md">
          <VoucherList setDiscount={setDiscount} />
        </div>
        <p className="text-center p-4 text-2xl font-bold text-pink-300 mt-12">
          Bảng thanh toán
        </p>
        <div className="py-4 shadow-md shadow-pink-300 mx-2 px-4 grid grid-cols-2 rounded-md">
          <div>
            <div className="flex py-4">
              <span className="text-xl text-slate-500">Tổng tiền:</span>
              <span className="text-xl px-2">{thanhtoan.TotalMoney}</span>
            </div>
            <div className="flex py-4">
              <span className="text-xl text-slate-500">Giảm giá:</span>
              <span className="text-xl px-2">{discount}%</span>
            </div>
            <div className="flex py-4">
              <span className="text-xl text-slate-500">Tổng cộng: </span>
              <span className="text-xl px-2">{calculateTotal()}đ</span>
            </div>
          </div>
          <div>
            <div className="flex py-4">
              <span className="text-xl text-slate-500">Thuế:</span>
              <span className="text-xl px-2">{thanhtoan.Tax}</span>
            </div>
            <div className="flex py-4">
              <span className="text-xl text-slate-500">Triết khấu:</span>
              <span className="text-xl px-2">{thanhtoan.Discount}</span>
            </div>
            <div className="flex py-4">
              <span className="text-xl text-slate-500">bala bala: </span>
              <span className="text-xl px-2">{thanhtoan.BalaBala}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <button className="w-2/3 mb-12 bg-pink-300 border-4 border-pink-300 shadow-inner hover:bg-white shadow-pink-300 text-white hover:text-pink-300 font-bold py-2 px-8 text-xl rounded-lg">
          Thanh toán
        </button>
      </div>
    </div>
  );
}
