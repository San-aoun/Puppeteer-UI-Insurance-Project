const config = require('../lib/config')
const helper = require('../lib/helpers')
const Utility = require('../lib/utils')

module.exports = {
    customerDetail_status: async function(page,status,statVal){
        try {
            await page.waitFor(1000)
            const frame = await helper.selectFrame(page);
            await helper.shouldExist(frame,'#MARITAL_STATUS')
            await page.waitFor(1000)

            await frame.evaluate((statVal)=>{
                $k("#MARITAL_STATUS").data("kendoComboBox").selectedIndex = `${statVal}`
             },statVal);
             await page.waitFor(1000)
             await frame.evaluate((status)=>{
                $k("#MARITAL_STATUS").data("kendoComboBox").value(`${status}`)
             },status);

        } catch (error) {
           console.log(error)
        }
    },
    customerDetail_addr: async function(page,prov,dist,subdist,zip,addr){
        try {
            const frame = await helper.selectFrame(page)
            // 1.Provice
            await frame.evaluate((prov) => {
                $k("#CONTACT_ADDRESS_COUNTRY").data("kendoComboBox").text(`${prov}`)
                $k("#CONTACT_ADDRESS_COUNTRY").data("kendoComboBox").trigger('change')
            },prov)
            await page.waitFor(1000)
            // District
            await frame.evaluate((dist) => {
                $k("#CONTACT_ADDRESS_CITY").data("kendoComboBox").text(`${dist}`)
                $k("#CONTACT_ADDRESS_CITY").data("kendoComboBox").trigger('change')
            },dist)
            await page.waitFor(500)
            // Sub-District
            await frame.evaluate((subdist) => {
                $k("#CONTACT_ADDRESS_3").data("kendoComboBox").text(`${subdist}`)
                $k("#CONTACT_ADDRESS_3").data("kendoComboBox").trigger('chnage')
            },subdist)
            await page.waitFor(500)
            // zipCode
            await frame.evaluate((zip) => {
                $k("#CONTACT_ZIP_CODE").data("kendoComboBox").text(`${zip}`)
            },zip)
            await helper.selectFrametypeText(page,`${addr}`,'#CONTACT_ADDRESS_1')
            await page.waitFor(500)
            await helper.selectFrameclick(page,'#Checkbox2')
            await helper.selectFrameclick(page,'.buttonNext')
        } catch (error) {
           
        }
    },
    select_Product_CTP30: async function(page,prod,subProd){
        try {
            await helper.selectFrameclick(page,`[data-insurercode="${prod}"]`)
            await helper.selectFrameclick(page,`[data-productkey="${subProd}"]`)

        } catch (error) {
            console.log(error)
        }
    },
    product_detail_CTP30: async function(page,cartype,subcartype,brand,cc){
        try {
            const frame = await helper.selectFrame(page)
            await helper.selectFrameclick(page,'[onclick="SalesCodeTextBoxOnChanged()"]')
            await page.waitFor(500)
            await frame.evaluate((cartype,subcartype,brand)=>{
                $k("#Field46").data("kendoDropDownList").value(`${cartype}`)
                $k("#Field45").data("kendoDropDownList").value(`${subcartype}`)
                $k("#Field27").data("kendoDropDownList").value(1)
                $k("#Field21").data("kendoDropDownList").value(`${brand}`)
            },cartype,subcartype,brand)
            await helper.selectFrametypeText(page,`${cc}`,'#Field24')
            await helper.selectFrametypeText(page,Utility.generateID(10),'#Field19')

            await helper.selectFrameclick(page,'#btnCheckInfo')
            await frame.evaluate(()=>{
                getlblPremium = $('#lblPremium').text();
                console.log(getlblPremium)
                for(var i=0; i++;)
                {
                    debugger;
                    if(getlblPremium == ''){
                        $('#btnCheckInfo').click();
                    } 
                    else break;
                }
            })
            await page.waitFor(1000)
            await helper.selectFrameclick(page,'.buttonNext')
            
        } catch (error) {
            console.log(error)
        }
    },
    Payment_cash: async function(page){
        try {
            const frame = await helper.selectFrame(page)
            await frame.waitForSelector('#txtCashPayment', { delay: 100 });
            await frame.evaluate(()=>{
                var amount = $('#lblSumTotalAmount').html();
                var cashPayment = $k("#txtCashPayment").data("kendoNumericTextBox");
                cashPayment.value(amount);
                cashPayment.trigger('change');
            })
            await helper.selectFrameclick(page,'.buttonFinish');
            await frame.waitForXPath('//span[contains(text(),"OK")]', 5000);
            const [setting] = await frame.$x('//span[contains(text(),"OK")]');
            if(setting) setting.click();
            
        } catch (error) {
            
        }
    }


}
