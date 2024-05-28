import axios from "axios";
// import router from "@/router";
// import { message } from "@/common/ts/utils";

axios.defaults.headers["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.post["Content-Type"] = "application/json";

// 做一个响应守卫
axios.interceptors.response.use((res) => {
  if (typeof res.data !== "object") {
    // message.error("服务端异常！");
    console.log("服务端异常！");
    return Promise.reject(res);
  }
  if (res.status != 200) {
    // 当返回码非正常时，回传msg给用户
    // if (res.data.message){
    //     message.warning(res.data.message)
    // }
    // 做登录鉴权，不通过返回login页面
    // if (res.data.resultCode == 416) {
    //   router.push({ path: '/login' })
    // }
    return Promise.reject(res.data);
  }

  return res.data;
});

export default axios;
