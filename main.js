const config = require("./config.json");
const buff = require("./scripts/buff");
const csmoney = require("./scripts/csmoney");

/* TODO
    Add currency converion.
    Optimise getItems (get newer items faster)
    Add caching system for buff items to avoid constant rate limits (old sniper has some code for this)
    Logging system (old sniper has file for this)
*/

(async()=>{
    console.log("running...");
    let itemData = await csmoney.getItems(`https://cs.money/5.0/load_bots_inventory/730?limit=60&maxPrice=${config.maxPriceUsd}&minPrice=${config.minPriceUsd}&offset=60`);
    
    let offset = 0; // manage csmoney items offset
    itemData.forEach((csmoneyItem,index)=>{
        setTimeout(async() => {
            try {
                let buffItem = await buff.getBuffItem(csmoneyItem.fullName);
                console.log(buffItem)
                console.log("csmoney price: " + csmoneyItem.price);
                console.log("buff price : " + buffItem.price); //convert to usd
            } catch (error) {
                console.log(`[-] Error checking item -> ${error?.message}`);
            }
        }, (5000 * index));
    });
})();