module.exports = {
    click: async function(page, selector){
        try{
          await page.waitForSelector(selector)
          await page.click(selector)

        } catch(error){
            throw new Error('Could not click on selector : ' + selector)
        }
    },
    typeText: async function(page, text, selector){
        try {
            await page.waitForSelector(selector)
            await page.type(selector,text)
            //await page.keyboard.press('Enter')
        } catch (error) {
            throw new Error('Could not type text on selector : ' + selector)
        }
    },
    loadUrl: async function(page, url){
        await page.goto(url, {waitUntil: 'networkidle0'})
    },
    getText: async function(page,selector){
        try {
            await page.waitForSelector(selector)
            return page.$eval(selector, e => e.innerHtml)
        } catch (error) {
            throw new Error('cannot get text from selector : ' + selector)
        }
    },
    getCount: async function(page,selector){
        try {
            await page.waitForSelector(selector)
            return page.$$eval( selector, items => items.length)
        } catch (error) {
            throw new Error('cannot get count of selector :' + selector )
        }
    },
    waitForText: async function(page, selector, text){
        try {
            await page.waitForSelector(selector)
            await page.waitForFunction((selector, text) =>
                document.querySelector(selector).innerText.includes(text),
                {},
                selector,
                text
            )
        } catch (error) {
            throw new Error('text: ' + text + ' not found for selector '+ selector)
        }
    },
    pressKey: async function(page,key){
        try {
            await page.keyboard.press(key)
        } catch (error) {
            throw new Error('Could not press key: ' + key + 'on the keybroad')
        }
    },
    shouldExist: async function(page,selector){
        try {
            await page.waitForSelector(selector)
        } catch (error) {
            throw new Error('connot should exitst : ' + selector)
        }
    },
    selectFrameclick: async function(page,selector){
        try {
            await page.waitFor(1000)
            await page.waitForSelector('#iframe_content', { delay: 100 });
            const frame = await page.frames().find(f => f.name() === 'iframe_content'); 
            await frame.waitForSelector(selector);
            //const frame = await page.mainFrame().childFrames()
            //const iframe = page.frames()[1];
            const button = await frame.$(selector);
            await button.click();
        } catch (error) {
            console.log(error)
            throw new Error('Could not select Frame click with selector : ' + selector)
        }
    },
    selectFrametypeText: async function(page, text, selector){
        try {
            const frame = await page.frames().find(f => f.name() === 'iframe_content'); 
            await frame.waitForSelector(selector, { delay: 200 });
            await (await frame.$(selector)).type(String(text)); 
        } catch (error) {
            throw new Error('Could not select Frame type Text on selector : ' + selector)
        }
    },
    /*selectFrameselectOption: async function(page, selector, val){
        try {
            await page.waitForSelector('#iframe_content', { delay: 100 });
            var frame = await page.frames().find(f => f.name() === 'iframe_content')
            await frame.waitForSelector(selector)
            await frame.$eval((selector,val) => {selector, el => el.value = val},selector,val)
            return frame
            
        } catch (error) {
            console.log(error);
            throw new Error('Could not select Frame click with selector : ' + selector)
        }
    },*/
    selectFrame: async function(page){
        try {
            await page.waitForSelector('#iframe_content', { delay: 200 });
            var frame = await page.frames().find(f => f.name() === 'iframe_content')
            return frame
            
        } catch (error) {
            console.log(error);
            throw new Error('Could not select Frame click with selector : ' + selector)
        }
    },
    acceptAlert: async function(page){
        try {
            page.on("dialog", (dialog) => {
                dialog.accept()
              });
            
        } catch (error) {
            throw new Error('Can not Accept Alert')
        }
    }
    /*
    # Get inner text
    const innerText = await page.evaluate(() => document.querySelector('#mydiv').innerText);
    # Get inner HTML
    const innerHTML = await page.evaluate(() => document.querySelector('#mydiv').innerHTML);*/
}
