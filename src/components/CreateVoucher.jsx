import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const VoucherDetail = () => {
  const { id } = useParams();
  const [voucher, setVoucher] = useState();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const fetchVoucherByID = async () => {
    try {
      const response = await fetch(
        `https://voucher-server-akuy.vercel.app/api/vouchers/getVoucherById/${id}`,
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Fetched Voucher Data: ", result);
      console.log("Fetched Voucher Data: ", result.voucher.VoucherImage);
      setVoucher(result);
    } catch (error) {
      setError("Không thể lấy dữ liệu từ máy chủ: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVoucherByID();
  }, [id]);

  useEffect(() => {
    console.log("Voucher Data: ", voucher);
  }, [voucher]);

  if (isLoading) {
    return (
      <div className="text-center text-4xl translate-y-1/2 h-full font-extrabold">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-4xl translate-y-1/2 h-full font-extrabold">
        Error: {error}
      </div>
    );
  }

  if (!voucher || Object.keys(voucher).length === 0) {
    return (
      <div className="text-center text-4xl translate-y-1/2 h-full font-extrabold">
        No voucher data available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 p-20 bg-gradient-to-br from-pink-200">
      <h3 className="col-span-12 font-bold text-4xl text-pink-600 mb-12">
        {voucher.voucher.VoucherName}
      </h3>
      <div className="col-span-4 place-items-center ">
        <img
          src={voucher.voucher.VoucherImage}
          alt=""
          className="img-fluid rounded-xl"
        />
      </div>
      <div className="grid grid-cols-2 col-span-8 text-left place-items-start w-full px-10 text-2xl">
        <p>
          <span className="font-bold text-pink-600">Mã:</span>{" "}
          {voucher.voucher.VoucherID}
        </p>
        <p>
          <span className="font-bold text-pink-600">Hạn sử dụng:</span>{" "}
          {formatDate(voucher.voucher.VoucherEndDate)}
        </p>
        <p>
          <span className="font-bold text-pink-600">Mức giảm:</span>{" "}
          {voucher.voucher.VoucherDiscount}%
        </p>
        <p>
          <span className="font-bold text-pink-600">Giảm tối đa:</span>{" "}
          {voucher.voucher.VoucherMaxValue}đ
        </p>
        <p>
          <span className="font-bold text-pink-600">
            Giá trị đơn hàng tối thiểu:
          </span>{" "}
          {voucher.voucher.VoucherMinValue}đ
        </p>
        <p>
          <span className="font-bold text-pink-600">Mô tả:</span>{" "}
          {voucher.voucher.VoucherDescription}
        </p>
      </div>
    </div>
  );
};

export default VoucherDetail;
