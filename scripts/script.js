const iframe = document.getElementById("api-frame");
var client = new Sketchfab( iframe );
let api;
// const uid = 'b50588e7af524b1facdececb130e2e0c';
const uid = '5d2dfb9d66c24b14962467955775f305';

var boutonAide = document.querySelector("input");

const error = () => window.console.error('Sketchfab API error');
const success = apiClient => {
api = apiClient; 

var clic = 0;
let etui1 = 0;
let etui2 = 0;
let clicNom = "";
let clicID1 = 0;
let clicID2 = 0;
let surSphere = 0;
let SX=1;
let SY=1;
let SZ=1;

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

    ['E1.000', 3,0,   54, 0, 0 ],
    ['E1.001', 161,0, 54, 10, 0 ],
    ['E1.002', 175,0, 54, 20, 0 ],
    ['E1.003', 189,0, 54, 30, 0 ],
    ['E1.004', 203,0, 54, 40, 0 ],

    ['E2.000', 21,0,  70, 0, 0 ],
    ['E2.001', 217,0, 70, 10, 0 ],
    ['E2.002', 231,0, 70, 20, 0 ],
    ['E2.003', 245,0, 70, 30, 0 ],
    ['E2.004', 259,0, 70, 40, 0 ],

    ['BtS45_', 427, 0,   60.9, -40.3, 6.4,  -.78, 1, 0, 0],
    ['BtS90_', 441, 0,   60.9, -42.6, 1.4, -1.57, 1, 0, 0],
    ['BtN45_', 371, 0,   60.9, -25.3, 6.4,   .78, 1, 0, 0 ],
    ['BtN90_', 385, 0,   60.9, -23.0, 1.4,  1.57, 1, 0, 0 ],

    ['BtE45_', 399, 0,   68.4, -32.7, 6.4,   .78, 0, 1, 0],
    ['BtE90_', 413, 0,   70.7, -32.7, 1.4,  1.57, 0, 1, 0],
    ['BtO45_', 455, 0,   53.4, -32.7, 6.4,  -.78, 0, 1, 0],
    ['BtO90_', 469, 0,   51.0, -32.7, 1.4, -1.57, 0, 1, 0],

    ['Bt000_', 483, 0,   60.9, -32.74, 9.54,   0, 0, 0, 0 ],
    ['BtRot_', 497, 0,   60.9, -32.74, 9.54,   1.57, 0, 0, 1 ]

    // ['platea', 357, 0,         0, 0, 0 ],
    // ['text.0', 511, 0,         0, 0, 0  ]
];




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
        api.hide(497); //bouton rotation non programmé
