import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";

const footerStyle = {
  backgroundColor: "#001529",
  color: "white",
  // padding: "20px",
  width: "100%",
  //position: "fixed",
  bottom: 0,
  left: 0,
  zIndex: 1000,
};
const columnStyle = { padding: "8px 0", color: "white" };

export default function FooterLayout() {
  return (
    <div style={footerStyle}>
      <Row gutter={16} style={{ display: "flex", justifyContent: "space-around" }}>
        <Col className="gutter-row" span={7}>
          <div style={columnStyle}>
            <h3 style={{ color: "white" }}>GIỚI THIỆU</h3>
            <p>
              <strong>Racket Rise</strong> cung cấp các tiện ích thông minh giúp
              cho bạn tìm sân cầu lông một cách hiệu quả nhất. Với hệ thống đặt
              sân trực tuyến 24/7 bạn có thể dễ dàng tìm kiếm và đặt sân cầu
              lông mọi lúc mọi nơi.
              <br />
              <Link style={{ color: "white", textDecoration: "underline" }} to="/aboutUs">
                Về chúng tôi
              </Link>
            </p>
          </div>
        </Col>
        <Col className="gutter-row" span={4}>
          <div style={columnStyle}>
            <h3 style={{ color: "white" }}>THEO DÕI CHÚNG TÔI</h3>
            <p>
              <a href="https://facebook.com" style={{ color: "white" }}>
                Facebook <FacebookOutlined />
              </a>
            </p>
            <p>
              <a href="https://instagram.com/" style={{ color: "white" }}>
                Instagram <InstagramOutlined />
              </a>
            </p>
            <p>
              <a href="https://x.com" style={{ color: "white" }}>
                Twitter <TwitterOutlined />
              </a>
            </p>
            <p>
              <a href="https://youtube.com/" style={{ color: "white" }}>
                Youtube <YoutubeOutlined />
              </a>
            </p>
          </div>
        </Col>
        <Col className="gutter-row" span={7}>
          <div style={columnStyle}>
            <h3 style={{ color: "white" }}>THÔNG TIN VÀ LIÊN LẠC</h3>
            <p>Tên công ty: Racket Rise</p>
            <p>Email: ducnxse171688@fpt.edu.vn</p>
            <p>
              Địa chỉ: Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ
              Đức, Thành phố Hồ Chí Minh, Việt Nam
            </p>
            <p>Điện thoại: 0247.303.0247</p>
          </div>
        </Col>
      </Row>
    </div>
  );
}