// // Import everything
import './style.css';
import * as face from 'face-api.js';
import imageCroper from 'crop-image';


//load model for face detect
try {
  await face.loadSsdMobilenetv1Model(
    'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/ssd_mobilenetv1_model-weights_manifest.json'
  );
  await face.loadTinyFaceDetectorModel(
    'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/tiny_face_detector_model-weights_manifest.json'
  );
} catch (error) {
  //hendel error for loadind model,
  //show user the loading error
  console.log('This is come s from face data lode erroe' + error);
}


//select all element in javascript
const model = document.querySelector('#myFace');
const preview = document.getElementById('preview');
const fileImg = document.getElementById('img');



//input file change event
fileImg.addEventListener('change',async function (e) {

  for (let index = 0; index < e.target.files.length; index++) {
    model.src = URL.createObjectURL(e.target.files[index]);

    try {
      
      const myFase = await face.detectSingleFace(model);
      console.log(myFase);

      const nosePointX = myFase._box._x + myFase._box._width / 2;
      const nosePointY = myFase._box._y + myFase._box._height / 2;

      const cropedHeight = myFase._box._height * 2.875;
      const cropedWidth = cropedHeight / 1.333;

      const cropTrashHoldHeight = cropedHeight * 0.4;
      const cropTrashHoldWidth = cropedWidth / 2;
      const cropPointX = nosePointX - cropTrashHoldWidth;
      const cropPointY = nosePointY - cropTrashHoldHeight;

      console.log('nose point : ' + nosePointX, nosePointY);
      console.log('croped size : ' + cropedWidth, cropedHeight);
      console.log('Crop point : ' + cropPointX, cropPointY);

      const cropFace = URL.createObjectURL(
        imageCroper(model, cropPointX, cropPointY, cropedWidth, cropedHeight)
      );
      preview.src = cropFace;

      //downlode image function
      var a = document.createElement('a');
      a.href = cropFace;
      a.innerHTML = 'downlode';
      a.setAttribute('download', 'blob.png');
      a.click();
      document.body.appendChild(a);

    } catch (error) {
      console.log(error);
    }
    
  }
});



//lode model data


// add a event to complet loaded site to seet user site is ready!

// needed data       _box ===>  _height   _width   _x   _y
// needed data       _imageDims ===> _height   _width
//idal image size 450:600 = 1:1.33333333
//hhole croped sized height = faceheight * 2.875
//hhole croped sized width = (faceheight * 2.875) / 1.333
//width trashhold = CropedWidth / 2
//height trashold = croped Height / 1.58



