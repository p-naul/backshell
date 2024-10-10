const iframe = document.getElementById("api-frame");
var client = new Sketchfab( iframe );
let api;
const uid = 'dd09af0e47794973822f8d2f8cff457c';
// const uid = '5d2dfb9d66c24b14962467955775f305';

var boutonAide = document.querySelector("input");

const error = () => window.console.error('Sketchfab API error');
const success = apiClient => {
api = apiClient; 

var clic = 0;
let etui1 = 0;
let etui2 = 0;
let etui1Z = 0;
let clicNom = "";
let clicID1 = 0;
let clicID2 = 0;
let surSphere = 0;
let SX=1;
let SY=1;
let SZ=1;
let SXc=1;
let SYc=1;
let SZc=1;
let curseur = 0;
let lastAnnotation = 0;

const obj = [ //tableau copié du terminal (attention, ôter les espaces dans le nom entre ' ')
    ['K1.hau', 0,   231,   -77, -41,  0 ],
    ['K2.hau', 441, 245,   -66, -41, 20 ],
    ['K3.hau', 0,   217,   -55, -41,  0 ],
    ['K4.hau', 455, 203,   -44, -41, 20 ],
    ['K5.hau', 0,   259,   -75, -10,  0 ],
    ['K6.hau', 469, 273,   -61, -10, 27 ],
    ['K7.hau', 483, 287,   -47, -10, 27 ],
    ['K8.hau', 511, 301,   -70,  30, 27 ],
    ['K9.hau', 497, 315,   -56,  30, 27 ],

    ['E1.000', 175,0, 54, 0, 0 ],
    ['E1.001', 329,0, 54, 10, 0 ],
    ['E1.002', 343,0, 54, 20, 0 ],
    ['E1.003', 357,0, 54, 30, 0 ],
    ['E1.004', 371,0, 54, 40, 0 ],

    ['E2.000', 189,0, 70, 0, 0 ],
    ['E2.001', 385,0, 70, 10, 0 ],
    ['E2.002', 399,0, 70, 20, 0 ],
    ['E2.003', 413,0, 70, 30, 0 ],
    ['E2.004', 427,0, 70, 40, 0 ],

    ['BtS45_', 77, 0,   60.9, -40.3, 6.4,  -.78, 1, 0, 0],
    ['BtS90_', 91, 0,   60.9, -42.6, 1.4, -1.57, 1, 0, 0],
    ['BtN45_', 21, 0,   60.9, -25.3, 6.4,   .78, 1, 0, 0 ],
    ['BtN90_', 35, 0,   60.9, -23.0, 1.4,  1.57, 1, 0, 0 ],

    ['BtE45_', 49, 0,   68.4, -32.7, 6.4,   .78, 0, 1, 0],
    ['BtE90_', 63, 0,   70.7, -32.7, 1.4,  1.57, 0, 1, 0],
    ['BtO45_', 105, 0,   53.4, -32.7, 6.4,  -.78, 0, 1, 0],
    ['BtO90_', 119, 0,   51.0, -32.7, 1.4, -1.57, 0, 1, 0],

    ['Bt000_', 133, 0,   60.9, -32.74, 9.54,   0, 0, 0, 0 ],
    ['BtRot_', 147, 0,   60.9, -32.74, 9.54,   1.57, 0, 0, 1 ],

    ['Tex0_4', 651 ],
    ['Sex1_3', 539, 1,       -6, -53.9, -3 ],
    ['Sex2_3', 525, 1.25,     0, -53.9, -3 ],
    ['Sex3_4', 553, 1.5,      6, -53.9, -3 ],

    ['Tey0_4', 665 ],
    ['Sey1_4', 581, 1,       -6, -53.9, -11  ],
    ['Sey2_4', 567, 1.25,     0, -53.9, -11 ],
    ['Sey3_4', 595, 1.5,      6, -53.9, -11 ],

    ['Tez0_4', 679 ],
    ['Sez1_4', 623, 1,       -6, -53.9, -19  ],
    ['Sez2_4', 609, 1.25,     0, -53.9, -19 ],
    ['Sez3_4', 637, 1.5,      6, -53.9, -19 ],   
    
    ['TcXY0_', 777 ],
    ['ScXY1_', 707, 1,       55, -53.9, -7 ],
    ['ScXY2_', 693, 1.5,     61, -53.9, -7 ],
    ['ScXY3_', 721, 2,       67, -53.9, -7 ],

    ['TcZ0_5', 791 ],
    ['ScZ1_5', 749, 1,       55, -53.9, -19 ],
    ['ScZ2_5', 735, 1.5,     61, -53.9, -19 ],
    ['ScZ3_5', 763, 2,       67, -53.9, -19 ],

    ['K0.hau', 0, 0,    0, 0, 0 ]

    // ['platea', 3, 0,         0, 0, 0 ], // etait 357
    // ['text.0', 161, 0,         0, 0, 0  ] // etait 511
];

//------------------------------------------------
api.start(function () {
    api.addEventListener('viewerready', () => {

        document.getElementById('Btn').addEventListener('click', function() {
            api.removeAnnotation(lastAnnotation-1, function(err) {
                if (!err) {window.console.log('Removed annotation', lastAnnotation);}
                if(lastAnnotation>0) {lastAnnotation = lastAnnotation -1;};
            });
        });



        api.getNodeMap(function(err, nodes) {
            if (!err) {window.console.log(nodes); }
        });
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

        api.hide(147); //bouton rotation non programmé
        api.hide(777); //sliders cheminée
        api.hide(707);
        api.hide(693);
        api.hide(721);
        api.hide(791);
        api.hide(749);
        api.hide(735);
        api.hide(763);

//-----------------------------------déplace les objets ou ajoute une annotation      
    api.addEventListener('click', function (info) {
    if (info.instanceID) {  // le clic se fait effectivement sur un objet 
        
    // if ((info.instanceID!=357) && (info.instanceID!=511)) {//mais pas sur la table
        window.console.log('clicked node', info.instanceID);
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
        // console.log('clic', clic, posX,posY,posZ, clicNom, clicID1, clicID2);

        //--------------------------------------table centrale-----------------------------------
        if ((posX>-.035) && (posX<.035)) {
            declaration = document.getElementById("texteNoteNew").value //priorité: ajoute une annotation, si le champ texte n'est pas vide
            if ((declaration.length != 0) && (declaration.length != null)) { // annotation: position, position camera, target camera (=position annotation), title, text
                api.createAnnotationFromScenePosition(  [posX,posY,posZ], [0, -.2, .13],[0, 0, -.02], document.getElementById("texteNoteNew").value,"");
                lastAnnotation = lastAnnotation + 1;
                document.getElementById("texteNoteNew").value="";               
            } else if (posZ>.004) { //clic d'un objet sur la table centrale
                if (surSphere != 0) { //il y a une cheminée sur la sphere
                    api.translate(surSphere, [posX, posZ, -posY], {duration: .2, easing: 'easeOutQuad'}, function(err, translateTo) {});
                    surSphere=0;
                    razCheminee()
                } else { //il n'y a rien sur la sphere et une cheminée est selectionnée alors retour à la sphère et remise droit
                    if (clicNom.slice(0,1)=="E") {
                        api.translate(clicID1, [.0609, .0145, .0327], {duration: .2, easing: 'easeOutQuad'}, function(err, translateTo) {});
                        api.rotate(clicID1, [0, 0, 0, 0], {duration: .2, easing: 'easeOutQuad'}, function(err, translateTo) {});
                        scaleCheminee(clicID1, 1, 1, 1)
                        surSphere = clicID1;
                        //                 // scale(surSphere, 1, 1, 1);
                    }                
                }//si clic d'étui, rien ne se passe
            } 
            if (clicNom.slice(0,1)=="S") {
                for (let i = 0; i < obj.length; i++) {
                    if (obj[i][1] == clicID1) { 
                        if (obj[i][5] == -3) {
                            curseur = 651;
                            SX = obj[i][2];
                        };
                        if (obj[i][5] == -11) {
                            curseur = 665;
                            SY = obj[i][2];
                        };
                        if (obj[i][5] == -19) {
                            curseur = 679;
                            SZ = obj[i][2];
                        };
                        api.translate(curseur, [obj[i][3]/1000, (obj[i][5]/1000), -obj[i][4]/1000], {duration: .2, easing: 'easeOutQuad'}, function(err, translateTo) {});
                        scale(etui2, SX, SY, SZ);
                        api.translate(etui1, [0, etui1Z*SZ, 0], {duration: .01, easing: 'easeOutQuad'}, function(err, translateTo) {});
                        if (etui1!=0) {
                            if ((etui1 == 511) || (etui1 == 497)) {
                                scale(etui1, SX, SY, SX);
                            } else {
                                scale(etui1, SX, SY, SY);
                            }
                        }
                    };
                };
            }
        };
        //----------------------------------table de gauche----------------------------------
        if ((posX<-.035) && (posZ>.0001)) { 
            for (let i = 0; i < obj.length; i++) {
                if (obj[i][2] == etui2) { // retour sur la table de gauche
                    if ( etui1!=0) {
                        api.translate(etui1, [obj[i][3]/1000, obj[i][5]/1000, -obj[i][4]/1000], {duration: .01, easing: 'easeOutQuad'}, function(err, translateTo) {});
                        scale(etui1, 1, 1, 1);
                    };
                    if ( etui2!=0) {
                        api.translate(etui2, [obj[i][3]/1000, 0, -obj[i][4]/1000], {duration: .01, easing: 'easeOutQuad'}, function(err, translateTo) {});
                        scale(etui2, 1, 1, 1);
                    };
                };
            };
            for (let i = 0; i < obj.length; i++) {
                if ((clic == obj[i][1]) || (clic == obj[i][2])) { // déplace au centre
                    etui1 = obj[i][1]; //haut
                    etui2 = obj[i][2]; //bas
                    etui1Z = obj[i][5]/1000;

                    api.translate(etui2, [0, 0, 0], {duration: .01, easing: 'easeOutQuad'}, function(err, translateTo) {});
                    api.translate(etui1, [0, etui1Z, 0], {duration: .01, easing: 'easeOutQuad'}, function(err, translateTo) {});
                    scale(etui2, 1, 1, 1);
                    if (etui1!=0) {scale(etui1, 1, 1, 1);}
                    razEtui();
                };
            };
        } 
        //----------------------------------table de droite----------------------------------
        if (posX>.035) {
            //----------------cheminée
            if ((clicNom.slice(0,1)=="E") || (clic==3)) {               
                if (surSphere!=0) { //clic de la cheminée sur sphere ou de la table : retour sur la table
                    for (let i = 0; i < obj.length; i++) {
                        if (obj[i][1] == surSphere) { 
                            api.translate(surSphere, [obj[i][3]/1000, obj[i][5]/1000, -obj[i][4]/1000], {duration: .2, easing: 'easeOutQuad'}, function(err, translateTo) {});
                            api.rotate(surSphere, [0, 0, 0, 0], {duration: .2, easing: 'easeOutQuad'}, function(err, translateTo) {});
                            surSphere = 0;
                        };
                    };
                }
                if ((posY>-.02) && (posZ>.002)) { //cheminée sur table : déplacement sur la sphere
                    api.translate(clicID1, [.0609, .0145, .0327], {duration: .2, easing: 'easeOutQuad'}, function(err, translateTo) {});
                    surSphere = clicID1;
                }
                razCheminee();
            }
            //----------------bouton
            if (clicNom.slice(0,1)=="B") {
                if (surSphere!=0) { //clic bouton et une cheminée sur la sphere
                    for (let i = 0; i < obj.length; i++) {
                        if (obj[i][1] == clicID1) { 
                            // matrix(surSphere, SY, 0, 0, 0, SZ, 0, 0, 0, SX, obj[i][3], -obj[i][4], obj[i][5]+.02)
                            // window.console.log('bouton', obj[i][0], obj[i][1], obj[i][2], obj[i][3], obj[i][4], obj[i][5]);
                            // matrix.local[10]=SX;
                            // matrix.local[0]=SY;
                            // matrix.local[5]=SZ;
                            api.translate(surSphere, [obj[i][3]/1000, (obj[i][5]/1000+.005), -obj[i][4]/1000], {duration: .2, easing: 'easeOutQuad'}, function(err, translateTo) {});
                            api.rotate(surSphere, [obj[i][6], obj[i][7], obj[i][9], obj[i][8]], {duration: .2, easing: 'easeOutQuad'}, function(err, translateTo) {});
                            razCheminee();
                        };
                    };
                }
            }
            //----------------slider
            if (posZ<0) {                   // 2 cas, cheminée sur sphere alors move en haut et scale, ou sur table alors rien
                for (let i = 0; i < obj.length; i++) {
                    if (obj[i][1] == clicID1) { 
                        if (obj[i][5] == -7) {
                            curseur = 777;
                            SXc = obj[i][2];
                            SYc = obj[i][2];
                        };
                        if (obj[i][5] == -19) {
                            curseur = 791;
                            SZc = obj[i][2];
                        };
                        api.translate(curseur, [obj[i][3]/1000, (obj[i][5]/1000), -obj[i][4]/1000], {duration: .2, easing: 'easeOutQuad'}, function(err, translateTo) {}); 
                    };
                };
                // api.translate(surSphere, [.0609, .0145, .0327], {duration: .2, easing: 'easeOutQuad'}, function(err, translateTo) {});
                // api.rotate(surSphere, [0, 0, 0, 0], {duration: .2, easing: 'easeOutQuad'}, function(err, translateTo) {});                                       
                scaleCheminee(surSphere, SXc, SYc, SZc)
                console.log('slider', surSphere, SXc, SYc, SZc);
            }
        }
 


    };        
    }); 

}); // api.addEventListener('viewerready'
}); // api.start(
};