import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const GetListVoucher = () => {
  const [voucher, setVoucher] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchVoucher = async () => {
    try {
      const res = await fetch(
        "https://voucher-server-alpha.vercel.app/api/vouchers/getVoucher"
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await res.json();
      setVoucher(result.vouchers || []);
    } catch (error) {
      setError("Không thể lấy dữ liệu từ máy chủ " + error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVoucher();
  }, []);

  

  return (
    <div className="w-auto h-full bg-gradient-to-b from-green-400 p-6">
      <h1 className="text-4xl font-bold mb-4 pt-6 text-center text-white border-t-8 border-white rounded-3xl">
        Danh sách Voucher
      </h1>
      <div className="p-2 bg-white rounded-lg m-12">
        <table className="w-full">
          <thead>
            <tr className="bg-green-400 text-white">
              <th className="border px-4 py-2">Mã Voucher</th>
              <th className="border px-4 py-2">Tên Voucher</th>
              <th className="border px-4 py-2">Số lượng</th>
              <th className="border px-4 py-2">Ngày hết hạn</th>
              <th className="border px-4 py-2">Trạng thái</th>
              <th className="border px-4 py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {console.log(`vouchercheck:${voucher}`)}
            {voucher.map((voucher) => (
              <tr key={voucher._id} className="text-green-600">
                <td className="border px-4 py-2">{voucher.VoucherID}</td>
                <td className="border px-4 py-2">{voucher.VoucherName}</td>
                <td className="border px-4 py-2">{voucher.VoucherQuantity}</td>
                <td className="border px-4 py-2">{voucher.VoucherEndDate}</td>
                <td className="border px-4 py-2">{voucher.VoucherStatus}</td>
                <td className="border px-4 py-2 flex justify-center space-x-4 bg-green-400">
                  <button
                    className="bg-white text-red-400 shadow-inner shadow-red-400 px-4 py-2 w-fit h-fit hover:bg-red-400 hover:text-white font-bold rounded"
                    onClick={() => handleDeleteVoucher(voucher._id)}
                  >
                    Xóa
                  </button>
                  <button
                    className="bg-white text-green-400 shadow-inner px-4 py-2 w-fit h-fit hover:bg-green-400 hover:text-white hover:shadow-white font-bold rounded"
                    onClick={() => voucher._id}
                  >
                    {" "}
                    <Link to={`/UpdateVoucher/${voucher._id}`}>Cập nhật</Link>
                  </button>
                </td>
              </tr>
            ))}
            <tr className="">
              <td className="" colSpan={6}>
                <button className="bg-green-400 border-4 border-green-400 px-4 py-2 my-4 w-2/3 h-fit text-white hover:bg-white hover:text-green-400 font-bold rounded-full">
                  <a className="no-underline" href="/CreateVoucher">
                    Thêm Voucher
                  </a>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetListVoucher;
