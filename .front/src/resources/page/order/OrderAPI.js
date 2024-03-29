import axios from "axios";

// const baseURL = "http://localhost:3000/order";
const instance = axios.create({ baseURL: "http://localhost:3000/order" });
const instanceProd = axios.create({ baseURL: "http://localhost:3000/product" });

// member 정보 가져오기
export const userInfoAPI = async (data) => {
    try {
        const response = await instance.post("/loadMemberInfo", data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        return "member?? data없어요...";
    }
}

// member의 coupon정보 가져오기
export const loadUserCouponAPI = async (data) => {
    try {
        const response = await instance.post("/loadUserCoupon", data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        return "쿠폰?? data없어요...";
    }
}

// 주문할 상품이미지 가져오기
export const loadProdImgAPI = async (data) => {
    try {
        const response = await instanceProd.post("/loadProdImg", data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        return "img?? data없어요...";
    }
}

// 주문할 상품정보 가져오기
export const loadProdNameAPI = async (data) => {
    try {
        const response = await instanceProd.post("/loadProdName", data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        return "상품명?? data없어요...";
    }
}

// 주문할 상품정보(prodDetail-option) 가져오기
export const loadProdDetilAPI = async (data) => {
    try {
        const response = await instanceProd.post("/loadProdDetail", data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        return "상품detail?? data없어요...";
    }
}


// 결제완료시 데이터들을 DB에 넣어주기
export const insertOrderAPI = async (data) => {
    console.log(data);
    try {
        const response = await instance.post("/insertOrder", data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        return "insert?? 실패...";
    }
}

export const selectOrderNoAPI = async () => {
    try {
        const response = await instance.get("/selectOrderNo");
        return response.data;
    } catch (error) {
        return "insert?? 실패...";
    }
}

export const selectPointRateAPI = async (data) => {
    try {
        const response = await instance.post("/selectPointRate", data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        return "gradeRate?? 실패...";
    }
}