import { Modal } from "antd";

/**
 * 读取到更新json文件版本内容
 */
function fetchUpdateVersionFile() {
  return new Promise((resolve, reject) => {
    // 注意：文件请求路径 /update_version.json，是相对于在 public 文件下的 index.html 的位置而言的，/update_version.json 代表 update_version.json 文件与 index.html 文件夹同目录。
    fetch(`/update_version.json?_v=${Date.now()}`)
      .then((res) => {
        // console.log(res.body);
        return res.body;
      })
      .then((body) => {
        const reader = body?.getReader();
        reader
          ?.read()
          .then((val: any) => {
            let str = "";
            for (let i = 0; i < val.value.length; i++) {
              str += String.fromCharCode(val.value[i]);
            }
            return JSON.parse(str);
          })
          .then((json) => {
            resolve(json);
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function to(promise: Promise<any>) {
  return promise
    .then((data) => [null, data])
    .catch((err) => {
      return [err, undefined];
    });
}

let currentVersion = "";
let timer: NodeJS.Timeout | null = null;

/**
 * 打开更新提示
 */
export function openUpdateVersionNotify() {
  fetchUpdateVersionFile().then(
    (res) => {
      console.log("版本号：", res);
      timer = setInterval(async () => {
        const [err, res] = await to(fetchUpdateVersionFile());
        if (err) return;
        console.log(res);
        if (!currentVersion) {
          currentVersion = res["UPDATE_VERSION"];
        }
        if (res["UPDATE_VERSION"] !== currentVersion) {
          console.log("版本更新了。。。");
          clearInterval(timer as NodeJS.Timeout);
          Modal.confirm({
            title: "温馨提示",
            content: (
              <div>
                检测到新的系统更新，包含了性能提升与全新功能，为了您获得更好的体验，建议立即更新。
              </div>
            ),
            okText: "立即更新",
            cancelText: "稍后更新",
            onOk() {
              location.reload();
            },
          });
        }
      }, 1000 * 60);
    },
    (err) => {
      console.log("更新版本：", err);
    },
  );
}
