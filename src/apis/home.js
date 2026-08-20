import httpInstance from "@/utils/http";

export function getBannerAPI() {
  return httpInstance({
    url: "/home/banner",
  });
}

/**
 * 获取新鲜好物列表
 * @returns 
 */
export function getNewAPI() {
    return httpInstance({
        url: "home/new",
    });
}

/**
 * 获取人气列表
 * @returns 
 */
export function getHotAPI() {
    return httpInstance({
        url: "home/hot",
    });
}

/**
 * @description: 获取所有商品模块
 * @param {*}
 * @return {*}
 */
export const getGoodsAPI = () => {
  return httpInstance({
    url: '/home/goods'
  })
}