var canvas=document.createElement("canvas");
var ctx=canvas.getContext("2d");
var cw=canvas.width;
var ch=canvas.height;
var maxW = 1000;
var maxH = 1000;

var input = document.getElementById('inputFileToLoad');
input.addEventListener('change', handleFiles);
function handleFiles(e) {
    let uploadType = input.files[0].type;
    
    switch(uploadType) {
        case "image/png":
            maxW = 512;
            maxH = 512;
            break
    }
    
    var img = new Image;
    console.log("handle")
    // var output = document.getElementById('pictureString');
    var show = document.getElementById('profile-picture');


    img.onload = function() {
        var iw=img.width;
        var ih=img.height;
        var scale=Math.min((maxW/iw),(maxH/ih));

        var iwScaled=iw*scale;
        var ihScaled=ih*scale;
        
        canvas.width=iwScaled;
        canvas.height=ihScaled;
        ctx.drawImage(img,0,0,iwScaled,ihScaled);
        // output.value = btoa(canvas.toDataURL(input.files[0].type,0.5));
        show.src =  canvas.toDataURL(input.files[0].type,0.5);
        show.src = img.src 
    }
    img.src = URL.createObjectURL(e.target.files[0]);
    
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(e);
})
// let blob = new Blob(JSON.parse(test.data), {type: 'image/jpeg'});
// let blobUrl = URL.createObjectURL(blob);
// console.log(blobUrl)


// const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
//     const byteCharacters = atob(b64Data);
//     const byteArrays = [];
  
//     for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
//       const slice = byteCharacters.slice(offset, offset + sliceSize);
  
//       const byteNumbers = new Array(slice.length);
//       for (let i = 0; i < slice.length; i++) {
//         byteNumbers[i] = slice.charCodeAt(i);
//       }
  
//       const byteArray = new Uint8Array(byteNumbers);
//       byteArrays.push(byteArray);
//     }
  
//     const blob = new Blob(byteArrays, {type: contentType});
//     return blob;
//   }
//   const blobUrl = URL.createObjectURL(blob);
  
//   window.location = blobUrl;
