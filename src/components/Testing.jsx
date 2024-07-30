import React, { useState, useEffect } from "react";
import VoucherList from "./VoucherList";
import { useSearchParams } from "react-router-dom";

export default function Testing() {
  const [searchParams] = useSearchParams();
  const [thanhtoan, setThanhtoan] = useState({});
  const [partner, setPartner] = useState({});
  const [discount, setDiscount] = useState(0);
  const orderId = searchParams.get("OrderID") || "";

  useEffect(() => {
    (async () => {
      try {
        const responseOrder = await fetch(
          // `https://voucher-server-alpha.vercel.app/api/vouchers/getPartNerRequestByOrderId/${orderId}`,
          `https://voucher-server-alpha.vercel.app/api/vouchers/getPartNerRequestByOrderId/ABC445`,
          {
            method: "POST",
          }
        );
        const responsePartner = await fetch(
          // `https://voucher-server-alpha.vercel.app/api/vouchers/getPartNerRequestByOrderId/${orderId}`,
          `https://voucher-server-alpha.vercel.app/api/vouchers/getPartNerRequestByOrderId/ABC445`,
          {
            method: "POST",
            headers: {
              "X-Api":
                "088ceabd98a514383c78e153c1442165a92600c4366580eb377791b5ff4b622a",
            },
          }
        );
        const data = await responseOrder.json();
        const dataPartner = await responsePartner.json();
        setThanhtoan(data.partNerRequest || {});
        setPartner(dataPartner || {});
        console.log(data.partNerRequest);
        console.log(dataPartner);
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
    <div className="border border-pink-200 rounded-lg mx-auto h-fit bg-gradient-to-b text-left from-pink-300 px-40">
      <h1 className="text-4xl text-center text-white font-bold my-12">
        THANH TOÁN
      </h1>
      <div className="bg-white p-6 mb-6 w-full mt-4 mx-auto rounded-xl ">
        <p className="text-left p-4 text-2xl font-bold text-pink-300">
          Thông tin đơn hàng
        </p>
        <div className="py-4 shadow-md shadow-pink-300 mx-2 px-4 rounded-md grid grid-cols-2">
          <div className="flex py-4">
            <span className="text-xl text-slate-500">Mã Đơn Hàng:</span>
            <span className="text-xl px-2">{thanhtoan.OrderID}</span>
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
        <p className="text-left p-4 text-2xl font-bold text-pink-300 mt-12">
          Bảng thanh toán
        </p>
        <div className="py-8 shadow-md shadow-pink-300 mx-2 px-4 grid grid-cols-12 rounded-md gap-4">
          <div className="col-span-3 text-xl text-slate-500 place-self-end">
            Mức giảm:
          </div>
          <div className="col-span-3 text-xl px-2">{discount}%</div>
          <div className="col-span-3 text-xl text-slate-500 place-self-end">
            Số tiền được giảm:
          </div>
          <div className="col-span-3 text-xl px-2">
            {(discount * thanhtoan.TotalMoney) / 100}đ
          </div>
          <div className="col-span-3 text-xl text-slate-500 place-self-end">
            Tạm tính:
          </div>
          <div className="col-span-3 text-xl px-2">{thanhtoan.TotalMoney}đ</div>
          <div className="col-span-3 font-bold text-xl text-slate-500 place-self-end">
            Tổng tiền:
          </div>
          <div className="col-span-3 text-xl px-2">{calculateTotal()}đ</div>
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
