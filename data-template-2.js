'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.bulkInsert('Products', [
            {
                name: "Màn hình android Ownice C970 pro",
                path: "man-hinh-android-ownice-c970-pro",
                detail:
                    `
## Cấu hình đầu Android C970-S:
### Tóm tắt

- CPU: 8 nhân (6+2) tối đa hiệu suất và tiết kiệm điện

- RAM/ROM: 4GB+64GB

- Display: 2.5D + IPS 1280×720 pixel 9″ hoặc 10.1″

- Connect: WiFi, 4G LTE, Bluetooth 5.0, USB, HDMI, Optical

### Sức mạnh nổi bật
Cấu hình đủ mạnh với CPU 8 nhân, RAM 3GB, bộ nhớ trong 32GB,
Bộ vi xử lý Allwiner T7 ARM Cortex 8 nhân UIS7862 (UMS512) công nghệ 12nm có tốc độ xử lý siêu khủng. Với 2 Cortex A75 + 6 Cortex A55 cho phép hoạt động hiệu suất cao và tiết kiệm năng lượng. 6 Cortex A55 được ưu tiên hoạt động, chúng mang lại một sức mạnh lớn khi giải quyết nhiều tính toán nhưng tối ưu về mặt tiêu thụ năng lượng. Khi có nhiều tính toán phức tạp hơn, 2 Cotex A75 được sử dụng để đẩy hiệu suất công việc tăng vọt.

Đầu C970-S hoạt động mượt mà với RAM 3GB, đáp ứng được nhiều ứng dụng nặng hoạt động đồng thời.
### Lưu trữ được nhiều với 32GB bộ nhớ

Nếu ít lưu trữ nhạc và video chất lượng cao thì dung lượng nhớ 32GB là khá thoải mái để sử dụng. Một số ứng dụng chat sẽ lưu trữ ảnh và video trong tin nhắn theo thời gian có thể làm tiêu tốn bộ nhớ. Để hoạt động tốt, chỉ cần lưu ý dọn dẹp rác định kỳ.
### Màn hình cao cấp độ phân giải cao IPS 1280×720
Từ lâu, Ownice đã nổi tiếng với chất lượng màn hình cảm ứng đa điểm số 1 thị trường. Tới phiên bản C970, màn hình tiếp tục được nâng cấp lên độ phân giải full HD 1280×720 pixel. Cùng đó, màn hình có viền uốn 2.5D tạo độ mượt khi chạm tay, hỗ trợ IPS cho khả năng chống lóa tốt khi trời nắng.
### Tích hợp bộ xử lý âm thanh DSP
Nổi tiếng với bộ xử lý DSP của hãng ROHM Semiconduction (Nhật bản) cho đầu ra âm thanh tốt ở những phiên bản trước. Ownice C970 đã tích hợp bộ xử lý âm thanh với khả năng điều chỉnh 48 dải âm. Có thể chỉnh vị trí người nghe trên giao diện để đạt trải nghiệm âm thanh tốt nhất.

Màn hình Ownice còn được sử dụng chip âm ly công suất TDA 7851L (7388 for 3+32G) tốt nhất hiện nay.
### Hỗ trợ kết nối Wifi + 4G LTE
Không chỉ Wifi, màn hình Ownice C970 có tích hợp kết nối SIM 4G LTE. Điều này rất thuận tiện nếu như bạn muốn sử dụng SIM DATA riêng cho xe. Việc sử dụng gói SIM 4G DATA chuyên dụng của nhà mạng vừa tiết kiệm, dung lượng băng thông lớn, lại chủ động và thuận tiện hơn việc phát wifi từ điện thoại cho xe. Bạn thậm chí có thể tiết kiệm việc đăng ký 4G SIM điện thoại, và sử dụng luôn tính năng phát WiFi trên đầu android C970.
### Tích hợp Bluetooth 5.0
Nhiều người ít quan tâm tới các phiên bản Bluetooth, tuy nhiên ở phiên bản Bluetooth 5.0 có nhiều điểm đáng để chúng ta kinh ngạc.

- Khoảng cách truyền xa gấp 4 lần thế hệ Bluetooth 4.0, đạt tới 300m như Wifi

- Tốc độ truyền dữ liệu tăng gấp đôi, đạt tới 2Mbps, cho khả năng truyền âm thanh chất lượng đỉnh cao.

- Dung lượng truyền dữ liệu (băng thông) tăng gấp 8 lần.

- Tiết kiệm điện năng tới 2,5 lần với chuẩn LE, hầu như không tiêu hao điện khi ở chế độ nghỉ

- Kết nối được nhiều thiết bị cùng lúc, điều mà các phiên bản trước chỉ giới hạn kết nối 1-1.

- Tương thích ngược với các thiết bị sử dụng chuẩn Bluetooth thấp hơn.

### Tích hợp đầu vào Camera lùi
Không còn lạ lẫm, đây là tính năng rất cần thiết của một màn hình Android. Khi cài số lùi, camera lùi tự động kích hoạt màn hình để hỗ trợ lùi. Nếu xe được trang bị thêm cảm biến va chạm, sẽ trở thành combo trợ thủ đắc lực.
### Kết nối màn hình gối qua HDMI out
Từ bản tiêu chuẩn của C970 còn có thêm ngõ ra HDMI Out. Tính năng này đặc biệt hữu ích khi hàng ghế phía sau có màn hình riêng. Việc xem phim, nghe nhạc có thể phục vụ đồng thời cho khách hàng ghế sau. Kết nối màn hình ngoài cũng có thể sử dụng cáp USB AV out.
### Tích hợp cổng ra quang học Optical
Thay vì sử dụng cổng âm thanh Audio-out thông thường, cổng Optical cho phép truyền lượng dữ liệu lớn hơn. Đặc biệt, do là tín hiệu cáp quang nên không bị nhiễu xạ bởi sóng điện từ, mang lại chất lượng âm thanh hoàn hảo.

Khi kết hợp với tính năng DSP và bộ vi xử lý âm thanh tốt của Ownice C970, cùng một dàn loa chất lượng, chúng ta dễ dàng có được một phòng âm tuyệt vời ngay trên xe.
### Phần mềm điều chỉnh âm thanh đặc biệt
Màn hình C970 sở hữu phần mềm điều chỉnh âm thanh cao cấp của hãng thiết kế, hỗ trợ tới 9 ngôn ngữ, chắc chắn sẽ đem lại trải nghiệm thú vị. Để kích hoạt ứng dụng này cần có bản quyền của hãng.
### Thiết kế mỏng nên lắp được cho hầu hết các loại xe
Màn hình Ownice có thiết kế mỏng, dễ lắp cho hầu hết các dòng xe hiện có trên thị trường. Điều này cũng được chứng minh trong những phiên bản trước đây như C500, C600, C800, C900, C960.

### Hỗ trợ cổng USB sạc nhanh
Sạc nhanh là tính năng đáng giá đối với xe hơi, khi mà thời gian di chuyển thông thường không liên tục. Bạn sẽ bỏ lỡ một cú sạc đầy 100% pin điện thoại và phải sạc nhiều lần nếu sử dụng cổng sạc thông thường. Điều đó gây hại nghiêm trọng tới tuổi thọ của pin và thiết bị di động.
        
        `,
                quantity: 10,
                price: 500000,
                currency: "VND",
                categoryId: 1,
                imageUrl: "https://autohungdung.com/wp-content/uploads/2023/01/33502699.jpg",
                createdAt: new Date(),
                updatedAt: new Date()

            },
            {
                name: "3M Crystalline | Phim Cách Nhiệt 3M Chính Hãng",
                path: "3M-Crystalline-phim-cách-nhiệt-3M-chính-hãng",
                detail:
                    `
## Công dụng phim cách nhiệt 3M Crystalline
### Giảm nhiệt độ bên trong xe, chống tăng nhiệt độ.
Phim cách nhiệt ô tô 3M giúp ngăn cản nhiệt độ từ bên ngoài vào bên trong. Cũng như loại bỏ được sức nóng của ánh nắng mặt trời. Giữ được độ mát trong xe khi mở điều hòa, mang đến cảm giác dễ chịu và mát mẻ.

### Loại bỏ tia UV, tia hồng ngoại độc hại.
Tia tử ngoại có thể phá hủy các lớp đàn hồi của da. Hậu quả để lại là các hiện tượng lão hóa trên da như nếp nhăn, mụn, nám, tàn nhang. Nghiêm trọng hơn là tăng nguy cơ gây ung thư.

Phim cách nhiệt ô tô 3M giúp loại bỏ 99.9% tia UV, và 98% tia hồng ngoại. Ngoài ra có chỉ số chống nắng SPF 1000. Bảo vệ hoàn hảo khỏi những tác nhân gây đến làn da và sức khỏe.
### Khả năng giảm lóa, giảm chói hiệu quả.
Khi lái xe tài xế hay cảm thấy chói mắt khi mặt trời chiếu thẳng vào mặt kính lái ô tô. Hay khi chạy xe vào ban đêm gặp các đèn pha của xe đối diện làm tài xế dễ bị chói mắt.

Nếu việc này diễn ra thường xuyên sẽ ảnh hưởng đến mắt và hạn chế tầm nhìn. Thậm chí gây mất tập trung, dễ gây nên tai nạn cho người cầm lái.

Trong trường hợp dán phim cách nhiệt 3M sẽ giảm tình trạng bị chói mắt. Giúp bảo vệ đôi mắt, hỗ trợ tăng khả năng quan sát và lái xe an toàn hơn nhiều lần.
### Tăng sự an toàn khi xảy ra vỡ vụn kính khi va đập.
Đối với những trường hợp không thể đoán trước được khi không may xảy ra va đập. Nhất là vấn đề về kính vỡ sẽ rất nguy hiểm cho người điều khiển.

Phim cách nhiệt sẽ giúp tăng sự an toàn khi bị vỡ kính. Với chất keo bám khá chắc nó sẽ kết dính các mảnh vỡ khi xảy ra va chạm. Và đảm bảo an toàn nhất có thể cho tất cả những người ngồi trên xe.

Trường hợp nếu kính xe bị vỡ, các mảnh vỡ vẫn được giữ liên kết trên bề mặt của tấm phim. Giảm nguy cơ gây sát thương cho người và bảo vệ tối ưu tài sản trên xe.
### Tăng tuổi thọ cho nội thất bên trong xe.
Những lí do mà khiến nội thất bên trong xe bị bạc màu hay sờn cũ là do ảnh hưởng các tia bức xạ từ mặt trời.

Khi xe tiếp xúc với ánh nắng, các chi tiết có thành phần từ nhựa hay cao su. Như vô lăng, đệm ghế, tappi cửa thường xuyên bị hấp thụ nhiệt quá cao. Nên dễ bị phồng rộp, nứt nẻ, có lúc bị biến dạng.

Phim cách nhiệt ô tô 3M cao cấp giúp bảo vệ sự nội thất xe trước các tác nhân trên.
### Tiết kiệm nhiên liệu, tiết kiệm chi phí .
Thời tiết nắng nóng, điều hòa sẽ được mở thường xuyên và với nhiệt độ thấp. Việc điều hòa vận hành hết công suất cũng như ngày càng lớn, gây tiêu hao nhiên liệu nhiều.

Film cách nhiệt giúp nhiệt độ bên trong xe sẽ giảm. Cũng như giữ được ở mức ổn định và mọi người có cảm giác dễ chịu hơn hẳn. Từ đó, giúp tiết kiệm nhiên liệu và chi phí một cách tối đa hơn.
### Không cản sóng điện tử.
Thời tiết nắng nóng, điều hòa sẽ được mở thường xuyên và với nhiệt độ thấp. Việc điều hòa vận hành hết công suất cũng như ngày càng lớn, gây tiêu hao nhiên liệu nhiều.

Film cách nhiệt giúp nhiệt độ bên trong xe sẽ giảm. Cũng như giữ được ở mức ổn định và mọi người có cảm giác dễ chịu hơn hẳn. Từ đó, giúp tiết kiệm nhiên liệu và chi phí một cách tối đa hơn.
### Đảm bảo sự riêng tư cho không gian xe.
Phim cách nhiệt có các mã tối màu có khả năng chống nhìn từ ngoài vào trong. Giúp gia tăng sự kín đáo, thoải mái, bảo vệ không gian riêng tư của mình. Ngoài ra còn có thể bảo vệ không gian để đề phòng các kẻ trộm.
#### Tạo nên vẻ đẹp sang trọng và đẳng cấp.
Được làm từ những công nghệ độc đáo, còn tạo nên vẻ đẹp sang trọng. Một màu đen bí ẩn, tôn lên vẻ đẹp của chiếc xe gấp nhiều lần.
## Cách kiểm tra phim cách nhiệt 3M chính hãng và kém chất lượng.
- Logo 3M nhỏ nằm ẩn dưới tấm phim.
- Có thông tin trên hệ thống tra cứu thông bảo hành điện tử 3M chính hãng.
- Có tem phản quang.
- Phiếu bảo hành.
    
    `,
                quantity: 20,
                price: 5000000,
                currency: "VND",
                categoryId: 2,
                imageUrl: "https://autohungdung.com/wp-content/uploads/2023/01/33502699.jpg",
                createdAt: new Date(),
                updatedAt: new Date()

            },
            {
                name: "3M High Performance | Gói Phim Cách Nhiệt 3M Tiêu Chuẩn",
                path: "3M-high-performance-gói-phim-cách-nhiệt-3M-tiêu-chuẩn",
                detail:
                    `
## Bảng thông số Kỹ thuật Dán Phim Cách Nhiệt Bình Dương 3M High Performance
### Đặc tính của phim cách nhiệt 3M High Performance

- Chặn 99,9% tia UV.
- Giảm nhiệt tới 97%, loại bỏ ánh sáng hồng ngoại.
- SPF hơn 1.000.
- Giảm chói với gói dán phim cách nhiệt Bình Dương 3M High Performance.
- Không có kim loại / không bị nhiễu tín hiệu vô tuyến.
- Tăng cường khả năng hiển thị vào ban đêm.
- Không bị đổi màu phim.
- Dán phim cách nhiệt Bình Dương Bảo hành trọn đời.

### Công dụng phim cách nhiệt 3M tiêu chuẩn.
#### Giảm nhiệt độ bên trong xe, chống tăng nhiệt độ.
Phim cách nhiệt ô tô 3M giúp ngăn cản nhiệt độ từ bên ngoài vào bên trong. Cũng như loại bỏ được sức nóng của ánh nắng mặt trời. Giữ được độ mát trong xe khi mở điều hòa, mang đến cảm giác dễ chịu và mát mẻ.

#### Loại bỏ tia UV, tia hồng ngoại độc hại.
Tia tử ngoại có thể phá hủy các lớp đàn hồi của da. Hậu quả để lại là các hiện tượng lão hóa trên da như nếp nhăn, mụn, nám, tàn nhang. Nghiêm trọng hơn là tăng nguy cơ gây ung thư.

Phim cách nhiệt ô tô 3M High Performance giúp loại bỏ 99.9% tia UV, và 98% tia hồng ngoại. Ngoài ra có chỉ số chống nắng SPF 1000. Bảo vệ hoàn hảo khỏi những tác nhân gây đến làn da và sức khỏe.
#### 3M High Performance giúp giảm lóa, giảm chói hiệu quả.
Khi lái xe tài xế hay cảm thấy chói mắt khi mặt trời chiếu thẳng vào mặt kính lái ô tô. Hay khi chạy xe vào ban đêm gặp các đèn pha của xe đối diện làm tài xế dễ bị chói mắt.

Nếu việc này diễn ra thường xuyên sẽ ảnh hưởng đến mắt và hạn chế tầm nhìn. Thậm chí gây mất tập trung, dễ gây nên tai nạn cho người cầm lái.

Trong trường hợp dán phim cách nhiệt 3M sẽ giảm tình trạng bị chói mắt. Giúp bảo vệ đôi mắt, hỗ trợ tăng khả năng quan sát và lái xe an toàn hơn nhiều lần.
#### Tăng sự an toàn khi xảy ra vỡ vụn kính khi va đập.
Đối với những trường hợp không thể đoán trước được khi không may xảy ra va đập. Nhất là vấn đề về kính vỡ sẽ rất nguy hiểm cho người điều khiển.

Phim cách nhiệt sẽ giúp tăng sự an toàn khi bị vỡ kính. Với chất keo bám khá chắc nó sẽ kết dính các mảnh vỡ khi xảy ra va chạm. Và đảm bảo an toàn nhất có thể cho tất cả những người ngồi trên xe.

Trường hợp nếu kính xe bị vỡ, các mảnh vỡ vẫn được giữ liên kết trên bề mặt của tấm phim. Giảm nguy cơ gây sát thương cho người và bảo vệ tối ưu tài sản trên xe.
#### Tăng tuổi thọ cho nội thất bên trong xe khi dán 3M High Performance.
Những lí do mà khiến nội thất bên trong xe bị bạc màu hay sờn cũ là do ảnh hưởng các tia bức xạ từ mặt trời.

Khi xe tiếp xúc với ánh nắng, các chi tiết có thành phần từ nhựa hay cao su. Như vô lăng, đệm ghế, tappi cửa thường xuyên bị hấp thụ nhiệt quá cao. Nên dễ bị phồng rộp, nứt nẻ, có lúc bị biến dạng.

Phim cách nhiệt ô tô 3M cao cấp giúp bảo vệ sự nội thất xe trước các tác nhân trên.
#### Tiết kiệm nhiên liệu, tiết kiệm chi phí.
Thời tiết nắng nóng, điều hòa sẽ được mở thường xuyên và với nhiệt độ thấp. Việc điều hòa vận hành hết công suất cũng như ngày càng lớn, gây tiêu hao nhiên liệu nhiều.

Film cách nhiệt giúp nhiệt độ bên trong xe sẽ giảm. Cũng như giữ được ở mức ổn định và mọi người có cảm giác dễ chịu hơn hẳn. Từ đó, giúp tiết kiệm nhiên liệu và chi phí một cách tối đa hơn.
#### Không lo cản sóng điện tử khi dán 3M High Performance.
Phim cách nhiệt 3M không bị cản sóng điện tử – GPS. Bạn có thể thoải mái lướt các thiết bị điện tử khác nhau mà không lo mất sóng.
#### Đảm bảo sự riêng tư cho không gian xe.
Phim cách nhiệt có các mã tối màu có khả năng chống nhìn từ ngoài vào trong. Giúp gia tăng sự kín đáo, thoải mái, bảo vệ không gian riêng tư của mình. Ngoài ra còn có thể bảo vệ không gian để đề phòng các kẻ trộm.
#### Phim cách nhiệt 3M High Performance tạo nên vẻ đẹp sang trọng và đẳng cấp.
Được làm từ những công nghệ độc đáo, còn tạo nên vẻ đẹp sang trọng. Một màu đen bí ẩn, tôn lên vẻ đẹp của chiếc xe gấp nhiều lần.
#### Cách kiểm tra phim cách nhiệt 3M Bình Dương chính hãng và kém chất lượng.
Sử dụng phim cách nhiệt kém chất lượng đem lại nhiều hậu quả khó lường. Auto365 Bình Dương sẽ chia sẻ bạn cách phân biệt film cách nhiệt 3M chính hãng.

- Logo 3M nhỏ nằm ẩn dưới tấm phim.
- Có thông tin trên hệ thống tra cứu thông bảo hành điện tử 3M chính hãng.
- Có tem phản quang.
- Dựa vào phiếu bảo hành gói dán phim cách nhiệt 3M Bình Dương.
    
    `,
                quantity: 20,
                price: 4500000,
                currency: "VND",
                categoryId: 2,
                imageUrl: "https://autohungdung.com/wp-content/uploads/2023/01/33502699.jpg",
                createdAt: new Date(),
                updatedAt: new Date()

            },
            {
                name: "Màn Hình Gotech 2K GT 13i 360 | Màn Hình DVD Android Ô Tô",
                path: "Màn-hình-gotech-2K-GT-13i-360-màn-hình-DVD-android-ô-tô",
                detail:
                    `
## Đôi nét về ưu điểm của Màn Hình Gotech 2K GT 13i 360.
- Kết nối sim 4G.
- Kết nối các thiết bị ngoại vi.
- Điều khiển bằng giọng nói thông minh.
- Ứng dụng giải trí phong phú.
- Bảo hành: 2 năm (1 đổi 1).
## Khám phá những điểm nổi bật trên sản phẩm Màn hình Gotech 2K GT 13i 360.
### Trang bị tấm nền QLED 2K cho chất lượng hình ảnh sống động.
Màn hình Gotech 2K GT 13i 360 được trang bị tấm nền QLED 2K của Gotech có màu sắc, hình ảnh trung trực. Cùng độ nét gấp 4 lần so với các loại màn hình Android thông thường.

Cung cấp chất lượng hình ảnh sắc nét, chân thực đến từng điểm ảnh. Màn hình Gotech 2K GT 13i 360 mang tới những trải nghiệm giải trí tuyệt vời ngay trên xế yêu.
### Kích thước màn hình lớn, độ phân giải cao.
Màn hình Gotech 2K GT 13i 360 có kích thước lớn lên tới 13 inch. Cùng với những trang bị hình ảnh cực tốt khi có độ phân giải 2000*1200.

Chống chói IPS cùng chip xử lý hình ảnh Mali G52 cung cấp khả năng hiển thị sắc nét. Cũng như hỗ trợ quan sát dễ dàng dưới mọi điều kiện thời tiết.

Ngoài việc tăng tính thẩm mỹ cho xế cưng, màn hình Android ô tô GOTECH GT13i 360 còn sở hữu cấu hình khỏe. Với RAM 4GB, ROM 64GB và CPU lên tới 8 nhân – 2.0 Ghz. Giúp quá trình xử lý các tác vụ trên màn hình được nhanh chóng và mượt mà hơn.
### Màn hình Gotech 2K GT 13i 360 cung cấp khả năng kết nối internet thông qua sim 4G tốc độ cao.
Màn hình Gotech 2K GT 13i 360 mang đến trải nghiệm sử dụng internet trong quá trình lái xe trực tiếp trên màn hình Android ô tô mà không cần qua một thiết bị trung gian nào.

Việc kết nối internet 4G trên Màn hình Gotech 2K GT 13i 360 giúp bạn có thể giải quyết công việc phát sinh. Như nghe nhạc, xem phim hay xem các chương trình truyền hình trực tuyến.

Đặc biệt, màn hình ô tô GOTECH GT 13i 360 còn có khả năng cung cấp wifi cho các thiết bị khác trên xe không cần thông qua bộ phát wifi truyền thống.
### Hỗ trợ lái xe an toàn, quan sát và điều khiển dễ dàng hơn.
Màn hình Gotech 2K GT 13i 360 được tích hợp các thiết bị ngoại vi hỗ trợ lái xe an toàn. Như camera, cảm biến áp suất lốp,…

Cùng với tấm nền QLED 2K, chất lượng hình ảnh camera hiển thị trên màn hình được rõ nét. Thiết kế này giúp tài xế dễ dàng quan sát và điều khiển xe một cách an toàn hơn.
### Cải thiện hiệu năng khi lắp đặt Màn hình Gotech 2K GT 13i 360.
Hệ điều hành Android 12 cho phép bạn sử dụng những tính năng mới. Nhờ thế linh hoạt hơn trong việc tùy chỉnh tác vụ và nâng cao hiệu năng sử dụng sản phẩm Màn hình Gotech 2K GT 13i 360. 
### Màn hình Gotech 2K GT 13i 360 kiến tạo không gian giải trí hoàn toàn mới.
Màn hình Gotech 2K GT 13i 360 cho phép bạn đắm chìm trong không gian giải trí tuyệt hảo. Thưởng thức nội dung yêu thích ở chất lượng hình ảnh cao, sắc nét đến từng chi tiết.

Thông qua việc kết nối internet 4G cùng hệ điều hành Android. Màn hình Gotech 2K GT 13i 360 cung cấp kho ứng dụng giải trí khổng lồ trên CH Play. Cho bạn thỏa sức lựa chọn theo đúng sở thích cá nhân, gia đình.
### Ra lệnh giọng nói tiếng Việt thông minh, nhanh nhạy.
Trên Màn hình Gotech 2K GT 13i 360 được tích hợp 2 trợ lý AI thông minh GotechGPT và Kiki. Giúp hỗ trợ tài xế lái xe rảnh tay vẫn an toàn tuyệt đối. Không cần thao tác trên màn hình, bạn vẫn có thể mở toàn bộ các tác vụ cần thiết thông qua việc ra lệnh giọng nói.

Trợ lý GotechGPT cho phép người dùng tương tác hai chiều. Giải đáp tất cả các vấn đề mà bạn gặp phải. Và hỗ trợ bạn trong việc giải đáp các thông tin một cách nhanh chóng, chính xác.
### Tận hưởng trải nghiệm âm thanh đỉnh cao khi có màn hình GOTECH GT13i 360.
Màn hình ô tô thông minh GOTECH GT 13i 360 hỗ trợ cải thiện chất lượng âm thanh so với những màn hình nguyên bản trên xe.

Với bộ xử lý âm thanh DSP – Equalizer lên tới 32 dải tần. Mang đến trải nghiệm âm thanh tuyệt hảo mà không cần phải độ thêm loa cho xe.
### Hệ sinh thái phần mềm độc quyền từ Gotech thông qua Màn hình Gotech 2K GT 13i 360.
Gotech phát triển hệ sinh thái các phần mềm độc quyền hỗ trợ khách hàng trong quá trình sử dụng sản phẩm. Như Phần mềm bảo hành điện tử, phần mềm tra cứu phạt nguội, ứng dụng định vị xe, theo dõi lộ trình di chuyển,…

Ngoài ra, Gotech cũng quan tâm đến vấn đề thẩm mỹ và tính tiện nghi trong quá trình sử dụng. Sau khi thu thập thói quen của người dùng. Gotech đã cho ra mắt giao diện màn hình ô tô lấy cảm hứng từ Apple UI.

Với thiết kế trực quan, linh hoạt, dễ dàng thao tác và tìm kiếm thông tin, ứng dụng nhanh chóng. Đặc biệt với giao diện của Gotech, bạn có thể tuỳ chỉnh mẫu xe, màu sắc theo sở thích và phong thuỷ.
### Sử dụng màn hình ô tô thông minh GOTECH GT13i 360 việc nghe gọi điện thoại thật dễ dàng.
Việc phải sử dụng điện thoại khi đang lái xe là điều không thể tránh khỏi đối với mỗi tài xế. Mặc dù biết việc này tiềm ẩn nhiều nguy cơ gây mất an toàn khi tham gia giao thông. Tuy nhiên có những cuộc gọi quan trọng khiến bạn không thể bỏ qua.

Khi sử dụng màn hình Android ô tô GOTECH GT13i 360 bạn có thể nhận cuộc gọi đến và đi một cách dễ dàng. Màn hình Gotech 2K GT 13i 360 cho phép kết nối với điện thoại thông qua Bluetooth hoặc Apple Carplay.

Từ đây mọi thao tác nghe gọi chỉ cần thông qua nút bấm được tích hợp sẵn trên vô lăng. Mang đến sự an toàn và thuận tiện hơn khi lái xe, nhất là trên hành trình dài.
### Cung cấp 3 loại bản đồ tiên tiến nhất hiện nay.
Trên sản phẩm Màn hình Gotech 2K GT 13i 360 được cài đặt 3 ứng dụng bản đồ tiên tiến nhất. Gồm Carmap, Google Map, Navitel.

Phần mềm dẫn đường Carmap có giao diện trực quan, dễ dàng sử dụng. Tối ưu lộ trình, cung cấp các thông tin biển báo một cách chính xác, chi tiết.

Qua đó, hỗ trợ người dùng tìm kiếm lộ trình di chuyển nhanh chóng, chính xác. Mang đến sự yên tâm lái xe không lo ngại việc đi nhầm đường.
## Hướng dẫn sử dụng Màn hình Gotech 2K GT 13i 360.
- Người lái có thể xem lại lịch trình di chuyển của xe trong vòng 365 ngày
- Muốn vào bản đồ Navitel đọc khẩu lệnh: “Đi tới/ Chỉ tới/ Dẫn tới+ địa chỉ + bằng Navitel”
- Muốn vào bản đồ Googlemap đọc khẩu lệnh: “Đi tới / Chỉ tới/ Dẫn tới + địa chỉ + bằng Googlemap”
- Muốn vào bản đồ Vietmap đọc khẩu lệnh: “Đi tới/ Chỉ tới/ Dẫn tới + địa chỉ + bằng Vietmap”
- Muốn kiểm tra phạt nguội theo câu lệnh: “ Phạt nguội + biển số xe”
- Muốn vào Youtube đọc khẩu lệnh: “Mở video + tên bài hát”
- Muốn mở TV go đọc khẩu lệnh: “Xem + tên kênh”
- Muốn xem dự báo thời tiết đọc khẩu lệnh: “Thời tiết + tên thành phố”
- Muốn kiểm tra áp suất lốp tích hợp màn hình đọc khẩu lệnh: “mở Áp Suất Lốp”
- Mở Camera hành trình: “ Mở camera trước” hoặc “ Mở camera hành trình”
- Kết nối bluetooth trực tiếp với điện thoại với các câu lệnh
- Lệnh gọi để vào Radio: “Nghe Radio”

    
    `,
                quantity: 10,
                price: 19500000,
                currency: "VND",
                categoryId: 1,
                imageUrl: "https://autohungdung.com/wp-content/uploads/2023/01/33502699.jpg",
                createdAt: new Date(),
                updatedAt: new Date()

            },
            {
                name: "Màn Hình Gotech 2K GT 13i | Màn Hình DVD Android Ô Tô",
                path: "Màn-hình-gotech-2K-GT-13i-màn-hình-DVD-android-ô-tô",
                detail:
                    `
## Đôi nét về ưu điểm của Màn Hình Gotech 2K GT 13i.
- Kết nối sim 4G.
- Kết nối các thiết bị ngoại vi.
- Điều khiển bằng giọng nói thông minh.
- Ứng dụng giải trí phong phú.
- Bảo hành: 2 năm (1 đổi 1).
## Khám phá những điểm nổi bật trên sản phẩm Màn hình Gotech 2K GT 13i.
### Trang bị tấm nền QLED 2K cho chất lượng hình ảnh sống động.
Màn hình Gotech 2K GT 13i được trang bị tấm nền QLED 2K của Gotech có màu sắc, hình ảnh trung trực. Cùng độ nét gấp 4 lần so với các loại màn hình Android thông thường.

Cung cấp chất lượng hình ảnh sắc nét, chân thực đến từng điểm ảnh. Màn hình Gotech 2K GT 13i mang tới những trải nghiệm giải trí tuyệt vời ngay trên xế yêu.
### Kích thước màn hình lớn, độ phân giải cao.
Màn hình Gotech 2K GT 13i có kích thước lớn lên tới 13 inch. Cùng với những trang bị hình ảnh cực tốt khi có độ phân giải 2000*1200.

Chống chói IPS cùng chip xử lý hình ảnh Mali G52 cung cấp khả năng hiển thị sắc nét. Cũng như hỗ trợ quan sát dễ dàng dưới mọi điều kiện thời tiết.

Ngoài việc tăng tính thẩm mỹ cho xế cưng, màn hình Android ô tô GOTECH GT13i còn sở hữu cấu hình khỏe. Với RAM 4GB, ROM 64GB và CPU lên tới 8 nhân – 2.0 Ghz. Giúp quá trình xử lý các tác vụ trên màn hình được nhanh chóng và mượt mà hơn.
### Màn hình Gotech 2K GT 13i cung cấp khả năng kết nối internet thông qua sim 4G tốc độ cao.
Màn hình Gotech 2K GT 13i mang đến trải nghiệm sử dụng internet trong quá trình lái xe trực tiếp trên màn hình Android ô tô mà không cần qua một thiết bị trung gian nào.

Việc kết nối internet 4G trên Màn hình Gotech 2K GT 13i giúp bạn có thể giải quyết công việc phát sinh. Như nghe nhạc, xem phim hay xem các chương trình truyền hình trực tuyến.

Đặc biệt, màn hình ô tô GOTECH GT 13i còn có khả năng cung cấp wifi cho các thiết bị khác trên xe không cần thông qua bộ phát wifi truyền thống.
### Hỗ trợ lái xe an toàn, quan sát và điều khiển dễ dàng hơn.
Màn hình Gotech 2K GT 13i được tích hợp các thiết bị ngoại vi hỗ trợ lái xe an toàn. Như camera, cảm biến áp suất lốp,…

Cùng với tấm nền QLED 2K, chất lượng hình ảnh camera hiển thị trên màn hình được rõ nét. Thiết kế này giúp tài xế dễ dàng quan sát và điều khiển xe một cách an toàn hơn.
### Cải thiện hiệu năng khi lắp đặt Màn hình Gotech 2K GT 13i.
Hệ điều hành Android 12 cho phép bạn sử dụng những tính năng mới. Nhờ thế linh hoạt hơn trong việc tùy chỉnh tác vụ và nâng cao hiệu năng sử dụng sản phẩm Màn hình Gotech 2K GT 13i 360. 
### Màn hình Gotech 2K GT 13i kiến tạo không gian giải trí hoàn toàn mới.
Màn hình Gotech 2K GT 13i cho phép bạn đắm chìm trong không gian giải trí tuyệt hảo. Thưởng thức nội dung yêu thích ở chất lượng hình ảnh cao, sắc nét đến từng chi tiết.

Thông qua việc kết nối internet 4G cùng hệ điều hành Android. Màn hình Gotech 2K GT 13i cung cấp kho ứng dụng giải trí khổng lồ trên CH Play. Cho bạn thỏa sức lựa chọn theo đúng sở thích cá nhân, gia đình.
### Ra lệnh giọng nói tiếng Việt thông minh, nhanh nhạy.
Trên Màn hình Gotech 2K GT 13i được tích hợp 2 trợ lý AI thông minh GotechGPT và Kiki. Giúp hỗ trợ tài xế lái xe rảnh tay vẫn an toàn tuyệt đối. Không cần thao tác trên màn hình, bạn vẫn có thể mở toàn bộ các tác vụ cần thiết thông qua việc ra lệnh giọng nói.

Trợ lý GotechGPT cho phép người dùng tương tác hai chiều. Giải đáp tất cả các vấn đề mà bạn gặp phải. Và hỗ trợ bạn trong việc giải đáp các thông tin một cách nhanh chóng, chính xác.
### Tận hưởng trải nghiệm âm thanh đỉnh cao khi có màn hình GOTECH GT13i.
Màn hình ô tô thông minh GOTECH GT 13i hỗ trợ cải thiện chất lượng âm thanh so với những màn hình nguyên bản trên xe.

Với bộ xử lý âm thanh DSP – Equalizer lên tới 32 dải tần. Mang đến trải nghiệm âm thanh tuyệt hảo mà không cần phải độ thêm loa cho xe.
### Hệ sinh thái phần mềm độc quyền từ Gotech thông qua Màn hình Gotech 2K GT 13i.
Gotech phát triển hệ sinh thái các phần mềm độc quyền hỗ trợ khách hàng trong quá trình sử dụng sản phẩm. Như Phần mềm bảo hành điện tử, phần mềm tra cứu phạt nguội, ứng dụng định vị xe, theo dõi lộ trình di chuyển,…

Ngoài ra, Gotech cũng quan tâm đến vấn đề thẩm mỹ và tính tiện nghi trong quá trình sử dụng. Sau khi thu thập thói quen của người dùng. Gotech đã cho ra mắt giao diện màn hình ô tô lấy cảm hứng từ Apple UI.

Với thiết kế trực quan, linh hoạt, dễ dàng thao tác và tìm kiếm thông tin, ứng dụng nhanh chóng. Đặc biệt với giao diện của Gotech, bạn có thể tuỳ chỉnh mẫu xe, màu sắc theo sở thích và phong thuỷ.
### Sử dụng màn hình ô tô thông minh GOTECH GT13i 360 việc nghe gọi điện thoại thật dễ dàng.
Việc phải sử dụng điện thoại khi đang lái xe là điều không thể tránh khỏi đối với mỗi tài xế. Mặc dù biết việc này tiềm ẩn nhiều nguy cơ gây mất an toàn khi tham gia giao thông. Tuy nhiên có những cuộc gọi quan trọng khiến bạn không thể bỏ qua.

Khi sử dụng màn hình Android ô tô GOTECH GT13i bạn có thể nhận cuộc gọi đến và đi một cách dễ dàng. Màn hình Gotech 2K GT 13i 360 cho phép kết nối với điện thoại thông qua Bluetooth hoặc Apple Carplay.

Từ đây mọi thao tác nghe gọi chỉ cần thông qua nút bấm được tích hợp sẵn trên vô lăng. Mang đến sự an toàn và thuận tiện hơn khi lái xe, nhất là trên hành trình dài.
### Cung cấp 3 loại bản đồ tiên tiến nhất hiện nay.
Trên sản phẩm Màn hình Gotech 2K GT 13i được cài đặt 3 ứng dụng bản đồ tiên tiến nhất. Gồm Carmap, Google Map, Navitel.

Phần mềm dẫn đường Carmap có giao diện trực quan, dễ dàng sử dụng. Tối ưu lộ trình, cung cấp các thông tin biển báo một cách chính xác, chi tiết.

Qua đó, hỗ trợ người dùng tìm kiếm lộ trình di chuyển nhanh chóng, chính xác. Mang đến sự yên tâm lái xe không lo ngại việc đi nhầm đường.
## Hướng dẫn sử dụng Màn hình Gotech 2K GT 13i.
- Người lái có thể xem lại lịch trình di chuyển của xe trong vòng 365 ngày
- Muốn vào bản đồ Navitel đọc khẩu lệnh: “Đi tới/ Chỉ tới/ Dẫn tới+ địa chỉ + bằng Navitel”
- Muốn vào bản đồ Googlemap đọc khẩu lệnh: “Đi tới / Chỉ tới/ Dẫn tới + địa chỉ + bằng Googlemap”
- Muốn vào bản đồ Vietmap đọc khẩu lệnh: “Đi tới/ Chỉ tới/ Dẫn tới + địa chỉ + bằng Vietmap”
- Muốn kiểm tra phạt nguội theo câu lệnh: “ Phạt nguội + biển số xe”
- Muốn vào Youtube đọc khẩu lệnh: “Mở video + tên bài hát”
- Muốn mở TV go đọc khẩu lệnh: “Xem + tên kênh”
- Muốn xem dự báo thời tiết đọc khẩu lệnh: “Thời tiết + tên thành phố”
- Muốn kiểm tra áp suất lốp tích hợp màn hình đọc khẩu lệnh: “mở Áp Suất Lốp”
- Mở Camera hành trình: “ Mở camera trước” hoặc “ Mở camera hành trình”
- Kết nối bluetooth trực tiếp với điện thoại với các câu lệnh
- Lệnh gọi để vào Radio: “Nghe Radio”

    
    `,
                quantity: 10,
                price: 14500000,
                currency: "VND",
                categoryId: 1,
                imageUrl: "https://autohungdung.com/wp-content/uploads/2023/01/33502699.jpg",
                createdAt: new Date(),
                updatedAt: new Date()

            },
            {
                name: "Màn Hình Gotech GT 2K Pro 360 | Màn Hình DVD Android Ô Tô",
                path: "Màn-hình-gotech-GT-2K-Pro-360-màn-hình-DVD-android-ô-tô",
                detail:
                    `
## Đôi nét về ưu điểm của Màn hình Gotech GT 2K Pro 360.
- Ghi hình toàn cảnh 360 độ.
- Tấm nền QLED 2K sắc nét, chân thực đến từng điểm ảnh.
- Giải trí đa phương tiện.
- Điều khiển giọng nói tiếng Việt nhanh nhạy.
- Chỉ dẫn đường thông minh, không cần internet.
- Bảo hành: 2 năm (1 đổi 1).
## Khám phá những điểm nổi bật trên sản phẩm Màn hình Gotech GT 2K Pro 360.
### Gotech GT 2K Pro 360 tích hợp cảm biến áp suất lốp lên màn hình.
Màn hình Gotech GT 2K Pro 360 cho phép tích hợp các thiết bị ngoại vi. Như cảm biến áp suất lốp trực tiếp lên màn hình thông minh, mô phỏng 4 bánh xe với đầy đủ các thông tin về nhiệt độ, áp suất của mỗi bánh.

Trong trường hợp lốp xe xảy ra vấn đề như non hơn, căng hơi hoặc cán đinh,… Cảm biến sẽ lập tức gửi tín hiệu cảnh báo tới tài xế bằng âm thanh hoặc hình ảnh trên màn hình Gotech GT2K Pro 360.

Nhờ vậy, người dùng có thể theo dõi tình trạng lốp xe một cách dễ dàng, kịp thời phát hiện các dấu hiệu bất thường. Từ đó, xử lý nhanh chóng tránh xảy ra sự cố đáng tiếc.
### Màn hình Gotech GT 2K Pro 360 cấu hình mạnh mẽ, đa nhiệm mượt mà.
Sở hữu cấu hình Ram 4GB, Rom 64GB, CPU 8 nhân. Màn hình Gotech GT 2K Pro 360 còn được trang bị cấu hình mạnh mẽ.

Giúp việc xử lý các tác vụ trên màn hình nhanh chóng. Không bị giật lag kể cả khi bạn sử dụng tính năng chia đôi màn hình và sử dụng hai ứng dụng cùng 1 lúc.

Từ đó tối ưu được hiệu suất sử dụng sản phẩm Màn hình Gotech GT2K Pro 360. Cho phép bạn vừa chỉ đường vừa giải trí hoặc quan sát camera 360.
### Trang bị tấm nền QLED 2K cho chất lượng hình ảnh sống động.
Màn hình Gotech GT 2K Pro 360 được trang bị tấm nền QLED 2K của Gotech có màu sắc, hình ảnh trung trực. Cùng độ nét gấp 4 lần so với các loại màn hình Android thông thường.

Cung cấp chất lượng hình ảnh sắc nét, chân thực đến từng điểm ảnh. Màn hình Gotech GT 2K Pro 360 mang tới những trải nghiệm giải trí tuyệt vời ngay trên xế yêu.
### Cải thiện hiệu năng khi lắp đặt Màn hình Gotech GT 2K Pro 360.
Hệ điều hành Android 12 cho phép bạn sử dụng những tính năng mới. Nhờ thế linh hoạt hơn trong việc tùy chỉnh tác vụ và nâng cao hiệu năng sử dụng sản phẩm Màn hình Gotech GT 2K Pro 360. 
### Hỗ trợ lái xe an toàn, quan sát và điều khiển dễ dàng hơn.
Màn hình Gotech GT 2K Pro 360 được tích hợp các thiết bị ngoại vi hỗ trợ lái xe an toàn. Như camera, cảm biến áp suất lốp,…

Cùng với tấm nền QLED 2K, chất lượng hình ảnh camera hiển thị trên màn hình được rõ nét. Thiết kế này giúp tài xế dễ dàng quan sát và điều khiển xe một cách an toàn hơn.
### Màn hình Gotech GT 2K Pro 360 kiến tạo không gian giải trí hoàn toàn mới.
Màn hình Gotech GT 2K Pro 360 cho phép bạn đắm chìm trong không gian giải trí tuyệt hảo. Thưởng thức nội dung yêu thích ở chất lượng hình ảnh cao, sắc nét đến từng chi tiết.

Thông qua việc kết nối internet 4G cùng hệ điều hành Android. Màn hình Gotech GT 2K Pro 360 cung cấp kho ứng dụng giải trí khổng lồ trên CH Play. Cho bạn thỏa sức lựa chọn theo đúng sở thích cá nhân, gia đình.
### Ra lệnh giọng nói tiếng Việt thông minh, nhanh nhạy.
Trên Màn hình Gotech GT 2K Pro 360 được tích hợp 2 trợ lý AI thông minh GotechGPT và Kiki. Giúp hỗ trợ tài xế lái xe rảnh tay vẫn an toàn tuyệt đối. Không cần thao tác trên màn hình, bạn vẫn có thể mở toàn bộ các tác vụ cần thiết thông qua việc ra lệnh giọng nói.

Trợ lý Gotech GPT cho phép người dùng tương tác hai chiều. Giải đáp tất cả các vấn đề mà bạn gặp phải. Và hỗ trợ bạn trong việc giải đáp các thông tin một cách nhanh chóng, chính xác.
### Hệ sinh thái phần mềm độc quyền từ Gotech thông qua Màn hình Gotech GT 2K Pro 360.
Gotech phát triển hệ sinh thái các phần mềm độc quyền hỗ trợ khách hàng trong quá trình sử dụng sản phẩm. Như Phần mềm bảo hành điện tử, phần mềm tra cứu phạt nguội, ứng dụng định vị xe, theo dõi lộ trình di chuyển,…

Ngoài ra, Gotech cũng quan tâm đến vấn đề thẩm mỹ và tính tiện nghi trong quá trình sử dụng. Sau khi thu thập thói quen của người dùng. Gotech đã cho ra mắt giao diện màn hình ô tô lấy cảm hứng từ Apple UI.

Với thiết kế trực quan, linh hoạt, dễ dàng thao tác và tìm kiếm thông tin, ứng dụng nhanh chóng. Đặc biệt với giao diện của Gotech, bạn có thể tuỳ chỉnh mẫu xe, màu sắc theo sở thích và phong thuỷ.
### Cung cấp 3 loại bản đồ tiên tiến nhất hiện nay.
Trên sản phẩm Màn hình Gotech 2K GT 2K Pro 360 được cài đặt 3 ứng dụng bản đồ tiên tiến nhất. Gồm Carmap, Google Map, Navitel.

Phần mềm dẫn đường Carmap có giao diện trực quan, dễ dàng sử dụng. Tối ưu lộ trình, cung cấp các thông tin biển báo một cách chính xác, chi tiết.

Qua đó, hỗ trợ người dùng tìm kiếm lộ trình di chuyển nhanh chóng, chính xác. Mang đến sự yên tâm lái xe không lo ngại việc đi nhầm đường.
## Hướng dẫn sử dụng Màn hình Gotech GT 2K Pro 360.
- Người lái có thể xem lại lịch trình di chuyển của xe trong vòng 365 ngày
- Muốn vào bản đồ Navitel đọc khẩu lệnh: “Đi tới/ Chỉ tới/ Dẫn tới+ địa chỉ + bằng Navitel”
- Muốn vào bản đồ Googlemap đọc khẩu lệnh: “Đi tới / Chỉ tới/ Dẫn tới + địa chỉ + bằng Googlemap”
- Muốn vào bản đồ Vietmap đọc khẩu lệnh: “Đi tới/ Chỉ tới/ Dẫn tới + địa chỉ + bằng Vietmap”
- Muốn kiểm tra phạt nguội theo câu lệnh: “ Phạt nguội + biển số xe”
- Muốn vào Youtube đọc khẩu lệnh: “Mở video + tên bài hát”
- Muốn mở TV go đọc khẩu lệnh: “Xem + tên kênh”
- Muốn xem dự báo thời tiết đọc khẩu lệnh: “Thời tiết + tên thành phố”
- Muốn kiểm tra áp suất lốp tích hợp màn hình đọc khẩu lệnh: “mở Áp Suất Lốp”
- Mở Camera hành trình: “ Mở camera trước” hoặc “ Mở camera hành trình”
- Kết nối bluetooth trực tiếp với điện thoại với các câu lệnh
- Lệnh gọi để vào Radio: “Nghe Radio”
    
    `,
                quantity: 10,
                price: 17500000,
                currency: "VND",
                categoryId: 1,
                imageUrl: "https://autohungdung.com/wp-content/uploads/2023/01/33502699.jpg",
                createdAt: new Date(),
                updatedAt: new Date()

            },
            {
                name: "Màn Hình Gotech GT 2K Max 360 | Màn Hình DVD Android Ô Tô",
                path: "Màn-hình-gotech-GT-2K-Max-360-màn-hình-DVD-android-ô-tô",
                detail:
                    `
## Đôi nét về ưu điểm của Màn hình Gotech GT 2K Max 360.
- Ghi hình toàn cảnh 360 độ.
- Tấm nền QLED 2K sắc nét, chân thực đến từng điểm ảnh.
- Giải trí đa phương tiện.
- Điều khiển giọng nói tiếng Việt nhanh nhạy.
- Chỉ dẫn đường thông minh, không cần internet.
- Bảo hành: 2 năm (1 đổi 1).
## Khám phá những điểm nổi bật trên sản phẩm Màn hình Gotech GT 2K Max 360.
### Gotech GT 2K Max 360 tích hợp cảm biến áp suất lốp lên màn hình.
Màn hình Gotech GT2K Max 360 cho phép tích hợp các thiết bị ngoại vi. Như cảm biến áp suất lốp trực tiếp lên màn hình thông minh, mô phỏng 4 bánh xe với đầy đủ các thông tin về nhiệt độ, áp suất của mỗi bánh.

Trong trường hợp lốp xe xảy ra vấn đề như non hơn, căng hơi hoặc cán đinh,… Cảm biến sẽ lập tức gửi tín hiệu cảnh báo tới tài xế bằng âm thanh hoặc hình ảnh trên Màn hình Gotech GT 2K Max 360.

Nhờ vậy, người dùng có thể theo dõi tình trạng lốp xe một cách dễ dàng, kịp thời phát hiện các dấu hiệu bất thường. Từ đó, xử lý nhanh chóng tránh xảy ra sự cố đáng tiếc.
### Màn hình Gotech GT 2K Max 360 cấu hình mạnh mẽ, đa nhiệm mượt mà.
Sở hữu cấu hình Ram 4GB, Rom 64GB, CPU 8 nhân. Màn hình Gotech GT 2K Max 360 còn được trang bị cấu hình mạnh mẽ.

Giúp việc xử lý các tác vụ trên màn hình nhanh chóng. Không bị giật lag kể cả khi bạn sử dụng tính năng chia đôi màn hình và sử dụng hai ứng dụng cùng 1 lúc.

Từ đó tối ưu được hiệu suất sử dụng sản phẩm Màn hình Gotech GT2K Max 360. Cho phép bạn vừa chỉ đường vừa giải trí hoặc quan sát camera 360.
### Trang bị tấm nền QLED 2K cho chất lượng hình ảnh sống động.
Màn hình Gotech GT 2K Max 360 được trang bị tấm nền QLED 2K của Gotech có màu sắc, hình ảnh trung trực. Cùng độ nét gấp 4 lần so với các loại màn hình Android thông thường.

Cung cấp chất lượng hình ảnh sắc nét, chân thực đến từng điểm ảnh. Màn hình Gotech GT 2K Max 360 mang tới những trải nghiệm giải trí tuyệt vời ngay trên xế yêu.
### Cải thiện hiệu năng khi lắp đặt Màn hình Gotech GT 2K Max 360.
Hệ điều hành Android 12 cho phép bạn sử dụng những tính năng mới. Nhờ thế linh hoạt hơn trong việc tùy chỉnh tác vụ và nâng cao hiệu năng sử dụng sản phẩm Màn hình Gotech GT 2K Max 360. 
### Hỗ trợ lái xe an toàn, quan sát và điều khiển dễ dàng hơn.
Màn hình Gotech GT 2K Max 360 được tích hợp các thiết bị ngoại vi hỗ trợ lái xe an toàn. Như camera, cảm biến áp suất lốp,…

Cùng với tấm nền QLED 2K, chất lượng hình ảnh camera hiển thị trên màn hình được rõ nét. Thiết kế này giúp tài xế dễ dàng quan sát và điều khiển xe một cách an toàn hơn.
### Màn hình Gotech GT 2K Max 360 kiến tạo không gian giải trí hoàn toàn mới.
Màn hình Gotech GT 2K Max 360 cho phép bạn đắm chìm trong không gian giải trí tuyệt hảo. Thưởng thức nội dung yêu thích ở chất lượng hình ảnh cao, sắc nét đến từng chi tiết.

Thông qua việc kết nối internet 4G cùng hệ điều hành Android. Màn hình Gotech GT 2K Max 360 cung cấp kho ứng dụng giải trí khổng lồ trên CH Play. Cho bạn thỏa sức lựa chọn theo đúng sở thích cá nhân, gia đình.
### Ra lệnh giọng nói tiếng Việt thông minh, nhanh nhạy.
Trên Màn hình Gotech GT 2K Max 360 được tích hợp 2 trợ lý AI thông minh GotechGPT và Kiki. Giúp hỗ trợ tài xế lái xe rảnh tay vẫn an toàn tuyệt đối. Không cần thao tác trên màn hình, bạn vẫn có thể mở toàn bộ các tác vụ cần thiết thông qua việc ra lệnh giọng nói.

Trợ lý Gotech GPT cho phép người dùng tương tác hai chiều. Giải đáp tất cả các vấn đề mà bạn gặp phải. Và hỗ trợ bạn trong việc giải đáp các thông tin một cách nhanh chóng, chính xác.
### Hệ sinh thái phần mềm độc quyền từ Gotech thông qua Màn hình Gotech GT 2K Max 360.
Gotech phát triển hệ sinh thái các phần mềm độc quyền hỗ trợ khách hàng trong quá trình sử dụng sản phẩm. Như Phần mềm bảo hành điện tử, phần mềm tra cứu phạt nguội, ứng dụng định vị xe, theo dõi lộ trình di chuyển,…

Ngoài ra, Gotech cũng quan tâm đến vấn đề thẩm mỹ và tính tiện nghi trong quá trình sử dụng. Sau khi thu thập thói quen của người dùng. Gotech đã cho ra mắt giao diện màn hình ô tô lấy cảm hứng từ Apple UI.

Với thiết kế trực quan, linh hoạt, dễ dàng thao tác và tìm kiếm thông tin, ứng dụng nhanh chóng. Đặc biệt với giao diện của Gotech, bạn có thể tuỳ chỉnh mẫu xe, màu sắc theo sở thích và phong thuỷ.
### Cung cấp 3 loại bản đồ tiên tiến nhất hiện nay.
Trên sản phẩm Màn hình Gotech GT 2K Max 360 được cài đặt 3 ứng dụng bản đồ tiên tiến nhất. Gồm Carmap, Google Map, Navitel.

Phần mềm dẫn đường Carmap có giao diện trực quan, dễ dàng sử dụng. Tối ưu lộ trình, cung cấp các thông tin biển báo một cách chính xác, chi tiết.

Qua đó, hỗ trợ người dùng tìm kiếm lộ trình di chuyển nhanh chóng, chính xác. Mang đến sự yên tâm lái xe không lo ngại việc đi nhầm đường.
## Hướng dẫn sử dụng Màn hình Gotech GT 2K Max 360.
- Người lái có thể xem lại lịch trình di chuyển của xe trong vòng 365 ngày
- Muốn vào bản đồ Navitel đọc khẩu lệnh: “Đi tới/ Chỉ tới/ Dẫn tới+ địa chỉ + bằng Navitel”
- Muốn vào bản đồ Googlemap đọc khẩu lệnh: “Đi tới / Chỉ tới/ Dẫn tới + địa chỉ + bằng Googlemap”
- Muốn vào bản đồ Vietmap đọc khẩu lệnh: “Đi tới/ Chỉ tới/ Dẫn tới + địa chỉ + bằng Vietmap”
- Muốn kiểm tra phạt nguội theo câu lệnh: “ Phạt nguội + biển số xe”
- Muốn vào Youtube đọc khẩu lệnh: “Mở video + tên bài hát”
- Muốn mở TV go đọc khẩu lệnh: “Xem + tên kênh”
- Muốn xem dự báo thời tiết đọc khẩu lệnh: “Thời tiết + tên thành phố”
- Muốn kiểm tra áp suất lốp tích hợp màn hình đọc khẩu lệnh: “mở Áp Suất Lốp”
- Mở Camera hành trình: “ Mở camera trước” hoặc “ Mở camera hành trình”
- Kết nối bluetooth trực tiếp với điện thoại với các câu lệnh
- Lệnh gọi để vào Radio: “Nghe Radio”
    
    `,
                quantity: 15,
                price: 19500000,
                currency: "VND",
                categoryId: 1,
                imageUrl: "https://autohungdung.com/wp-content/uploads/2023/01/33502699.jpg",
                createdAt: new Date(),
                updatedAt: new Date()

            },
            {
                name: "Màn Hình Gotech GT 2K 360 | Màn Hình DVD Android Ô Tô",
                path: "Màn-hình-gotech-GT-2K-360-màn-hình-DVD-android-ô-tô",
                detail:
                    `
## Đôi nét về ưu điểm của Màn hình Gotech GT 2K 360.
- Ghi hình toàn cảnh 360 độ.
- Tấm nền QLED 2K sắc nét, chân thực đến từng điểm ảnh.
- Giải trí đa phương tiện.
- Điều khiển giọng nói tiếng Việt nhanh nhạy.
- Chỉ dẫn đường thông minh, không cần internet.
- Bảo hành: 2 năm (1 đổi 1).
## Khám phá những điểm nổi bật trên sản phẩm Màn hình Gotech GT 2K 360.
### Gotech GT 2K 360 tích hợp cảm biến áp suất lốp lên màn hình.
Màn hình Gotech GT2K 360 cho phép tích hợp các thiết bị ngoại vi. Như cảm biến áp suất lốp trực tiếp lên màn hình thông minh, mô phỏng 4 bánh xe với đầy đủ các thông tin về nhiệt độ, áp suất của mỗi bánh.

Trong trường hợp lốp xe xảy ra vấn đề như non hơn, căng hơi hoặc cán đinh,… Cảm biến sẽ lập tức gửi tín hiệu cảnh báo tới tài xế bằng âm thanh hoặc hình ảnh trên Màn hình Gotech GT 2K 360.

Nhờ vậy, người dùng có thể theo dõi tình trạng lốp xe một cách dễ dàng, kịp thời phát hiện các dấu hiệu bất thường. Từ đó, xử lý nhanh chóng tránh xảy ra sự cố đáng tiếc.
### Màn hình Gotech GT 2K 360 cấu hình mạnh mẽ, đa nhiệm mượt mà.
Sở hữu cấu hình Ram 4GB, Rom 64GB, CPU 8 nhân. Màn hình Gotech GT 2K 360 còn được trang bị cấu hình mạnh mẽ.

Giúp việc xử lý các tác vụ trên màn hình nhanh chóng. Không bị giật lag kể cả khi bạn sử dụng tính năng chia đôi màn hình và sử dụng hai ứng dụng cùng 1 lúc.

Từ đó tối ưu được hiệu suất sử dụng sản phẩm Màn hình Gotech GT2K 360. Cho phép bạn vừa chỉ đường vừa giải trí hoặc quan sát camera 360.
### Trang bị tấm nền QLED 2K cho chất lượng hình ảnh sống động.
Màn hình Gotech GT 2K 360 được trang bị tấm nền QLED 2K của Gotech có màu sắc, hình ảnh trung trực. Cùng độ nét gấp 4 lần so với các loại màn hình Android thông thường.

Cung cấp chất lượng hình ảnh sắc nét, chân thực đến từng điểm ảnh. Màn hình Gotech GT 2K 360 mang tới những trải nghiệm giải trí tuyệt vời ngay trên xế yêu.
### Cải thiện hiệu năng khi lắp đặt Màn hình Gotech GT 2K 360.
Hệ điều hành Android 12 cho phép bạn sử dụng những tính năng mới. Nhờ thế linh hoạt hơn trong việc tùy chỉnh tác vụ và nâng cao hiệu năng sử dụng sản phẩm Màn hình Gotech GT 2K 360. 
### Hỗ trợ lái xe an toàn, quan sát và điều khiển dễ dàng hơn.
Màn hình Gotech GT 2K 360 được tích hợp các thiết bị ngoại vi hỗ trợ lái xe an toàn. Như camera, cảm biến áp suất lốp,…

Cùng với tấm nền QLED 2K, chất lượng hình ảnh camera hiển thị trên màn hình được rõ nét. Thiết kế này giúp tài xế dễ dàng quan sát và điều khiển xe một cách an toàn hơn.
### Màn hình Gotech GT 2K 360 kiến tạo không gian giải trí hoàn toàn mới.
Màn hình Gotech GT 2K 360 cho phép bạn đắm chìm trong không gian giải trí tuyệt hảo. Thưởng thức nội dung yêu thích ở chất lượng hình ảnh cao, sắc nét đến từng chi tiết.

Thông qua việc kết nối internet 4G cùng hệ điều hành Android. Màn hình Gotech GT 2K 360 cung cấp kho ứng dụng giải trí khổng lồ trên CH Play. Cho bạn thỏa sức lựa chọn theo đúng sở thích cá nhân, gia đình.
### Ra lệnh giọng nói tiếng Việt thông minh, nhanh nhạy.
Trên Màn hình Gotech GT 2K 360 được tích hợp 2 trợ lý AI thông minh GotechGPT và Kiki. Giúp hỗ trợ tài xế lái xe rảnh tay vẫn an toàn tuyệt đối. Không cần thao tác trên màn hình, bạn vẫn có thể mở toàn bộ các tác vụ cần thiết thông qua việc ra lệnh giọng nói.

Trợ lý Gotech GPT cho phép người dùng tương tác hai chiều. Giải đáp tất cả các vấn đề mà bạn gặp phải. Và hỗ trợ bạn trong việc giải đáp các thông tin một cách nhanh chóng, chính xác.
### Hệ sinh thái phần mềm độc quyền từ Gotech thông qua Màn hình Gotech GT 2K 360.
Gotech phát triển hệ sinh thái các phần mềm độc quyền hỗ trợ khách hàng trong quá trình sử dụng sản phẩm. Như Phần mềm bảo hành điện tử, phần mềm tra cứu phạt nguội, ứng dụng định vị xe, theo dõi lộ trình di chuyển,…

Ngoài ra, Gotech cũng quan tâm đến vấn đề thẩm mỹ và tính tiện nghi trong quá trình sử dụng. Sau khi thu thập thói quen của người dùng. Gotech đã cho ra mắt giao diện màn hình ô tô lấy cảm hứng từ Apple UI.

Với thiết kế trực quan, linh hoạt, dễ dàng thao tác và tìm kiếm thông tin, ứng dụng nhanh chóng. Đặc biệt với giao diện của Gotech, bạn có thể tuỳ chỉnh mẫu xe, màu sắc theo sở thích và phong thuỷ.
### Cung cấp 3 loại bản đồ tiên tiến nhất hiện nay.
Trên sản phẩm Màn hình Gotech GT 2K 360 được cài đặt 3 ứng dụng bản đồ tiên tiến nhất. Gồm Carmap, Google Map, Navitel.

Phần mềm dẫn đường Carmap có giao diện trực quan, dễ dàng sử dụng. Tối ưu lộ trình, cung cấp các thông tin biển báo một cách chính xác, chi tiết.

Qua đó, hỗ trợ người dùng tìm kiếm lộ trình di chuyển nhanh chóng, chính xác. Mang đến sự yên tâm lái xe không lo ngại việc đi nhầm đường.
## Hướng dẫn sử dụng Màn hình Gotech GT 2K 360.
- Người lái có thể xem lại lịch trình di chuyển của xe trong vòng 365 ngày
- Muốn vào bản đồ Navitel đọc khẩu lệnh: “Đi tới/ Chỉ tới/ Dẫn tới+ địa chỉ + bằng Navitel”
- Muốn vào bản đồ Googlemap đọc khẩu lệnh: “Đi tới / Chỉ tới/ Dẫn tới + địa chỉ + bằng Googlemap”
- Muốn vào bản đồ Vietmap đọc khẩu lệnh: “Đi tới/ Chỉ tới/ Dẫn tới + địa chỉ + bằng Vietmap”
- Muốn kiểm tra phạt nguội theo câu lệnh: “ Phạt nguội + biển số xe”
- Muốn vào Youtube đọc khẩu lệnh: “Mở video + tên bài hát”
- Muốn mở TV go đọc khẩu lệnh: “Xem + tên kênh”
- Muốn xem dự báo thời tiết đọc khẩu lệnh: “Thời tiết + tên thành phố”
- Muốn kiểm tra áp suất lốp tích hợp màn hình đọc khẩu lệnh: “mở Áp Suất Lốp”
- Mở Camera hành trình: “ Mở camera trước” hoặc “ Mở camera hành trình”
- Kết nối bluetooth trực tiếp với điện thoại với các câu lệnh
- Lệnh gọi để vào Radio: “Nghe Radio”
    
    `,
                quantity: 20,
                price: 14900000,
                currency: "VND",
                categoryId: 1,
                imageUrl: "https://autohungdung.com/wp-content/uploads/2023/01/33502699.jpg",
                createdAt: new Date(),
                updatedAt: new Date()

            },
            {
                name: "Màn Hình Gotech GT 2K Max | Màn Hình DVD Android Ô Tô",
                path: "Màn-hình-gotech-GT-2K-Max-màn-hình-DVD-android-ô-tô",
                detail:
                    `
## Đôi nét về ưu điểm của Màn hình Gotech GT 2K Max.
- Ghi hình toàn cảnh 360 độ.
- Tấm nền QLED 2K sắc nét, chân thực đến từng điểm ảnh.
- Giải trí đa phương tiện.
- Điều khiển giọng nói tiếng Việt nhanh nhạy.
- Chỉ dẫn đường thông minh, không cần internet.
- Bảo hành: 2 năm (1 đổi 1).
## Khám phá những điểm nổi bật trên sản phẩm Màn hình Gotech GT 2K Max.
### Trang bị tấm nền QLED 2K cho chất lượng hình ảnh sống động.
Màn hình Gotech GT 2K Max được trang bị tấm nền QLED 2K của Gotech có màu sắc, hình ảnh trung trực. Cùng độ nét gấp 4 lần so với các loại màn hình Android thông thường.

Cung cấp chất lượng hình ảnh sắc nét, chân thực đến từng điểm ảnh. Màn hình Gotech GT 2K 360 mang tới những trải nghiệm giải trí tuyệt vời ngay trên xế yêu.
### Cải thiện hiệu năng khi lắp đặt Màn hình Gotech GT 2K Max.
Hệ điều hành Android 12 cho phép bạn sử dụng những tính năng mới. Nhờ thế linh hoạt hơn trong việc tùy chỉnh tác vụ và nâng cao hiệu năng sử dụng sản phẩm Màn hình Gotech GT 2K Max. 
### Hỗ trợ lái xe an toàn, quan sát và điều khiển dễ dàng hơn.
Màn hình Gotech GT 2K Max được tích hợp các thiết bị ngoại vi hỗ trợ lái xe an toàn. Như camera, cảm biến áp suất lốp,…

Cùng với tấm nền QLED 2K, chất lượng hình ảnh camera hiển thị trên màn hình được rõ nét. Thiết kế này giúp tài xế dễ dàng quan sát và điều khiển xe một cách an toàn hơn.
### Màn hình Gotech GT 2K Max kiến tạo không gian giải trí hoàn toàn mới.
Màn hình Gotech GT 2K Max cho phép bạn đắm chìm trong không gian giải trí tuyệt hảo. Thưởng thức nội dung yêu thích ở chất lượng hình ảnh cao, sắc nét đến từng chi tiết.

Thông qua việc kết nối internet 4G cùng hệ điều hành Android. Màn hình Gotech GT 2K Max cung cấp kho ứng dụng giải trí khổng lồ trên CH Play. Cho bạn thỏa sức lựa chọn theo đúng sở thích cá nhân, gia đình.
### Ra lệnh giọng nói tiếng Việt thông minh, nhanh nhạy.
Trên Màn hình Gotech GT 2K Max được tích hợp 2 trợ lý AI thông minh GotechGPT và Kiki. Giúp hỗ trợ tài xế lái xe rảnh tay vẫn an toàn tuyệt đối. Không cần thao tác trên màn hình, bạn vẫn có thể mở toàn bộ các tác vụ cần thiết thông qua việc ra lệnh giọng nói.

Trợ lý Gotech GPT cho phép người dùng tương tác hai chiều. Giải đáp tất cả các vấn đề mà bạn gặp phải. Và hỗ trợ bạn trong việc giải đáp các thông tin một cách nhanh chóng, chính xác.
### Hệ sinh thái phần mềm độc quyền từ Gotech thông qua Màn hình Gotech GT 2K Max.
Gotech phát triển hệ sinh thái các phần mềm độc quyền hỗ trợ khách hàng trong quá trình sử dụng sản phẩm. Như Phần mềm bảo hành điện tử, phần mềm tra cứu phạt nguội, ứng dụng định vị xe, theo dõi lộ trình di chuyển,…

Ngoài ra, Gotech cũng quan tâm đến vấn đề thẩm mỹ và tính tiện nghi trong quá trình sử dụng. Sau khi thu thập thói quen của người dùng. Gotech đã cho ra mắt giao diện màn hình ô tô lấy cảm hứng từ Apple UI.

Với thiết kế trực quan, linh hoạt, dễ dàng thao tác và tìm kiếm thông tin, ứng dụng nhanh chóng. Đặc biệt với giao diện của Gotech, bạn có thể tuỳ chỉnh mẫu xe, màu sắc theo sở thích và phong thuỷ.
### Cung cấp 3 loại bản đồ tiên tiến nhất hiện nay.
Trên sản phẩm Màn hình Gotech GT 2K Max được cài đặt 3 ứng dụng bản đồ tiên tiến nhất. Gồm Carmap, Google Map, Navitel.

Phần mềm dẫn đường Carmap có giao diện trực quan, dễ dàng sử dụng. Tối ưu lộ trình, cung cấp các thông tin biển báo một cách chính xác, chi tiết.

Qua đó, hỗ trợ người dùng tìm kiếm lộ trình di chuyển nhanh chóng, chính xác. Mang đến sự yên tâm lái xe không lo ngại việc đi nhầm đường.
## Hướng dẫn sử dụng Màn hình Gotech GT 2K Max.
- Người lái có thể xem lại lịch trình di chuyển của xe trong vòng 365 ngày
- Muốn vào bản đồ Navitel đọc khẩu lệnh: “Đi tới/ Chỉ tới/ Dẫn tới+ địa chỉ + bằng Navitel”
- Muốn vào bản đồ Googlemap đọc khẩu lệnh: “Đi tới / Chỉ tới/ Dẫn tới + địa chỉ + bằng Googlemap”
- Muốn vào bản đồ Vietmap đọc khẩu lệnh: “Đi tới/ Chỉ tới/ Dẫn tới + địa chỉ + bằng Vietmap”
- Muốn kiểm tra phạt nguội theo câu lệnh: “ Phạt nguội + biển số xe”
- Muốn vào Youtube đọc khẩu lệnh: “Mở video + tên bài hát”
- Muốn mở TV go đọc khẩu lệnh: “Xem + tên kênh”
- Muốn xem dự báo thời tiết đọc khẩu lệnh: “Thời tiết + tên thành phố”
- Muốn kiểm tra áp suất lốp tích hợp màn hình đọc khẩu lệnh: “mở Áp Suất Lốp”
- Mở Camera hành trình: “ Mở camera trước” hoặc “ Mở camera hành trình”
- Kết nối bluetooth trực tiếp với điện thoại với các câu lệnh
- Lệnh gọi để vào Radio: “Nghe Radio”
    
    `,
                quantity: 20,
                price: 14500000,
                currency: "VND",
                categoryId: 1,
                imageUrl: "https://autohungdung.com/wp-content/uploads/2023/01/33502699.jpg",
                createdAt: new Date(),
                updatedAt: new Date()

            },
            {
                name: "Màn Hình Gotech GT 2K Pro | Màn Hình DVD Android Ô Tô",
                path: "Màn-hình-gotech-GT-2K-Pro-màn-hình-DVD-android-ô-tô",
                detail:
                    `
## Đôi nét về ưu điểm của Màn hình Gotech GT 2K Pro.
- Ghi hình toàn cảnh 360 độ.
- Tấm nền QLED 2K sắc nét, chân thực đến từng điểm ảnh.
- Giải trí đa phương tiện.
- Điều khiển giọng nói tiếng Việt nhanh nhạy.
- Chỉ dẫn đường thông minh, không cần internet.
- Bảo hành: 2 năm (1 đổi 1).
## Khám phá những điểm nổi bật trên sản phẩm Màn hình Gotech GT 2K Pro.
### Trang bị tấm nền QLED 2K cho chất lượng hình ảnh sống động.
Màn hình Gotech GT 2K Pro được trang bị tấm nền QLED 2K của Gotech có màu sắc, hình ảnh trung thực. Cùng độ nét gấp 4 lần so với các loại màn hình Android thông thường.

Cung cấp chất lượng hình ảnh sắc nét, chân thực đến từng điểm ảnh. Màn hình Gotech GT 2K 360 mang tới những trải nghiệm giải trí tuyệt vời ngay trên xế yêu.
### Cải thiện hiệu năng khi lắp đặt Màn hình Gotech GT 2K Pro.
Hệ điều hành Android 12 cho phép bạn sử dụng những tính năng mới. Nhờ thế linh hoạt hơn trong việc tùy chỉnh tác vụ và nâng cao hiệu năng sử dụng sản phẩm Màn hình Gotech GT 2K Pro.
### Hỗ trợ lái xe an toàn, quan sát và điều khiển dễ dàng hơn.
Màn hình Gotech GT 2K Pro được tích hợp các thiết bị ngoại vi hỗ trợ lái xe an toàn. Như camera, cảm biến áp suất lốp,…

Cùng với tấm nền QLED 2K, chất lượng hình ảnh camera hiển thị trên màn hình được rõ nét. Thiết kế này giúp tài xế dễ dàng quan sát và điều khiển xe một cách an toàn hơn.
### Màn hình Gotech GT 2K Pro kiến tạo không gian giải trí hoàn toàn mới.
Màn hình Gotech GT 2K Pro cho phép bạn đắm chìm trong không gian giải trí tuyệt hảo. Thưởng thức nội dung yêu thích ở chất lượng hình ảnh cao, sắc nét đến từng chi tiết.

Thông qua việc kết nối internet 4G cùng hệ điều hành Android. Màn hình Gotech GT 2K Pro cung cấp kho ứng dụng giải trí khổng lồ trên CH Play. Cho bạn thỏa sức lựa chọn theo đúng sở thích cá nhân, gia đình.
### Ra lệnh giọng nói tiếng Việt thông minh, nhanh nhạy.
Trên Màn hình Gotech GT 2K Pro được tích hợp 2 trợ lý AI thông minh GotechGPT và Kiki. Giúp hỗ trợ tài xế lái xe rảnh tay vẫn an toàn tuyệt đối. Không cần thao tác trên màn hình, bạn vẫn có thể mở toàn bộ các tác vụ cần thiết thông qua việc ra lệnh giọng nói.

Trợ lý Gotech GPT cho phép người dùng tương tác hai chiều. Giải đáp tất cả các vấn đề mà bạn gặp phải. Và hỗ trợ bạn trong việc giải đáp các thông tin một cách nhanh chóng, chính xác.
### Hệ sinh thái phần mềm độc quyền từ Gotech thông qua Màn hình Gotech GT 2K Pro.
Gotech phát triển hệ sinh thái các phần mềm độc quyền hỗ trợ khách hàng trong quá trình sử dụng sản phẩm. Như Phần mềm bảo hành điện tử, phần mềm tra cứu phạt nguội, ứng dụng định vị xe, theo dõi lộ trình di chuyển,…

Ngoài ra, Gotech cũng quan tâm đến vấn đề thẩm mỹ và tính tiện nghi trong quá trình sử dụng. Sau khi thu thập thói quen của người dùng. Gotech đã cho ra mắt giao diện màn hình ô tô lấy cảm hứng từ Apple UI.

Với thiết kế trực quan, linh hoạt, dễ dàng thao tác và tìm kiếm thông tin, ứng dụng nhanh chóng. Đặc biệt với giao diện của Gotech, bạn có thể tuỳ chỉnh mẫu xe, màu sắc theo sở thích và phong thuỷ.
### Cung cấp 3 loại bản đồ tiên tiến nhất hiện nay.
Trên sản phẩm Màn hình Gotech GT 2K Pro được cài đặt 3 ứng dụng bản đồ tiên tiến nhất. Gồm Carmap, Google Map, Navitel.

Phần mềm dẫn đường Carmap có giao diện trực quan, dễ dàng sử dụng. Tối ưu lộ trình, cung cấp các thông tin biển báo một cách chính xác, chi tiết.

Qua đó, hỗ trợ người dùng tìm kiếm lộ trình di chuyển nhanh chóng, chính xác. Mang đến sự yên tâm lái xe không lo ngại việc đi nhầm đường.
## Hướng dẫn sử dụng Màn hình Gotech GT 2K Pro.
- Người lái có thể xem lại lịch trình di chuyển của xe trong vòng 365 ngày
- Muốn vào bản đồ Navitel đọc khẩu lệnh: “Đi tới/ Chỉ tới/ Dẫn tới+ địa chỉ + bằng Navitel”
- Muốn vào bản đồ Googlemap đọc khẩu lệnh: “Đi tới / Chỉ tới/ Dẫn tới + địa chỉ + bằng Googlemap”
- Muốn vào bản đồ Vietmap đọc khẩu lệnh: “Đi tới/ Chỉ tới/ Dẫn tới + địa chỉ + bằng Vietmap”
- Muốn kiểm tra phạt nguội theo câu lệnh: “Phạt nguội + biển số xe”
- Muốn vào Youtube đọc khẩu lệnh: “Mở video + tên bài hát”
- Muốn mở TV go đọc khẩu lệnh: “Xem + tên kênh”
- Muốn xem dự báo thời tiết đọc khẩu lệnh: “Thời tiết + tên thành phố”
- Muốn kiểm tra áp suất lốp tích hợp màn hình đọc khẩu lệnh: “mở Áp Suất Lốp”
- Mở Camera hành trình: “Mở camera trước” hoặc “Mở camera hành trình”
- Kết nối bluetooth trực tiếp với điện thoại với các câu lệnh
- Lệnh gọi để vào Radio: “Nghe Radio”
    
    `,
                quantity: 20,
                price: 11900000,
                currency: "VND",
                categoryId: 1,
                imageUrl: "https://autohungdung.com/wp-content/uploads/2023/01/33502699.jpg",
                createdAt: new Date(),
                updatedAt: new Date()

            },
            {
                name: "Màn Hình Gotech GT 2K | Màn Hình DVD Android Ô Tô",
                path: "Màn-hình-gotech-GT-2K-màn-hình-DVD-android-ô-tô",
                detail:
                    `
## Đôi nét về ưu điểm của Màn hình Gotech GT 2K.
- Ghi hình toàn cảnh 360 độ.
- Tấm nền QLED 2K sắc nét, chân thực đến từng điểm ảnh.
- Giải trí đa phương tiện.
- Điều khiển giọng nói tiếng Việt nhanh nhạy.
- Chỉ dẫn đường thông minh, không cần internet.
- Bảo hành: 2 năm (1 đổi 1).
## Khám phá những điểm nổi bật trên sản phẩm Màn hình Gotech GT 2K.
### Trang bị tấm nền QLED 2K cho chất lượng hình ảnh sống động.
Màn hình Gotech GT 2K được trang bị tấm nền QLED 2K của Gotech có màu sắc, hình ảnh trung thực. Cùng độ nét gấp 4 lần so với các loại màn hình Android thông thường.

Cung cấp chất lượng hình ảnh sắc nét, chân thực đến từng điểm ảnh. Màn hình Gotech GT 2K 360 mang tới những trải nghiệm giải trí tuyệt vời ngay trên xế yêu.
### Cải thiện hiệu năng khi lắp đặt Màn hình Gotech GT 2K.
Hệ điều hành Android 12 cho phép bạn sử dụng những tính năng mới. Nhờ thế linh hoạt hơn trong việc tùy chỉnh tác vụ và nâng cao hiệu năng sử dụng sản phẩm Màn hình Gotech GT 2K.
### Hỗ trợ lái xe an toàn, quan sát và điều khiển dễ dàng hơn.
Màn hình Gotech GT 2K được tích hợp các thiết bị ngoại vi hỗ trợ lái xe an toàn. Như camera, cảm biến áp suất lốp,…

Cùng với tấm nền QLED 2K, chất lượng hình ảnh camera hiển thị trên màn hình được rõ nét. Thiết kế này giúp tài xế dễ dàng quan sát và điều khiển xe một cách an toàn hơn.
### Màn hình Gotech GT 2K kiến tạo không gian giải trí hoàn toàn mới.
Màn hình Gotech GT 2K cho phép bạn đắm chìm trong không gian giải trí tuyệt hảo. Thưởng thức nội dung yêu thích ở chất lượng hình ảnh cao, sắc nét đến từng chi tiết.

Thông qua việc kết nối internet 4G cùng hệ điều hành Android. Màn hình Gotech GT 2K cung cấp kho ứng dụng giải trí khổng lồ trên CH Play. Cho bạn thỏa sức lựa chọn theo đúng sở thích cá nhân, gia đình.
### Ra lệnh giọng nói tiếng Việt thông minh, nhanh nhạy.
Trên màn hình Gotech GT 2K được tích hợp 2 trợ lý AI thông minh GotechGPT và Kiki. Giúp hỗ trợ tài xế lái xe rảnh tay vẫn an toàn tuyệt đối. Không cần thao tác trên màn hình, bạn vẫn có thể mở toàn bộ các tác vụ cần thiết thông qua việc ra lệnh giọng nói.

Trợ lý Gotech GPT cho phép người dùng tương tác hai chiều. Giải đáp tất cả các vấn đề mà bạn gặp phải. Và hỗ trợ bạn trong việc giải đáp các thông tin một cách nhanh chóng, chính xác.
### Hệ sinh thái phần mềm độc quyền từ Gotech thông qua Màn hình Gotech GT 2K.
Gotech phát triển hệ sinh thái các phần mềm độc quyền hỗ trợ khách hàng trong quá trình sử dụng sản phẩm. Như Phần mềm bảo hành điện tử, phần mềm tra cứu phạt nguội, ứng dụng định vị xe, theo dõi lộ trình di chuyển,…

Ngoài ra, Gotech cũng quan tâm đến vấn đề thẩm mỹ và tính tiện nghi trong quá trình sử dụng. Sau khi thu thập thói quen của người dùng. Gotech đã cho ra mắt giao diện màn hình ô tô lấy cảm hứng từ Apple UI.

Với thiết kế trực quan, linh hoạt, dễ dàng thao tác và tìm kiếm thông tin, ứng dụng nhanh chóng. Đặc biệt với giao diện của Gotech, bạn có thể tuỳ chỉnh mẫu xe, màu sắc theo sở thích và phong thuỷ.
### Cung cấp 3 loại bản đồ tiên tiến nhất hiện nay.
Trên sản phẩm Màn hình Gotech GT 2K được cài đặt 3 ứng dụng bản đồ tiên tiến nhất. Gồm Carmap, Google Map, Navitel.

Phần mềm dẫn đường Carmap có giao diện trực quan, dễ dàng sử dụng. Tối ưu lộ trình, cung cấp các thông tin biển báo một cách chính xác, chi tiết.

Qua đó, hỗ trợ người dùng tìm kiếm lộ trình di chuyển nhanh chóng, chính xác. Mang đến sự yên tâm lái xe không lo ngại việc đi nhầm đường.
## Hướng dẫn sử dụng Màn hình Gotech GT 2K.
- Người lái có thể xem lại lịch trình di chuyển của xe trong vòng 365 ngày
- Muốn vào bản đồ Navitel đọc khẩu lệnh: “Đi tới/ Chỉ tới/ Dẫn tới+ địa chỉ + bằng Navitel”
- Muốn vào bản đồ Googlemap đọc khẩu lệnh: “Đi tới / Chỉ tới/ Dẫn tới + địa chỉ + bằng Googlemap”
- Muốn vào bản đồ Vietmap đọc khẩu lệnh: “Đi tới/ Chỉ tới/ Dẫn tới + địa chỉ + bằng Vietmap”
- Muốn kiểm tra phạt nguội theo câu lệnh: “Phạt nguội + biển số xe”
- Muốn vào Youtube đọc khẩu lệnh: “Mở video + tên bài hát”
- Muốn mở TV go đọc khẩu lệnh: “Xem + tên kênh”
- Muốn xem dự báo thời tiết đọc khẩu lệnh: “Thời tiết + tên thành phố”
- Muốn kiểm tra áp suất lốp tích hợp màn hình đọc khẩu lệnh: “mở Áp Suất Lốp”
- Mở Camera hành trình: “Mở camera trước” hoặc “Mở camera hành trình”
- Kết nối bluetooth trực tiếp với điện thoại với các câu lệnh
- Lệnh gọi để vào Radio: “Nghe Radio”
    
    `,
                quantity: 20,
                price: 8900000,
                currency: "VND",
                categoryId: 1,
                imageUrl: "https://autohungdung.com/wp-content/uploads/2023/01/33502699.jpg",
                createdAt: new Date(),
                updatedAt: new Date()

            },
            {
                name: "Màn Hình Zestech ZX10+ Bản Giới Hạn | DVD Android Ô Tô",
                path: "Màn-hình-Zestech-ZX10+-bản-giới-hạn-DVD-android-ô-tô",
                detail:
                    `
## Ưu điểm vượt trội Màn Hình DVD Android Ô Tô Zestech ZX10 Bản Giới Hạn.
### Công nghệ ưu việt.
Với sự nâng cấp ấn tượng so với phiên bản tiền nhiệm trước đó. ZX10 bản giới hạn sở hữu cấu hình 3GB Ram + 32GB Rom, hệ điều hành android 10.0. Giúp màn hình hoạt động mượt mà và ổn định, không gặp phải tình trạng giật lag.

Đặc biệt, đây cũng là phiên bản được tích hợp nhiều công nghệ trong một sản phẩm. Từ điều khiển bằng giọng nói, công nghệ điều chỉnh âm thanh equalizer,…
### Ra lệnh bằng giọng nói với Trợ lý KIKI.
Với chức năng nghe hiểu giọng nói cả 3 miền Bắc – Trung – Nam. Trợ lý tiếng Việt Kiki mang đến trải nghiệm lái xe an toàn và tiện lợi nhất cho người dùng xe hơi.

Bạn có thể thực hiện những thao tác tìm đường, giải trí, đọc tin tức,… Tất cả được thực hiện thông qua giọng nói dễ dàng, nhanh chóng. Nhờ đó thao tác tay và mắt hoàn toàn không bị mất tập trung hay phân tâm trong quá trình xe lăn bánh.
### Tính năng cảnh báo giới hạn tốc độ và hiển thị mật độ giao thông.
Cập nhật giới hạn và cảnh báo tốc độ trên ứng dụng Vietmap với màn hình android. Giúp chủ xế nhanh chóng nắm rõ tốc độ giới hạn trên cung đường mình di chuyển. Từ đó có sự điều chỉnh hợp lý, tránh bị thổi còi vi phạm.

Thêm vào đó, tính năng hiển thị mật độ giao thông nơi xe lưu thông cũng được tích hợp trên Zestech. Giúp xử lý được những tình huống giao thông khẩn cấp một cách dễ dàng và chọn lộ trình tốt nhất.
### Tính năng thông báo phạt nguội qua tin nhắn và cuộc gọi.
Zestech là giải pháp tuyệt vời giúp bạn an tâm lái xe. Không còn lo dính phạt nguội khi cảnh báo trước 300m ở cung đường có gắn camera phạt nguội.

Đặc biệt, bạn có thể check phạt nguội nhanh chóng chỉ với 1 câu lệnh “Phạt nguội + Biển số xe”. Hệ thống Zestech còn chủ động trực tiếp nhắn tin và gọi điện thông báo. Giúp bạn có thể xử lý vi phạm nhanh chóng và nắm được lỗi cũng như cung đường mà mình đã vi phạm.
### Kho giải trí bất tận nâng cao trải nghiệm, thư giãn.
Nhờ tích hợp sim 4G cho phép kết nối internet dễ dàng. Màn hình Zestech đáp ứng mọi nhu cầu giải trí cho chủ xế từ xem phim, nghe nhạc, đọc tin tức, tải ứng dụng dễ dàng từ CHPlay,…

Đặc biệt, màn hình còn được trang bị âm thanh DSP 16 kênh với 32 giải tần. Và có thể tùy chỉnh theo từng thể loại nhạc, mang đến trải nghiệm âm thanh sống động nhất.
### Bản đồ chỉ đường thông minh nhất hiện nay.
Sở hữu cả 3 ứng dụng chỉ dẫn đường hiện đại nhất hiện nay. Như VIETMAP, GOOGLE MAPS VÀ NAVITEL. Thông qua điều khiển bằng giọng nói, chủ xế có thể nhanh chóng tìm địa chỉ mình mong muốn một cách chính xác. Nhờ đó tiết kiệm thời gian và tăng sự an toàn.

Đặc biệt, không cần kết nối internet như Google Map. Vì 2 phần mềm bản đồ Vietmap và Navitel cho phép người dùng sử dụng bản đồ chỉ đường ngay cả khi không có mạng.
### Chia đôi màn hình, chạy song song ứng dụng cùng lúc.
Điều thú vị với các tài xế là màn hình Zestech có thể chạy đa nhiệm ứng dụng. Đặc biệt là không tình trạng không nóng máy, không giật, lag.

Bạn vừa có thể xem bản đồ dẫn đường. Vừa mở các ứng dụng giải trí khác cho trẻ nhỏ hoặc người ngồi bên cạnh.
### Kết nối nhanh chóng với các thiết bị ngoại vi.
Màn hình ô tô Zestech có khả năng kết nối và hiển thị các thiết bị ngoại vi. Như camera 360, camera hành trình, cảm biến áp suất lốp,… Với tính năng này, bạn hoàn toàn có thể trang bị thêm các thiết bị giúp hỗ trợ quan sát, lái xe an toàn.
### Quản lý định vị xe từ xa.
Với ứng dụng “Zestech Tracking”, giúp bạn theo dõi chính xác được vị trí hiện tại của xe ngay trên điện thoại. Đặc biệt, với bộ nhớ lưu trữ dữ liệu khủng. Bạn hoàn toàn có thể xem lại hành trình di chuyển, tốc độ, các vị trí dừng đỗ của xe trong vòng 365 ngày.
### Âm thanh siêu việt.
Phiên bản đỉnh cao âm thanh dành cho ô tô khi mang tới trải nghiệm vượt trội. Đáp ứng được tất cả nhu cầu giải trí, thưởng thức những bản nhạc đỉnh cao. Với chất âm hoàn hảo vượt xa so với nguyên bản. Giúp bạn có thể cảm nhận các bản nhạc, bộ phim với mọi cung bậc cảm xúc ngay trên xế yêu.

Hơn thế nữa, sản phẩm được tích hợp vô vàn tính năng cao cấp, hỗ trợ lái xe an toàn như điều khiển bằng giọng nói, định vị xe từ xa, bản đồ, kết nối camera hành trình,….
### Mang đến tính Cá nhân hóa – Tự động hóa.
Với 72 sắc màu thời thượng trên màn hình, cho bạn tự do thay đổi theo sở thích và cả phong thủy ô tô. Cùng 3 Giao diện mới màn hình Zestech (Cơ bản, Công viên, Công nghệ). Bên cạnh đó bạn hoàn toàn có thể thay đổi mẫu xe chạy trên màn hình với 25 chủng loại xe khác nhau, biển số và cả màu sắc xe theo sở thích.

Đặc biệt, tích hợp giao diện tự động hóa theo thời gian: Bình minh, Ban ngày, Ban đêm. Tạo nên điểm nhấn không sản phẩm nào có được.
    
    `,
                quantity: 20,
                price: 20900000,
                currency: "VND",
                categoryId: 1,
                imageUrl: "https://autohungdung.com/wp-content/uploads/2023/01/33502699.jpg",
                createdAt: new Date(),
                updatedAt: new Date()

            },
            {
                name: "Màn Hình Zestech ZX10+ Bản Tiêu Chuẩn | DVD Android Ô Tô",
                path: "Màn-hình-Zestech-ZX10+-bản-tiêu-chuẩn-DVD-android-ô-tô",
                detail:
                    `
## Ưu điểm vượt trội Màn Hình DVD Android Ô Tô Zestech ZX10 Bản Tiêu Chuẩn.
### Công nghệ ưu việt.
Với sự nâng cấp ấn tượng so với phiên bản tiền nhiệm trước đó. ZX10 bản tiêu chuẩn sở hữu cấu hình 3GB Ram + 32GB Rom, hệ điều hành android 10.0. Giúp màn hình hoạt động mượt mà và ổn định, không gặp phải tình trạng giật lag.

Đặc biệt, đây cũng là phiên bản được tích hợp nhiều công nghệ trong một sản phẩm. Từ điều khiển bằng giọng nói, công nghệ điều chỉnh âm thanh equalizer,…
### Ra lệnh bằng giọng nói với Trợ lý KIKI.
Với chức năng nghe hiểu giọng nói cả 3 miền Bắc – Trung – Nam. Trợ lý tiếng Việt Kiki mang đến trải nghiệm lái xe an toàn và tiện lợi nhất cho người dùng xe hơi.

Bạn có thể thực hiện những thao tác tìm đường, giải trí, đọc tin tức,… Tất cả được thực hiện thông qua giọng nói dễ dàng, nhanh chóng. Nhờ đó thao tác tay và mắt hoàn toàn không bị mất tập trung hay phân tâm trong quá trình xe lăn bánh.
### Tính năng cảnh báo giới hạn tốc độ và hiển thị mật độ giao thông.
Cập nhật giới hạn và cảnh báo tốc độ trên ứng dụng Vietmap với màn hình android. Giúp chủ xế nhanh chóng nắm rõ tốc độ giới hạn trên cung đường mình di chuyển. Từ đó có sự điều chỉnh hợp lý, tránh bị thổi còi vi phạm.

Thêm vào đó, tính năng hiển thị mật độ giao thông nơi xe lưu thông cũng được tích hợp trên Zestech. Giúp xử lý được những tình huống giao thông khẩn cấp một cách dễ dàng và chọn lộ trình tốt nhất.
### Tính năng thông báo phạt nguội qua tin nhắn và cuộc gọi.
Zestech là giải pháp tuyệt vời giúp bạn an tâm lái xe. Không còn lo dính phạt nguội khi cảnh báo trước 300m ở cung đường có gắn camera phạt nguội.

Đặc biệt, bạn có thể check phạt nguội nhanh chóng chỉ với 1 câu lệnh “Phạt nguội + Biển số xe”. Hệ thống Zestech còn chủ động trực tiếp nhắn tin và gọi điện thông báo. Giúp bạn có thể xử lý vi phạm nhanh chóng và nắm được lỗi cũng như cung đường mà mình đã vi phạm.
### Kho giải trí bất tận nâng cao trải nghiệm, thư giãn.
Nhờ tích hợp sim 4G cho phép kết nối internet dễ dàng. Màn hình Zestech đáp ứng mọi nhu cầu giải trí cho chủ xế từ xem phim, nghe nhạc, đọc tin tức, tải ứng dụng dễ dàng từ CHPlay,…

Đặc biệt, màn hình còn được trang bị âm thanh DSP 16 kênh với 32 giải tần. Và có thể tùy chỉnh theo từng thể loại nhạc, mang đến trải nghiệm âm thanh sống động nhất.
### Bản đồ chỉ đường thông minh nhất hiện nay.
Sở hữu cả 3 ứng dụng chỉ dẫn đường hiện đại nhất hiện nay. Như VIETMAP, GOOGLE MAPS VÀ NAVITEL. Thông qua điều khiển bằng giọng nói, chủ xế có thể nhanh chóng tìm địa chỉ mình mong muốn một cách chính xác. Nhờ đó tiết kiệm thời gian và tăng sự an toàn.

Đặc biệt, không cần kết nối internet như Google Map. Vì 2 phần mềm bản đồ Vietmap và Navitel cho phép người dùng sử dụng bản đồ chỉ đường ngay cả khi không có mạng.
### Chia đôi màn hình, chạy song song ứng dụng cùng lúc.
Điều thú vị với các tài xế là màn hình Zestech có thể chạy đa nhiệm ứng dụng. Đặc biệt là không tình trạng không nóng máy, không giật, lag.

Bạn vừa có thể xem bản đồ dẫn đường. Vừa mở các ứng dụng giải trí khác cho trẻ nhỏ hoặc người ngồi bên cạnh.
### Kết nối nhanh chóng với các thiết bị ngoại vi.
Màn hình ô tô Zestech có khả năng kết nối và hiển thị các thiết bị ngoại vi. Như camera 360, camera hành trình, cảm biến áp suất lốp,… Với tính năng này, bạn hoàn toàn có thể trang bị thêm các thiết bị giúp hỗ trợ quan sát, lái xe an toàn.
### Quản lý định vị xe từ xa.
Với ứng dụng “Zestech Tracking”, giúp bạn theo dõi chính xác được vị trí hiện tại của xe ngay trên điện thoại. Đặc biệt, với bộ nhớ lưu trữ dữ liệu khủng. Bạn hoàn toàn có thể xem lại hành trình di chuyển, tốc độ, các vị trí dừng đỗ của xe trong vòng 365 ngày.
### Âm thanh siêu việt.
Phiên bản đỉnh cao âm thanh dành cho ô tô khi mang tới trải nghiệm vượt trội. Đáp ứng được tất cả nhu cầu giải trí, thưởng thức những bản nhạc đỉnh cao. Với chất âm hoàn hảo vượt xa so với nguyên bản. Giúp bạn có thể cảm nhận các bản nhạc, bộ phim với mọi cung bậc cảm xúc ngay trên xế yêu.

Hơn thế nữa, sản phẩm được tích hợp vô vàn tính năng cao cấp, hỗ trợ lái xe an toàn như điều khiển bằng giọng nói, định vị xe từ xa, bản đồ, kết nối camera hành trình,….
### Mang đến tính Cá nhân hóa – Tự động hóa.
Với 72 sắc màu thời thượng trên màn hình, cho bạn tự do thay đổi theo sở thích và cả phong thủy ô tô. Cùng 3 Giao diện mới màn hình Zestech (Cơ bản, Công viên, Công nghệ). Bên cạnh đó bạn hoàn toàn có thể thay đổi mẫu xe chạy trên màn hình với 25 chủng loại xe khác nhau, biển số và cả màu sắc xe theo sở thích.

Đặc biệt, tích hợp giao diện tự động hóa theo thời gian: Bình minh, Ban ngày, Ban đêm. Tạo nên điểm nhấn không sản phẩm nào có được.
    
    `,
                quantity: 10,
                price: 14900000,
                currency: "VND",
                categoryId: 1,
                imageUrl: "https://autohungdung.com/wp-content/uploads/2023/01/33502699.jpg",
                createdAt: new Date(),
                updatedAt: new Date()

            },
            {
                name: "Màn Hình Zestech ZX10 Bản Giới Hạn | DVD Android Ô Tô",
                path: "Màn-hình-Zestech-ZX10-bản-giới-hạn-DVD-android-ô-tô",
                detail:
                    `
## Ưu điểm vượt trội Màn Hình DVD Android Ô Tô Zestech ZX10 Bản Giới Hạn.
### Công nghệ ưu việt.
Với sự nâng cấp ấn tượng so với phiên bản tiền nhiệm trước đó. ZX10 bản giới hạn sở hữu cấu hình 3GB Ram + 32GB Rom, hệ điều hành android 10.0. Giúp màn hình hoạt động mượt mà và ổn định, không gặp phải tình trạng giật lag.

Đặc biệt, đây cũng là phiên bản được tích hợp nhiều công nghệ trong một sản phẩm. Từ điều khiển bằng giọng nói, công nghệ điều chỉnh âm thanh equalizer,…
### Ra lệnh bằng giọng nói với Trợ lý KIKI.
Với chức năng nghe hiểu giọng nói cả 3 miền Bắc – Trung – Nam. Trợ lý tiếng Việt Kiki mang đến trải nghiệm lái xe an toàn và tiện lợi nhất cho người dùng xe hơi.

Bạn có thể thực hiện những thao tác tìm đường, giải trí, đọc tin tức,… Tất cả được thực hiện thông qua giọng nói dễ dàng, nhanh chóng. Nhờ đó thao tác tay và mắt hoàn toàn không bị mất tập trung hay phân tâm trong quá trình xe lăn bánh.
### Tính năng cảnh báo giới hạn tốc độ và hiển thị mật độ giao thông.
Cập nhật giới hạn và cảnh báo tốc độ trên ứng dụng Vietmap với màn hình android. Giúp chủ xế nhanh chóng nắm rõ tốc độ giới hạn trên cung đường mình di chuyển. Từ đó có sự điều chỉnh hợp lý, tránh bị thổi còi vi phạm.

Thêm vào đó, tính năng hiển thị mật độ giao thông nơi xe lưu thông cũng được tích hợp trên Zestech. Giúp xử lý được những tình huống giao thông khẩn cấp một cách dễ dàng và chọn lộ trình tốt nhất.
### Tính năng thông báo phạt nguội qua tin nhắn và cuộc gọi.
Zestech là giải pháp tuyệt vời giúp bạn an tâm lái xe. Không còn lo dính phạt nguội khi cảnh báo trước 300m ở cung đường có gắn camera phạt nguội.

Đặc biệt, bạn có thể check phạt nguội nhanh chóng chỉ với 1 câu lệnh “Phạt nguội + Biển số xe”. Hệ thống Zestech còn chủ động trực tiếp nhắn tin và gọi điện thông báo. Giúp bạn có thể xử lý vi phạm nhanh chóng và nắm được lỗi cũng như cung đường mà mình đã vi phạm.
### Kho giải trí bất tận nâng cao trải nghiệm, thư giãn.
Nhờ tích hợp sim 4G cho phép kết nối internet dễ dàng. Màn hình Zestech đáp ứng mọi nhu cầu giải trí cho chủ xế từ xem phim, nghe nhạc, đọc tin tức, tải ứng dụng dễ dàng từ CHPlay,…

Đặc biệt, màn hình còn được trang bị âm thanh DSP 16 kênh với 32 giải tần. Và có thể tùy chỉnh theo từng thể loại nhạc, mang đến trải nghiệm âm thanh sống động nhất.
### Bản đồ chỉ đường thông minh nhất hiện nay.
Sở hữu cả 3 ứng dụng chỉ dẫn đường hiện đại nhất hiện nay. Như VIETMAP, GOOGLE MAPS VÀ NAVITEL. Thông qua điều khiển bằng giọng nói, chủ xế có thể nhanh chóng tìm địa chỉ mình mong muốn một cách chính xác. Nhờ đó tiết kiệm thời gian và tăng sự an toàn.

Đặc biệt, không cần kết nối internet như Google Map. Vì 2 phần mềm bản đồ Vietmap và Navitel cho phép người dùng sử dụng bản đồ chỉ đường ngay cả khi không có mạng.
### Chia đôi màn hình, chạy song song ứng dụng cùng lúc.
Điều thú vị với các tài xế là màn hình Zestech có thể chạy đa nhiệm ứng dụng. Đặc biệt là không tình trạng không nóng máy, không giật, lag.

Bạn vừa có thể xem bản đồ dẫn đường. Vừa mở các ứng dụng giải trí khác cho trẻ nhỏ hoặc người ngồi bên cạnh.
### Kết nối nhanh chóng với các thiết bị ngoại vi.
Màn hình ô tô Zestech có khả năng kết nối và hiển thị các thiết bị ngoại vi. Như camera 360, camera hành trình, cảm biến áp suất lốp,… Với tính năng này, bạn hoàn toàn có thể trang bị thêm các thiết bị giúp hỗ trợ quan sát, lái xe an toàn.
### Quản lý định vị xe từ xa.
Với ứng dụng “Zestech Tracking”, giúp bạn theo dõi chính xác được vị trí hiện tại của xe ngay trên điện thoại. Đặc biệt, với bộ nhớ lưu trữ dữ liệu khủng. Bạn hoàn toàn có thể xem lại hành trình di chuyển, tốc độ, các vị trí dừng đỗ của xe trong vòng 365 ngày.
### Âm thanh siêu việt.
Phiên bản đỉnh cao âm thanh dành cho ô tô khi mang tới trải nghiệm vượt trội. Đáp ứng được tất cả nhu cầu giải trí, thưởng thức những bản nhạc đỉnh cao. Với chất âm hoàn hảo vượt xa so với nguyên bản. Giúp bạn có thể cảm nhận các bản nhạc, bộ phim với mọi cung bậc cảm xúc ngay trên xế yêu.

Hơn thế nữa, sản phẩm được tích hợp vô vàn tính năng cao cấp, hỗ trợ lái xe an toàn như điều khiển bằng giọng nói, định vị xe từ xa, bản đồ, kết nối camera hành trình,….
### Mang đến tính Cá nhân hóa – Tự động hóa.
Với 72 sắc màu thời thượng trên màn hình, cho bạn tự do thay đổi theo sở thích và cả phong thủy ô tô. Cùng 3 Giao diện mới màn hình Zestech (Cơ bản, Công viên, Công nghệ). Bên cạnh đó bạn hoàn toàn có thể thay đổi mẫu xe chạy trên màn hình với 25 chủng loại xe khác nhau, biển số và cả màu sắc xe theo sở thích.

Đặc biệt, tích hợp giao diện tự động hóa theo thời gian: Bình minh, Ban ngày, Ban đêm. Tạo nên điểm nhấn không sản phẩm nào có được.
    
    `,
                quantity: 10,
                price: 14900000,
                currency: "VND",
                categoryId: 1,
                imageUrl: "https://autohungdung.com/wp-content/uploads/2023/01/33502699.jpg",
                createdAt: new Date(),
                updatedAt: new Date()

            },
            {
                name: "Màn Hình Zestech ZX10 Bản Cao Cấp | DVD Android Ô Tô",
                path: "Màn-hình-Zestech-ZX10-bản-cao-cấp-DVD-android-ô-tô",
                detail:
                    `
## Ưu điểm vượt trội Màn Hình DVD Android Ô Tô Zestech ZX10 Bản Cao Cấp.
### Công nghệ ưu việt.
Với sự nâng cấp ấn tượng so với phiên bản tiền nhiệm trước đó. ZX10 bản cao cấp sở hữu cấu hình 3GB Ram + 32GB Rom, hệ điều hành android 10.0. Giúp màn hình hoạt động mượt mà và ổn định, không gặp phải tình trạng giật lag.

Đặc biệt, đây cũng là phiên bản được tích hợp nhiều công nghệ trong một sản phẩm. Từ điều khiển bằng giọng nói, công nghệ điều chỉnh âm thanh equalizer,…
### Ra lệnh bằng giọng nói với Trợ lý KIKI.
Với chức năng nghe hiểu giọng nói cả 3 miền Bắc – Trung – Nam. Trợ lý tiếng Việt Kiki mang đến trải nghiệm lái xe an toàn và tiện lợi nhất cho người dùng xe hơi.

Bạn có thể thực hiện những thao tác tìm đường, giải trí, đọc tin tức,… Tất cả được thực hiện thông qua giọng nói dễ dàng, nhanh chóng. Nhờ đó thao tác tay và mắt hoàn toàn không bị mất tập trung hay phân tâm trong quá trình xe lăn bánh.
### Tính năng cảnh báo giới hạn tốc độ và hiển thị mật độ giao thông.
Cập nhật giới hạn và cảnh báo tốc độ trên ứng dụng Vietmap với màn hình android. Giúp chủ xế nhanh chóng nắm rõ tốc độ giới hạn trên cung đường mình di chuyển. Từ đó có sự điều chỉnh hợp lý, tránh bị thổi còi vi phạm.

Thêm vào đó, tính năng hiển thị mật độ giao thông nơi xe lưu thông cũng được tích hợp trên Zestech. Giúp xử lý được những tình huống giao thông khẩn cấp một cách dễ dàng và chọn lộ trình tốt nhất.
### Tính năng thông báo phạt nguội qua tin nhắn và cuộc gọi.
Zestech là giải pháp tuyệt vời giúp bạn an tâm lái xe. Không còn lo dính phạt nguội khi cảnh báo trước 300m ở cung đường có gắn camera phạt nguội.

Đặc biệt, bạn có thể check phạt nguội nhanh chóng chỉ với 1 câu lệnh “Phạt nguội + Biển số xe”. Hệ thống Zestech còn chủ động trực tiếp nhắn tin và gọi điện thông báo. Giúp bạn có thể xử lý vi phạm nhanh chóng và nắm được lỗi cũng như cung đường mà mình đã vi phạm.
### Kho giải trí bất tận nâng cao trải nghiệm, thư giãn.
Nhờ tích hợp sim 4G cho phép kết nối internet dễ dàng. Màn hình Zestech đáp ứng mọi nhu cầu giải trí cho chủ xế từ xem phim, nghe nhạc, đọc tin tức, tải ứng dụng dễ dàng từ CHPlay,…

Đặc biệt, màn hình còn được trang bị âm thanh DSP 16 kênh với 32 giải tần. Và có thể tùy chỉnh theo từng thể loại nhạc, mang đến trải nghiệm âm thanh sống động nhất.
### Bản đồ chỉ đường thông minh nhất hiện nay.
Sở hữu cả 3 ứng dụng chỉ dẫn đường hiện đại nhất hiện nay. Như VIETMAP, GOOGLE MAPS VÀ NAVITEL. Thông qua điều khiển bằng giọng nói, chủ xế có thể nhanh chóng tìm địa chỉ mình mong muốn một cách chính xác. Nhờ đó tiết kiệm thời gian và tăng sự an toàn.

Đặc biệt, không cần kết nối internet như Google Map. Vì 2 phần mềm bản đồ Vietmap và Navitel cho phép người dùng sử dụng bản đồ chỉ đường ngay cả khi không có mạng.
### Chia đôi màn hình, chạy song song ứng dụng cùng lúc.
Điều thú vị với các tài xế là màn hình Zestech có thể chạy đa nhiệm ứng dụng. Đặc biệt là không tình trạng không nóng máy, không giật, lag.

Bạn vừa có thể xem bản đồ dẫn đường. Vừa mở các ứng dụng giải trí khác cho trẻ nhỏ hoặc người ngồi bên cạnh.
### Kết nối nhanh chóng với các thiết bị ngoại vi.
Màn hình ô tô Zestech có khả năng kết nối và hiển thị các thiết bị ngoại vi. Như camera 360, camera hành trình, cảm biến áp suất lốp,… Với tính năng này, bạn hoàn toàn có thể trang bị thêm các thiết bị giúp hỗ trợ quan sát, lái xe an toàn.
### Quản lý định vị xe từ xa.
Với ứng dụng “Zestech Tracking”, giúp bạn theo dõi chính xác được vị trí hiện tại của xe ngay trên điện thoại. Đặc biệt, với bộ nhớ lưu trữ dữ liệu khủng. Bạn hoàn toàn có thể xem lại hành trình di chuyển, tốc độ, các vị trí dừng đỗ của xe trong vòng 365 ngày.
### Âm thanh siêu việt.
Phiên bản đỉnh cao âm thanh dành cho ô tô khi mang tới trải nghiệm vượt trội. Đáp ứng được tất cả nhu cầu giải trí, thưởng thức những bản nhạc đỉnh cao. Với chất âm hoàn hảo vượt xa so với nguyên bản. Giúp bạn có thể cảm nhận các bản nhạc, bộ phim với mọi cung bậc cảm xúc ngay trên xế yêu.

Hơn thế nữa, sản phẩm được tích hợp vô vàn tính năng cao cấp, hỗ trợ lái xe an toàn như điều khiển bằng giọng nói, định vị xe từ xa, bản đồ, kết nối camera hành trình,….
### Mang đến tính Cá nhân hóa – Tự động hóa.
Với 72 sắc màu thời thượng trên màn hình, cho bạn tự do thay đổi theo sở thích và cả phong thủy ô tô. Cùng 3 Giao diện mới màn hình Zestech (Cơ bản, Công viên, Công nghệ). Bên cạnh đó bạn hoàn toàn có thể thay đổi mẫu xe chạy trên màn hình với 25 chủng loại xe khác nhau, biển số và cả màu sắc xe theo sở thích.

Đặc biệt, tích hợp giao diện tự động hóa theo thời gian: Bình minh, Ban ngày, Ban đêm. Tạo nên điểm nhấn không sản phẩm nào có được.
    
    `,
                quantity: 15,
                price: 11900000,
                currency: "VND",
                categoryId: 1,
                imageUrl: "https://autohungdung.com/wp-content/uploads/2023/01/33502699.jpg",
                createdAt: new Date(),
                updatedAt: new Date()

            },
            {
                name: "Màn Hình Zestech ZX10 Bản Tiêu Chuẩn | DVD Android Ô Tô",
                path: "Màn-hình-Zestech-ZX10-bản-tiêu-chuẩn-DVD-android-ô-tô",
                detail:
                    `
## Ưu điểm vượt trội Màn Hình DVD Android Ô Tô Zestech ZX10 Bản Tiêu Chuẩn.
### Công nghệ ưu việt.
Với sự nâng cấp ấn tượng so với phiên bản tiền nhiệm trước đó. ZX10 bản cao cấp sở hữu cấu hình 3GB Ram + 32GB Rom, hệ điều hành android 10.0. Giúp màn hình hoạt động mượt mà và ổn định, không gặp phải tình trạng giật lag.

Đặc biệt, đây cũng là phiên bản được tích hợp nhiều công nghệ trong một sản phẩm. Từ điều khiển bằng giọng nói, công nghệ điều chỉnh âm thanh equalizer,…
### Ra lệnh bằng giọng nói với Trợ lý KIKI.
Với chức năng nghe hiểu giọng nói cả 3 miền Bắc – Trung – Nam. Trợ lý tiếng Việt Kiki mang đến trải nghiệm lái xe an toàn và tiện lợi nhất cho người dùng xe hơi.

Bạn có thể thực hiện những thao tác tìm đường, giải trí, đọc tin tức,… Tất cả được thực hiện thông qua giọng nói dễ dàng, nhanh chóng. Nhờ đó thao tác tay và mắt hoàn toàn không bị mất tập trung hay phân tâm trong quá trình xe lăn bánh.
### Tính năng cảnh báo giới hạn tốc độ và hiển thị mật độ giao thông.
Cập nhật giới hạn và cảnh báo tốc độ trên ứng dụng Vietmap với màn hình android. Giúp chủ xế nhanh chóng nắm rõ tốc độ giới hạn trên cung đường mình di chuyển. Từ đó có sự điều chỉnh hợp lý, tránh bị thổi còi vi phạm.

Thêm vào đó, tính năng hiển thị mật độ giao thông nơi xe lưu thông cũng được tích hợp trên Zestech. Giúp xử lý được những tình huống giao thông khẩn cấp một cách dễ dàng và chọn lộ trình tốt nhất.
### Tính năng thông báo phạt nguội qua tin nhắn và cuộc gọi.
Zestech là giải pháp tuyệt vời giúp bạn an tâm lái xe. Không còn lo dính phạt nguội khi cảnh báo trước 300m ở cung đường có gắn camera phạt nguội.

Đặc biệt, bạn có thể check phạt nguội nhanh chóng chỉ với 1 câu lệnh “Phạt nguội + Biển số xe”. Hệ thống Zestech còn chủ động trực tiếp nhắn tin và gọi điện thông báo. Giúp bạn có thể xử lý vi phạm nhanh chóng và nắm được lỗi cũng như cung đường mà mình đã vi phạm.
### Kho giải trí bất tận nâng cao trải nghiệm, thư giãn.
Nhờ tích hợp sim 4G cho phép kết nối internet dễ dàng. Màn hình Zestech đáp ứng mọi nhu cầu giải trí cho chủ xế từ xem phim, nghe nhạc, đọc tin tức, tải ứng dụng dễ dàng từ CHPlay,…

Đặc biệt, màn hình còn được trang bị âm thanh DSP 16 kênh với 32 giải tần. Và có thể tùy chỉnh theo từng thể loại nhạc, mang đến trải nghiệm âm thanh sống động nhất.
### Bản đồ chỉ đường thông minh nhất hiện nay.
Sở hữu cả 3 ứng dụng chỉ dẫn đường hiện đại nhất hiện nay. Như VIETMAP, GOOGLE MAPS VÀ NAVITEL. Thông qua điều khiển bằng giọng nói, chủ xế có thể nhanh chóng tìm địa chỉ mình mong muốn một cách chính xác. Nhờ đó tiết kiệm thời gian và tăng sự an toàn.

Đặc biệt, không cần kết nối internet như Google Map. Vì 2 phần mềm bản đồ Vietmap và Navitel cho phép người dùng sử dụng bản đồ chỉ đường ngay cả khi không có mạng.
### Chia đôi màn hình, chạy song song ứng dụng cùng lúc.
Điều thú vị với các tài xế là màn hình Zestech có thể chạy đa nhiệm ứng dụng. Đặc biệt là không tình trạng không nóng máy, không giật, lag.

Bạn vừa có thể xem bản đồ dẫn đường. Vừa mở các ứng dụng giải trí khác cho trẻ nhỏ hoặc người ngồi bên cạnh.
### Kết nối nhanh chóng với các thiết bị ngoại vi.
Màn hình ô tô Zestech có khả năng kết nối và hiển thị các thiết bị ngoại vi. Như camera 360, camera hành trình, cảm biến áp suất lốp,… Với tính năng này, bạn hoàn toàn có thể trang bị thêm các thiết bị giúp hỗ trợ quan sát, lái xe an toàn.
### Quản lý định vị xe từ xa.
Với ứng dụng “Zestech Tracking”, giúp bạn theo dõi chính xác được vị trí hiện tại của xe ngay trên điện thoại. Đặc biệt, với bộ nhớ lưu trữ dữ liệu khủng. Bạn hoàn toàn có thể xem lại hành trình di chuyển, tốc độ, các vị trí dừng đỗ của xe trong vòng 365 ngày.
### Âm thanh siêu việt.
Phiên bản đỉnh cao âm thanh dành cho ô tô khi mang tới trải nghiệm vượt trội. Đáp ứng được tất cả nhu cầu giải trí, thưởng thức những bản nhạc đỉnh cao. Với chất âm hoàn hảo vượt xa so với nguyên bản. Giúp bạn có thể cảm nhận các bản nhạc, bộ phim với mọi cung bậc cảm xúc ngay trên xế yêu.

Hơn thế nữa, sản phẩm được tích hợp vô vàn tính năng cao cấp, hỗ trợ lái xe an toàn như điều khiển bằng giọng nói, định vị xe từ xa, bản đồ, kết nối camera hành trình,….
### Mang đến tính Cá nhân hóa – Tự động hóa.
Với 72 sắc màu thời thượng trên màn hình, cho bạn tự do thay đổi theo sở thích và cả phong thủy ô tô. Cùng 3 Giao diện mới màn hình Zestech (Cơ bản, Công viên, Công nghệ). Bên cạnh đó bạn hoàn toàn có thể thay đổi mẫu xe chạy trên màn hình với 25 chủng loại xe khác nhau, biển số và cả màu sắc xe theo sở thích.

Đặc biệt, tích hợp giao diện tự động hóa theo thời gian: Bình minh, Ban ngày, Ban đêm. Tạo nên điểm nhấn không sản phẩm nào có được.
    
    `,
                quantity: 15,
                price: 8900000,
                currency: "VND",
                categoryId: 1,
                imageUrl: "https://autohungdung.com/wp-content/uploads/2023/01/33502699.jpg",
                createdAt: new Date(),
                updatedAt: new Date()

            },
            {
                name: "Màn Hình Zestech ZT360G | DVD Android Ô Tô Thông Minh",
                path: "Màn-hình-Zestech-ZT360G-DVD-android-ô-tô-thông-minh",
                detail:
                    `
## Ưu điểm vượt trội Màn Hình Zestech ZT360G
### Ra lệnh bằng giọng nói với Trợ lý KIKI.
Với chức năng nghe hiểu giọng nói cả 3 miền Bắc – Trung – Nam. Trợ lý tiếng Việt Kiki mang đến trải nghiệm lái xe an toàn và tiện lợi nhất cho người dùng xe hơi.

Bạn có thể thực hiện những thao tác tìm đường, giải trí, đọc tin tức,… Tất cả được thực hiện thông qua giọng nói dễ dàng, nhanh chóng. Nhờ đó thao tác tay và mắt hoàn toàn không bị mất tập trung hay phân tâm trong quá trình xe lăn bánh.
### Tính năng cảnh báo giới hạn tốc độ và hiển thị mật độ giao thông.
Cập nhật giới hạn và cảnh báo tốc độ trên ứng dụng Vietmap với màn hình android. Giúp chủ xế nhanh chóng nắm rõ tốc độ giới hạn trên cung đường mình di chuyển. Từ đó có sự điều chỉnh hợp lý, tránh bị thổi còi vi phạm.

Thêm vào đó, tính năng hiển thị mật độ giao thông nơi xe lưu thông cũng được tích hợp trên Zestech. Giúp xử lý được những tình huống giao thông khẩn cấp một cách dễ dàng và chọn lộ trình tốt nhất.
### Tính năng thông báo phạt nguội qua tin nhắn và cuộc gọi.
Zestech là giải pháp tuyệt vời giúp bạn an tâm lái xe. Không còn lo dính phạt nguội khi cảnh báo trước 300m ở cung đường có gắn camera phạt nguội.

Đặc biệt, bạn có thể check phạt nguội nhanh chóng chỉ với 1 câu lệnh “Phạt nguội + Biển số xe”. Hệ thống Zestech còn chủ động trực tiếp nhắn tin và gọi điện thông báo. Giúp bạn có thể xử lý vi phạm nhanh chóng và nắm được lỗi cũng như cung đường mà mình đã vi phạm.
### Kho giải trí bất tận nâng cao trải nghiệm, thư giãn.
Nhờ tích hợp sim 4G cho phép kết nối internet dễ dàng. Màn hình Zestech đáp ứng mọi nhu cầu giải trí cho chủ xế từ xem phim, nghe nhạc, đọc tin tức, tải ứng dụng dễ dàng từ CHPlay,…

Đặc biệt, màn hình còn được trang bị âm thanh DSP 16 kênh với 32 giải tần. Và có thể tùy chỉnh theo từng thể loại nhạc, mang đến trải nghiệm âm thanh sống động nhất.
### Bản đồ chỉ đường thông minh nhất hiện nay.
Sở hữu cả 3 ứng dụng chỉ dẫn đường hiện đại nhất hiện nay. Như VIETMAP, GOOGLE MAPS VÀ NAVITEL. Thông qua điều khiển bằng giọng nói, chủ xế có thể nhanh chóng tìm địa chỉ mình mong muốn một cách chính xác. Nhờ đó tiết kiệm thời gian và tăng sự an toàn.

Đặc biệt, không cần kết nối internet như Google Map. Vì 2 phần mềm bản đồ Vietmap và Navitel cho phép người dùng sử dụng bản đồ chỉ đường ngay cả khi không có mạng.
### Chia đôi màn hình, chạy song song ứng dụng cùng lúc.
Điều thú vị với các tài xế là màn hình Zestech có thể chạy đa nhiệm ứng dụng. Đặc biệt là không tình trạng không nóng máy, không giật, lag.

Bạn vừa có thể xem bản đồ dẫn đường. Vừa mở các ứng dụng giải trí khác cho trẻ nhỏ hoặc người ngồi bên cạnh.
### Kết nối nhanh chóng với các thiết bị ngoại vi.
Màn hình ô tô Zestech có khả năng kết nối và hiển thị các thiết bị ngoại vi. Như camera 360, camera hành trình, cảm biến áp suất lốp,… Với tính năng này, bạn hoàn toàn có thể trang bị thêm các thiết bị giúp hỗ trợ quan sát, lái xe an toàn.
### Quản lý định vị xe từ xa.
Với ứng dụng “Zestech Tracking”, giúp bạn theo dõi chính xác được vị trí hiện tại của xe ngay trên điện thoại. Đặc biệt, với bộ nhớ lưu trữ dữ liệu khủng. Bạn hoàn toàn có thể xem lại hành trình di chuyển, tốc độ, các vị trí dừng đỗ của xe trong vòng 365 ngày.
### Âm thanh siêu việt.
Phiên bản đỉnh cao âm thanh dành cho ô tô khi mang tới trải nghiệm vượt trội. Đáp ứng được tất cả nhu cầu giải trí, thưởng thức những bản nhạc đỉnh cao. Với chất âm hoàn hảo vượt xa so với nguyên bản. Giúp bạn có thể cảm nhận các bản nhạc, bộ phim với mọi cung bậc cảm xúc ngay trên xế yêu.

Hơn thế nữa, sản phẩm được tích hợp vô vàn tính năng cao cấp, hỗ trợ lái xe an toàn như điều khiển bằng giọng nói, định vị xe từ xa, bản đồ, kết nối camera hành trình,….
### Mang đến tính Cá nhân hóa – Tự động hóa.
Với 72 sắc màu thời thượng trên màn hình, cho bạn tự do thay đổi theo sở thích và cả phong thủy ô tô. Cùng 3 Giao diện mới màn hình Zestech (Cơ bản, Công viên, Công nghệ). Bên cạnh đó bạn hoàn toàn có thể thay đổi mẫu xe chạy trên màn hình với 25 chủng loại xe khác nhau, biển số và cả màu sắc xe theo sở thích.

Đặc biệt, tích hợp giao diện tự động hóa theo thời gian: Bình minh, Ban ngày, Ban đêm. Tạo nên điểm nhấn không sản phẩm nào có được.
    
    `,
                quantity: 15,
                price: 11900000,
                currency: "VND",
                categoryId: 1,
                imageUrl: "https://autohungdung.com/wp-content/uploads/2023/01/33502699.jpg",
                createdAt: new Date(),
                updatedAt: new Date()

            },
            {
                name: "Android Box Zestech DX14 Pro | Android Box Ô Tô Thông Minh",
                path: "Android-box-Zestech-DX14-Pro-android-box-ô-tô-thông-minh",
                detail:
                    `
DX14 Pro là sản phẩm Android Box được Zestech trang bị với cấu hình mạnh mẽ nhất hiện nay ở phân khúc cao cấp. Thiết bị ưu tiên xử lý các tác vụ nặng mà không gây chậm trễ, gián đoạn.
### Điều khiển mọi tác vụ với trợ lý thông minh Kiki
Điều khiển các ứng dụng trên màn hình ô tô bằng giọng nói là tính năng mà màn hình zin chưa được tích hợp hoặc nếu có cũng không nhạy bén, không thuần Việt và khó sử dụng, đáp ứng câu lệnh của người dùng. Trang bị Android Box DX14 Pro cho xế yêu, bạn có thể dễ dàng điều khiển mọi tác vụ trên xe với trợ lý Kiki nghe và hiểu giọng nói cả 3 miền Bắc Trung Nam. Nhờ đó, nhanh chóng nhận lệnh và thực hiện mọi thao tác nhanh chóng và chuẩn xác nhất.
### Hỗ trợ 3 bản đồ dẫn đường tốt nhất hiện nay
Khi lắp đặt Android Box DX14 Pro cho xe, chủ xe sẽ được trải nghiệm 3 bản đồ dẫn đường tốt nhất hiện nay là Vietmap, Google Maps, Navitel. Đặc biệt Zestech tặng kèm phần mềm dẫn đường Vietmap S1 trọn đời, giúp chủ xế tự tin di chuyển trên mọi cung đường. Đặc biệt, các bản đồ có sở hữu những chức năng đặc biệt, hỗ trợ lái xe an toàn như :

- Cảnh báo giới hạn tốc độ: Giúp hạn chế việc chủ xe chạy quá tốc độ, đảm bảo an toàn, không vi phạm luật giao thông

- Cảnh báo biển báo giao thông: Hệ thống sẽ đọc các biển báo trên hành trình di chuyển như ra hoặc vào khu dân cư,.. giúp bạn điều chỉnh tốc độ lái xe phù hợp.

- Hiển thị mật độ giao thông theo thời gian thức: Giúp bạn chủ động, lựa chọn những cung đường di chuyển phù hợp, ít tắc đường hơn.

- Cảnh báo camera phạt nguội: Giúp ích cho những tài xe đi vào các đoạn đường mới, có camera phạt nguội.

Đặc biệt 2 bản độ dẫn đường là VietMap và Navitel sử dụng không cần Internet, dẫn đường chính xác tới địa điểm bạn mong muốn mà không lo bị gián đoạn khi không có sóng hoặc hết dung lượng mạng.
### Giải trí đa phương tiện mọi lúc mọi nơi
Khác với màn hình zin theo xe, nghèo nàn các ứng dụng giải trí, với Android Box DX14 Pro, bạn sẽ được thoải mái tận hưởng mọi ứng dụng giải trí mà mình mong muốn thông qua kho ứng dụng khổng lồ CH Play. Từ Youtube, MP3, Facebook, VTVGo, Xem phim trực tuyến,….Giờ đây, hành trình di chuyển sẽ trở nên thú vị hơn bao giờ hết.
### Hỗ trợ định vị – Quản lý xe tốt nhất
Trang bị lắp đặt Android Box DX14 Pro, bạn sẽ an tâm quản lý xe của mình tốt nhất mà không phải lắp đặt thêm bất kỳ thiết bị định vị nào. Bởi đơn giản, bạn chỉ cần tải ứng dụng Zestech Tracking trên điện thoại để giám sát xế yêu mọi lúc mọi nơi, yên tâm trong các trường hợp cho bạn bè mượn xe hay gửi xe ở bãi đỗ lạ.
### Thay đổi giao diện theo phong thủy cá nhân
Màn hình Zin với giao diện nhàm chán đã là chuyện xưa cũ khi nay chỉ với một thiết bị nhỏ gọn là DX14 Pro khách hàng có thể đổi màu sắc giao diện màn hình theo 72 màu sắc yêu thích. Thậm chí, bạn còn có thể thay đổi kiểu dáng của các loại xe khác lên màn hình, biển số xe theo sở thích, phong thủy.
### Quy trình lắp đặt Android Box Zestech DX14 Pro
Lắp đặt dễ dàng với thao tác cắm cổng USB vào màn hình xe. Chỉ sau 30 giây, Android Box DX14 Pro sẽ tự động kết nối với màn hình, không đấu nối, cắt trích, ảnh hưởng đến nguyên bản xe.

Sau đó hệ thống sẽ tự động điều chỉnh lại cùng với kích cỡ màn hình và tiến hành đồng bộ, kiểm tra các kết nối của thiết bị ngoại vi.

Tùy vào dòng xe, kỹ thuật viên sẽ cài đặt trợ lý Kiki tích hợp trên nút vô lăng.

Cuối cùng tiến hành kích hoạt bảo hành, hướng dẫn khách sử dùng.
    
    `,
                quantity: 15,
                price: 11500000,
                currency: "VND",
                categoryId: 1,
                imageUrl: "https://autohungdung.com/wp-content/uploads/2023/01/33502699.jpg",
                createdAt: new Date(),
                updatedAt: new Date()

            },
            {
                name: "Android Box Zestech DX165 | Android Box Ô Tô Thông Minh",
                path: "Android-box-Zestech-DX165-android-box-ô-tô-thông-minh",
                detail:
                    `
## Thông số kỹ thuật Zestech Android Box DX165.
- Năm sản xuất: 2023
- Cấu hình RAM+ROM: RAM 3GB+ROM 32GB
- Chip: Qualcomm QCS2290
- Hệ điều hành: Android 11
- Bộ xử lý: ARM Cortex A53
- Kết nối: Bluetooth, Wifi, Sim 4G
- Chất lượng video: 1080P 30fps
## Tính năng của Android Box DX165
Trang bị một thiết bị nhỏ gọn, thông minh như Android Box DX165, chủ xe không chỉ tiết kiệm được chi phí thay màn mà còn được trải nghiệm vô vàn tính năng nổi bật như màn hình android ô tô thông minh, hiện đại trên thị trường.
### Sở hữu kho giải trí khổng lồ
Android Box DX165 giúp đáp ứng nhu cầu giải trí mọi lúc mọi nơi cho chủ xe nhờ hỗ trợ kết nối internet thông qua khe cắm sim 4G trực tiếp trên thiết bị. Bạn có thể thoải mái nghe những bản nhạc mình yêu thích, xem những bộ phim hay hoặc đắm mình trong những trận cầu đỉnh cao ngay trên xế cưng, mang lại những giây phút thư giãn thoải mái sau những hành trình dài.
### Điều khiển giọng nói mở mọi tác vụ nhanh chóng
Với màn hình zin nguyên bản, việc tương tác giữa chủ xế và xe sẽ gặp không ít khó khăn do thiếu chức năng điều khiển giọng nói hoặc có nhưng chưa thật sự thân thiện và nhạy bén với yêu cầu của người dùng. Giờ đây, lựa chọn android box DX165, bạn có thể mở các ứng dụng trên màn hình ô tô nhanh chóng thông qua điều khiển giọng nói thông minh với sự hỗ trợ của trợ lý Kiki, có khả năng nghe hiểu giọng nói 3 miền sẽ đáp ứng câu lệnh của bạn một cách nhanh nhất. Việc tích hợp tính năng này không chỉ giúp chủ xe điều khiển màn hình dễ dàng mà còn đảm bảo an toàn khi lái xe, đặc biệt khi lái xe đường dài hay di chuyển trong nội đô đông đúc, yêu cầu tài xế luôn phải tập trung nhìn đường.
### Hỗ trợ chỉ đường với 3 bản đồ thông minh
Không còn phải xem chỉ đường thông qua điện thoại khiến bạn mất tập trung khi lái xe, kết nối Android Box DX165o bạn sẽ được trải nghiệm đến 3 loại bản đồ chỉ dẫn thông minh bao gồm: VietMap, Google Maps, Navitel. Trong đó, Vietmap là phần mềm được Zestech mua bản quyền trọn đời, đặc biệt không cần kết nối internet vẫn có thể sử dụng dễ dàng.
### Chủ động cảnh báo an toàn khi lái xe
An toàn luôn là tiêu chí hàng đầu của người dùng khi di chuyển, đặc biệt là các cung đường đô thị, đông đúc người qua lại. Nắm bắt được nhu cầu đó, android box Zestech được tích hợp thêm tính năng cảnh báo giới hạn tốc độ, lấn làn, va chạm, hiển thị mật độ giao thông. Nhờ đó, chủ xế sẽ có thể chủ động xử lý mọi tình huống khi tham gia giao thông hoặc lựa chọn cung đường phù hợp, đảm bảo đúng lộ trình di chuyển.
### Quản lý định vị xe từ xa
Thông qua app Zestech Tracking trên điện thoại, bạn sẽ biết chính xác vị trí xe của mình một cách nhanh chóng, chính xác. Tính năng này cực kỳ hữu dụng khi cho người khác mượn xe hay gửi xe chỗ lạ.
### Kiểm tra phạt nguội của xe
Phạt nguội là vấn đề nóng hiện nay, đặc biệt khi nhiều người còn lợi dụng việc này để thực hiện các hành vi lừa đảo. Vậy nên chủ xe cần phải chủ động nắm bắt thông tin phạt nguội của xe để tránh rơi vào bẫy của kẻ xấu. Với android box DX165, bạn có thể kiểm tra vi phạm giao thông nhanh chóng, chính xác và chủ động trong việc nộp phạt.
    
    `,
                quantity: 15,
                price: 5500000,
                currency: "VND",
                categoryId: 1,
                imageUrl: "https://autohungdung.com/wp-content/uploads/2023/01/33502699.jpg",
                createdAt: new Date(),
                updatedAt: new Date()

            },
            {
                name: "Màn Hình Zestech S100J | DVD Android Ô Tô Zestech",
                path: "Màn-hình-Zestech-S100J-DVD-android-ô-tô-Zestech",
                detail:
                    `
## Ưu điểm vượt trội Màn Hình Zestech S100J
### Ra lệnh bằng giọng nói với Trợ lý KIKI.
Với chức năng nghe hiểu giọng nói cả ê miền Bắc – Trung – Nam. Trợ lý tiếng Việt Kiki mang đến trải nghiệm lái xe an toàn và tiện lợi nhất cho người dùng xe hơi.

Bạn có thể thực hiện những thao tác tìm đường, giải trí, đọc tin tức,… thông qua giọng nói dễ dàng, nhanh chóng. Nhờ đó thao tác tay và mắt hoàn toàn không bị mất tập trung hay phân tâm trong quá trình xe lăn bánh.
### Âm Thanh Siêu Việt.
Màn Hình Zestech S100J phiên bản đỉnh cao âm thanh dành cho ô tô khi mang tới trải nghiệm vượt trội. Đáp ứng được tất cả nhu cầu giải trí, thưởng thức những bản nhạc đỉnh cao. Với chất âm hoàn hảo vượt xa so với nguyên bản. Giúp bạn có thể cảm nhận các bản nhạc, bộ phim với mọi cung bậc cảm xúc ngay trên xế yêu.

Hơn thế nữa, sản phẩm được tích hợp vô vàn tính năng cao cấp, hỗ trợ lái xe an toàn như điều khiển bằng giọng nói, định vị xe từ xa, bản đồ, kết nối camera hành trình,….
### Tính năng cảnh báo giới hạn tốc độ và hiển thị mật độ giao thông.
Cập nhật giới hạn và cảnh báo tốc độ trên ứng dụng Vietmap với màn hình android. Giúp chủ xế nhanh chóng nắm rõ tốc độ giới hạn trên cung đường mình di chuyển. Từ đó có sự điều chỉnh hợp lý, tránh bị thổi còi vi phạm.

Thêm vào đó, tính năng hiển thị mật độ giao thông nơi xe lưu thông cũng được tích hợp trên Zestech. Giúp xử lý được những tình huống giao thông khẩn cấp một cách dễ dàng và chọn lộ trình tốt nhất.
### Tính năng thông báo phạt nguội qua tin nhắn và cuộc gọi.
Zestech là giải pháp tuyệt vời giúp bạn an tâm lái xe. Không còn lo dính phạt nguội khi cảnh báo trước 300m ở cung đường có gắn camera phạt nguội.

Đặc biệt, bạn có thể check phạt nguội nhanh chóng chỉ với 1 câu lệnh “Phạt nguội + Biển số xe”. Hệ thống Zestech còn chủ động trực tiếp nhắn tin và gọi điện thông báo. Giúp bạn có thể xử lý vi phạm nhanh chóng và nắm được lỗi cũng như cung đường mà mình đã vi phạm.
### Quản lý định vị xe từ xa
Thông qua app Zestech Tracking trên điện thoại, bạn sẽ biết chính xác vị trí xe của mình một cách nhanh chóng, chính xác. Tính năng này cực kỳ hữu dụng khi cho người khác mượn xe hay gửi xe chỗ lạ.
### Mang đến tính Cá nhân hóa – Tự động hóa.
Với 72 sắc màu thời thượng trên màn hình, cho bạn tự do thay đổi theo sở thích và cả phong thủy ô tô. Cùng 3 Giao diện mới màn hình Zestech (Cơ bản, Công viên, Công nghệ). Bên cạnh đó bạn hoàn toàn có thể thay đổi mẫu xe chạy trên màn hình với 25 chủng loại xe khác nhau, biển số và cả màu sắc xe theo sở thích.

Đặc biệt, tích hợp giao diện tự động hóa theo thời gian: Bình minh, Ban ngày, Ban đêm. Tạo nên điểm nhấn không sản phẩm nào có được.
### Bản đồ chỉ đường thông minh nhất hiện nay.
Sở hữu cả 3 ứng dụng chỉ dẫn đường hiện đại nhất hiện nay nhưVIETMAP, GOOGLE MAPS VÀ NAVITEL. Thông qua điều khiển bằng giọng nói, chủ xế có thể nhanh chóng tìm địa chỉ mình mong muốn một cách chính xác. Nhờ đó tiết kiệm thời gian và tăng sự an toàn.

Đặc biệt, không cần kết nối internet như Google Map. Vì 2 phần mềm bản đồ Vietmap và Navitel cho phép người dùng sử dụng bản đồ chỉ đường ngay cả khi không có mạng.
### Kho giải trí bất tận nâng cao trải nghiệm, thư giãn.
Nhờ tích hợp sim 4G cho phép kết nối internet dễ dàng. Màn hình Zestech đáp ứng mọi nhu cầu giải trí cho chủ xế từ xem phim, nghe nhạc, đọc tin tức, tải ứng dụng dễ dàng từ CHPlay,…

Đặc biệt, màn hình còn được trang bị âm thanh DSP 16 kênh với 32 giải tần. Và có thể tùy chỉnh theo từng thể loại nhạc, mang đến trải nghiệm âm thanh sống động nhất.
### Chia đôi màn hình, chạy song song ứng dụng cùng lúc.
Điều thú vị với các tài xế là màn hình Zestech có thể chạy đa nhiệm ứng dụng. Đặc biệt là không tình trạng không nóng máy, không giật, lag.

Bạn vừa có thể xem bản đồ dẫn đường. Vừa mở các ứng dụng giải trí khác cho trẻ nhỏ hoặc người ngồi bên cạnh.
### Quản lý định vị xe từ xa.
Với ứng dụng “Zestech Tracking”, giúp bạn theo dõi chính xác được vị trí hiện tại của xe ngay trên điện thoại. Đặc biệt, với bộ nhớ lưu trữ dữ liệu khủng. Bạn hoàn toàn có thể xem lại hành trình di chuyển, tốc độ, các vị trí dừng đỗ của xe trong vòng 365 ngày.
### Kết nối nhanh chóng với các thiết bị ngoại vi.
Màn hình ô tô Zestech có khả năng kết nối và hiển thị các thiết bị ngoại vi. Như camera 360, camera hành trình, cảm biến áp suất lốp,… Với tính năng này, bạn hoàn toàn có thể trang bị thêm các thiết bị giúp hỗ trợ quan sát, lái xe an toàn.
    `,
                quantity: 15,
                price: 6900000,
                currency: "VND",
                categoryId: 1,
                imageUrl: "https://autohungdung.com/wp-content/uploads/2023/01/33502699.jpg",
                createdAt: new Date(),
                updatedAt: new Date()

            },
            {
                name: "Màn Hình Android Elliview U3 | DVD Android Ô Tô Thông Minh",
                path: "Màn-hình-android-Elliview-U3-DVD-android-ô-tô-thông-minh",
                detail:
                    `
## Tóm tắt cấu hình và tính năng
- CPU: UIS8581A 8 Nhân 1.6GHz
- Ram + Rom: 2GB + 32GB.
- Màn hình: 1280×720 QLED
- Hệ điều hành: Hệ điều hành android 10, carplay không dây.
- Kết nối: Bluetooth, 4G LTE + Wifi.
- Tích hợp sẵn: Điều khiển giọng nói online, cổng âm thanh Coaxial/Optical.
## Lợi ích của màn hình Elliview ICAR.
### Điều khiển giọng nói ICARV thông minh.
Là phần mềm điều khiển giọng nói tốt nhất trên thị trường với khả năng bắt lệnh nhanh chóng. Thực hiện câu lệnh nhuần nhuyễn với các ứng dụng.

Chỉ với thao tác bấm trên phím vô lăng, bạn đã có thể điều khiển tất cả ứng dụng trên đầu chỉ bằng điều khiển giọng nói.

- Nhận dạng giọng nói nhanh, chính xác.
- Câu lệnh tự nhiên, hoạt động ổn định.
- Tính năng tìm đường bằng điều khiển giọng nói.
- Tính năng mở nhạc, tivi, radio online bằng điều khiển giọng nói.
### Sở hữu hệ sinh thái ứng dụng ICAR Appstore độc quyền.
Bạn có thể sử dụng kho tàng ứng dụng độc quyền với rất nhiều tiện ích của ICAR nghiên cứu và phát triển. Hệ sinh thái ứng dụng này được cập nhật trên tất cả các sản phẩm màn hình DVD android ô tô cao cấp của ICAR. Như Màn hình DVD android ô tô Ownice C970, màn hình DVD android ô tô Elliview S4, U4.
### Hỗ trợ kết nối Wifi, 4G LTE, Bluetooth
Một thiết bị màn hình xe không thể thiếu các thiết bị tiêu chuẩn này. Tất cả đều có trên Elliview U4.
### Bộ xử lý âm thanh số DSP
DSP là bộ xử lý âm thanh kỹ thuật số cho chất lượng âm thanh của thiết bị phát tốt hơn, có độ sâu hơn. Người dùng có thể chỉnh tăng cường hoặc giảm cường độ âm của các dải tần khác nhau. Trên Elliview U4 cho phép chỉnh tới 32 dải tần.
### Giải trí không giới hạn với ICAR Entertainment
Việc nghe, xem các nội dung giải trí chở nên thuận tiện hơn bao giờ hết. Entertainment có thể chạy nền, có thể tiếp tục phát nội dung từ trước khi bạn tắt máy.

Bạn có thể xem tivi, nghe radio online,… Và được sắp xếp các video theo các chủ đề như tin tức, review phim, thiếu nhi, tri thức…

Đơn giản và dễ dàng bằng điều khiển giọng nói ICARV. Hay việc bạn có thể mở full màn hình, tua chỉ bằng thao tác bấm đơn giản là bấm đúp.
### Đặt lịch, nhắc việc với ICAR Calendar
Phần mềm có tính năng nhắc việc bằng giọng nói. Cũng như giúp bạn có thể tạo lịch nhanh chóng với câu lệnh “Đặt lịch…”. Giúp bạn vẫn biết được công việc sắp phải làm mà vẫn tập trung lái xe.

ICAR Calendar còn được tích hợp lịch âm của người Việt. Ví dụ khi bạn đặt lịch nhắc việc là ngày giỗ, ngày Tết Ta,… Phần mềm sẽ tự động chọn ngày âm lịch và nhắc lại hàng năm theo lịch âm.

Đồng thời nó có thể kết nối đồng bộ với điện thoại. Bạn có thể tạo lịch ở điện thoại, lịch cũng đồng thời hiển thị trên đầu android.
### ICAR Tracking – Ứng dụng định vị xe hơi
Đây là ứng dụng giám sát, định vị xe hơi với độ chính xác cao và tiện lợi trên màn hình DVD Android này. Với ICAR Tracking bạn có thể xem lại toàn bộ hành trình của xe, từng địa điểm dừng đỗ xe một cách chi tiết và cụ thể.

    `,
                quantity: 10,
                price: 5800000,
                currency: "VND",
                categoryId: 1,
                imageUrl: "https://autohungdung.com/wp-content/uploads/2023/01/33502699.jpg",
                createdAt: new Date(),
                updatedAt: new Date()

            },
            {
                name: "Màn Hình Zestech Z800+ 360 Base",
                path: "Màn-hình-Zestech-Z800+-360-Base",
                detail:
                    `
## Cấu hình màn hình ô tô Zestech Z800+
Không phải ngẫu nhiên mà màn hình ô tô Z800+ của hãng Zestech lại khiến bao người đua nhau sở hữu để trang bị trên xế yêu của mình, lý do xuất phát từ những thông số cực khủng sau đây:

- Màn hình: Kích thước 9 – 10 inch, IPS Full HD – cường lực 2.5D
- Hệ điều hành: Android 10.0
- CPU: Octa Core, ARM A53
- GPU: Mail – 400 600 MHZ
- RAM: 4GB
- ROM: 64GB
- DPS: 30 bands real EQ DSP
- Tích hợp sim 4G LTE, định vị GPS, mạng wifi, kết nối Bluetooth
- Màn hình DVD Zestech Z800+ có camera 360 với 4 mắt Sony 225 AHD độ nét cao
## 7 tính năng nổi bật của màn hình Zestech Z800+ 
Được trang bị công nghệ hiện đại tích hợp nhiều tính năng cực kỳ độc đáo, màn hình Zestech Z800+ là người bạn đồng hành không thể thiếu trên chặng đường của bất kỳ ai. Đặc biệt nếu bạn là tín đồ trong làng độ xe thì nhất định phải biết đến những tính năng này:
### Giao diện cá nhân hóa 
Một trong những điều ấn tượng trên chiếc DVD Android Zestech Z800+ là bạn có thể cá nhân hóa theo sở thích của mình. Có sẵn 12 màu sắc để bạn lựa chọn và tính năng thay đổi mẫu xe, biển số…
### Trợ lý Kiki điều khiển giọng nói thông minh
Màn hình ô tô Zestech Z800+ với tính năng điều khiển thông minh bằng giọng nói cực kỳ ấn tượng có thể nghe hiểu được giọng đặc trưng của vùng miền Bắc, Trung, Nam. Khi bạn càng tương tác nhiều với trợ lý Kiki thì nó sẽ càng trở nên thông minh hơn và sẵn sàng thực hiện theo yêu cầu của bạn nhanh chóng. 
### Camera 360 thông minh siêu sắc nét
Camera 360 trang bị trên Zestech Z800+ có thể điều khiển bằng giọng nói, hiển thị hình ảnh 2D và 3D, hiển thị góc đánh lái theo chiều xoay của vô lăng với độ phân giải cao, góc nhìn rộng nên có thể quan sát tốt hơn trong đêm tối. 

Bốn mắt camera ghi lại hành trình di chuyển của bạn theo thời gian thực, có khả năng chống nước tốt. Bạn cũng có thể cài đặt tự động mở camera theo km tùy chỉnh. 
### Hiển thị mật độ giao thông và cảnh báo tốc độ xe
Trên màn hình Zestech phiên bản Z800+ có trang bị phần mềm giúp cảnh báo tốc độ chạy giúp bạn an toàn hơn trong mỗi chuyến hành trình. Thêm vào đó là tính năng hiển thị mật độ giao thông giúp bạn linh hoạt hơn trong việc di chuyển, tránh được những khu vực đang đông đúc, tắc nghẽn. 
### Đa dạng các tính năng giải trí
Có thể đánh giá rằng, màn hình Android Zestech Z800+ như một chiếc máy tính bảng với đa dạng chức năng như xem phim, nghe nhạc, cài đặt các ứng dụng từ Google Play nhờ tính hợp sim 4G và wifi giúp truy cập internet thả ga. Và đặc biệt hơn nữa ở chiếc màn hình DVD Zestech Z800+ đó chính là trang bị âm thanh DSP với 16 kênh, 32 giải tần cho bạn cảm giác chìm đắm vào không gian sống động. 
### Chạy đa nhiệm ứng dụng, tích hợp nhiều bản đồ
Tính năng chia đôi màn hình giúp bạn có thể vừa xem bản đồ vừa nghe nhạc dễ dàng mà không phải thao tác quá phức tạp. Ngoài ra với 3 loại bản đồ thông minh là Google Maps, Navitel và Vietmap sẽ cho bạn thêm nhiều sự lựa chọn. Navitel và Vietmap có thể sử dụng ngay cả khi mất kết nối mạng. 
### Định vị xe từ xa
Thông qua ứng dụng Zestech Tracking bạn có thể biết được chính xác vị trí xe của mình và xem lại lịch trình di chuyển trong 365 ngày cực kỳ tiện lợi chỉ với chiếc điện thoại thông minh. 

    `,
                quantity: 10,
                price: 13900000,
                currency: "VND",
                categoryId: 1,
                imageUrl: "https://autohungdung.com/wp-content/uploads/2023/01/33502699.jpg",
                createdAt: new Date(),
                updatedAt: new Date()

            },
        ], {});
    }
}

