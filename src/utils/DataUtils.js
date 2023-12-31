export default {
  sleep: function (ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
  isMissingData: function (data) {
    return (data === '?' || data === null || data === undefined)
  },
  parseNumber: async function (value) {
    if (Array.isArray(value)) {
      let ary = []
      for (let len = value.length, i  = len; i > 0; i--) {
        let index = (len - i)
        ary.push(await this.parseNumber(value[index]))
        
        if (i % 5000 === 2500) {
          //console.log('parseNumber', i)
          await this.sleep()
        }
      }
      
      return ary
    }
    
    if (this.isMissingData(value)) {
      return value
    }
    
    if (typeof value === 'string' && value !== '' && !isNaN(value)) {
      return Number(value)
    }
    else {
      return value
    }
  },
  randomBetween: function (min, max) {
    if (!max && min > 0) {
      max = min
      min = 0
    }

    if (max > 0 && min > 0 && max < min) {
      let temp = min
      min = max
      max = temp
    }

    return Math.floor(Math.random() * max) + min;
  }
}