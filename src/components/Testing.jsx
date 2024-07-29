import React, { useState, useEffect } from "react";
import VoucherList from "./VoucherList";

export default function Testing() {
  const [voucher, setVoucher] = useState([]);
  const [selection, setSelection] = useState({});
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://voucher-server-akuy.vercel.app/api/vouchers/getVoucher",
          {
            method: "GET",
          }
        );
        const data = await response.json();
        setVoucher(data.vouchers || []);
        console.log(data.vouchers);
      } catch {
        console.error("Error fetching data");
      }
    })();
    console.log(voucher);
  }, []);
  return (
    <div className="w-[85%] border border-pink-200 my-8 rounded-md mx-auto h-fit bg-gradient-to-b text-left p-4 from-pink-300 to-white py-6 px-10">
      <div className="h-full">
        <h1 className="text-3xl text-center text-white">THANH TOÁN</h1>{" "}
      </div>
      <div class="bg-slate-50 border border-slate-200 p-6 mb-6 w-ful mt-4 mx-auto rounded-md ">
        <p className="text-center p-4 text-2xl ">Thông tin đơn hàng</p>
        <div className="py-4 border border-slate-300 mx-2 px-4 rounded-md bg-white grid grid-cols-2">
          <div className="flex py-4">
            <span className="text-xl text-slate-500">Mã Đơn Hàng:</span>
            <span className="text-xl">{} bỏ dữ liệu mã đơn hàng vào ngoặc</span>
          </div>
          <div className="flex py-4">
            <span className="text-xl text-slate-500">Tên dịch vụ:</span>
            <span className="text-xl px-2 ">
              {} bỏ dữ liệu mã đơn hàng vào ngoặc
            </span>
          </div>
          <div className="flex py-4">
            <span className="text-xl text-slate-500">Tên công ty: </span>
            <span className="text-xl px-2 ">
              {} bỏ dữ liệu mã đơn hàng vào ngoặc ngoặc
            </span>
          </div>

          <div className="flex py-4">
            <span className="text-xl text-slate-500">Mã Khách hàng: </span>
            <span className="text-xl px-2 ">
              {} bỏ dữ liệu mã đơn hàng vào ngoặc
            </span>
          </div>
          <div className="flex py-4">
            <span className="text-xl text-slate-500">Tên khách hàng: </span>
            <span className="text-xl px-2 ">
              {} bỏ dữ liệu mã đơn hàng vào ngoặc
            </span>
          </div>
          <div className="flex py-4">
            <span className="text-xl text-slate-500">Mô tả: </span>
            <span className="text-xl px-2 ">
              {} bỏ dữ liệu mã đơn hàng vào ngoặc
            </span>
          </div>
        </div>

        <div className="py-4 border border-slate-300 mx-2 px-4 mt-4 rounded-md bg-white">
          <VoucherList />
        </div>

        <p className="text-center p-4 text-2xl mt-4">Bảng thanh toán</p>
        <div className="py-4 border border-slate-300 mx-2 px-4 grid grid-cols-2 rounded-md bg-white">
          <div>
            <div className="flex py-4">
              <span className="text-xl text-slate-500">Tổng tiền:</span>
              <span className="text-xl">
                {} bỏ dữ liệu mã đơn hàng vào ngoặc
              </span>
            </div>
            <div className="flex py-4">
              <span className="text-xl text-slate-500">Giảm giá:</span>
              <span className="text-xl px-2 ">
                {} bỏ dữ liệu mã đơn hàng vào ngoặc
              </span>
            </div>
            <div className="flex py-4">
              <span className="text-xl text-slate-500">Tổng cộng: </span>
              <span className="text-xl px-2 ">
                {} bỏ dữ liệu mã đơn hàng vào ngoặc ngoặc
              </span>
            </div>
          </div>
          <div>
            <div className="flex py-4">
              <span className="text-xl text-slate-500">Thuế:</span>
              <span className="text-xl">
                {} bỏ dữ liệu mã đơn hàng vào ngoặc
              </span>
            </div>
            <div className="flex py-4">
              <span className="text-xl text-slate-500">Triết khấu:</span>
              <span className="text-xl px-2 ">
                {} bỏ dữ liệu mã đơn hàng vào ngoặc
              </span>
            </div>
            <div className="flex py-4">
              <span className="text-xl text-slate-500">bala bala: </span>
              <span className="text-xl px-2 ">
                {} bỏ dữ liệu mã đơn hàng vào ngoặc ngoặc
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-8 text-xl rounded-md">
          Thanh toán
        </button>
      </div>
    </div>
  );
}
