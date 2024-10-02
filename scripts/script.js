const iframe = document.getElementById("api-frame");
var client = new Sketchfab( iframe );
let api;
const uid = 'b50588e7af524b1facdececb130e2e0c';
var boutonAide = document.querySelector("input");

const error = () => window.console.error('Sketchfab API error');
const success = apiClient => {
api = apiClient; 


let decl=0;
let indic=0;




//------------------------------------------------
api.start(function () {
    api.addEventListener('viewerready', () => {
        api.getNodeMap(function(err, nodes) {
            if (!err) {window.console.log(nodes); }
        });











      //-----------------------------------ajoute une annotation
      api.addEventListener('click', function (info) {

        posX=info.position3D[0];
        posY=info.position3D[1];
        posZ=info.position3D[2];

        declaration = document.getElementById("texteNoteNew").value
        if (declaration.length === 0) {
          console.log("la déclaration est vide" );
        } else if (declaration.length === null) {
          console.log("la déclaration est null");
        } else if (decl == 0) {
            api.createAnnotationFromScenePosition( //position annotation , position camera, target camera (=position annotation), title, text
              [posX,posY,posZ],
              [0, -.2, .13],
              [0, 0, -.02],
              document.getElementById("texteNoteNew").value,
              "",
            );
            // console.log(info);

            api.getAnnotationList(function (p, list) {
              nbAnnotMax=list.length;
              api.gotoAnnotation(nbAnnotMax-1,  {preventCameraAnimation: false, preventCameraMove: false}, function(err, index) {
                if (!err) {   console.log('Going to annotation', index + 1);  }
              });
            });

            indic++;
            decl=0; //évite de re-créer une nouvelle annotation et prépare la prochaine étape qui consiste à donner les instructions
            document.getElementById("texteNoteNew").value="";
        };


      }); //------------------------- FIN ajoute une annotation


}); // api.addEventListener('viewerready'
}); // api.start(
};