//-----------------------------------déplace les objets ou ajoute une annotation      
    api.addEventListener('click', function (info) {
    if (info.instanceID) {  // le clic se fait effectivement sur un objet 
        
    // if ((info.instanceID!=357) && (info.instanceID!=511)) {//mais pas sur la table
        // window.console.log('clicked node', info.instanceID);
        clic = info.instanceID-2;
        posX=info.position3D[0];
        posY=info.position3D[1];
        posZ=info.position3D[2];
        for (let i = 0; i < obj.length; i++) {
            if ((clic == obj[i][1]) || (clic == obj[i][2])) { // récupère les nom et ID (pour les étuis: ID1 et ID2)
                clicNom = obj[i][0];
                clicID1 = obj[i][1];
                clicID2 = obj[i][2];
            };
        };
        console.log('clic', clic, posX,posY,posZ, clicNom, clicID1, clicID2);

        //--------------------------------------table centrale-----------------------------------
        if ((posX>-.035) && (posX<.035)) {
            declaration = document.getElementById("texteNoteNew").value //priorité: ajoute une annotation, si le champ texte n'est pas vide
            if ((declaration.length != 0) && (declaration.length != null)) { // annotation: position, position camera, target camera (=position annotation), title, text
                api.createAnnotationFromScenePosition(  [posX,posY,posZ], [0, -.2, .13],[0, 0, -.02], document.getElementById("texteNoteNew").value,"");
                document.getElementById("texteNoteNew").value="";               
            } else if (posZ>.004) { //clic d'un objet sur la table centrale
                if (surSphere != 0) { //il y a une cheminée sur la sphere
                    api.translate(surSphere, [posX, posZ, -posY], {duration: .2, easing: 'easeOutQuad'}, function(err, translateTo) {});
                    surSphere=0;
                } else { //il n'y a rien sur la sphere et une cheminée est selectionnée alors retour à la sphère
                    if (clicNom.slice(0,1)=="E") {
                        api.translate(clicID1, [.0609, .0145, .0327], {duration: .2, easing: 'easeOutQuad'}, function(err, translateTo) {});
                        surSphere = clicID1;
                        //                 // scale(surSphere, 1, 1, 1);
                    }                
                }//si clic d'étui, rien ne se passe
            } 
        };
        //----------------------------------table de gauche----------------------------------
        if (posX<-.035) { 
            for (let i = 0; i < obj.length; i++) {
                if (obj[i][1] == etui1) { // retour sur la table de gauche
                    api.translate(etui1, [obj[i][3]/1000, obj[i][5]/1000, -obj[i][4]/1000], {duration: .2, easing: 'easeOutQuad'}, function(err, translateTo) {});
                    api.translate(etui2, [obj[i][3]/1000, 0,              -obj[i][4]/1000], {duration: .2, easing: 'easeOutQuad'}, function(err, translateTo) {});
                    scale(etui1, 1, 1, 1);
                    scale(etui2, 1, 1, 1);
                };
            };
            for (let i = 0; i < obj.length; i++) {
                if ((clic == obj[i][1]) || (clic == obj[i][2])) { // déplace au centre
                    api.translate(obj[i][1], [0, obj[i][5]/1000, 0], {duration: .2, easing: 'easeOutQuad'}, function(err, translateTo) {});
                    api.translate(obj[i][2], [0, 0, 0], {duration: .2, easing: 'easeOutQuad'}, function(err, translateTo) {});
                    etui1 = obj[i][1];
                    etui2 = obj[i][2];
                    scale(clicID1, SX, SY, SZ);
                    scale(clicID2, SX, SY, SZ);
                };
            };
        } 
        //----------------------------------table de droite----------------------------------
        if (posX>.035) {
            //----------------cheminée
            if (clicNom.slice(0,1)=="E") {
                if (surSphere!=0) { //retour de la cheminée sur sphere à la table
                    for (let i = 0; i < obj.length; i++) {
                        if (obj[i][1] == surSphere) { // retour sur la table de gauche
                            api.translate(surSphere, [obj[i][3]/1000, obj[i][5]/1000, -obj[i][4]/1000], {duration: .2, easing: 'easeOutQuad'}, function(err, translateTo) {});
                            // scale(surSphere, 1, 1, 1);
                            surSphere = 0;
                        };
                    };
                }
                if ((posY>-.02) && (posZ>.002)) { //cheminée sur table
                    api.translate(clicID1, [.0609, .0145, .0327], {duration: .2, easing: 'easeOutQuad'}, function(err, translateTo) {});
                    surSphere = clicID1;
                }
            }
            //----------------bouton
            if (clicNom.slice(0,1)=="B") {
                if (surSphere!=0) { //
                    for (let i = 0; i < obj.length; i++) {
                        if (obj[i][1] == clicID1) { // retour sur la table de gauche
                            api.translate(surSphere, [obj[i][3]/1000, (obj[i][5]/1000+.005), -obj[i][4]/1000], {duration: .2, easing: 'easeOutQuad'}, function(err, translateTo) {});
                            // scale(surSphere, 1, 1, 1);
                            api.rotate(surSphere, [obj[i][6], obj[i][7], obj[i][9], obj[i][8]], {duration: .2, easing: 'easeOutQuad'}, function(err, translateTo) {});

                        };
                    };
                }
            }
        }


    //     document.getElementById("X").addEventListener("input", function(){
    //         SX = document.getElementById("X").value;
    //         scale(clicID1, SX, SY, SZ);
    //     });
    //     document.getElementById("Y").addEventListener("input", function(){
    //        SY = document.getElementById("Y").value;
    //        scale(clicID1, SX, SY, SZ);
    //     });
    //     document.getElementById("Z").addEventListener("input", function(){
    //        SZ = document.getElementById("Z").value;
    //        scale(clicID1, SX, SY, SZ);
    //    });

    // };
    };        
    }); 

}); // api.addEventListener('viewerready'
}); // api.start(
};