// import { useState, useEffect } from "react";

// export default function VoucherList(props) {
//   const [voucher, setVoucher] = useState([]);
//   const [selection, setSelection] = useState({});
//   // const [info, setInfo] = useState();
//   useEffect(() => {
//     (async () => {
//       try {
//         const response = await fetch(
//           "https://voucher-server-akuy.vercel.app/api/vouchers/getVoucher",
//           {
//             method: "GET",
//             // headers: {
//             //   "Content-Type": "application/json",
//             // },
//           }
//         );
//         const data = await response.json();
//         setVoucher(data.vouchers || []);
//         console.log(data.vouchers);
//       } catch {
//         console.error("Error fetching data");
//       }
//     })();
//     console.log(voucher);
//   }, []);
//   return (
//     <div>
//       <details className="dropdown relative">
//         <summary className="cursor-pointer w-full rounded-md border-4 border-green-400 text-green-400">
//           Chọn voucher
//         </summary>
//         <ul className="absolute top-7 menu dropdown-content bg-white rounded-box z-[99] w-full rounded-b-md border-2 border-green-400 shadow">
//           {voucher.map((item) => {
//             if (item.VoucherCreatedBy == "Voucher Supplier") {
//               return (
//                 <li key={item._id}>
//                   <div
//                     className="group grid grid-cols-12 hover:bg-green-400 hover:text-white cursor-pointer place-items-center px-16"
//                     onClick={() => {
//                       setSelection(item);
//                       props.setDiscount(item.VoucherDiscount);
//                     }}
//                   >
//                     <div className="col-span-3 p-2">
//                       <img
//                         src={item.VoucherImage}
//                         alt=""
//                         className="img-fluid rounded"
//                       />
//                     </div>
//                     <div className="col-span-8 border-3 border-black text-left">
//                       <p className="font-bold text-green-400 text-lg group-hover:text-white">
//                         {item.VoucherName}
//                       </p>
//                       <p className="text-sm">{item.VoucherEndDate}</p>
//                       <p>
//                         Giảm {item.VoucherDiscount}% cho đơn từ{" "}
//                         {item.VoucherMinValue}
//                       </p>
//                       <p>Tối đa {item.VoucherMaxValue}</p>
//                     </div>
//                     <div
//                       className="btn col-span-1 text-4xl text-green-400 group-hover:text-white cursor-help"
//                       onClick={() =>
//                         document.getElementById("voucher_detail").showModal()
//                       }
//                     >
//                       🛈
//                     </div>
//                     <dialog
//                       id="voucher_detail"
//                       className="modal p-5 pb-16 rounded-2xl w-1/2"
//                     >
//                       <form method="dialog" className="modal-backdrop">
//                         <button className="w-full text-green-400 text-right text-4xl px-2">
//                           🗙
//                         </button>
//                       </form>
//                       <div className="modal-box">
//                         <h3 className="font-bold text-4xl text-green-600 my-3">
//                           {selection.VoucherName}
//                         </h3>
//                         <div className="grid grid-cols-12 place-items-center">
//                           <div className="col-span-4">
//                             <img
//                               src={selection.VoucherImage}
//                               alt=""
//                               className="img-fluid rounded"
//                             />
//                           </div>
//                           <div className="grid col-span-8 text-left place-items-start w-full px-10">
//                             <p>
//                               <span className="font-bold text-green-600">
//                                 Mã:
//                               </span>{" "}
//                               {selection.VoucherID}
//                             </p>
//                             <p>
//                               <span className="font-bold text-green-600">
//                                 Hạn sử dụng:
//                               </span>{" "}
//                               {selection.VoucherEndDate}
//                             </p>
//                             <p>
//                               <span className="font-bold text-green-600">
//                                 Mức giảm:
//                               </span>{" "}
//                               {selection.VoucherDiscount}%
//                             </p>
//                             <p>
//                               <span className="font-bold text-green-600">
//                                 Giảm tối đa:
//                               </span>{" "}
//                               {selection.VoucherMaxValue}đ
//                             </p>
//                             <p>
//                               <span className="font-bold text-green-600">
//                                 Giá trị đơn hàng tối thiểu:
//                               </span>{" "}
//                               {selection.VoucherMinValue}đ
//                             </p>
//                             <p>
//                               <span className="font-bold text-green-600">
//                                 Mô tả:
//                               </span>{" "}
//                               {selection.VoucherDescription}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </dialog>
//                   </div>
//                 </li>
//               );
//             }
//           })}
//         </ul>
//       </details>
//       <p className="text-left p-2 my-1 font-bold">Voucher sử dụng:</p>
//       {selection ? (
//         <div className="grid grid-cols-12 cursor-pointer mt-2 mb-10">
//           <div className="col-span-3">
//             <img
//               src={selection.VoucherImage}
//               alt=""
//               className="img-fluid rounded"
//             />
//           </div>
//           <div className="col-span-2"></div>
//           <div className="col-span-7 border-3 border-black text-left">
//             <p className="font-bold text-green-400 text-lg">
//               {selection.VoucherName}
//             </p>
//             <p className="text-sm">{selection.VoucherEndDate}</p>
//             <p>
//               Giảm {selection.VoucherDiscount}% cho đơn từ{" "}
//               {selection.VoucherMinValue}
//             </p>
//             <p>Tối đa {selection.VoucherMaxValue}</p>
//           </div>
//         </div>
//       ) : null}
//     </div>
//   );
// }

