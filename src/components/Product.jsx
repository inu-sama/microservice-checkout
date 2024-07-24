import React, { useState, useEffect } from "react";
import ProductData from "../data/ProductData";
import MainPage from "./MainPage";

export default function Product({ setPrice }) {
  const [datXeOto, setDatXeOto] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api/GetDatXeOto",
          {
            method: "POST",
            // headers: {
            //   "Content-Type": "application/json",
            // },
            //   body: JSON.stringify(danhsachsanbay),
          }
        );
        const data = await response.json();
        setDatXeOto(data.datXeOto || []);
      } catch {
        console.error("Error fetching data");
      }
    })();
    console.log(datXeOto);
  }, []);
  let total = 0;
  // setPrice(total);
  return (
    <>
      {datXeOto.map((datXe) => {
        total += datXe.ThanhTien;
        // useEffect(() => {
        setPrice(total);
        // }, []);
        return (
          <div key={datXe._id} className="grid grid-cols-12 overflow-hidden">
            <div className="col-span-2 font-bold text-green-400 border border-x-green-400 border-b-green-400 p-2">
              <p>{datXe.MaDX}</p>
            </div>
            <div className="col-span-6 border border-x-green-400 border-b-green-400 p-2">
              <p>Phiếu đặt xe</p>
              <p>
                Từ {datXe.DiemDon} đến {datXe.DiemTra}
              </p>
            </div>
            <div className="col-span-2 border border-x-green-400 border-b-green-400 p-2">
              <p>{datXe.SoLuongHanhKhach}</p>
            </div>
            <div className="col-span-2 border border-x-green-400 border-b-green-400 p-2">
              <p>{datXe.ThanhTien}đ</p>
            </div>
          </div>
        );
      })}
      <div className="grid grid-cols-12 text-lg rounded-b-md overflow-hidden">
        <div className="col-span-8 font-bold text-green-400 border border-x-green-400 border-b-green-400 p-2 rounded-bl-md text-end px-10">
          <p>Tổng:</p>
        </div>
        <div className="col-span-4 border border-x-green-400 border-b-green-400 p-2 rounded-br-md">
          <p>{total}đ</p>
        </div>
      </div>
    </>
  );
}
