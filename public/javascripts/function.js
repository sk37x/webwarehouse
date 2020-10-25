const prepareDate = (dateString) => {
    dateString = String(dateString)
    let yearSplit = dateString.split('/')
    yearSplit[yearSplit.length - 1] = parseInt(yearSplit[yearSplit.length - 1]) - 543
    let textDate = '';
    for(let i = 2; i >= 0; (textDate += yearSplit[i] + (i !== 0 ?  ',': '')), i--);
    let d = new Date();
    textDate += ' ' + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
    return new Date(textDate);
}
const compareDate2TextTH = (objDate) => {
    let monthArr = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
    return `${objDate.getDate()} ${monthArr[objDate.getMonth()]} ${objDate.getFullYear() + 543}`;
}

const renderImage = (elemView, elemFile) => {
    const preview = document.querySelector(elemView);
    const file = elemFile.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function () {
        // convert image file to base64 string
        preview.height = '150'
        preview.width = '150'
        preview.src = reader.result;
      }, false);
    
      if (file) {
        reader.readAsDataURL(file);
      }
}


const validNumber = (event, elem = null) => {
  if(event.which != 8 && isNaN(String.fromCharCode(event.which))){
      if(!!elem){
          if(String.fromCharCode(event.which) !== '.' || /\./g.test($(elem).val())) event.preventDefault();
      } else {
          event.preventDefault();
      }
  }
}

const addComma = (str) => {
  str = String(str);
  let newVal = '';
  let t = str.split('.')
  newVal += t[0].length > 0 ? t[0] : '0';
  let regxr = /^(\d+)(\d{3})/g;
  while(regxr.test(newVal)){
      newVal = newVal.replace(regxr, '$1,$2');
  }
  newVal += t.length > 1 ? '.' + t[1] : '.00';
  return newVal;
}

const removeComma = (str) => {
  str = String(str);
  while(str.indexOf(',') > 0){
      str = str.replace(',','');
  }
  return str;
}


// length = ขนาด random, type = คำขึ้นต้น, spacialChar = อักขระขั้น 
// วิธีใช้ makeid(5, 'TEST', '/') : output - TEST/#####
const makeid = (length, type = '', spacialChar = '') => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return type + spacialChar + result;
}
// console.log(makeid(5));
