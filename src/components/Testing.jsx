import React, { useState, useEffect } from "react";
import VoucherList from "./VoucherList";
import { useSearchParams } from "react-router-dom";

export default function Testing() {
  const [searchParams] = useSearchParams();
  const [thanhtoan, setThanhtoan] = useState({});
  const [partner, setPartner] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [voucher, setVoucher] = useState([]);
  const orderId = searchParams.get("OrderID") || "";
  // const partnerId = searchParams.get("PartnerID") || "";

  const requestPayment = async (
    money,
    voucherId,
    voucherName,
    voucherDiscount,
    success,
    returnUrl,
    orderId,
    serviceName
  ) => {
    try {
      const res = await fetch("https://api.htilssu.com/api/v1/prequest", {
        method: "POST",
        headers: {
          "X-Api":
            "088ceabd98a514383c78e153c1442165a92600c4366580eb377791b5ff4b622a",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          money: money,
          voucherId: voucherId,
          voucherName: voucherName,
          voucherDiscount: voucherDiscount,
          success: success,
          returnUrl: returnUrl,
          orderId: orderId,
          serviceName: serviceName,
        }),
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await res.json();
      setVoucher((e) => result);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const responseOrder = await fetch(
          `https://voucher-server-alpha.vercel.app/api/vouchers/getPartNerRequestByOrderId/${orderId}`,
          // `https://voucher-server-alpha.vercel.app/api/vouchers/getPartNerRequestByOrderId/ABC445`,
          {
            method: "POST",
          }
        );
        const responsePartner = await fetch(
          `https://api.htilssu.com/api/v1/partner/all`,
          {
            method: "GET",
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
        // console.log(data.partNerRequest);
        // console.log(dataPartner);
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
    <div className=" rounded-xl h-fit bg-gradient-to-b text-left from-pink-400 px-40 my-12 mx-40 pt-12">
      <h1 className="text-4xl text-center text-white font-bold my-12">
        THANH TOÁN
      </h1>
      <div className="bg-white p-6 mb-6 w-full mt-4 mx-auto rounded-xl ">
        <p className="text-left p-4 text-2xl font-bold text-pink-300">
          Thông tin đơn hàng
        </p>
        <div className="py-4 shadow-md shadow-pink-300 mx-2 px-4 rounded-md grid grid-cols-12 gap-4">
          <div className="col-span-3 text-xl text-slate-500">Mã Đơn Hàng:</div>
          <div className="col-span-9 text-xl px-2 overflow-scroll scrollbar-hide">
            {thanhtoan.OrderID}
          </div>
          <div className="col-span-3 text-xl text-slate-500">Nhà cung cấp:</div>
          <div className="col-span-3 text-xl px-2 overflow-scroll scrollbar-hide">
            {partner.map((item) => {
              if (item.id === thanhtoan.PartnerID) {
                return item.name.toUpperCase();
              }
            })}
          </div>
          <div className="col-span-3 text-xl text-slate-500">Tên dịch vụ:</div>
          <div className="col-span-3 text-xl px-2 overflow-scroll scrollbar-hide">
            {thanhtoan.ServiceName}
          </div>
          <div className="col-span-3 text-xl text-slate-500">
            Mã Khách hàng:{" "}
          </div>
          <div className="col-span-3 text-xl px-2 overflow-scroll scrollbar-hide">
            {thanhtoan.CustomerCode}
          </div>
          <div className="col-span-3 text-xl text-slate-500">
            Tên khách hàng:{" "}
          </div>
          <div className="col-span-3 text-xl px-2 overflow-scroll scrollbar-hide">
            {thanhtoan.CustomerName}
          </div>
          <div className="col-span-3 text-xl text-slate-500">Mô tả:</div>
          <div className="col-span-9 text-xl px-2 overflow-scroll scrollbar-hide">
            {thanhtoan.Description}
          </div>
        </div>
        <div className="py-4 shadow-md shadow-pink-300 mx-2 px-4 mt-12 rounded-md">
          <VoucherList
            setDiscount={setDiscount}
            setVoucher={setVoucher}
            id={partner.id}
          />
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
        <button
          onClick={() => {
            requestPayment(
              thanhtoan.TotalMoney,
              "",
              "",
              discount,
              thanhtoan.LinkReturnSuccess,
              thanhtoan.LinkHome,
              orderId,
              thanhtoan.ServiceName
            );
            window.open(`https://htilssu.com/servicepayment/${voucher.id}`);
          }}
          className="w-2/3 mb-12 bg-pink-300 border-4 border-pink-300 shadow-inner hover:bg-white shadow-pink-300 text-white hover:text-pink-300 font-bold py-2 px-8 text-xl rounded-lg"
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
}
