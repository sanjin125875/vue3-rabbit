import request from "@/utils/http";

// 加入购物车
export const insertCartAPI = ({ skuId, count }) => {
  return request({
    url: "/member/cart",
    method: "POST",
    data: {
      skuId,
      count,
    },
  });
};

// 获取购物车最新列表
export const findNewCartListAPI = () => {
  return request({
    url: "/member/cart",
  });
};

// 删除购物车（服务端）
export const delCartAPI = (ids) => {
  return request({
    url: "/member/cart",
    method: "DELETE",
    data: {
      ids,
    },
  });
};
