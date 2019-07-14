const puppeteer = require('puppeteer')
const expect = require('chai').expect

const config = require('../lib/config')
const Utility = require('../lib/utils')
const method_leadOnIOS = require('../Method/leadOnIOS')
const method_iosSystem = require('../Method/iosSystem')
const method_worklist = require('../Method/workList')

let browser
let page
let name
let cityzens

describe('CTP30 : รย.12_1.30A : รถจักรยานยนต์ ไม่เกิน 75 CC', () => {
    // Set Up first open brownser
    before(async function(){
        browser = await puppeteer.launch({
            headless: config.isHeadless,
            slowMo: config.slowMo,
            devtools: config.isDevtools,
            timeout: config.launchTimeOut,
        })
        page = await browser.newPage()
        await page.setDefaultTimeout(config.waitingTimeOut)
        await page.setViewport({
            width: config.viewportWidth,
            height: config.viewportHeight
        })
        cityzens = await Utility.cityzens(page);
        name = 'โรบอท' + Utility.generateName(5)
    })
    after(async function() {
        await browser.close()
    })
    
    // Process E2E testing
    
    describe('Login browser',() => {
        it('goto SAS', async() => {
            await method_leadOnIOS.login(page);
        })
    })
    describe('Create New custormer on LeadOnIOS',() => {
        it('goto lead on IOS', async() => {
            await method_leadOnIOS.gotoLeadOnIOS(page)
        })
        it('add New Cutomer', async() => {
            await method_leadOnIOS.infoNewCutomer(page,name)
        })
        it('Add new Lead', async() => {
            await method_leadOnIOS.addNewLead(page)
        })
        it('Input detail data', async() => {
            await method_leadOnIOS.InputDetailToIOS(page,14,7)
        })
        it('Search Jobs and go to IOS',async() => {
            await method_leadOnIOS.searchJobOnLeadOnIOS(page,name)
            await method_leadOnIOS.clickSymbolGoToIOS(page)
        })
    })
    describe('Customer information without car license',() => {
        it('Create customer information',async() => {
            await method_leadOnIOS.cutomInfo_withoutLicense(page,cityzens,'ทดสอบพับแพ๊บเทีย','ก99','1234',"01/07/2534",44)
        })
    })
    describe('IOS-CTP30 process',() => {
        it('IOS page one : "Customer Detail status" ',async() => {
            await method_iosSystem.customerDetail_status(page,'โสด',1)
        })
        it('IOS page one : "Customer Detail address" ',async() => {
            await method_iosSystem.customerDetail_addr(page,'กรุงเทพมหานคร','เขตหนองจอก','หนองจอก','10530','287/125 หมู่บ้านพฤกษา 78')
        })
        it('IOS page Two : "Product & Insurer" ',async() => {
            await method_iosSystem.select_Product_CTP30(page,'RVP','CTP30')
        })
        it('IOS page Three : "Product Details" ',async() => {
            await method_iosSystem.product_detail_CTP30(page,'12','1.30A','HONDA','75')
        })
        it('IOS page Four : "Payment" ',async() => {
            await method_iosSystem.Payment_cash(page)
        })
    })
    describe('Work list for prints',() => {
        it('print report',async() => {
            await method_worklist.prints(page,name)
        })
        /*it('print card',async() => {
            await method_worklist.printsCard(page,name)
        })*/
    })


})
describe('CTP30 : รย.12_1.30B : รถจักรยานยนต์สาธารณะ ไม่เกิน 125 CC ', () => {
    // Set Up first open brownser
    before(async function(){
        browser = await puppeteer.launch({
            headless: config.isHeadless,
            slowMo: config.slowMo,
            devtools: config.isDevtools,
            timeout: config.launchTimeOut,
        })
        page = await browser.newPage()
        await page.setDefaultTimeout(config.waitingTimeOut)
        await page.setViewport({
            width: config.viewportWidth,
            height: config.viewportHeight
        })
        cityzens = await Utility.cityzens(page);
        name = 'โรบอท' + Utility.generateName(5)
    })
    after(async function() {
        await browser.close()
    })
    
    // Process E2E testing
    
    describe('Login browser',() => {
        it('goto SAS', async() => {
            await method_leadOnIOS.login(page);
        })
    })
    describe('Create New custormer on LeadOnIOS',() => {
        it('goto lead on IOS', async() => {
            await method_leadOnIOS.gotoLeadOnIOS(page)
        })
        it('add New Cutomer', async() => {
            await method_leadOnIOS.infoNewCutomer(page,name)
        })
        it('Add new Lead', async() => {
            await method_leadOnIOS.addNewLead(page)
        })
        it('Input detail data', async() => {
            await method_leadOnIOS.InputDetailToIOS(page,14,7)
        })
        it('Search Jobs and go to IOS',async() => {
            await method_leadOnIOS.searchJobOnLeadOnIOS(page,name)
            await method_leadOnIOS.clickSymbolGoToIOS(page)
        })
    })
    describe('Customer information without car license',() => {
        it('Create customer information',async() => {
            await method_leadOnIOS.cutomInfo_withoutLicense(page,cityzens,'ทดสอบพับแพ๊บเทีย','ก99','1234',"01/07/2534",44)
        })
    })
    describe('IOS-CTP30 process',() => {
        it('IOS page one : "Customer Detail status" ',async() => {
            await method_iosSystem.customerDetail_status(page,'โสด',1)
        })
        it('IOS page one : "Customer Detail address" ',async() => {
            await method_iosSystem.customerDetail_addr(page,'กรุงเทพมหานคร','เขตหนองจอก','หนองจอก','10530','287/125 หมู่บ้านพฤกษา 78')
        })
        it('IOS page Two : "Product & Insurer" ',async() => {
            await method_iosSystem.select_Product_CTP30(page,'RVP','CTP30')
        })
        it('IOS page Three : "Product Details" ',async() => {
            await method_iosSystem.product_detail_CTP30(page,'12','1.30B','APRILIA','125')
        })
        it('IOS page Four : "Payment" ',async() => {
            await method_iosSystem.Payment_cash(page)
        })
    })
    describe('Work list for prints',() => {
        it('print report',async() => {
            await method_worklist.prints(page,name)
        })
        /*it('print card',async() => {
            await method_worklist.printsCard(page,name)
        })*/
    })


})
describe('CTP30 : รย.12_1.30C : รถจักรยานยนต์สาธารณะ ไม่เกิน 150 CC ', () => {
    // Set Up first open brownser
    before(async function(){
        browser = await puppeteer.launch({
            headless: config.isHeadless,
            slowMo: config.slowMo,
            devtools: config.isDevtools,
            timeout: config.launchTimeOut,
        })
        page = await browser.newPage()
        await page.setDefaultTimeout(config.waitingTimeOut)
        await page.setViewport({
            width: config.viewportWidth,
            height: config.viewportHeight
        })
        cityzens = await Utility.cityzens(page);
        name = 'โรบอท' + Utility.generateName(5)
    })
    after(async function() {
        await browser.close()
    })
    
    // Process E2E testing
    
    describe('Login browser',() => {
        it('goto SAS', async() => {
            await method_leadOnIOS.login(page);
        })
    })
    describe('Create New custormer on LeadOnIOS',() => {
        it('goto lead on IOS', async() => {
            await method_leadOnIOS.gotoLeadOnIOS(page)
        })
        it('add New Cutomer', async() => {
            await method_leadOnIOS.infoNewCutomer(page,name)
        })
        it('Add new Lead', async() => {
            await method_leadOnIOS.addNewLead(page)
        })
        it('Input detail data', async() => {
            await method_leadOnIOS.InputDetailToIOS(page,14,7)
        })
        it('Search Jobs and go to IOS',async() => {
            await method_leadOnIOS.searchJobOnLeadOnIOS(page,name)
            await method_leadOnIOS.clickSymbolGoToIOS(page)
        })
    })
    describe('Customer information without car license',() => {
        it('Create customer information',async() => {
            await method_leadOnIOS.cutomInfo_withoutLicense(page,cityzens,'ทดสอบพับแพ๊บเทีย','ก99','1234',"01/07/2534",44)
        })
    })
    describe('IOS-CTP30 process',() => {
        it('IOS page one : "Customer Detail status" ',async() => {
            await method_iosSystem.customerDetail_status(page,'โสด',1)
        })
        it('IOS page one : "Customer Detail address" ',async() => {
            await method_iosSystem.customerDetail_addr(page,'กรุงเทพมหานคร','เขตหนองจอก','หนองจอก','10530','287/125 หมู่บ้านพฤกษา 78')
        })
        it('IOS page Two : "Product & Insurer" ',async() => {
            await method_iosSystem.select_Product_CTP30(page,'RVP','CTP30')
        })
        it('IOS page Three : "Product Details" ',async() => {
            await method_iosSystem.product_detail_CTP30(page,'12','1.30C','APRILIA','150')
        })
        it('IOS page Four : "Payment" ',async() => {
            await method_iosSystem.Payment_cash(page)
        })
    })
    describe('Work list for prints',() => {
        it('print report',async() => {
            await method_worklist.prints(page,name)
        })
        /*it('print card',async() => {
            await method_worklist.printsCard(page,name)
        })*/
    })


})
describe('CTP30 : รย.12_1.30D : รถจักรยานยนต์สาธารณะ เกิน 150 CC ', () => {
    // Set Up first open brownser
    before(async function(){
        browser = await puppeteer.launch({
            headless: config.isHeadless,
            slowMo: config.slowMo,
            devtools: config.isDevtools,
            timeout: config.launchTimeOut,
        })
        page = await browser.newPage()
        await page.setDefaultTimeout(config.waitingTimeOut)
        await page.setViewport({
            width: config.viewportWidth,
            height: config.viewportHeight
        })
        cityzens = await Utility.cityzens(page);
        name = 'โรบอท' + Utility.generateName(5)
    })
    after(async function() {
        await browser.close()
    })
    
    // Process E2E testing
    
    describe('Login browser',() => {
        it('goto SAS', async() => {
            await method_leadOnIOS.login(page);
        })
    })
    describe('Create New custormer on LeadOnIOS',() => {
        it('goto lead on IOS', async() => {
            await method_leadOnIOS.gotoLeadOnIOS(page)
        })
        it('add New Cutomer', async() => {
            await method_leadOnIOS.infoNewCutomer(page,name)
        })
        it('Add new Lead', async() => {
            await method_leadOnIOS.addNewLead(page)
        })
        it('Input detail data', async() => {
            await method_leadOnIOS.InputDetailToIOS(page,14,7)
        })
        it('Search Jobs and go to IOS',async() => {
            await method_leadOnIOS.searchJobOnLeadOnIOS(page,name)
            await method_leadOnIOS.clickSymbolGoToIOS(page)
        })
    })
    describe('Customer information without car license',() => {
        it('Create customer information',async() => {
            await method_leadOnIOS.cutomInfo_withoutLicense(page,cityzens,'ทดสอบพับแพ๊บเทีย','ก99','1234',"01/07/2534",44)
        })
    })
    describe('IOS-CTP30 process',() => {
        it('IOS page one : "Customer Detail status" ',async() => {
            await method_iosSystem.customerDetail_status(page,'โสด',1)
        })
        it('IOS page one : "Customer Detail address" ',async() => {
            await method_iosSystem.customerDetail_addr(page,'กรุงเทพมหานคร','เขตหนองจอก','หนองจอก','10530','287/125 หมู่บ้านพฤกษา 78')
        })
        it('IOS page Two : "Product & Insurer" ',async() => {
            await method_iosSystem.select_Product_CTP30(page,'RVP','CTP30')
        })
        it('IOS page Three : "Product Details" ',async() => {
            await method_iosSystem.product_detail_CTP30(page,'12','1.30D','APRILIA','1000')
        })
        it('IOS page Four : "Payment" ',async() => {
            await method_iosSystem.Payment_cash(page)
        })
    })
    describe('Work list for prints',() => {
        it('print report',async() => {
            await method_worklist.prints(page,name)
        })
        /*it('print card',async() => {
            await method_worklist.printsCard(page,name)
        })*/
    })


})
describe('CTP30 : รย.17_2.30A : รถจักรยานยนต์สาธารณะ ไม่เกิน 75 CC ', () => {
    // Set Up first open brownser
    before(async function(){
        browser = await puppeteer.launch({
            headless: config.isHeadless,
            slowMo: config.slowMo,
            devtools: config.isDevtools,
            timeout: config.launchTimeOut,
        })
        page = await browser.newPage()
        await page.setDefaultTimeout(config.waitingTimeOut)
        await page.setViewport({
            width: config.viewportWidth,
            height: config.viewportHeight
        })
        cityzens = await Utility.cityzens(page);
        name = 'โรบอท' + Utility.generateName(5)
    })
    after(async function() {
        await browser.close()
    })
    
    // Process E2E testing
    
    describe('Login browser',() => {
        it('goto SAS', async() => {
            await method_leadOnIOS.login(page);
        })
    })
    describe('Create New custormer on LeadOnIOS',() => {
        it('goto lead on IOS', async() => {
            await method_leadOnIOS.gotoLeadOnIOS(page)
        })
        it('add New Cutomer', async() => {
            await method_leadOnIOS.infoNewCutomer(page,name)
        })
        it('Add new Lead', async() => {
            await method_leadOnIOS.addNewLead(page)
        })
        it('Input detail data', async() => {
            await method_leadOnIOS.InputDetailToIOS(page,14,7)
        })
        it('Search Jobs and go to IOS',async() => {
            await method_leadOnIOS.searchJobOnLeadOnIOS(page,name)
            await method_leadOnIOS.clickSymbolGoToIOS(page)
        })
    })
    describe('Customer information without car license',() => {
        it('Create customer information',async() => {
            await method_leadOnIOS.cutomInfo_withoutLicense(page,cityzens,'ทดสอบพับแพ๊บเทีย','ก99','1234',"01/07/2534",44)
        })
    })
    describe('IOS-CTP30 process',() => {
        it('IOS page one : "Customer Detail status" ',async() => {
            await method_iosSystem.customerDetail_status(page,'โสด',1)
        })
        it('IOS page one : "Customer Detail address" ',async() => {
            await method_iosSystem.customerDetail_addr(page,'กรุงเทพมหานคร','เขตหนองจอก','หนองจอก','10530','287/125 หมู่บ้านพฤกษา 78')
        })
        it('IOS page Two : "Product & Insurer" ',async() => {
            await method_iosSystem.select_Product_CTP30(page,'RVP','CTP30')
        })
        it('IOS page Three : "Product Details" ',async() => {
            await method_iosSystem.product_detail_CTP30(page,'17','2.30A','APRILIA','75')
        })
        it('IOS page Four : "Payment" ',async() => {
            await method_iosSystem.Payment_cash(page)
        })
    })
    describe('Work list for prints',() => {
        it('print report',async() => {
            await method_worklist.prints(page,name)
        })
        /*it('print card',async() => {
            await method_worklist.printsCard(page,name)
        })*/
    })


})
describe('CTP30 : รย.17_2.30B : รถจักรยานยนต์สาธารณะ ไม่เกิน 125 CC ', () => {
    // Set Up first open brownser
    before(async function(){
        browser = await puppeteer.launch({
            headless: config.isHeadless,
            slowMo: config.slowMo,
            devtools: config.isDevtools,
            timeout: config.launchTimeOut,
        })
        page = await browser.newPage()
        await page.setDefaultTimeout(config.waitingTimeOut)
        await page.setViewport({
            width: config.viewportWidth,
            height: config.viewportHeight
        })
        cityzens = await Utility.cityzens(page);
        name = 'โรบอท' + Utility.generateName(5)
    })
    after(async function() {
        await browser.close()
    })
    
    // Process E2E testing
    
    describe('Login browser',() => {
        it('goto SAS', async() => {
            await method_leadOnIOS.login(page);
        })
    })
    describe('Create New custormer on LeadOnIOS',() => {
        it('goto lead on IOS', async() => {
            await method_leadOnIOS.gotoLeadOnIOS(page)
        })
        it('add New Cutomer', async() => {
            await method_leadOnIOS.infoNewCutomer(page,name)
        })
        it('Add new Lead', async() => {
            await method_leadOnIOS.addNewLead(page)
        })
        it('Input detail data', async() => {
            await method_leadOnIOS.InputDetailToIOS(page,14,7)
        })
        it('Search Jobs and go to IOS',async() => {
            await method_leadOnIOS.searchJobOnLeadOnIOS(page,name)
            await method_leadOnIOS.clickSymbolGoToIOS(page)
        })
    })
    describe('Customer information without car license',() => {
        it('Create customer information',async() => {
            await method_leadOnIOS.cutomInfo_withoutLicense(page,cityzens,'ทดสอบพับแพ๊บเทีย','ก99','1234',"01/07/2534",44)
        })
    })
    describe('IOS-CTP30 process',() => {
        it('IOS page one : "Customer Detail status" ',async() => {
            await method_iosSystem.customerDetail_status(page,'โสด',1)
        })
        it('IOS page one : "Customer Detail address" ',async() => {
            await method_iosSystem.customerDetail_addr(page,'กรุงเทพมหานคร','เขตหนองจอก','หนองจอก','10530','287/125 หมู่บ้านพฤกษา 78')
        })
        it('IOS page Two : "Product & Insurer" ',async() => {
            await method_iosSystem.select_Product_CTP30(page,'RVP','CTP30')
        })
        it('IOS page Three : "Product Details" ',async() => {
            await method_iosSystem.product_detail_CTP30(page,'17','2.30B','APRILIA','125')
        })
        it('IOS page Four : "Payment" ',async() => {
            await method_iosSystem.Payment_cash(page)
        })
    })
    describe('Work list for prints',() => {
        it('print report',async() => {
            await method_worklist.prints(page,name)
        })
        /*it('print card',async() => {
            await method_worklist.printsCard(page,name)
        })*/
    })


})
describe('CTP30 : รย.17_2.30C : รถจักรยานยนต์สาธารณะ ไม่เกิน 150 CC ', () => {
    // Set Up first open brownser
    before(async function(){
        browser = await puppeteer.launch({
            headless: config.isHeadless,
            slowMo: config.slowMo,
            devtools: config.isDevtools,
            timeout: config.launchTimeOut,
        })
        page = await browser.newPage()
        await page.setDefaultTimeout(config.waitingTimeOut)
        await page.setViewport({
            width: config.viewportWidth,
            height: config.viewportHeight
        })
        cityzens = await Utility.cityzens(page);
        name = 'โรบอท' + Utility.generateName(5)
    })
    after(async function() {
        await browser.close()
    })
    
    // Process E2E testing
    
    describe('Login browser',() => {
        it('goto SAS', async() => {
            await method_leadOnIOS.login(page);
        })
    })
    describe('Create New custormer on LeadOnIOS',() => {
        it('goto lead on IOS', async() => {
            await method_leadOnIOS.gotoLeadOnIOS(page)
        })
        it('add New Cutomer', async() => {
            await method_leadOnIOS.infoNewCutomer(page,name)
        })
        it('Add new Lead', async() => {
            await method_leadOnIOS.addNewLead(page)
        })
        it('Input detail data', async() => {
            await method_leadOnIOS.InputDetailToIOS(page,14,7)
        })
        it('Search Jobs and go to IOS',async() => {
            await method_leadOnIOS.searchJobOnLeadOnIOS(page,name)
            await method_leadOnIOS.clickSymbolGoToIOS(page)
        })
    })
    describe('Customer information without car license',() => {
        it('Create customer information',async() => {
            await method_leadOnIOS.cutomInfo_withoutLicense(page,cityzens,'ทดสอบพับแพ๊บเทีย','ก99','1234',"01/07/2534",44)
        })
    })
    describe('IOS-CTP30 process',() => {
        it('IOS page one : "Customer Detail status" ',async() => {
            await method_iosSystem.customerDetail_status(page,'โสด',1)
        })
        it('IOS page one : "Customer Detail address" ',async() => {
            await method_iosSystem.customerDetail_addr(page,'กรุงเทพมหานคร','เขตหนองจอก','หนองจอก','10530','287/125 หมู่บ้านพฤกษา 78')
        })
        it('IOS page Two : "Product & Insurer" ',async() => {
            await method_iosSystem.select_Product_CTP30(page,'RVP','CTP30')
        })
        it('IOS page Three : "Product Details" ',async() => {
            await method_iosSystem.product_detail_CTP30(page,'17','2.30C','APRILIA','150')
        })
        it('IOS page Four : "Payment" ',async() => {
            await method_iosSystem.Payment_cash(page)
        })
    })
    describe('Work list for prints',() => {
        it('print report',async() => {
            await method_worklist.prints(page,name)
        })
        /*it('print card',async() => {
            await method_worklist.printsCard(page,name)
        })*/
    })


})
describe('CTP30 : รย.17_2.30D : รถจักรยานยนต์สาธารณะ เกิน 150 CC ', () => {
    // Set Up first open brownser
    before(async function(){
        browser = await puppeteer.launch({
            headless: config.isHeadless,
            slowMo: config.slowMo,
            devtools: config.isDevtools,
            timeout: config.launchTimeOut,
        })
        page = await browser.newPage()
        await page.setDefaultTimeout(config.waitingTimeOut)
        await page.setViewport({
            width: config.viewportWidth,
            height: config.viewportHeight
        })
        cityzens = await Utility.cityzens(page);
        name = 'โรบอท' + Utility.generateName(5)
    })
    after(async function() {
        await browser.close()
    })
    
    // Process E2E testing
    
    describe('Login browser',() => {
        it('goto SAS', async() => {
            await method_leadOnIOS.login(page);
        })
    })
    describe('Create New custormer on LeadOnIOS',() => {
        it('goto lead on IOS', async() => {
            await method_leadOnIOS.gotoLeadOnIOS(page)
        })
        it('add New Cutomer', async() => {
            await method_leadOnIOS.infoNewCutomer(page,name)
        })
        it('Add new Lead', async() => {
            await method_leadOnIOS.addNewLead(page)
        })
        it('Input detail data', async() => {
            await method_leadOnIOS.InputDetailToIOS(page,14,7)
        })
        it('Search Jobs and go to IOS',async() => {
            await method_leadOnIOS.searchJobOnLeadOnIOS(page,name)
            await method_leadOnIOS.clickSymbolGoToIOS(page)
        })
    })
    describe('Customer information without car license',() => {
        it('Create customer information',async() => {
            await method_leadOnIOS.cutomInfo_withoutLicense(page,cityzens,'ทดสอบพับแพ๊บเทีย','ก99','1234',"01/07/2534",44)
        })
    })
    describe('IOS-CTP30 process',() => {
        it('IOS page one : "Customer Detail status" ',async() => {
            await method_iosSystem.customerDetail_status(page,'โสด',1)
        })
        it('IOS page one : "Customer Detail address" ',async() => {
            await method_iosSystem.customerDetail_addr(page,'กรุงเทพมหานคร','เขตหนองจอก','หนองจอก','10530','287/125 หมู่บ้านพฤกษา 78')
        })
        it('IOS page Two : "Product & Insurer" ',async() => {
            await method_iosSystem.select_Product_CTP30(page,'RVP','CTP30')
        })
        it('IOS page Three : "Product Details" ',async() => {
            await method_iosSystem.product_detail_CTP30(page,'17','2.30D','APRILIA','1000')
        })
        it('IOS page Four : "Payment" ',async() => {
            await method_iosSystem.Payment_cash(page)
        })
    })
    describe('Work list for prints',() => {
        it('print report',async() => {
            await method_worklist.prints(page,name)
        })
        it('print card',async() => {
            await method_worklist.printsCard(page,name)
        })
    })


})
describe('CTP30 : รย.17_3.30A : รถจักรยานยนต์สาธารณะ ไม่เกิน 75 CC ', () => {
    // Set Up first open brownser
    before(async function(){
        browser = await puppeteer.launch({
            headless: config.isHeadless,
            slowMo: config.slowMo,
            devtools: config.isDevtools,
            timeout: config.launchTimeOut,
        })
        page = await browser.newPage()
        await page.setDefaultTimeout(config.waitingTimeOut)
        await page.setViewport({
            width: config.viewportWidth,
            height: config.viewportHeight
        })
        cityzens = await Utility.cityzens(page);
        name = 'โรบอท' + Utility.generateName(5)
    })
    after(async function() {
        await browser.close()
    })
    
    // Process E2E testing
    
    describe('Login browser',() => {
        it('goto SAS', async() => {
            await method_leadOnIOS.login(page);
        })
    })
    describe('Create New custormer on LeadOnIOS',() => {
        it('goto lead on IOS', async() => {
            await method_leadOnIOS.gotoLeadOnIOS(page)
        })
        it('add New Cutomer', async() => {
            await method_leadOnIOS.infoNewCutomer(page,name)
        })
        it('Add new Lead', async() => {
            await method_leadOnIOS.addNewLead(page)
        })
        it('Input detail data', async() => {
            await method_leadOnIOS.InputDetailToIOS(page,14,7)
        })
        it('Search Jobs and go to IOS',async() => {
            await method_leadOnIOS.searchJobOnLeadOnIOS(page,name)
            await method_leadOnIOS.clickSymbolGoToIOS(page)
        })
    })
    describe('Customer information without car license',() => {
        it('Create customer information',async() => {
            await method_leadOnIOS.cutomInfo_withoutLicense(page,cityzens,'ทดสอบพับแพ๊บเทีย','ก99','1234',"01/07/2534",44)
        })
    })
    describe('IOS-CTP30 process',() => {
        it('IOS page one : "Customer Detail status" ',async() => {
            await method_iosSystem.customerDetail_status(page,'โสด',1)
        })
        it('IOS page one : "Customer Detail address" ',async() => {
            await method_iosSystem.customerDetail_addr(page,'กรุงเทพมหานคร','เขตหนองจอก','หนองจอก','10530','287/125 หมู่บ้านพฤกษา 78')
        })
        it('IOS page Two : "Product & Insurer" ',async() => {
            await method_iosSystem.select_Product_CTP30(page,'RVP','CTP30')
        })
        it('IOS page Three : "Product Details" ',async() => {
            await method_iosSystem.product_detail_CTP30(page,'17','3.30A','APRILIA','75')
        })
        it('IOS page Four : "Payment" ',async() => {
            await method_iosSystem.Payment_cash(page)
        })
    })
    describe('Work list for prints',() => {
        it('print report',async() => {
            await method_worklist.prints(page,name)
        })
        it('print card',async() => {
            await method_worklist.printsCard(page,name)
        })
    })


})
describe('CTP30 : รย.17_2.30B : รถจักรยานยนต์สาธารณะ ไม่เกิน 125 CC ', () => {
    // Set Up first open brownser
    before(async function(){
        browser = await puppeteer.launch({
            headless: config.isHeadless,
            slowMo: config.slowMo,
            devtools: config.isDevtools,
            timeout: config.launchTimeOut,
        })
        page = await browser.newPage()
        await page.setDefaultTimeout(config.waitingTimeOut)
        await page.setViewport({
            width: config.viewportWidth,
            height: config.viewportHeight
        })
        cityzens = await Utility.cityzens(page);
        name = 'โรบอท' + Utility.generateName(5)
    })
    after(async function() {
        await browser.close()
    })
    
    // Process E2E testing
    
    describe('Login browser',() => {
        it('goto SAS', async() => {
            await method_leadOnIOS.login(page);
        })
    })
    describe('Create New custormer on LeadOnIOS',() => {
        it('goto lead on IOS', async() => {
            await method_leadOnIOS.gotoLeadOnIOS(page)
        })
        it('add New Cutomer', async() => {
            await method_leadOnIOS.infoNewCutomer(page,name)
        })
        it('Add new Lead', async() => {
            await method_leadOnIOS.addNewLead(page)
        })
        it('Input detail data', async() => {
            await method_leadOnIOS.InputDetailToIOS(page,14,7)
        })
        it('Search Jobs and go to IOS',async() => {
            await method_leadOnIOS.searchJobOnLeadOnIOS(page,name)
            await method_leadOnIOS.clickSymbolGoToIOS(page)
        })
    })
    describe('Customer information without car license',() => {
        it('Create customer information',async() => {
            await method_leadOnIOS.cutomInfo_withoutLicense(page,cityzens,'ทดสอบพับแพ๊บเทีย','ก99','1234',"01/07/2534",44)
        })
    })
    describe('IOS-CTP30 process',() => {
        it('IOS page one : "Customer Detail status" ',async() => {
            await method_iosSystem.customerDetail_status(page,'โสด',1)
        })
        it('IOS page one : "Customer Detail address" ',async() => {
            await method_iosSystem.customerDetail_addr(page,'กรุงเทพมหานคร','เขตหนองจอก','หนองจอก','10530','287/125 หมู่บ้านพฤกษา 78')
        })
        it('IOS page Two : "Product & Insurer" ',async() => {
            await method_iosSystem.select_Product_CTP30(page,'RVP','CTP30')
        })
        it('IOS page Three : "Product Details" ',async() => {
            await method_iosSystem.product_detail_CTP30(page,'17','3.30B','APRILIA','125')
        })
        it('IOS page Four : "Payment" ',async() => {
            await method_iosSystem.Payment_cash(page)
        })
    })
    describe('Work list for prints',() => {
        it('print report',async() => {
            await method_worklist.prints(page,name)
        })
        it('print card',async() => {
            await method_worklist.printsCard(page,name)
        })
    })


})
describe('CTP30 : รย.17_2.30C : รถจักรยานยนต์สาธารณะ ไม่เกิน 150 CC ', () => {
    // Set Up first open brownser
    before(async function(){
        browser = await puppeteer.launch({
            headless: config.isHeadless,
            slowMo: config.slowMo,
            devtools: config.isDevtools,
            timeout: config.launchTimeOut,
        })
        page = await browser.newPage()
        await page.setDefaultTimeout(config.waitingTimeOut)
        await page.setViewport({
            width: config.viewportWidth,
            height: config.viewportHeight
        })
        cityzens = await Utility.cityzens(page);
        name = 'โรบอท' + Utility.generateName(5)
    })
    after(async function() {
        await browser.close()
    })
    
    // Process E2E testing
    
    describe('Login browser',() => {
        it('goto SAS', async() => {
            await method_leadOnIOS.login(page);
        })
    })
    describe('Create New custormer on LeadOnIOS',() => {
        it('goto lead on IOS', async() => {
            await method_leadOnIOS.gotoLeadOnIOS(page)
        })
        it('add New Cutomer', async() => {
            await method_leadOnIOS.infoNewCutomer(page,name)
        })
        it('Add new Lead', async() => {
            await method_leadOnIOS.addNewLead(page)
        })
        it('Input detail data', async() => {
            await method_leadOnIOS.InputDetailToIOS(page,14,7)
        })
        it('Search Jobs and go to IOS',async() => {
            await method_leadOnIOS.searchJobOnLeadOnIOS(page,name)
            await method_leadOnIOS.clickSymbolGoToIOS(page)
        })
    })
    describe('Customer information without car license',() => {
        it('Create customer information',async() => {
            await method_leadOnIOS.cutomInfo_withoutLicense(page,cityzens,'ทดสอบพับแพ๊บเทีย','ก99','1234',"01/07/2534",44)
        })
    })
    describe('IOS-CTP30 process',() => {
        it('IOS page one : "Customer Detail status" ',async() => {
            await method_iosSystem.customerDetail_status(page,'โสด',1)
        })
        it('IOS page one : "Customer Detail address" ',async() => {
            await method_iosSystem.customerDetail_addr(page,'กรุงเทพมหานคร','เขตหนองจอก','หนองจอก','10530','287/125 หมู่บ้านพฤกษา 78')
        })
        it('IOS page Two : "Product & Insurer" ',async() => {
            await method_iosSystem.select_Product_CTP30(page,'RVP','CTP30')
        })
        it('IOS page Three : "Product Details" ',async() => {
            await method_iosSystem.product_detail_CTP30(page,'17','3.30C','APRILIA','150')
        })
        it('IOS page Four : "Payment" ',async() => {
            await method_iosSystem.Payment_cash(page)
        })
    })
    describe('Work list for prints',() => {
        it('print report',async() => {
            await method_worklist.prints(page,name)
        })
        it('print card',async() => {
            await method_worklist.printsCard(page,name)
        })
    })


})
describe('CTP30 : รย.17_2.30D : รถจักรยานยนต์สาธารณะ เกิน 150 CC ', () => {
    // Set Up first open brownser
    before(async function(){
        browser = await puppeteer.launch({
            headless: config.isHeadless,
            slowMo: config.slowMo,
            devtools: config.isDevtools,
            timeout: config.launchTimeOut,
        })
        page = await browser.newPage()
        await page.setDefaultTimeout(config.waitingTimeOut)
        await page.setViewport({
            width: config.viewportWidth,
            height: config.viewportHeight
        })
        cityzens = await Utility.cityzens(page);
        name = 'โรบอท' + Utility.generateName(5)
    })
    after(async function() {
        await browser.close()
    })
    
    // Process E2E testing
    
    describe('Login browser',() => {
        it('goto SAS', async() => {
            await method_leadOnIOS.login(page);
        })
    })
    describe('Create New custormer on LeadOnIOS',() => {
        it('goto lead on IOS', async() => {
            await method_leadOnIOS.gotoLeadOnIOS(page)
        })
        it('add New Cutomer', async() => {
            await method_leadOnIOS.infoNewCutomer(page,name)
        })
        it('Add new Lead', async() => {
            await method_leadOnIOS.addNewLead(page)
        })
        it('Input detail data', async() => {
            await method_leadOnIOS.InputDetailToIOS(page,14,7)
        })
        it('Search Jobs and go to IOS',async() => {
            await method_leadOnIOS.searchJobOnLeadOnIOS(page,name)
            await method_leadOnIOS.clickSymbolGoToIOS(page)
        })
    })
    describe('Customer information without car license',() => {
        it('Create customer information',async() => {
            await method_leadOnIOS.cutomInfo_withoutLicense(page,cityzens,'ทดสอบพับแพ๊บเทีย','ก99','1234',"01/07/2534",44)
        })
    })
    describe('IOS-CTP30 process',() => {
        it('IOS page one : "Customer Detail status" ',async() => {
            await method_iosSystem.customerDetail_status(page,'โสด',1)
        })
        it('IOS page one : "Customer Detail address" ',async() => {
            await method_iosSystem.customerDetail_addr(page,'กรุงเทพมหานคร','เขตหนองจอก','หนองจอก','10530','287/125 หมู่บ้านพฤกษา 78')
        })
        it('IOS page Two : "Product & Insurer" ',async() => {
            await method_iosSystem.select_Product_CTP30(page,'RVP','CTP30')
        })
        it('IOS page Three : "Product Details" ',async() => {
            await method_iosSystem.product_detail_CTP30(page,'17','3.30D','APRILIA','1000')
        })
        it('IOS page Four : "Payment" ',async() => {
            await method_iosSystem.Payment_cash(page)
        })
    })
    describe('Work list for prints',() => {
        it('print report',async() => {
            await method_worklist.prints(page,name)
        })
        it('print card',async() => {
            await method_worklist.printsCard(page,name)
        })
    })


})


