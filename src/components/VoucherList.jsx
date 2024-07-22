import { useState, useEffect } from "react";

export default function VoucherList({ setDiscount }) {
  const [voucher, setVoucher] = useState([]);
  const [selection, setSelection] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://voucher-server-akuy.vercel.app/api/vouchers/getVoucher",
          {
            method: "POST",
            // headers: {
            //   "Content-Type": "application/json",
            // },
            //   body: JSON.stringify(danhsachsanbay),
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
    <div>
      <details className="dropdown relative">
        <summary className="cursor-pointer w-full rounded-t-md border-4 border-green-400 text-green-400">
          Chọn voucher
        </summary>
        <ul className="absolute top-7 menu dropdown-content bg-white rounded-box z-[99] w-full py-2 rounded-b-md border-2 border-green-400 shadow">
          {voucher.map((item) => {
            return (
              <li key={item._id}>
                <div
                  className="group grid grid-cols-12 hover:bg-green-400 hover:text-white
                    cursor-pointer place-items-center dropdown"
                  onClick={() => {
                    setSelection(item);
                    setDiscount(item.VoucherDiscount);
                  }}
                >
                  <div className="col-span-3 p-2">
                    <img src={item.VoucherImage} alt="" className="img-fluid" />
                  </div>
                  <div className="col-span-8 border-3 border-black text-left">
                    <p className="font-bold text-green-400 text-lg group-hover:text-white">
                      {item.VoucherName}
                    </p>
                    <p className="text-sm">{item.VoucherEndDate}</p>
                    <p>
                      Giảm {item.VoucherDiscount}% cho đơn từ{" "}
                      {item.VoucherMinValue}
                    </p>
                    <p>Tối đa {item.VoucherMaxValue}</p>
                  </div>
                  <div
                    className="btn col-span-1 text-4xl text-green-400 group-hover:text-white cursor-help"
                    onClick={() =>
                      document.getElementById("voucher_detail").showModal()
                    }
                  >
                    🛈
                  </div>
                  <dialog
                    id="voucher_detail"
                    className="modal p-5 pb-16 rounded-2xl w-1/2"
                  >
                    <form method="dialog" className="modal-backdrop">
                      <button className="w-full text-green-400 text-right text-4xl px-2">
                        🗙
                      </button>
                    </form>
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">{item.VoucherName}</h3>
                      <div className="grid grid-cols-12 place-items-center">
                        <div className="col-span-4">
                          <img
                            src={item.VoucherImage}
                            alt=""
                            className="img-fluid"
                          />
                        </div>
                        {/* <div className="col-span-8"></div> */}
                      </div>
                    </div>
                  </dialog>
                </div>
              </li>
            );
          })}
        </ul>
      </details>
      <p className="text-left p-2 my-1 font-bold">Voucher sử dụng:</p>
      {selection ? (
        <div className="grid grid-cols-12 cursor-pointer mt-2 mb-10">
          <div className="col-span-3">
            <img src={selection.VoucherImage} alt="" className="img-fluid" />
          </div>
          <div className="col-span-8 border-3 border-black text-left">
            <p className="font-bold text-green-400 text-lg">
              {selection.VoucherName}
            </p>
            <p className="text-sm">{selection.VoucherEndDate}</p>
            <p>
              Giảm {selection.VoucherDiscount}% cho đơn từ{" "}
              {selection.VoucherMinValue}
            </p>
            <p>Tối đa {selection.VoucherMaxValue}</p>
          </div>
          <div className="col-span-1"></div>
        </div>
      ) : null}
    </div>
  );
}