import { useState, useEffect } from "react";

export default function VoucherList(props) {
  const [voucher, setVoucher] = useState([]);
  const [selection, setSelection] = useState();
  // setSelection(null);

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

  const handleVoucherClick = (item) => {
    setSelection(item);
    props.setDiscount(item.VoucherDiscount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="px-4">
      <details className="dropdown relative">
        <summary className="cursor-pointer text-xl w-full px-6 py-1 rounded-md text-pink-400 shadow-inner shadow-pink-300">
          Chọn voucher
        </summary>
        <ul className="absolute top-9 menu dropdown-content shadow-lg shadow-pink-300 bg-white rounded-box z-[99] w-full rounded-b-md h-[50vh] overflow-y-scroll scrollbar-hide">
          {voucher.map((item) => (
            <li key={item._id}>
              <div
                className="group grid grid-cols-12 text-slate-500 hover:bg-pink-200 hover:text-white cursor-pointer place-items-center px-16"
                onClick={() => handleVoucherClick(item)}
              >
                <div className="col-span-3 p-2">
                  <img
                    src={item.VoucherImage}
                    alt=""
                    className="img-fluid rounded"
                  />
                </div>
                <div className="col-span-8 border-3 border-black text-left">
                  <p className="font-bold text-pink-400 text-lg group-hover:text-white">
                    {item.VoucherName}
                  </p>
                  <p className="text-sm">{formatDate(item.VoucherEndDate)}</p>
                  <p>
                    Giảm {item.VoucherDiscount}% cho đơn từ{" "}
                    {item.VoucherMinValue}
                  </p>
                  <p>Tối đa {item.VoucherMaxValue}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </details>
      <p className="text-left p-4 text-2xl text-pink-300 mt-12text-left my-1 font-bold">
        Voucher sử dụng:
      </p>
      {selection ? (
        <div className="grid grid-cols-12 cursor-pointer mt-2 mb-10 text-slate-500">
          <div className="col-span-3">
            <img
              src={selection.VoucherImage}
              alt=""
              className="img-fluid rounded-lg"
            />
          </div>
          <div className="col-span-1"></div>
          <div className="col-span-7 border-3 border-black text-left">
            <p className="font-bold text-3xl text-pink-300 mb-2">
              {selection.VoucherName}
            </p>
            <p className="text-xl py-2">
              {formatDate(selection.VoucherEndDate)}
            </p>
            <p className="text-xl py-2">
              Giảm {selection.VoucherDiscount}% cho đơn từ{" "}
              {selection.VoucherMinValue}
            </p>
            <p className="text-xl py-2">Tối đa {selection.VoucherMaxValue}</p>
          </div>
          <div
            className="btn col-span-1 text-4xl text-pink-400 group-hover:text-white cursor-help place-self-center"
            onClick={(e) => {
              e.stopPropagation();
              document.getElementById("voucher_detail").showModal();
            }}
          >
            🛈
          </div>
          <dialog
            id="voucher_detail"
            className="modal p-5 pb-16 rounded-2xl w-1/2"
          >
            <form method="dialog" className="modal-backdrop">
              <button className="w-full text-pink-400 text-right text-4xl px-2">
                🗙
              </button>
            </form>
            <div className="modal-box">
              <h3 className="font-bold text-4xl text-pink-600 my-3">
                {selection.VoucherName}
              </h3>
              <div className="grid grid-cols-12 place-items-center">
                <div className="col-span-4">
                  <img
                    src={selection.VoucherImage}
                    alt=""
                    className="img-fluid rounded"
                  />
                </div>
                <div className="grid col-span-8 text-left place-items-start w-full px-10">
                  <p>
                    <span className="font-bold text-pink-600">Mã:</span>{" "}
                    {selection.VoucherID}
                  </p>
                  <p>
                    <span className="font-bold text-pink-600">
                      Hạn sử dụng:
                    </span>{" "}
                    {formatDate(selection.VoucherEndDate)}
                  </p>
                  <p>
                    <span className="font-bold text-pink-600">Mức giảm:</span>{" "}
                    {selection.VoucherDiscount}%
                  </p>
                  <p>
                    <span className="font-bold text-pink-600">
                      Giảm tối đa:
                    </span>{" "}
                    {selection.VoucherMaxValue}đ
                  </p>
                  <p>
                    <span className="font-bold text-pink-600">
                      Giá trị đơn hàng tối thiểu:
                    </span>{" "}
                    {selection.VoucherMinValue}đ
                  </p>
                  <p>
                    <span className="font-bold text-pink-600">Mô tả:</span>{" "}
                    {selection.VoucherDescription}
                  </p>
                </div>
              </div>
            </div>
          </dialog>
        </div>
      ) : null}
    </div>
  );
}
