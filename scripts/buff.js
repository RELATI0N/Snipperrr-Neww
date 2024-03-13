const config = require("../config.json");
const request = require("request");
const enums = require("./enums");

const requestHeaders = { //buff headers 
    "Accept-Encoding":"*/*",
    "Accept-Language":"en-US",
    "Connection":"keep-alive",
    "Accept":"application/json, text/javascript, */*;",
    "Host":"buff.163.com",
    "Referer":"https://buff.163.com",
    "Sec-Fetch-Dest":"empty",
    "Sec-Fetch-Mode":"cors",
    "Sec-Fetch-Site":"same-origin",
    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
    "Cookie":config.dummyAccount.buffCookie,
    "X-Requested-With":"XMLHttpRequest"
}

function getBuffItem(itemFullName){
    return new Promise((resolve,reject)=>{
        try {
            let itemId = enums.buffIds?.[itemFullName];

            if(!itemId){
                reject(new Error(`Failed to find itemId for ${itemFullName}`));
            }

            request({
                url:`https://buff.163.com/api/market/goods/sell_order?game=csgo&goods_id=${itemId}&page_num=1&sort_by=default&_=1710268698014`,
                method:"GET",
                headers:requestHeaders,
                json:true
            },(error,response)=>{
                if(response.body?.data?.items?.[0]){
                    resolve(response.body.data.items[0]);
                }else if(error){
                    reject(new Error(`buff.getBuffItem request threw an error : ${error?.message}`));
                }else{
                    reject(new Error(`No buff item was found, response : ${JSON.stringify(response.body)}`));
                }
            });
        } catch (error) {
            reject(new Error(`buff.getBuffItem try block threw an error : ${error?.message}`));
        }   
    });
}

module.exports = {
    getBuffItem:getBuffItem
}