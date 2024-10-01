const iframe = document.getElementById("api-frame");
var client = new Sketchfab( iframe );
let api;
const uid = 'b50588e7af524b1facdececb130e2e0c';
var boutonAide = document.querySelector("input");

const error = () => window.console.error('Sketchfab API error');
const success = apiClient => {
api = apiClient; 

//let valDiaG = 0;
//let select = "X";
let nomBaseTable = "X";
let nomSupportTable = "X";
let idBase = 0;
let idSupport = 0;
idBaseTable = 0;
idSupportTable = 0;
//let choixBase = 0;
let choixChem = 0;
let digit1 = "K";
let tableLibre = 1;
let nomObjet2 = "X";
let idObjet2 = 0;
let posX2 = 0 ;
let posY2 = 0 ;
let nomBase2 = "X";
let nomBase1 = "tbdBase";
let idBase2 = 0;
let nomSupport2 = "X";
let idSupport2 = 0;
let idBase1 = 0;
let idSupport1 = 0;
let posXBase1 = 0;
let posYBase1 = 0;
let nomChem1 = "tbdChem";
let idChem1 = 0;
let posXChem1 = 0;
let posYChem1 = 0;
let H = 0;
let sphereLibre = "oui";
//------------------------------------------------
const tableRec = [ //tableau copié du terminal (attention, ôter les espaces dans le nom entre ' ')
    ['E111_', 3 ],
    ['E211_', 104 ],
    ['F111_', 20 ],
    ['E311_', 34 ],
    ['E411_', 48 ],
    ['F211_', 62 ],
    ['F311_', 76 ],
    ['F411_', 90 ],
    ['G111_', 118 ],
    ['K100B', 132 ],
    ['K400B', 146 ],
    ['K300B', 160 ],
    ['K200B', 174 ],
    ['K000B', 205 ],
    ['K600S', 219 ],
    ['K600B', 233 ],
    ['K500B', 247 ],
    ['K500S', 261 ],
    ['H111_', 275 ],
    ['K700S', 289 ],
    ['K800S', 303 ],
    ['K000S', 317 ],
    ['K200S', 331 ],
    ['K100S', 345 ],
    ['K300S', 359 ],
    ['K400S', 373 ],
    ['K700B', 387 ],
    ['K800B', 401 ],
    ['BtN45', 415 ],
    ['BtN90', 432 ],
    ['BtE45', 446 ],
    ['BtE90', 460 ],
    ['BtS45', 474 ],
    ['BtS90', 488 ],
    ['BtO45', 502 ],
    ['BtO90', 516 ],
    ['Bt000', 530 ],
    ['Spher', 544 ],
    ['BtRot', 558 ]
];
const tablePos = [ 
    ['E111', -63 , 23 ],
    ['F111', -63, 14 ],
    ['E311', -83, 23],
    ['E411', -93, 23 ],
    ['F211', -73 , 14 ],
    ['F311', -83 , 14 ],
    ['F411', -93 , 14 ],
    ['E211', -73 , 23 ],
    ['G111', -103 ,14 ],
    ['H111', -112, 14 ],
    ['K000', -100 , -3 ],
    ['K100', -100 , -14 ],
    ['K200', -100 , -25 ],
    ['K300', -100 , -36 ],
    ['K400', -100 , -47 ],
    ['K500', -65 , -3 ],
    ['K600', -65 , -14 ],
    ['K700', -65 , -25 ],
    ['K800', -65, -36 ]
];

const tableBoutons = [
    ['Bt000', -18.8, 30.26, 15.2 ],
    ['BtRot', -18.8, 30.26, 15.2 ],
    ['BtN45', -18.8, 22.36, 11.54 ],
    ['BtN90', -18.8, 20.13, 6.14 ],
    ['BtS45', -18.8, 38, 11.54 ],
    ['BtS90', -18.8, 40.25, 6.14 ],
    ['BtE45', -11, 30.16, 11.54 ],
    ['BtE90', -8.71, 30.16, 6.14 ],
    ['BtO45', -26.61, 30.17, 11.54 ],
    ['BtO90', -28.88, 30.18, 6.14 ]
];

//------------------------------------------------
api.start(function () {
api.addEventListener('viewerready', () => {
    api.getNodeMap(function(err, nodes) {
        if (!err) {window.console.log(nodes); }
    });
    api.hide(558); //bouton rotation non programmé
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
                        nodeNameSlice = nodeName.slice(0, 5);
                        // console.log("['",nodeNameSlice, "',",instanceId, "],"); //récupère les noms et ID pour copier dans tableObjets
                    }
                }
                }
            }
            } else {console.error('nodes n\'est pas un objet.');}
        } else {console.error('Erreur lors de la récupération des nœuds :', err);}
    });
    



    api.addEventListener('click',function(info) { 
    if (info.instanceID) {  // le clic se fait effectivement sur un objet 
        window.console.log('clicked node', info.instanceID);
        //----------------------------------
        //récupère les nom, ID et positions de l'objet cliqué
        for (let pas = 0; pas < tableRec.length; pas++) { 
            if (tableRec[pas][1] == info.instanceID-2) { 
                nomObjet2 = tableRec[pas][0];
                idObjet2 = tableRec[pas][1];
                for (let pas3 = 0; pas3 < tablePos.length; pas3++) {
                    if (tablePos[pas3][0] == nomObjet2.slice(0,4)) {
                        posX2 = tablePos[pas3][1];
                        posY2 = tablePos[pas3][2];
                    };
                };
                if (nomObjet2.slice(0,1) == "K") { //si l'objet cliqué est une base ou un support de base, enregistre leurs noms complets
                    nomBase2 = nomObjet2.slice(0,4) + "B";
                    nomSupport2 = nomObjet2.slice(0,4) + "S";
                    for (let pas2 = 0; pas2 < tableRec.length; pas2++) {
                        if (tableRec[pas2][0] == nomBase2) {idBase2 = tableRec[pas2][1]};
                        if (tableRec[pas2][0] == nomSupport2) {idSupport2 = tableRec[pas2][1]};
                    }
                }
            }
        }
        //----------------------------------
        // sélection de base et support
        if (nomObjet2.slice(0,1) == "K") {
            if (nomBase1 != "tbdBase") { //table de droite occupée => retour de la base vers la table de gauche
                move(idBase1, posXBase1, posYBase1, 0 );
                move(idSupport1, posXBase1, posYBase1, 0)
            }
            move(idBase2, 0, 0, 0+H);
            move(idSupport2, 0, 0, 0);
            if ((nomChem1 != "tbdChem") && (nomBase1 != "tbdBase") && (info.instanceID-2 ==  idBase1)) {
                move(idChem1, info.position3D[0]*1000, -info.position3D[1]*1000, info.position3D[2]*1000 );
                sphereLibre = "oui";
            }
            nomBase1 = nomBase2;
            idBase1 = idBase2;
            idSupport1 = idSupport2;
            posXBase1 = posX2;
            posYBase1 = posY2;
        }
        //----------------------------------
        // sélection de cheminée
        if ((nomObjet2.slice(0,1) == "E") ||
            (nomObjet2.slice(0,1) == "F") ||
            (nomObjet2.slice(0,1) == "G") ||
            (nomObjet2.slice(0,1) == "H")) {
            if (sphereLibre == "non") { //sphere de droite occupée => retour vers la table de gauche, tant qu'elle n'a pas été installée sur une base
                moveRotate(idChem1,     1,0,0,      0,1,0,      0,0,1,    posXChem1, posYChem1, 0);
            }
            move(idObjet2, -18.8, 30.2, 15);
            nomChem1 = nomObjet2;
            idChem1 = idObjet2;
            posXChem1 = posX2;
            posYChem1 = posY2;
        }
        //----------------------------------
        // action bouton
        if (nomObjet2.slice(0,2) == "Bt") {
            sphereLibre = "non"
            for (let pas4 = 0; pas4 < tableBoutons.length; pas4++) {
                if (nomObjet2 == tableBoutons[pas4][0]) {
                    if (nomObjet2.slice(2,5) == "000") {moveRotate (idChem1, 1,0,0,      0,1,0,      0,0,1,  tableBoutons[pas4][1], tableBoutons[pas4][2], tableBoutons[pas4][3]) };
                    if (nomObjet2.slice(2,5) == "S45") {moveRotate (idChem1, 1,0,0,      0,0.7,.7,   0,-.7,.7,  tableBoutons[pas4][1], tableBoutons[pas4][2], tableBoutons[pas4][3]) };
                    if (nomObjet2.slice(2,5) == "S90") {moveRotate (idChem1, 1,0,0,      0,0,1,      0,-1,0,  tableBoutons[pas4][1], tableBoutons[pas4][2], tableBoutons[pas4][3]) };
                    if (nomObjet2.slice(2,5) == "N45") {moveRotate (idChem1, 1,0,0,      0,0.7,-.7,  0,.7,.7,  tableBoutons[pas4][1], tableBoutons[pas4][2], tableBoutons[pas4][3]) };
                    if (nomObjet2.slice(2,5) == "N90") {moveRotate (idChem1, 1,0,0,      0,0,-1,     0,1,0,  tableBoutons[pas4][1], tableBoutons[pas4][2], tableBoutons[pas4][3]) };
                    if (nomObjet2.slice(2,5) == "E45") {moveRotate (idChem1, .7,0,-.7,  .7,0,.7,     0,1,0,    tableBoutons[pas4][1], tableBoutons[pas4][2], tableBoutons[pas4][3]) };
                    if (nomObjet2.slice(2,5) == "E90") {moveRotate (idChem1, 0,1,0,      1,0,0,      0,0,1,  tableBoutons[pas4][1], tableBoutons[pas4][2], tableBoutons[pas4][3]) };
                    if (nomObjet2.slice(2,5) == "E45") {moveRotate (idChem1, .7,-.7,0,   .7,.7,0,    0,0,1,    tableBoutons[pas4][1], tableBoutons[pas4][2], tableBoutons[pas4][3]) };
                    if (nomObjet2.slice(2,5) == "O90") {moveRotate (idChem1, 0,-1,0,      -1,0,0,    0,0,1,  tableBoutons[pas4][1], tableBoutons[pas4][2], tableBoutons[pas4][3]) };
                    if (nomObjet2.slice(2,5) == "O45") {moveRotate (idChem1, .7,.7,0,   -.7,.7,0,    0,0,1,    tableBoutons[pas4][1], tableBoutons[pas4][2], tableBoutons[pas4][3]) };
                }
            }
        }
    }
    }); 


    
    
    document.getElementById("H").addEventListener("input", function(){ //au curseur, monte ou descend le corps
        if (nomBase1 != "tbdBase") {
            move(idBase1, 0, 0, (document.getElementById("H").value * 6));
            H = document.getElementById("H").value * 6;
        }
    });

}); // api.addEventListener('viewerready'
}); // api.start(
};


