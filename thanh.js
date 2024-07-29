const partNerRequestSchema = new mongoose.Schema({
  //---------->Cái api này sẽ truyền qua hiếu để hiếu lấy dữ liệu thanh toán lun
  OrderID: {
    type: String,
    required: [true, "Please enter the order ID"],
  },
  PartnerID: {
    type: String,
    required: [true, "Please enter the partner request ID"],
  },
  //   PartnerName: {
  //     type: String,
  //     required: [true, "Please enter the partner name"],
  //   },
  //---------->lấy này từ hiếu qua chứ
  //   ServiceCode: {
  //     type: String,
  //     required: [true, "Please enter the service code"],
  //   },
  //---------->này là sao OrderID rồi còn service code làm gì
  ServiceName: {
    type: String,
    required: [true, "Please enter the service name"],
  },
  TotalMoney: {
    type: Number,
    required: [true, "Please enter the total money"],
  },
  CustomerCode: {
    type: String,
    required: [true, "Please enter the customer code"],
  },
  //   CustomerName: {
  //     type: String,
  //     required: [true, "Please enter the customer name"],
  //   },
  //---------->lấy này từ hiếu qua lun
  Description: {
    type: String,
    required: [true, "Please enter the description"],
  },
  LinkHome: {
    type: String,
    required: [true, "Please enter the link home"],
  },
  // ---------->lấy này để hiếu trả về trang của tụi tui
  LinkReturnSuccess: {
    type: String,
    required: [true, "Please enter the link return success"],
  },
  // ---------->lấy này để hiếu cập nhập trạng thái trang của tụi tui
});
