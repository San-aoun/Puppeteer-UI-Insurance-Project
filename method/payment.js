module.exports = {
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
    },
    Payment_Credit: async function(page,numberCC){
        try {
            const frame = await helper.selectFrame(page) 

            await frame.evaluate((numberCC)=>{
                var amount = $('#lblSumTotalAmount').html()

                $k("#ddlPayType").data("kendoDropDownList").value(2)
                $k("#ddlPayType").data("kendoDropDownList").trigger('change')

                // choose option
                $('[onclick^="OpenPaymentOption"]').click()
                $('#txtCreditCardNo').val(`${numberCC}`)
                $('[onclick="AddCreditCardInfo()"]').click()
                $('.buttonFinish').click()
            },numberCC)

            await frame.waitForXPath("//span[contains(text(),'OK')]")
            const[setting] = await frame.$x("//span[contains(text(),'OK')]")
            if(setting) setting.click()

            
        } catch (error) {
            console.log(error)
        }
    }

}
