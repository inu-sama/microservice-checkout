import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const VoucherForm = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("service").toUpperCase(); // Assume the query is a valid string for demonstration

  const [voucherPartner, setVoucherPartner] = useState({
    VoucherID: `${
      query.charAt(0) +
      query.charAt(1) +
      Math.floor(Math.random() * 10) +
      Math.floor(Math.random() * 10) +
      Math.floor(Math.random() * 10)
    }`,
    VoucherName: "",
    VoucherType: "",
    VoucherImage: "",
    VoucherDescription: "",
    VoucherStartDate: "",
    VoucherEndDate: "",
    VoucherDiscount: 0,
    VoucherMinValue: 0,
    VoucherMaxValue: 0,
    VoucherQuantity: 0,
    VoucherStatus: "Available",
    AmountUsed: 0,
    VoucherCreatedBy: `${query}`, // Assume a valid ObjectId string for demonstration
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVoucherPartner({ ...voucherPartner, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://voucher-server-alpha.vercel.app/api/vouchers/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(voucherPartner),
        }
      );
      if (response.ok) {
        alert("Voucher created successfully!");
        setVoucher({
          VoucherID: `${query}`,
          VoucherName: "",
          VoucherType: "",
          VoucherImage: "",
          VoucherDescription: "",
          VoucherStartDate: "",
          VoucherEndDate: "",
          VoucherDiscount: 0,
          VoucherMinValue: 0,
          VoucherMaxValue: 0,
          VoucherQuantity: 0,
          VoucherStatus: "",
          AmountUsed: 0,
          VoucherCreatedBy: "Voucher Supplier", // Assume a valid ObjectId string for demonstration
        });
      } else {
        alert("Failed to create voucher!");
      }
    } catch (error) {
      console.error("Failed to create voucher!", error);
    }
  };
  const service = "Partner";

  return (
    <form className="bg-gradient-to-b from-green-400 p-6">
      <h1 className="text-4xl font-bold mb-4 pt-6 text-center text-white border-t-8 border-white rounded-3xl">
        Tạo Voucher cho hệ thống {query}
      </h1>
      <div className="grid grid-cols-12 rounded-xl bg-white place-items-end items-center gap-4 p-12 m-12 drop-shadow-xl">
        <p className="col-span-2 font-bold text-left text-green-400 text-lg place-self-start">
          Thông tin cơ bản
        </p>
        <div className="col-span-10"></div>
        <label
          htmlFor="VoucherID"
          className=" text-sm font-medium text-gray-700 col-span-2"
        >
          Mã Voucher:
        </label>
        <input
          type="text"
          id="VoucherID"
          name="VoucherID"
          value={voucherPartner.VoucherID}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 col-span-4 border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm"
          required
          disabled
        />
        <label
          htmlFor="VoucherName"
          className="block text-sm font-medium text-gray-700 col-span-2"
        >
          Tên Voucher:
        </label>
        <input
          type="text"
          id="VoucherName"
          name="VoucherName"
          value={voucherPartner.VoucherName}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 col-span-4 border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          required
        />
        <label
          htmlFor="VoucherType"
          className="block text-sm font-medium text-gray-700 col-span-2"
        >
          Loại Voucher:
        </label>
        <input
          type="text"
          id="VoucherType"
          name="VoucherType"
          value={voucherPartner.VoucherType}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 col-span-4 border border-gray-300 rounded-md shadow-sm
          focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          required
        />
        <label
          htmlFor="VoucherImage"
          className="block text-sm font-medium text-gray-700 col-span-2"
        >
          Ảnh Voucher:
        </label>
        <input
          type="text"
          id="VoucherImage"
          name="VoucherImage"
          value={voucherPartner.VoucherImage}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 col-span-4 border border-gray-300 rounded-md shadow-sm
          focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
        />
        <label
          htmlFor="VoucherDescription"
          className="block text-sm font-medium text-gray-700 col-span-2"
        >
          Mô Tả Voucher:
        </label>
        <input
          type="text"
          id="VoucherDescription"
          name="VoucherDescription"
          value={voucherPartner.VoucherDescription}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border col-span-10 border-gray-300 rounded-md shadow-sm
          focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          required
        />
      </div>
      <div className="grid grid-cols-12 rounded-xl bg-white place-items-end items-center gap-4 p-12 m-12 shadow-xl">
        <p className="col-span-2 font-bold text-left text-green-400 text-lg place-self-start">
          Thiết lập giảm giá
        </p>
        <div className="col-span-10"></div>
        <label
          htmlFor="VoucherStartDate"
          className="block text-sm font-medium text-gray-700 col-span-2"
        >
          Ngày Bắt Đầu:
        </label>
        <input
          type="date"
          id="VoucherStartDate"
          name="VoucherStartDate"
          value={voucherPartner.VoucherStartDate}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 col-span-4 border border-gray-300 rounded-md shadow-sm
              focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          required
        />
        <label
          htmlFor="VoucherEndDate"
          className="block text-sm font-medium text-gray-700 col-span-2"
        >
          Ngày Kết Thúc:
        </label>
        <input
          type="date"
          id="VoucherEndDate"
          name="VoucherEndDate"
          value={voucherPartner.VoucherEndDate}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 col-span-4 border border-gray-300 rounded-md shadow-sm
          focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          required
        />
        <label
          htmlFor="VoucherDiscount"
          className="block text-sm font-medium text-gray-700 col-span-2"
        >
          Giảm Giá (%):
        </label>
        <input
          type="number"
          id="VoucherDiscount"
          name="VoucherDiscount"
          value={voucherPartner.VoucherDiscount}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 col-span-4 border border-gray-300 rounded-md shadow-sm
          focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          required
        />
        <label
          htmlFor="VoucherMinValue"
          className="block text-sm font-medium text-gray-700 col-span-2"
        >
          Giá Trị Tối Thiểu:
        </label>
        <input
          type="number"
          id="VoucherMinValue"
          name="VoucherMinValue"
          value={voucherPartner.VoucherMinValue}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 col-span-4 border border-gray-300 rounded-md shadow-sm
          focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          required
        />
        <label
          htmlFor="VoucherMaxValue"
          className="block text-sm font-medium text-gray-700 col-span-2"
        >
          Giá Trị Tối Đa:
        </label>
        <input
          type="number"
          id="VoucherMaxValue"
          name="VoucherMaxValue"
          value={voucherPartner.VoucherMaxValue}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 col-span-4 border border-gray-300 rounded-md shadow-sm
          focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          required
        />
        <label
          htmlFor="VoucherQuantity"
          className="block text-sm font-medium text-gray-700 col-span-2"
        >
          Số Lượng Voucher:
        </label>
        <input
          type="number"
          id="VoucherQuantity"
          name="VoucherQuantity"
          value={voucherPartner.VoucherQuantity}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 col-span-4 border border-gray-300 rounded-md shadow-sm
          focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-400 text-white font-bold py-4 mt-8 col-span-8 col-start-3 rounded-lg
          hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
          onClick={handleSubmit}
        >
          Tạo Voucher
        </button>
      </div>
    </form>
  );
};

export default VoucherForm;
