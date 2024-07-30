import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const GetListVoucherPartner = () => {
  const [voucher, setVoucher] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("service").toUpperCase();

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

  const handleDeleteVoucher = async (_id) => {
    try {
      const res = await fetch(
        `https://voucher-server-alpha.vercel.app/api/vouchers/delete/${_id}`,
        {
          method: "POST", // Sử dụng phương thức POST theo routes của bạn
        }
      );
      if (res.status === 200) {
        alert("Xóa thành công");
        window.location.reload();
      } else {
        alert("Xóa thất bại");
      }
    } catch (error) {
      console.error("Error deleting voucher:", error);
      alert("Đã xảy ra lỗi khi xóa voucher");
    }
  };

  if (isLoading)
    return (
      <div className="text-center text-green-600 text-4xl translate-y-1/2 h-full font-extrabold">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 text-4xl translate-y-1/2 h-full font-extrabold">
        Error: {error}
      </div>
    );

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
            {voucher.map((voucher) => {
              if (voucher.VoucherCreatedBy === query) {
                return (
                  <tr key={voucher._id} className="text-green-600">
                    <td className="border px-4 py-2">{voucher.VoucherID}</td>
                    <td className="border px-4 py-2">{voucher.VoucherName}</td>
                    <td className="border px-4 py-2">
                      {voucher.VoucherQuantity}
                    </td>
                    <td className="border px-4 py-2">
                      {voucher.VoucherEndDate}
                    </td>
                    <td className="border px-4 py-2">
                      {voucher.VoucherStatus}
                    </td>
                    <td className="border px-4 py-2 flex justify-center space-x-4 bg-green-200">
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
                        <Link to={`/UpdateVoucher/${voucher._id}`}>
                          Cập nhật
                        </Link>
                      </button>
                    </td>
                  </tr>
                );
              }
            })}
            <tr className="">
              <td className="" colSpan={6}>
                <button className="bg-green-400 border-4 border-green-400 px-4 py-2 my-4 w-2/3 h-fit text-white hover:bg-white hover:text-green-400 font-bold shadow-inner hover:shadow-green-400 rounded-full">
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

export default GetListVoucherPartner;
