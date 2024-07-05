import { useEffect, useState } from "react";
import { Input } from "antd";
import PostCardItem from "../../../components/PostManagement/PostCardItem";
import PaginationCustom from "../../../components/Painganation";
const { Search } = Input;

const DefaultData = [
  {
    id: 1,
    postName: "Post 1",
    image:
      "https://cdn.dienthoaigiakho.vn/photos/1690257406416-dien-thoai-2.jpg",
    price: 50000,
    detail:
      "This is detail for the post 1 upload by student A and approved by Mod A",
    postStatusId: "pending",
    expire: "2024/06/08",
  },
  {
    id: 2,
    postName: "Post 2",
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://cellphones.com.vn/media/wysiwyg/Phone/Dien-thoai-5.jpg",
    price: 100000,
    detail:
      "This is detail for the post 2 upload by student B and approved by Mod B",
    postStatusId: "approved",
    expire: "2024/06/08",
  },

  {
    id: 3,
    postName: "Post 3",
    image:
      "https://cdn-v2.didongviet.vn/files/media/wysiwyg/2020/galaxy-note-20-utra/dien-thoai-thong-minh-didongviet.jpg",
    price: 150000,
    detail:
      "This is detail for the post 3 upload by student C and approved by Mod C",
    postStatusId: "rejected",
    expire: "2024/06/08",
  },
  {
    id: 4,
    postName: "Post 4",
    image:
      "https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_product_33196/google-tivi-xia_main_864_450.png.webp",
    price: 200000,
    detail:
      "This is detail for the post 4 upload by student D and approved by Mod D",
    expire: "2024/06/08",
    postStatusId: "pending",
  },
  {
    id: 5,
    postName: "Post 5",
    image:
      "https://cdn.mediamart.vn/images/product/smart-tivi-4k-sony-kd-55x80j-55-inch-android-tv_195e042b.jpg",
    price: 250000,
    detail:
      "This is detail for the post 5 upload by student E and approved by Mod E",
    expire: "2024/06/08",
    postStatusId: "approved",
  },
  {
    id: 6,
    postName: "Post 6",
    image:
      "https://images.fpt.shop/unsafe/filters:quality(5)/fptshop.com.vn/uploads/images/tin-tuc/144408/Originals/pc-gaming-1.jpg",
    price: 300000,
    detail:
      "This is detail for the post 6 upload by student F and approved by Mod F",
    expire: "2024/06/08",
    postStatusId: "rejected",
  },
  {
    id: 7,
    postName: "Post 7",
    image:
      "https://minhancomputer.com/media/news/1106_goc-pc-gaming-choi-game.jpg",
    price: 350000,
    detail:
      "This is detail for the post 7 upload by student G and approved by Mod G",
    expire: "2024/06/08",
    postStatusId: "pending",
  },
  {
    id: 8,
    postName: "Post 8",
    image: "https://sudospaces.com/karofi-com/2022/03/dieu-hoa-karofi.jpg",
    price: 400000,
    detail:
      "This is detail for the post 8 upload by student H and approved by Mod H",
    expire: "2024/06/08",
    postStatusId: "approved",
  },
  {
    id: 9,
    postName: "Post 9",
    image:
      "https://www.casper-electric.com/wp-content/uploads/2022/09/dieu-hoa-Inverter.jpg",
    price: 450000,
    detail:
      "This is detail for the post 9 upload by student I and approved by Mod I",
    expire: "2024/06/08",
    postStatusId: "rejected",
  },
];

function PostManagementPage() {
  const [data, setData] = useState(DefaultData);
  const [reload, setReload] = useState(true);
  const [filteredData, setFilteredData] = useState(data || []);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (value, _e, info) => {
    if (!value) {
      setFilteredData(data);
    } else {
      const filtered = data.filter(
        (item) =>
          item.postName.toLowerCase().indexOf(value.toLowerCase()) !== -1
      );
      setFilteredData(filtered);
    }
    setPagination({ ...pagination, current: 1 });
  };

  useEffect(() => {
    if (reload) {
      const handleFetchData = async () => {};
      handleFetchData();
      setReload(false);
    }
  }, [reload]);

  useEffect(() => {
    if (data) {
      setFilteredData(data);
    }
  }, [data]);
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Search
          placeholder="Search with title..."
          onSearch={handleFilterChange}
          enterButton
          style={{ maxWidth: "300px" }}
        />
        <PaginationCustom
          current={currentPage}
          total={filteredData?.length}
          pageSize={pageSize}
          onChange={handleChangePage}
        />
      </div>
      <div
        className="post-mod-management"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          justifyContent: "center",
          alignItems: "center",
          gap: "30px",
          marginTop: "2%",
        }}
      >
        {filteredData.length ? (
          filteredData
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
            .map((post, index) => {
              return (
                <PostCardItem key={index} data={post} setReload={setReload} />
              );
            })
        ) : (
          <h3>List Post Empty</h3>
        )}
      </div>
    </>
  );
}

export default PostManagementPage;