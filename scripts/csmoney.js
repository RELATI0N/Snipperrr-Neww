const request = require("request");

const requestHeaders = {
    "Accept": "application/json",
    "Accept-Language": "en-US;",
    "Cache-Control": "no-cache",
    "Pragma": "no-cache",
    "Referer": "https://cs.money/csgo/trade/",
    "Sec-Ch-Ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": "\"Windows\"",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
}
  

function getItems(url){
    return new Promise((resolve,reject)=>{
        request({
            url:url,
            method:"GET",
            headers:requestHeaders,
            json:true
        },(error,response)=>{
            if(response?.body?.items){
                resolve(response.body.items);
            }else{
                reject(new Error(`[${response?.statusCode}] items.getItems no response body. error - [${error?.message}] response - ${JSON.stringify(response.body)}`));
            }
        });
    });
}

module.exports = {
    getItems:getItems
}