import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const UpdateVoucher = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Thay thế useNavigation bằng useNavigate

  const [formData, setFormData] = useState({
    VoucherImage: "",
    VoucherDescription: "",
    VoucherStartDate: "",
    VoucherEndDate: "",
    VoucherDiscount: "",
    VoucherMinValue: "",
    VoucherMaxValue: "",
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchVoucherByID = async () => {
    try {
      const response = await fetch(
        // `http://localhost:3001/api/vouchers/getVoucherById/${id}`,
        `https://voucher-server-alpha.vercel.app/api/vouchers/getVoucherById/66a5c69d5954186464abba0e`,
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log(result);
      setFormData({
        VoucherImage: result.VoucherImage,
        VoucherDescription: result.VoucherDescription,
        VoucherStartDate: result.VoucherStartDate,
        VoucherEndDate: result.VoucherEndDate,
        VoucherDiscount: result.VoucherDiscount,
        VoucherMinValue: result.VoucherMinValue,
        VoucherMaxValue: result.VoucherMaxValue,
      });
    } catch (error) {
      setError("Không thể lấy dữ liệu từ máy chủ " + error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // console.log(id);
    fetchVoucherByID();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3001/api/vouchers/update/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        alert("Voucher updated successfully!");
        navigate("/VoucherList");
      } else {
        alert("Failed to update voucher!");
      }
    } catch (error) {
      console.error("Failed to update voucher!", error);
      alert("Failed to update voucher!");
    }
  };

  if (isLoading)
    return (
      <div className="text-center text-4xl translate-y-1/2 h-full font-extrabold">
        Loading...
      </div>
    );

  if (error) {
    return (
      <div className="text-center text-4xl translate-y-1/2 h-full font-extrabold">
        {error}
      </div>
    );
  }

  // return (
  //   <div>
  //     <h1 className="text-2xl font-bold mb-4 text-center">Update Voucher</h1>
  //     <div className="w-full mx-auto p-6 bg-white shadow-md rounded-md align-middle">
  //       <form className="grid grid-cols-2 gap-10">
  //         <div className="flex">
  //           <label
  //             htmlFor="VoucherImage"
  //             className="block text-sm font-medium text-gray-700"
  //           >
  //             Ảnh Voucher:
  //           </label>
  //           <input
  //             type="text"
  //             id="VoucherImage"
  //             name="VoucherImage"
  //             value={formData.VoucherImage || ""}
  //             onChange={handleInputChange}
  //             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  //           />
  //         </div>
  //         <div className="flex">
  //           <label
  //             htmlFor="VoucherDescription"
  //             className="block text-sm font-medium text-gray-700"
  //           >
  //             Mô Tả Voucher:
  //           </label>
  //           <input
  //             type="text"
  //             id="VoucherDescription"
  //             name="VoucherDescription"
  //             value={formData.VoucherDescription || ""}
  //             onChange={handleInputChange}
  //             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  //             required
  //           />
  //         </div>
  //         <div className="flex">
  //           <label
  //             htmlFor="VoucherStartDate"
  //             className="block text-sm font-medium text-gray-700"
  //           >
  //             Ngày Bắt Đầu:
  //           </label>
  //           <input
  //             type="date"
  //             id="VoucherStartDate"
  //             name="VoucherStartDate"
  //             value={formData.VoucherStartDate || ""}
  //             onChange={handleInputChange}
  //             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  //             required
  //           />
  //         </div>
  //         <div className="flex">
  //           <label
  //             htmlFor="VoucherEndDate"
  //             className="block text-sm font-medium text-gray-700"
  //           >
  //             Ngày Kết Thúc:
  //           </label>
  //           <input
  //             type="date"
  //             id="VoucherEndDate"
  //             name="VoucherEndDate"
  //             value={formData.VoucherEndDate || ""}
  //             onChange={handleInputChange}
  //             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  //             required
  //           />
  //         </div>
  //         <div className="flex">
  //           <label
  //             htmlFor="VoucherDiscount"
  //             className="block text-sm font-medium text-gray-700"
  //           >
  //             Giảm Giá (%):
  //           </label>
  //           <input
  //             type="number"
  //             id="VoucherDiscount"
  //             name="VoucherDiscount"
  //             value={formData.VoucherDiscount || ""}
  //             onChange={handleInputChange}
  //             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  //             required
  //           />
  //         </div>
  //         <div className="flex">
  //           <label
  //             htmlFor="VoucherMinValue"
  //             className="block text-sm font-medium text-gray-700"
  //           >
  //             Giá Trị Tối Thiểu:
  //           </label>
  //           <input
  //             type="number"
  //             id="VoucherMinValue"
  //             name="VoucherMinValue"
  //             value={formData.VoucherMinValue || ""}
  //             onChange={handleInputChange}
  //             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  //             required
  //           />
  //         </div>
  //         <div className="flex">
  //           <label
  //             htmlFor="VoucherMaxValue"
  //             className="block text-sm font-medium text-gray-700"
  //           >
  //             Giá Trị Tối Đa:
  //           </label>
  //           <input
  //             type="number"
  //             id="VoucherMaxValue"
  //             name="VoucherMaxValue"
  //             value={formData.VoucherMaxValue || ""}
  //             onChange={handleInputChange}
  //             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  //             required
  //           />
  //         </div>
  //         <Link
  //           to="/VoucherList"
  //           className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  //         >
  //           <button>Cancel</button>
  //         </Link>
  //         <button
  //           type="submit"
  //           className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  //           onClick={handleSubmit}
  //         >
  //           Update Voucher
  //         </button>
  //       </form>
  //     </div>
  //   </div>
  // );
  return (
    <form className="bg-gradient-to-b from-green-400 p-6">
      <h1 className="text-4xl font-bold mb-4 pt-6 text-center text-white border-t-8 border-white rounded-3xl">
        Cập nhật Voucher
      </h1>
      <div className="grid grid-cols-12 rounded-xl bg-white place-items-end items-center gap-4 p-12 m-12 drop-shadow-xl">
        <label
          htmlFor="VoucherImage"
          className=" text-sm font-medium text-gray-700 col-span-2"
        >
          Ảnh Voucher:
        </label>
        <input
          type="text"
          id="VoucherImage"
          name="VoucherImage"
          value={formData.VoucherImage || ""}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 col-span-4 border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm"
          required
        />
        <label
          htmlFor="VoucherDiscount"
          className="block text-sm font-medium text-gray-700 col-span-2"
        >
          Giảm giá (%):
        </label>
        <input
          type="number"
          id="VoucherDiscount"
          name="VoucherDiscount"
          value={formData.VoucherDiscount || ""}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border col-span-4 border-gray-300 rounded-md shadow-sm
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
          value={formData.VoucherMinValue || ""}
          onChange={handleInputChange}
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
          value={formData.VoucherMaxValue || ""}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 col-span-4 border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          required
        />
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
          value={formData.VoucherStartDate || ""}
          onChange={handleInputChange}
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
          value={formData.VoucherEndDate || ""}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 col-span-4 border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          required
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
          value={formData.VoucherDescription || ""}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 col-span-10 border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          required
        />
        <Link
          to="/VoucherList"
          className="w-full col-span-6 bg-green-400 text-white py-4 rounded-md font-bold shadow-inner
          hover:shadow-green-400 hover:bg-white hover:text-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="w-full col-span-6 bg-green-400 text-white py-4 rounded-md font-bold shadow-inner
          hover:shadow-green-400 hover:bg-white hover:text-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
          onClick={handleSubmit}
        >
          Update Voucher
        </button>
      </div>
    </form>
  );
};

export default UpdateVoucher;
