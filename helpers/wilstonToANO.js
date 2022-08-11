module.exports = function wilstonToANO(wilston) {
    wilston = wilston.toString()
  
    let finalWilston=new Array(12).fill("0")
    wilston = wilston.split("").reverse()

    wilston.forEach((wi, wii) => {
        finalWilston[wii] = wi
    })
    
    finalWilston=finalWilston.reverse()
    finalWilston[finalWilston.length-12]="."+finalWilston[finalWilston.length-12]
    finalWilston="0"+finalWilston.join("")
    return parseFloat(finalWilston)
  }