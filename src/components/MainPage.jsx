import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useLocation } from "react-router-dom";
import Product from "./Product";
import VoucherList from "./VoucherList";

export default function MainPage() {
  const { id } = useParams();
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const final = price - (price * discount) / 100;
  const [service, setService] = useState();
  // setFinal(price - (price * discount) / 100);
  return (
    <div className="container bg-gray-100 py-8">
      <p className="font-bold text-green-400 text-4xl">Chi tiết giao dịch</p>
      <div className="grid grid-cols-12 gap-10 px-10">
        {/* <div className="bg-white col-span-7 shadow-xl rounded-lg my-10 p-3 m-0 h-fit">
          <div className="grid grid-cols-12 text-lg text-white font-bold rounded-t-md">
            <div className="col-span-2 border border-x-green-400 border-t-green-400 bg-green-400 p-2 rounded-t-md">
              <p>Mã</p>
            </div>
            <div className="col-span-6 border border-x-green-400 border-t-green-400 bg-green-400 p-2 rounded-t-md">
              <p>Sản phẩm</p>
            </div>
            <div className="col-span-2 border border-x-green-400 border-t-green-400 bg-green-400 p-2 rounded-t-md">
              <p>Số lượng</p>
            </div>
            <div className="col-span-2 border border-x-green-400 border-t-green-400 bg-green-400 p-2 rounded-t-md">
              <p>Giá</p>
            </div>
          </div>
          <Product setPrice={setPrice} id={id} />
        </div> */}
        <div className="bg-white col-span-8 col-start-3 shadow-xl rounded-lg my-10 p-3 px-10 m-0 h-fit">
          <div className="grid grid-cols-12">
            <div className="col-span-8 col-start-3">
              <p>{service}</p>
            </div>
          </div>
          <VoucherList setDiscount={setDiscount} />
          <Product setPrice={setPrice} />
          <div className="grid grid-cols-2">
            <div className="font-bold text-left px-10">
              <p>Tạm tính:</p>
            </div>
            <div className="text-right px-20">{price}đ</div>
          </div>
          <div className="grid grid-cols-2">
            <div className=""></div>
            <div className="text-right text-green-400 text-sm px-20">
              -{(price * discount) / 100}đ
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="font-bold text-left px-10">
              <p>Tổng tiền:</p>
            </div>
            <div className="text-right px-20">{final}đ</div>
          </div>
          <button className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 my-10 rounded-md w-full">
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
}
