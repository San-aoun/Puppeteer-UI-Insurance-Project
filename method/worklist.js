const config = require('../lib/config')
const helper = require('../lib/helpers')
const Utility = require('../lib/utils')

module.exports = {
    prints: async function(page,name){
        try {
            await page.waitFor(2000)
            const frame = await helper.selectFrame(page)

            await frame.evaluate((name)=>{
                var jobId = $($($(`#ctl00_ContentPlaceHolder1_RadGrid1_ctl00 tr td:contains("${name}")`).get()).parent().find("td input[src='img/Print-1.png']"))
                jobId.click()
            },name)

            await page.waitFor(500)
            await frame.waitForXPath('//span[contains(text(),"OK")]');
            const [setting] = await frame.$x('//span[contains(text(),"OK")]');
            if(setting) setting.click();
            
            const status = await frame.evaluate((name)=>{
                return $($($(`#ctl00_ContentPlaceHolder1_RadGrid1_ctl00 tr td:contains("${name}")`).get()).parent().find("td input[src='img/Print-1.png']")).attr('style')
            },name)
            for(var obj in status){
                if(obj != "border-width: 0px; display: none;")
                {
                    await page.waitFor(1000)
                }
            }
            
        } catch (error) {
            console.log(error)
        }
        
    },
    printsCard: async function(page,name){
        try {
            //await page.waitFor(2000)
            const frame = await helper.selectFrame(page)

            await frame.evaluate((name)=>{
                var jobId = $($($(`#ctl00_ContentPlaceHolder1_RadGrid1_ctl00 tr td:contains("${name}")`).get()).parent().find("td input[src='img/Card.png']"))
                jobId.click()
            },name)

            await frame.waitForXPath('//span[contains(text(),"OK")]');
            const [setting] = await frame.$x('//span[contains(text(),"OK")]');
            if(setting) setting.click();
            await page.waitFor(2000);
        } catch (error) {
            console.log(error)
        }
        
    },
    edit: async function(page,name){

    }
}
