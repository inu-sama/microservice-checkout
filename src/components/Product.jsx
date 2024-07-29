import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useLocation } from "react-router-dom";
import ProductData from "../data/ProductData";
import MainPage from "./MainPage";

export default function Product({ setPrice }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("service");
  const [datXe, setDatXeOto] = useState([]);
  const [service, setService] = useState();
  // window.open(
  //   "http://localhost:5173/?service=abc&checkoutid=669f3567087ce4f213f767a8"
  // );
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          // "https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api/GetDatXeOto",
          "https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api/FindBookingCarID/" +
            queryCheckout,
          {
            method: "POST",
            // headers: {
            //   "Content-Type": "application/json",
            // },
            //   body: JSON.stringify(danhsachsanbay),
          }
        );
        const data = await response.json();
        setDatXeOto(data || []);
      } catch {
        console.error("Error fetching data");
      }
    })();
    console.log(datXe);
    setService(query);
  }, []);
  let total = datXe.ThanhTien;
  // setPrice(total);
  // return (
  //   <>
  //     {/* {datXeOto.map((datXe) => {
  //       total += datXe.ThanhTien;
  //       // useEffect(() => {
  //       setPrice(total);
  //       // setQuantity(datXe.SoLuongHanhKhach);
  //       // }, []);
  //       return ( */}
  //     <div key={datXe._id} className="grid grid-cols-12 overflow-hidden">
  //       <div className="col-span-2 font-bold text-green-400 border border-x-green-400 border-b-green-400 p-2">
  //         <p>{datXe.MaDX}</p>
  //       </div>
  //       <div className="col-span-6 border border-x-green-400 border-b-green-400 p-2">
  //         <p>Phiếu đặt xe</p>
  //         <p>
  //           Từ {datXe.DiemDon} đến {datXe.DiemTra}
  //         </p>
  //       </div>
  //       <div className="col-span-2 border border-x-green-400 border-b-green-400 p-2">
  //         <p>{quantity}</p>
  //       </div>
  //       <div className="col-span-2 border border-x-green-400 border-b-green-400 p-2">
  //         <p>{datXe.ThanhTien}đ</p>
  //       </div>
  //     </div>
  //     {/* // ); // })} */}
  //     <div className="grid grid-cols-12 text-lg rounded-b-md overflow-hidden">
  //       <div className="col-span-8 font-bold text-green-400 border border-x-green-400 border-b-green-400 p-2 rounded-bl-md text-end px-10">
  //         <p>Tổng:</p>
  //       </div>
  //       <div className="col-span-4 border border-x-green-400 border-b-green-400 p-2 rounded-br-md">
  //         <p>{total}đ</p>
  //       </div>
  //     </div>
  //   </>
  // );
  return (
    <>
      <div className="grid grid-cols-12">
        <div>
          <p>{service}</p>
          <input type="button" value="" />
        </div>
      </div>
    </>
  );
}
