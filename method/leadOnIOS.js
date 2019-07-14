const config = require('../lib/config')
const helper = require('../lib/helpers')
const Utility = require('../lib/utils')
const loginPage = require('../page-object/login')
const elemleadOnIOS = require('../page-object/elem_leadonios')

module.exports = {
    login: async function(page){
        try {
            await helper.loadUrl(page,config.baseUrl)
            await helper.typeText(page,config.user,loginPage.userName)
            await helper.typeText(page,config.pw,loginPage.password)
            await helper.click(page,loginPage.sigIn)
            await helper.waitForText(page,'body','IOS',)
            await page.screenshot({path: 'SASpage.png'})
        } catch (error) {
           throw new error('Can not log-in User' + loginPage.UserName ) 
        }
    },
    gotoLeadOnIOS: async function(page){
        try {
            await helper.waitForText(page,'body','IOS',{ timeout : 1000})
            await page.waitForSelector(elemleadOnIOS.gotoIOS)
            await helper.click(page,elemleadOnIOS.gotoIOS)
            await helper.click(page,elemleadOnIOS.dropdownLead)
            await helper.click(page,elemleadOnIOS.checkCustomer)
            await page.screenshot({path: 'gotoLeadOnIOS.png'})
        } catch (error) {
            throw new error('Can not go to LeadOnIOS' )
        }
    },
    addNewCutomer: async function(page){
        try {
            await helper.selectFrameclick(page,leadOnIOS.clickAddCutomer)
            await page.screenshot({path: 'addNewCutomer.png'})
        } catch (error) {
            throw new error('Can not go to LeadOnIOS' )
        }
    },
    infoNewCutomer: async function(page,name){
        try {
            await page.waitFor(500)
            await helper.selectFrameclick(page,elemleadOnIOS.clickAddCutomer)
            await helper.selectFrametypeText(page,name,elemleadOnIOS.addName)
            await page.waitFor(500)
            await helper.selectFrametypeText(page,Utility.generateNumbers(),elemleadOnIOS.addTel)
            await helper.selectFrameclick(page,elemleadOnIOS.clickSaveAsNewCS) 
            await helper.acceptAlert(page)
        } catch (error) {
            throw new error('input information NewCutomer' )
        }
    },
    addNewLead: async function(page){
        try {
            const frame = await helper.selectFrame(page)
            await helper.selectFrameclick(page,elemleadOnIOS.chooseJobs)

            await frame.$eval(elemleadOnIOS.chooseTopic, el => el.value = "29")
            await frame.waitForSelector(elemleadOnIOS.chooseChanal)

            await frame.$eval(elemleadOnIOS.chooseChanal, el => el.value = "1")
            await frame.waitForSelector('#btnSave')

            await helper.selectFrameclick(page,'#btnSave') 
            await helper.acceptAlert(page)
            await frame.waitForSelector('#btnFollowGroupRequestDetail')  
            await helper.selectFrameclick(page,'#btnFollowGroupRequestDetail')

        } catch (error) {
            console.log(error)
            throw new error('input information NewCutomer' )
        }
    },
    InputDetailToIOS: async function(page,prod,subprod){
        try {
            const frame = await helper.selectFrame(page)
            await page.waitFor(2000)
            await frame.waitForSelector('[onclick^="openRequestDetailHistory"]', { delay: 200 })
            //1.//
            const workid = await frame.evaluate(() => document.querySelector('[onclick^="openRequestDetailHistory"]').innerHTML);

            await frame.evaluate((workid,prod) => {
                $(`#trRequestDetail${workid} td:eq(1) select`).val(`${prod}`);
                $(`#trRequestDetail${workid} td:eq(1) select`).change();
            },workid,prod)
            await page.waitFor(500)
            await frame.evaluate((workid,subprod) => {
                $(`#trRequestDetail${workid} select[style*='width: 95%;']:eq(1)`).val(`${subprod}`);
                $(`#trRequestDetail${workid} select[style*='width: 95%;']:eq(1)`).change();
            },workid,subprod)
            await helper.selectFrameclick(page,'#btnLeadDetailSubmit');
        } catch (error) {
            console.log(error) 
        }
    },
    searchJobOnLeadOnIOS: async function(page,name){
        try {
            await helper.selectFrameclick(page,'#rdoAllBranchsItemType')
            await helper.selectFrametypeText(page,name,'#txtSearchFirstName')
            await helper.selectFrameclick(page,'#btnSearch')
        } catch (error) {
            console.log(error)
            throw new error('can not search jobs' )
        }
    },
    clickSymbolGoToIOS: async function(page){
        try {
            await helper.selectFrameclick(page,'[src="/img/iconTransfer.png"]')
        } catch (error) {
            throw new error('can not click symbolGoToIOS ' )
        }
    },
    cutomInfo_withoutLicense: async function(page,cityzen,lname,plic,llic,dob,titlekey){
        try {
            const frame = await helper.selectFrame(page)
            await frame.waitForSelector('[data-btn="on"]', { timeout: 1000 })
            await frame.evaluate(()=>{$('[data-btn="on"]').click()})

            await page.waitFor(1000)
            await frame.waitForSelector('#btModalSave', {timeout: 1000});
            await frame.evaluate((cityzen,lname,plic,llic,dob,titlekey) => {
                $('#txtCustCitizenId').val(`${cityzen}`)
                $('#txtCustLastNameTH').val(`${lname}`)
                $('[data-field="carLicensePrefix"]').val(`${plic}`)
                $('[data-field="carLicenseNo"]').val(`${llic}`)
                $('.hasDatepicker').datepicker('setDate', `${dob}`)
                $('[data-field="titleKey"]').val(`${titlekey}`)
                $('#btModalSave').click()

            },cityzen,lname,plic,llic,dob,titlekey)
        } catch (error) {
            console.log(error)
        }
    },
}


