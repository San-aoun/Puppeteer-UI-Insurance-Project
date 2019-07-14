module.exports = {
    generateID: function(length) {
        let result = ''
        let characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        let charactersLegth = characters.length
        for(let i = 0; i < length; i++){
            result += characters.charAt(Math.floor(Math.random() * charactersLegth))
        }
        return result
    },
    generateName: function(length) {
        let result = ''
        let name = ''
        let characters ='กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถธนบปผฝพฟภมยรลวศษสหฬอฮ'
        let charactersLegth = characters.length
        for(let i = 0; i < length; i++){
            result += characters.charAt(Math.floor(Math.random() * charactersLegth))
            //name = 'โรบอท' + result
        }
        return result
    },
    generateEmail:  function(){
        let values = 'abcdefghijklmnop123456789'
        let email = ''
        let temp
        for(let i = 0; i < 10; i++){
            temp = values.charAt(Math.round(values.length * Math.random()))
            email += temp
        }
        temp =''
        email += '@'
        for(let i=0; i< 8; i++){
            temp = values.charAt(Math.round(values.length * Math.random()))
            email += temp
        }
        email += '.com'
        return email
    },
    generateNumbers: function(){
        let phoneNums = ''
        let prefixNum = ['07','08','09']
        let numbers = Math.floor(Math.random() * 90000000) + 10000000
        prefixNum.forEach(element => {
            phoneNums = element + numbers.toString()
        });
        return phoneNums
    },
    generateNum: function(length){
        let no = ''
        let characters ='0123456789'
        let charactersLegth = characters.length
        for(let i = 0; i < length; i++){
            result += characters.charAt(Math.floor(Math.random() * charactersLegth))
            console.log(result)
        }
        return result
    },
    cityzens: async function(page){
        try {
            await page.goto('http://www.kzynet.com/tools/thai_citizen_id_generator/')
            await page.click('#button')
            await page.click('.blackGreen')
            cityzens = await page.$eval("#sample-citizen-id", el => el.value);
            return cityzens
        } catch (error) {
           throw new error('') 
        }
    },

}
