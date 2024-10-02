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
let etuiSurTable=0;
let etui1 = 0;
let etui2 = 0;

const obj = [ //tableau copié du terminal (attention, ôter les espaces dans le nom entre ' ')
    ['K1.bas', 63, 0,      -77, -41, 0 ],
    ['K2.hau', 273, 77,    -66, -41, 20 ],
    ['K3.bas', 49, 0,      -55, -41, 0 ],
    ['K4.hau', 287, 35,    -44, -41, 20 ],
    ['K5.bas', 91, 0,      -75, -10, 0 ],
    ['K6.hau', 301, 105,   -61, -10, 27 ],
    ['K7.hau', 315, 119,   -47, -10, 27 ],
    ['K8.hau', 343, 133,   -70, 30, 27 ],
    ['K9.hau', 329, 147,   -56, 30, 27 ],

    ['E1.000', 3,0, 54, 0, 0 ],
    ['E1.001', 161,0, 54, 10, 0 ],
    ['E1.002', 175,0, 54, 20, 0 ],
    ['E1.003', 189,0, 54, 30, 0 ],
    ['E1.004', 203,0, 54, 40, 0 ],

    ['E2.000', 21,0, 70, 0, 0 ],
    ['E2.001', 217,0, 70, 10, 0 ],
    ['E2.002', 231,0, 70, 20, 0 ],
    ['E2.003', 245,0, 70, 30, 0 ],
    ['E2.004', 259,0, 70, 40, 0 ],

    // ['BtN45_', 371 ],
    // ['BtN90_', 385 ],
    // ['BtE45_', 399 ],
    // ['BtE90_', 413 ],
    // ['BtS45_', 427 ],
    // ['BtS90_', 441 ],
    // ['BtO45_', 455 ],
    // ['BtO90_', 469 ],
    // ['Bt000_', 483 ],
    // ['BtRot_', 497 ],

    // ['platea', 357 ],
    // ['text.0', 511 ]
];

// const tablePos = [ 
//     ['E111', -63 , 23 ],
//     ['K800', -65, -36 ]
// ];
// const tableBoutons = [
//     ['Bt000', -18.8, 30.26, 15.2 ],
//     ['BtO90', -28.88, 30.18, 6.14 ]
// ];


//------------------------------------------------
api.start(function () {
    api.addEventListener('viewerready', () => {
        api.getNodeMap(function(err, nodes) {
            if (!err) {window.console.log(nodes); }
        });
        // api.hide(558); //bouton rotation non programmé
        api.getNodeMap(function(err, nodes) { //récupère les tables de nodeName et instanceId de la scène
            if (!err) {
                if (typeof nodes === 'object') {
                for (const key in nodes) {
                    if (Object.hasOwnProperty.call(nodes, key)) {
                    const node = nodes[key];
                    nodeName = node.name;
                    instanceId = node.instanceID;
                    if (nodeName !== undefined) {
                        if (nodeName.includes("_")) {
                            nodeNameSlice = nodeName.slice(0, 6);
                            // console.log("['",nodeNameSlice, "',",instanceId, "],"); //récupère les noms et ID pour copier dans tableObjets
                        }
                    }
                    }
                }
                } else {console.error('nodes n\'est pas un objet.');}
            } else {console.error('Erreur lors de la récupération des nœuds :', err);}
        });




//-----------------------------------déplace les objets ou ajoute une annotation      
      api.addEventListener('click', function (info) {
        if (info.instanceID) {  // le clic se fait effectivement sur un objet 
            window.console.log('clicked node', info.instanceID);
            posX=info.position3D[0];
            posY=info.position3D[1];
            posZ=info.position3D[2];
            console.log(posX,posY,posZ);
            //----------------------------------
            if ((posX>-.035) && (posX<.035)) { //ajoute une annotation, si le champ texte n'est pas vide et que le clic se fait sur la table centrale
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
            } else { //clic sur la table de droite ou de gauche
                if ((info.instanceID != 357) && (info.instanceID != 511)) { //clic autre chose que la scène (objet ou bouton)
                    if (posX<-.035) { //selection d'un étui, table de gauche
                        for (let i = 0; i < obj.length; i++) {
                            var clic = info.instanceID-2;
                            if (obj[i][1] == etui1) { // translate( instanceID, translateTo XZY, options, [callback] )
                                window.console.log("table obj", obj[i][1], obj[i][2], obj[i][5])
                                api.translate(etui1, [obj[i][3]/1000, obj[i][5]/1000, -obj[i][4]/1000], {duration: .2, easing: 'easeOutQuad'}, function(err, translateTo) {});
                                api.translate(etui2, [obj[i][3]/1000, 0,              -obj[i][4]/1000], {duration: .2, easing: 'easeOutQuad'}, function(err, translateTo) {});
                            };
                        };
                        for (let i = 0; i < obj.length; i++) {
                            var clic = info.instanceID-2;
                            if ((clic == obj[i][1]) || (clic == obj[i][2])) { // translate( instanceID, translateTo XZY, options, [callback] )
                                window.console.log("table obj", obj[i][1], obj[i][2], obj[i][5])
                                api.translate(obj[i][1], [0, obj[i][5]/1000, 0], {duration: .2, easing: 'easeOutQuad'}, function(err, translateTo) {});
                                api.translate(obj[i][2], [0, 0, 0], {duration: .2, easing: 'easeOutQuad'}, function(err, translateTo) {});
                                etui1 = obj[i][1];
                                etui2 = obj[i][2];
                            };
                        };

                        
                    }
                }
            };


            //----------------------------------
            
        };
                //----------------------------------




      }); //------------------------- 


}); // api.addEventListener('viewerready'
}); // api.start(
};