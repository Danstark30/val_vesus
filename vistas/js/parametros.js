import * as THREE from '../../node_modules/three/build/three.module.js';
import * as CANNON from '../../node_modules/cannon-es/dist/cannon-es.js';
import { GLTFLoader } from '../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from '../../node_modules/three/examples/jsm/loaders/RGBELoader.js';
import { Camera, LoadingManager } from '../../node_modules/three/build/three.module.js';
import { OBJLoader } from '../../node_modules/three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from '../../node_modules/three/examples/jsm/loaders/MTLLoader.js';


//efectos de escena

const ENTIRE_SCENE = 0, BLOOM_SCENE = 1;

const bloomLayer = new THREE.Layers();
bloomLayer.set( BLOOM_SCENE );

const params = {
	exposure: 1,
	bloomStrength: 5,
	bloomThreshold: 0,
	bloomRadius: 0,
	scene: 'Scene with Glow'
};

var bloomComposer;
var bloomPass;

// variables globales

var container; //nombre de id del div donde se visualizara el render
var sceneWidth, sceneHeight; //ancho y alto de la escena (propiedades de la libreria three js)
var scene; // escena
var renderer; // render
var camera;

var FPCcontrols; // variable del first person control


var keyboard = {}; // variable de arreglos donde almacena las teclas
var player = { height: 2.5, speed: 0.2, turnSpeed: Math.PI * 0.02 }; // arreglo de variables que conrresponde a las propiedades fps (alto, velocidad, etc)

var cubeMesh;

var oldPosition;
var oldRotation;

//variable cannon

var world;
const timeStep = 1 / 60;
let lastCallTime;


let cubeBody;
let cubetwoBody;
let CuboEAMonoBody;
let esuinferiorBody;
let electroActivoBiBody;
let electroActivoMonoBody;

let physicsMaterial;

const meshes = [];
const bodies = [];



//Mesh variables


//Variables Raycaster para interaccion con texto dinamicos  y texturas
var contadorBipolar = 0;
var ContadorLimiteBipolar=70;
var contadorCortePuro = 0;
var contadorLimiteCortePuro = 300;
var ContadorCoagulacion = 0;
var ContadorLimiteCoagulacion = 120;
var raycaster = new THREE.Raycaster();
const mouse = {};
const mouse2 = {};


// Variables Drag and drop

let isDragging = false;
let clickMarker;
let movementPlane;

let owoMesh, cubomonoeaMesh;


let jointBody;
let jointConstraint;

//variables para botones
var BtnPoweraAmarilloObj;
var BtnPantallaPowerOn;
var ObjPowerAmarilloModel;

let groupSprites;
let sprite,sprite2;

/*const myTimeout = setTimeout(Instrucciones, 20000); 

function Instrucciones() {
	document.getElementById("instrucciones").style.visibility="hidden";
  } */


var btnBlends, BtnAvisoRed;
var meshglow;

var contci,tituloc,parrafoc,contelem;
/*init es una funcion que da inicio al proceso del codigo,
 permite leer de primero las otras funciones para dar paso
al render de la camara y otras variables */

init();

function init() {

	createScene();
	initCannon();
	update();
	animate();
	

}

function createScene() {

	sceneWidth = window.innerWidth;
	sceneHeight = window.innerHeight;

	//Escena
	scene = new THREE.Scene();
	scene.background = new THREE.Color( /*0x000000*/ 0x5298CA );



	//Render = renderiza el entorno
	renderer = new THREE.WebGLRenderer( { antialis: true, alpha: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( sceneWidth, sceneHeight );

	//canvas = llama la variable del documento index.html que se llama container y lo iguala a la variable creada para three js, llamada canvas
	container = document.getElementById( 'container' );
	container.appendChild( renderer.domElement );

	//camara

	camera = new THREE.PerspectiveCamera( 75, sceneWidth / sceneHeight, 1, 10000 );
	// camera.position.set(0,50,500);
	oldPosition = camera.position.set( 0, player.height, 0 );
	oldRotation = camera.lookAt( new THREE.Vector3( 0, player.height, 0 ) );

	console.log(camera.position);
//	console.log(camera.rotation);
	

			//boton de configuracion __> contexto
const divcontexto = document.getElementById('i-contexto');
const btncontexto= document.getElementById('i-btnCont');
btncontexto.onclick = function () {
	if(divcontexto.style.visibility == "hidden"){
		divcontexto.style.visibility = "visible";
	}else{
		divcontexto.style.visibility = "hidden";
	}
};

//boton de configuracion __> ayuda
const divinstrucciones = document.getElementById('i-instrucciones');
	const btnIntruciones= document.getElementById('i-btnInstru');
	btnIntruciones.onclick = function () {
		if(divinstrucciones.style.visibility == "hidden"){
			divinstrucciones.style.visibility = "visible";
		}else{
			divinstrucciones.style.visibility = "hidden";
		}
	};


		//boton de salir intru y context
		const btnsalirInter = document.getElementById('ig-btnsalirtext');
		const btnsalirInter2 = document.getElementById('ig-btnsalirtext-dos');
		const divcontexto2= document.getElementById('i-contexto');
		const divinstrucciones2 = document.getElementById('i-instrucciones');
	
			btnsalirInter.onclick = function () {
				if(divcontexto2.style.visibility == "visible" ){
					divcontexto2.style.visibility = "hidden";
					divinstrucciones2.style.visibility = "hidden";
				}
				
			
			
			};
			
			btnsalirInter2.onclick = function () {
				if( divinstrucciones2.style.visibility == "visible"){
					//divinstrucciones2.style.visibility == "hidden";
					//divcontexto2.style.visibility = "hidden";
					divinstrucciones2.style.visibility = "hidden";
					divcontexto2.style.visibility = "hidden";
					
				}
			
			};



//PANTALLA DE CARGA

const manager = new THREE.LoadingManager();
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {

console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

};
manager.onLoad = function ( ) {

console.log( 'Loading complete!');
const loadingScreen = document.getElementById( 'loading-screen' );
loadingScreen.classList.add( 'fade-out' );

const DivScreen = document.getElementById( 'screen-complete');
DivScreen.classList.add( 'fade-out' );
DivScreen.remove();


// optional: remove loader from DOM via event listener
loadingScreen.addEventListener( 'transitionend', onTransitionEnd );


};














	//luces
     //luces dentro del laboratorio

	 new RGBELoader()
     .setPath( './assets/hdri/' )
     .load( 'hospital_room_4k.hdr', function ( texture ) {
 
         texture.mapping = THREE.EquirectangularReflectionMapping;
 
     //	scene.background = texture;
         scene.environment = texture;
         //renderer.toneMapping = LinearToneMapping;
         //renderer.toneMappingExposure = 0.5;
         
 
 
     } ); 



     const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444, 0.9 );
    //hemiLight.position.set( 55,25,-90 );
	//const helper = new THREE.HemisphereLightHelper( hemiLight, 5 );
	//scene.add( helper );
	scene.add( hemiLight );

	
	//controls - se usa Frist person controler ya que con el Orbits controls hay un error (bug)


	FPCcontrols = new THREE.PerspectiveCamera( 45, sceneWidth / sceneHeight, 1, 1000 );
	FPCcontrols.lookSpeed = 60;
	FPCcontrols.movementSpeed = 0.5;
	FPCcontrols.position.set( 0, 0, 0 );

	MoveFPC();


	//llama a la funcion de pantalla completa
	window.addEventListener( 'resize', onWindowResize );


	// Floor
	const floorGeometry = new THREE.PlaneBufferGeometry( 100, 100, 1, 1 );
	floorGeometry.rotateX( - Math.PI / 2 );
	const floorMaterial = new THREE.MeshLambertMaterial( { color: 0x777777 } );
	const floor = new THREE.Mesh( floorGeometry, floorMaterial );
	floor.receiveShadow = true;
	scene.add( floor );

	// Cube FPC
	const cubeGeometry = new THREE.BoxBufferGeometry( 2, 2, 3, 10, 10 );
	const cubeMaterial = new THREE.MeshPhongMaterial( { color: 0xFF0000, opacity: 0, transparent: true } );
	cubeMesh = new THREE.Mesh( cubeGeometry, cubeMaterial );
	cubeMesh.castShadow = true;
	meshes.push( cubeMesh );
	scene.add( cubeMesh );  

	// Cube

	var loader = new THREE.TextureLoader();
    var texture1 = loader.load("assets/modelado/EAbi.PNG");
    var cubeTexture = loader.load ;
	const owo = new THREE.BoxBufferGeometry( 6, 6, 6, 10, 10 );
	const owoMaterial = new THREE.MeshPhongMaterial( { color: 0xABABAB , map: texture1} );
	owoMesh = new THREE.Mesh( owo, owoMaterial );
	owoMesh.castShadow = true;
	meshes.push( owoMesh );
	scene.add( owoMesh );

	// Cube MONOPOLAR

	var loader2 = new THREE.TextureLoader();
    var texture2 = loader2.load("assets/modelado/EAMono.jpeg");
    var cubeTexture2 = loader2.load ;
	const cubomonoea = new THREE.BoxBufferGeometry( 6, 6, 6, 10, 10 );
	const cubomonoeaMaterial = new THREE.MeshPhongMaterial( { color: 0xABABAB , map: texture2} );
	cubomonoeaMesh = new THREE.Mesh( cubomonoea, cubomonoeaMaterial );
	cubomonoeaMesh.castShadow = true;
	meshes.push( cubomonoeaMesh );
	scene.add( cubomonoeaMesh );


	
	

 

	//Esuingerior por ahora colision

	const esuinferior = new THREE.BoxBufferGeometry( 110, 15, 120, 200, 100 );
	const esuiMaterial = new THREE.MeshPhongMaterial( { color: 0xF7B44F, opacity: 0, transparent: true  } );
	const esuinferiorMesh = new THREE.Mesh( esuinferior, esuiMaterial );
	//owoMesh.castShadow = true;
	meshes.push( esuinferiorMesh );
	scene.add( esuinferiorMesh );  
      //EsuElectrodo activo:Bipolar por ahora colision
	const cuboEleActivoBi = new THREE.BoxBufferGeometry( 17, 6, 10, 100, 10 );
	const cuboEleActivoBiMaterial = new THREE.MeshPhongMaterial( { color: 0xF7B44F, opacity: 0, transparent: true  } );
	const cuboEleActivoBiMesh = new THREE.Mesh( cuboEleActivoBi, cuboEleActivoBiMaterial );
	meshes.push( cuboEleActivoBiMesh );
	scene.add( cuboEleActivoBiMesh ); 

	  //EsuElectrodo activo:Monopolar por ahora colision
	  const cuboEleActivoMono = new THREE.BoxBufferGeometry( 17, 6, 10, 100, 10 );
	  const cuboEleActivoMonoMaterial = new THREE.MeshPhongMaterial( { color: 0xF7B44F, opacity: 0, transparent: true  } );
	  const cuboEleActivoMonoMesh = new THREE.Mesh( cuboEleActivoMono, cuboEleActivoMonoMaterial );
	  meshes.push( cuboEleActivoMonoMesh );
	  scene.add( cuboEleActivoMonoMesh ); 








	/////////////////*     MODELADO DEL ESU                  *///////////////////////
	 //cubo
	/* const geometry = new THREE.BoxGeometry( 2, 2, 2 );
    const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
 // const material = new THREE.MeshFaceMaterial(cubeMateriasl);
    const cube = new THREE.Mesh( geometry, material );
    cube.position.set(1,1,0);
    cube.name="cubi";
   // cube.position.y += 1;
    scene.add( cube );*/

	//GLTF

	const loaderEntorno = new GLTFLoader(manager);
	 loaderEntorno.load( 'assets/modelado/EntornoLabBiomedico.gltf', function ( gltf ) {


		 gltf.scene.children[ 0 ];
		 gltf.scene.position.set( 0, -580.5, 0);


		 scene.add( gltf.scene );
		 console.log( 'entorno cargado' );

		

	 } );

	const loaderESU = new GLTFLoader(manager);
	loaderESU.load( 'assets/modelado/ESUEntornoMom2.gltf', function ( gltf ) {


		gltf.scene.children[ 0 ];
		gltf.scene.position.set( 0, -581, 0 );
     	scene.add( gltf.scene );

	

	} );

	const loaderAviso = new GLTFLoader();
	loaderAviso.load( 'assets/modelado/BtnRedAviso.gltf', function ( gltf ) {


		gltf.scene.children[ 0 ];
		gltf.scene.position.set( 0, -581, 0 );
     	scene.add( gltf.scene );

	

	} );

	const loaderDeco = new GLTFLoader();
	loaderDeco.load( 'assets/modelado/Mom2Deco.gltf', function ( gltf ) {


		gltf.scene.children[ 0 ];
		gltf.scene.position.set( 0, -581, 0 );
     	scene.add( gltf.scene );

	

	} );


	function CreateBtns() {

		var BtnPower = new MTLLoader();

		BtnPower.setPath( 'assets/modelado/Obj/' );
		BtnPower.load( 'BtnPower.mtl', function ( materials ) {
	
			materials.preload();
	
			var BtnStandBy = new OBJLoader();
			BtnStandBy.setMaterials( materials );
			BtnStandBy.setPath( 'assets/modelado/Obj/' );
			BtnStandBy.load( 'BtnPower.obj', function ( object ) {
	
				var objModelBtnStandBy = object.children[ 0 ];
				objModelBtnStandBy.name = 'BtnPower';
				objModelBtnStandBy.position.set( 0,-581,0 );
				scene.add( objModelBtnStandBy );
	
			} );
	
		} );

		var BtnMonoCut = new MTLLoader();

		BtnMonoCut.setPath( 'assets/modelado/Obj/' );
		BtnMonoCut.load( 'BtnMonoYellow.mtl', function ( materials ) {
	
			materials.preload();
	
			var BtnBtnMonoCut = new OBJLoader();
			BtnBtnMonoCut.setMaterials( materials );
			BtnBtnMonoCut.setPath( 'assets/modelado/Obj/' );
			BtnBtnMonoCut.load( 'BtnMonoYellow.obj', function ( object ) {
	
				var objModelBtnMonoCut = object.children[ 0 ];
				objModelBtnMonoCut.name = 'BtnMonoCut';
				objModelBtnMonoCut.position.set( 0,-581,0 );
				scene.add( objModelBtnMonoCut );
	
			} );
	
		} );

		var BtnMonoCoag = new MTLLoader();

		BtnMonoCoag.setPath( 'assets/modelado/Obj/' );
		BtnMonoCoag.load( 'BtnMonoBlue.mtl', function ( materials ) {
	
			materials.preload();
	
			var BtnMonoCoag = new OBJLoader();
			BtnMonoCoag.setMaterials( materials );
			BtnMonoCoag.setPath( 'assets/modelado/Obj/' );
			BtnMonoCoag.load( 'BtnMonoBlue.obj', function ( object ) {
	
				var objModelBtnMonoCoag = object.children[ 0 ];
				objModelBtnMonoCoag.name = 'BtnMonoCoag';
				objModelBtnMonoCoag.position.set( 0,-581,0 );
				scene.add( objModelBtnMonoCoag );
	
			} );
	
		} );


		var BtnBipolar = new MTLLoader();

		BtnBipolar.setPath( 'assets/modelado/Obj/' );
		BtnBipolar.load( 'BtnBipolar.mtl', function ( materials ) {
	
			materials.preload();
	
			var BtnBipolarobj = new OBJLoader();
			BtnBipolarobj.setMaterials( materials );
			BtnBipolarobj.setPath( 'assets/modelado/Obj/' );
			BtnBipolarobj.load( 'BtnBipolar.obj', function ( object ) {
	
				var objModelBipolar = object.children[ 0 ];
				objModelBipolar.name = 'BtnBipolar';
				objModelBipolar.position.set( 0,-581,0 );
				scene.add( objModelBipolar );
	
			} );
	
		} );



		///FLECHAS BIPOLAR

		var BtnArrowUpBi = new MTLLoader();
		BtnArrowUpBi.setPath( 'assets/modelado/Obj/' );
		BtnArrowUpBi.load( 'BtnArrowUp.mtl', function ( materials ) {
	
			materials.preload();
	
			var BtnArrowBiobj = new OBJLoader();
			BtnArrowBiobj.setMaterials( materials );
			BtnArrowBiobj.setPath( 'assets/modelado/Obj/' );
			BtnArrowBiobj.load( 'BtnArrowUp.obj', function ( object ) {
	
				var objModelArrowUp = object.children[ 0 ];
				objModelArrowUp.name = 'BtnArrowUpBi';
				objModelArrowUp.position.set( 0,-581,0 );
				scene.add( objModelArrowUp );
	
			} );
	
		} );


		var BtnArrowDownBi = new MTLLoader();
		BtnArrowDownBi.setPath( 'assets/modelado/Obj/' );
		BtnArrowDownBi.load( 'BtnArrowDown.mtl', function ( materials ) {
	
			materials.preload();
	
			var BtnArrowBioDownbj = new OBJLoader();
			BtnArrowBioDownbj.setMaterials( materials );
			BtnArrowBioDownbj.setPath( 'assets/modelado/Obj/' );
			BtnArrowBioDownbj.load( 'BtnArrowDown.obj', function ( object ) {
	
				var objModelArrowDown = object.children[ 0 ];
				objModelArrowDown.name = 'BtnArrowDownBi';
				objModelArrowDown.position.set( 0,-581,0 );
				scene.add( objModelArrowDown );
	
			} );
	
		} );


		///FLECHAS MONOPOLAR CUT

		var BtnArrowUpMonoCut = new MTLLoader();
		BtnArrowUpMonoCut.setPath( 'assets/modelado/Obj/' );
		BtnArrowUpMonoCut.load( 'BtnArrowUp.mtl', function ( materials ) {
	
			materials.preload();
	
			var BtnArrowMonobj = new OBJLoader();
			BtnArrowMonobj.setMaterials( materials );
			BtnArrowMonobj.setPath( 'assets/modelado/Obj/' );
			BtnArrowMonobj.load( 'BtnArrowUp.obj', function ( object ) {
	
				var objModelArrowUpMonoCut = object.children[ 0 ];
				objModelArrowUpMonoCut.name = 'BtnArrowUpMonoCut';
				objModelArrowUpMonoCut.position.set( 31.5,-581,0 );
				scene.add( objModelArrowUpMonoCut );
	
			} );
	
		} );


		var BtnArrowDownMonoCut = new MTLLoader();
		BtnArrowDownMonoCut.setPath( 'assets/modelado/Obj/' );
		BtnArrowDownMonoCut.load( 'BtnArrowDown.mtl', function ( materials ) {
	
			materials.preload();
	
			var BtnArrowMonoCutDownbj = new OBJLoader();
			BtnArrowMonoCutDownbj.setMaterials( materials );
			BtnArrowMonoCutDownbj.setPath( 'assets/modelado/Obj/' );
			BtnArrowMonoCutDownbj.load( 'BtnArrowDown.obj', function ( object ) {
	
				var objModelArrowDownMonoCut = object.children[ 0 ];
				objModelArrowDownMonoCut.name = 'BtnArrowDownMonoCut';
				objModelArrowDownMonoCut.position.set( 31.5,-581,0 );
				scene.add( objModelArrowDownMonoCut );
	
			} );
	
		} );


		///FLECHAS MONOPOLAR COAG

		var BtnArrowUpMonoCoag = new MTLLoader();
		BtnArrowUpMonoCoag.setPath( 'assets/modelado/Obj/' );
		BtnArrowUpMonoCoag.load( 'BtnArrowUp.mtl', function ( materials ) {
	
			materials.preload();
	
			var BtnArrowMonoCoagobj = new OBJLoader();
			BtnArrowMonoCoagobj.setMaterials( materials );
			BtnArrowMonoCoagobj.setPath( 'assets/modelado/Obj/' );
			BtnArrowMonoCoagobj.load( 'BtnArrowUp.obj', function ( object ) {
	
				var objModelArrowUpMonoCoag = object.children[ 0 ];
				objModelArrowUpMonoCoag.name = 'BtnArrowUpMonoCoag';
				objModelArrowUpMonoCoag.position.set( 48,-581,0.5 );
				scene.add( objModelArrowUpMonoCoag );
	
			} );
	
		} );


		var BtnArrowDownMonoCoag = new MTLLoader();
		BtnArrowDownMonoCoag.setPath( 'assets/modelado/Obj/' );
		BtnArrowDownMonoCoag.load( 'BtnArrowDown.mtl', function ( materials ) {
	
			materials.preload();
	
			var BtnArrowMonoCoagDownobj = new OBJLoader();
			BtnArrowMonoCoagDownobj.setMaterials( materials );
			BtnArrowMonoCoagDownobj.setPath( 'assets/modelado/Obj/' );
			BtnArrowMonoCoagDownobj.load( 'BtnArrowDown.obj', function ( object ) {
	
				var objModelArrowDownMonoCoag = object.children[ 0 ];
				objModelArrowDownMonoCoag.name = 'BtnArrowDownMonoCoag';
				objModelArrowDownMonoCoag.position.set( 48,-581,0.5 );
				scene.add( objModelArrowDownMonoCoag );
	
			} );
	
		} );


		//BOTONES BLENDS


		var BtnPureCut = new MTLLoader();
		BtnPureCut.setPath( 'assets/modelado/Obj/' );
		BtnPureCut.load( 'BtnPureCut.mtl', function ( materials ) {
	
			materials.preload();
	
			var BtnPureCutobj = new OBJLoader();
			BtnPureCutobj.setMaterials( materials );
			BtnPureCutobj.setPath( 'assets/modelado/Obj/' );
			BtnPureCutobj.load( 'BtnPureCut.obj', function ( object ) {
	
				var objModelBtnPureCut = object.children[ 0 ];
				objModelBtnPureCut.name = 'BtnPureCut';
				objModelBtnPureCut.position.set( 0,-581,0);
				scene.add( objModelBtnPureCut );
	
			} );
	
		} );

		var BtnBlend1= new MTLLoader();
		BtnBlend1.setPath( 'assets/modelado/Obj/' );
		BtnBlend1.load( 'BtnBlendUno.mtl', function ( materials ) {
	
			materials.preload();
	
			var BtnBlend1obj = new OBJLoader();
			BtnBlend1obj.setMaterials( materials );
			BtnBlend1obj.setPath( 'assets/modelado/Obj/' );
			BtnBlend1obj.load( 'BtnBlendUno.obj', function ( object ) {
	
				var objModelBtnBlend1= object.children[ 0 ];
				objModelBtnBlend1.name = 'BtnBlend1';
				objModelBtnBlend1.position.set( 0,-581,0);
				scene.add( objModelBtnBlend1 );
	
			} );
	
		} );

		
		var BtnBlend2= new MTLLoader();
		BtnBlend2.setPath( 'assets/modelado/Obj/' );
		BtnBlend2.load( 'BtnBlendDos.mtl', function ( materials ) {
	
			materials.preload();
	
			var BtnBlend2obj = new OBJLoader();
			BtnBlend2obj.setMaterials( materials );
			BtnBlend2obj.setPath( 'assets/modelado/Obj/' );
			BtnBlend2obj.load( 'BtnBlendDos.obj', function ( object ) {
	
				var objModelBtnBlend2= object.children[ 0 ];
				objModelBtnBlend2.name = 'BtnBlend2';
				objModelBtnBlend2.position.set( 0,-581,0);
				scene.add( objModelBtnBlend2 );
	
			} );
	
		} );

		var BtnBlend3= new MTLLoader();
		BtnBlend3.setPath( 'assets/modelado/Obj/' );
		BtnBlend3.load( 'BtnBlendTres.mtl', function ( materials ) {
	
			materials.preload();
	
			var BtnBlend3obj = new OBJLoader();
			BtnBlend3obj.setMaterials( materials );
			BtnBlend3obj.setPath( 'assets/modelado/Obj/' );
			BtnBlend3obj.load( 'BtnBlendTres.obj', function ( object ) {
	
				var objModelBtnBlend3= object.children[ 0 ];
				objModelBtnBlend3.name = 'BtnBlend3';
				objModelBtnBlend3.position.set( 0,-581,0);
				scene.add( objModelBtnBlend3 );
	
			} );
	
		} );

	


	


	}


	CreateBtns();

	//event click

	


	addEventListener( 'mousedown', ( e ) => {

	
		mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
		console.log( mouse );

		raycaster.setFromCamera( mouse, camera );

		const items = raycaster.intersectObjects( scene.children, true );
		

		items.forEach( ( i ) => {
			

			if ( i.object.name == 'BtnPower' ) {
				
                const mapglow = new THREE.TextureLoader().load( 'assets/modelado/glow.png' );
                const materialglow = new THREE.SpriteMaterial( { map: mapglow } );

                const spriteg = new THREE.Sprite( materialglow );
                spriteg.position.set( 41.5,27.5,-129.5);
                spriteg.scale.set(12, 10, 1.0);
                scene.add( spriteg );

				//textos

				contci = document.getElementById( 'container-info' );
                contci.style.visibility = 'visible';
        
                tituloc = document.getElementById( 'info-titulo' );
                tituloc.style.visibility = 'visible';
                var tittext = document.createTextNode( 'Botón de Stand By' );
                tituloc.appendChild( tittext );
               
                parrafoc = document.getElementById( 'info-texto' );
                parrafoc.style.visibility = 'visible';


				var imgSe = document.getElementById("imgSeñal");
				imgSe.style.visibility = 'visible';
				imgSe.src="./assets/img/standby.PNG";

				var infoc = document.createTextNode( 'Con este botón has salido del modo Stand By del equipo. Esto significa que ya puedes ajustar la potencia de cualquiera de los modos de uso de ESU: Monopolar (corte/coagulación) y bipolar. ' );
				parrafoc.appendChild(infoc);
			
				document.getElementById( 'imgS' ).addEventListener( 'click', BtnSalirTxt( tittext, infoc, imgSe ) );



                //sonido

                const audioListenerbtnPower = new THREE.AudioListener();
                camera.add( audioListenerbtnPower );
                const BtnSoundPower = new THREE.Audio( audioListenerbtnPower );
                scene.add( BtnSoundPower );
                const loaderPower = new THREE.AudioLoader();

                // carga el recurso
                loaderPower.load(
                    // Ruta o URL del recurso
                    'assets/audios/encender.mp3',
                    // onLoad callback 
                    function ( audioBuffer ) {
                        // set the audio object buffer to the loaded object
                        BtnSoundPower.setBuffer( audioBuffer );
                        // play the audio
                        BtnSoundPower.play();

                    },

                    // onProgress callback
                    function ( xhr ) {

                        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

                    },

                    // onError callback
                    function ( err ) {

                        console.log( 'An error happened' );

                    }
                );


				
				
							
			}


			if(i.object.name == 'BtnMonoCut'){

				console.log("me cliqueaste!");

                contci = document.getElementById( 'container-info' );
                contci.style.visibility = 'visible';
        
                tituloc = document.getElementById( 'info-titulo' );
                tituloc.style.visibility = 'visible';
                var tittext = document.createTextNode( 'Botón de corte monopolar' );
                tituloc.appendChild( tittext );
                //titulo.textContent = "TITULO DE LA FUNCION";
                parrafoc = document.getElementById( 'info-texto' );
                parrafoc.style.visibility = 'visible';
                var infoc = document.createTextNode( 'Para conectar el electrodo activo para el modo corte monopolar se tienen dos opciones: hand switch & accesory. Con handswitch se podrá manipular el electrodo activo únicamente con el lápiz, mientras que si se conecta en accesory se puede manipular tanto del lápiz como del pedal. Se debe tener en consideración que al conectarlo en el modo accesorio se corre el riesgo de que se pise el pedal por accidente si este no está en uso. Para el caso de este simulador y por fines prácticos, no se incluyó la opción de los pedales por lo tanto se conectará el electrodo activo a handswitch.Existen diferentes tipos de puntas para usar el electrodo activo, dependiendo del efecto quirúrgico que se requiera. Para el caso del simulador se usará el estándar que se conoce como de aguja.Para conocer un poco más sobre los diferentes modos de corte monopolar (corte puro y blends) puedes dirigirte al panel de corte monopolar (amarillo) y en cada botón encontrarás más información. 				' );
                parrafoc.appendChild( infoc );
				var imgSe = document.getElementById("imgSeñal");
				imgSe.style.visibility = 'visible';
				imgSe.src="./assets/img/monocut.PNG";

             
                document.getElementById( 'imgS' ).addEventListener( 'click', BtnSalirTxt( tittext, infoc ) );



			}


			if(i.object.name == 'BtnMonoCoag'){

				console.log("me cliqueaste!");

                contci = document.getElementById( 'container-info' );
                contci.style.visibility = 'visible';
        
                tituloc = document.getElementById( 'info-titulo' );
                tituloc.style.visibility = 'visible';
                var tittext = document.createTextNode( 'Botón MONOPOLAR COAG' );
                tituloc.appendChild( tittext );
                //titulo.textContent = "TITULO DE LA FUNCION";
                parrafoc = document.getElementById( 'info-texto' );
                parrafoc.style.visibility = 'visible';
                var infoc = document.createTextNode( 'La coagulación es un proceso para coagular la sangre (coágulo de sangre) en un vaso sanguíneo roto para detener la hemorragia. Utiliza una forma de onda que se enciende y apaga varias veces por segundo. Produce un menor calentamiento del tejido y produce un efecto de deshidratación que sella los vasos sanguíneos.Debido a que la técnica de coagulación se encuentra en el modo monopolar, la conexión es la misma descrita en el botón de corte monopolar, ya que es el mismo conector, en este caso, en handswitch.' );
                parrafoc.appendChild( infoc );
				var imgSe = document.getElementById("imgSeñal");
				imgSe.style.visibility = 'visible';
				imgSe.src="./assets/img/coagu.png";

                document.getElementById( 'imgS' ).addEventListener( 'click', BtnSalirTxt( tittext, infoc ) );



			}

			if(i.object.name == 'BtnBipolar'){

				contci = document.getElementById( 'container-info' );
                contci.style.visibility = 'visible';
        
                tituloc = document.getElementById( 'info-titulo' );
                tituloc.style.visibility = 'visible';
                var tittext = document.createTextNode( 'Botón Bipolar' );
                tituloc.appendChild( tittext );
               
                parrafoc = document.getElementById( 'info-texto' );
                parrafoc.style.visibility = 'visible';


				var imgSe = document.getElementById("imgSeñal");
				imgSe.style.visibility = 'visible';
				imgSe.src="./assets/img/bipolar.jpeg";

				var infoc = document.createTextNode( 'La técnica bipolar se basa en el flujo de electricidad entre dos electrodos en el mismo mango que son equivalentes a lo que sería el electrodo activo y de retorno en el modo monopolar. Por lo tanto, no requiere placa de retorno. Para usar el modo bipolar es necesario conectar el pedal bipolar, pues de esta manera se acciona el electrodo activo, si no se conecta el pedal bipolar, no se generará ningún efecto quirúrgico. En esta forma de electrocirugía, el paciente no hace parte del circuito como en la cirugía monopolar. Se utiliza principalmente para cauterizar tejidos. ' );
				parrafoc.appendChild(infoc);
			
				document.getElementById( 'imgS' ).addEventListener( 'click', BtnSalirTxt( tittext, infoc, imgSe ) );

            



			}

			if(i.object.name == 'BtnArrowUpBi'){
				if(contadorBipolar == ContadorLimiteBipolar){
					//alerta
					console.log("limite del modo bipolar");

					
				 
				 }else{
					contadorBipolar+=5;
					var btncortebi = document.getElementById("btbico");
					btncortebi.style.visibility = "visible";
					//codigo restante
				 }
				
				

				// muestra la suma;
				console.log( contadorBipolar );
				// muestra la propiedad que tiene los hijos de la escena (objetos 3d)
				console.log( i.object.name );

				//sonido

				const audioListenerbtn = new THREE.AudioListener();
				camera.add( audioListenerbtn );
				const BtnSound = new THREE.Audio( audioListenerbtn );
				scene.add( BtnSound );
				const loader2 = new THREE.AudioLoader();

				// load a resource
				loader2.load(
					// resource URL
					'assets/audios/boton.mp3',

					// onLoad callback
					function ( audioBuffer ) {

						// set the audio object buffer to the loaded object
						BtnSound.setBuffer( audioBuffer );

						// play the audio
						BtnSound.play();

					},

					// onProgress callback
					function ( xhr ) {

						console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

					},

					// onError callback
					function ( err ) {

						console.log( 'An error happened' );

					}
				);


			}

			if(i.object.name == 'BtnArrowDownBi'){

				if(contadorBipolar >= 1 &&  ContadorLimiteBipolar <= 150){
                
                    contadorBipolar -= 5;
                 
                 }else{
                    console.log("No reconoce numeros negativos");
                
                 }

                

                // muestra la suma;
                console.log( contadorBipolar );
                // muestra la propiedad que tiene los hijos de laa escena (objetos 3d)
                console.log( i.object.name );

                //sonido

                const audioListenerbtn = new THREE.AudioListener();
                camera.add( audioListenerbtn );
                const BtnSound = new THREE.Audio( audioListenerbtn );
                scene.add( BtnSound );
                const loader2 = new THREE.AudioLoader();
                loader2.load(
                
                    'assets/audios/boton.mp3',
                
                    function ( audioBuffer ) {
                        BtnSound.setBuffer( audioBuffer );
                        BtnSound.play();

                    }
                );

			}

			if(i.object.name == 'BtnArrowUpMonoCut'){
				if(contadorCortePuro == contadorLimiteCortePuro){
                    //alerta
                    console.log("limite del modo corte puro");
                 
                 }else{
                    contadorCortePuro += 25;
					var btncortemono = document.getElementById("btnomocut");
					btncortemono.style.visibility = "visible";
                    //codigo restante
                 }

            //sonido

            const audioListenerbtn = new THREE.AudioListener();
            camera.add( audioListenerbtn );
            const BtnSound = new THREE.Audio( audioListenerbtn );
            scene.add( BtnSound );
            const loader2 = new THREE.AudioLoader();
            loader2.load(
            
                'assets/audios/boton.mp3',
            
                function ( audioBuffer ) {
                    BtnSound.setBuffer( audioBuffer );
                    BtnSound.play();

                }
            );

                // muestra la suma;
                console.log( ContadorCoagulacion );
                // muestra la propiedad que tiene los hijos de laa escena (objetos 3d)
                console.log( i.object.name );


			}

			if(i.object.name == 'BtnArrowDownMonoCut'){
				if(contadorCortePuro >= 1 &&  contadorLimiteCortePuro <= 300){      
                    contadorCortePuro -= 25;
                 
                 }else{
                    console.log("No reconoce numeros negativos");
				
                 }
                 //sonido

                const audioListenerbtn = new THREE.AudioListener();
                camera.add( audioListenerbtn );
                const BtnSound = new THREE.Audio( audioListenerbtn );
                scene.add( BtnSound );
                const loader2 = new THREE.AudioLoader();
                loader2.load(
                
                    'assets/audios/boton.mp3',
                
                    function ( audioBuffer ) {
                        BtnSound.setBuffer( audioBuffer );
                        BtnSound.play();

                    }
                );

                // muestra la suma;
                console.log( contadorCortePuro );
                // muestra la propiedad que tiene los hijos de laa escena (objetos 3d)
                console.log( i.object.name );


			}


			if(i.object.name == 'BtnArrowUpMonoCoag'){
				if(ContadorCoagulacion == ContadorLimiteCoagulacion){
                    //alerta
                    console.log("limite del modo coagulacion");
                 
                 }else{
                    ContadorCoagulacion += 20;
					var btncortemono = document.getElementById("btnomocut");
					btncortemono.style.visibility = "visible";
                    //codigo restante
                 }

            //sonido

            const audioListenerbtn = new THREE.AudioListener();
            camera.add( audioListenerbtn );
            const BtnSound = new THREE.Audio( audioListenerbtn );
            scene.add( BtnSound );
            const loader2 = new THREE.AudioLoader();
            loader2.load(
            
                'assets/audios/boton.mp3',
            
                function ( audioBuffer ) {
                    BtnSound.setBuffer( audioBuffer );
                    BtnSound.play();

                }
            );

                // muestra la suma;
                console.log( contadorCortePuro );
                // muestra la propiedad que tiene los hijos de laa escena (objetos 3d)
                console.log( i.object.name );


			}


			if(i.object.name == 'BtnArrowDownMonoCoag'){

				if(ContadorCoagulacion >= 1 &&  ContadorLimiteCoagulacion <= 120){
                
                    ContadorCoagulacion -= 20;
                 
                 }else{
                    console.log("No reconoce numeros negativos");
                
                 }

            //sonido

            const audioListenerbtn = new THREE.AudioListener();
            camera.add( audioListenerbtn );
            const BtnSound = new THREE.Audio( audioListenerbtn );
            scene.add( BtnSound );
            const loader2 = new THREE.AudioLoader();
            loader2.load(
            
                'assets/audios/boton.mp3',
            
                function ( audioBuffer ) {
                    BtnSound.setBuffer( audioBuffer );
                    BtnSound.play();

                }
            );

                // muestra la suma;
                console.log( contadorCortePuro );
                // muestra la propiedad que tiene los hijos de laa escena (objetos 3d)
                console.log( i.object.name );



			}

			if(i.object.name == 'BtnPureCut'){
				

                contci = document.getElementById( 'container-info' );
                contci.style.visibility = 'visible';
        
                tituloc = document.getElementById( 'info-titulo' );
                tituloc.style.visibility = 'visible';
                var tittext = document.createTextNode( 'Botón CORTE PURO' );
                tituloc.appendChild( tittext );
                //titulo.textContent = "TITULO DE LA FUNCION";
                parrafoc = document.getElementById( 'info-texto' );
                parrafoc.style.visibility = 'visible';

				//var imse = document.getElementById("imgSeñal").src="./assets/img/cortepuro.PNG";
				//imse.style.visibility = 'visible';

				var imgSe = document.getElementById("imgSeñal");
				imgSe.style.visibility = 'visible';
				imgSe.src="./assets/img/cortepuro.png";

				var infoc = document.createTextNode( 'Para lograr un efecto de corte puro, la punta del electrodo activo debe sostenerse justo sobre el tejido objetivo (este se debe tener a una distancia de 1mm del tejido a cortar). Durante cada oscilación positiva y negativa de la forma de onda mostrada, se forma un nuevo arco de descarga y desaparece en la misma ubicación del tejido. La corriente eléctrica se concentra en esta ubicación del tejido, provocando un aumento repentino de la temperatura debido al calentamiento resistivo. El rápido aumento de temperatura luego vaporiza los fluidos intracelulares, aumenta la presión celular y rompe la membrana celular, separando así el tejido y generando el corte puro.' );
				parrafoc.appendChild(infoc);
				
             /*   var infoc = document.createTextNode( 'Durante el corte, el electrodo activo debe mantenerse a una corta distancia (aproximadamente 1 mm) del tejido a cortar.' );
				parrafoc.appendChild(infoc);

				var linebreak = document.createElement('br');
				parrafoc.appendChild(linebreak);

				var infoc2 = document.createTextNode( 'El electrodo activo no toca directamente el tejido durante el proceso de corte porque está rodeado por una barrera de vapor de líquido intracelular vaporizado.' );
				parrafoc.appendChild(infoc2);
             
                document.getElementById( 'imgS' ).addEventListener( 'click', BtnSalirTxt( tittext, infoc,infoc2 ) ); */
				document.getElementById( 'imgS' ).addEventListener( 'click', BtnSalirTxt( tittext, infoc, imgSe ) );


			}
			if(i.object.name == 'BtnBlend1'){
				contci = document.getElementById( 'container-info' );
                contci.style.visibility = 'visible';
        
                tituloc = document.getElementById( 'info-titulo' );
                tituloc.style.visibility = 'visible';
                var tittext = document.createTextNode( 'Botón BLEND 1' );
                tituloc.appendChild( tittext );
               
                parrafoc = document.getElementById( 'info-texto' );
                parrafoc.style.visibility = 'visible';


				var imgSe = document.getElementById("imgSeñal");
				imgSe.style.visibility = 'visible';
				imgSe.src="./assets/img/corteblend.png";

				var infoc = document.createTextNode( 'La mayoría de unidades electroquirúrgicas hoy en día ofrecen un modo mixto (blend). El corte combinado permite al cirujano cortar y coagular al mismo tiempo. La  forma de onda que se genera en blend corresponde a una  amortiguada que produce un poco de hemostasia durante el corte. La diferencia entre los 3 modos de blend es su ciclo de trabajo. En este caso, el blend 1 tiene su ciclo de trabajo al 50%. Lo anterior quiere decir que se encuentra en “on” un 50% del ciclo, y el otro 50% se encuentra en off. Con el blend 1 se puede vaporizar tejido con hemostasia mínima, se produce corte y coagulación por partes iguales.' );
				parrafoc.appendChild(infoc);
			
				document.getElementById( 'imgS' ).addEventListener( 'click', BtnSalirTxt( tittext, infoc, imgSe ) );
			}
			if(i.object.name == 'BtnBlend2'){
				contci = document.getElementById( 'container-info' );
                contci.style.visibility = 'visible';
        
                tituloc = document.getElementById( 'info-titulo' );
                tituloc.style.visibility = 'visible';
                var tittext = document.createTextNode( 'Botón BLEND 2' );
                tituloc.appendChild( tittext );
               
                parrafoc = document.getElementById( 'info-texto' );
                parrafoc.style.visibility = 'visible';


				var imgSe = document.getElementById("imgSeñal");
				imgSe.style.visibility = 'visible';
				imgSe.src="./assets/img/corteblendtres.png";

				var infoc = document.createTextNode( 'Tiene un ciclo de trabajo al 40%. Lo anterior quiere decir que está en “on” un 40% del ciclo mientras que el 60% restante está en off. En el blend 2 se produce más coagulación que corte. ' );
				parrafoc.appendChild(infoc);
			
				document.getElementById( 'imgS' ).addEventListener( 'click', BtnSalirTxt( tittext, infoc, imgSe ) );
			}
			if(i.object.name == 'BtnBlend3'){
				contci = document.getElementById( 'container-info' );
                contci.style.visibility = 'visible';
        
                tituloc = document.getElementById( 'info-titulo' );
                tituloc.style.visibility = 'visible';
                var tittext = document.createTextNode( 'Botón BLEND 3' );
                tituloc.appendChild( tittext );
               
                parrafoc = document.getElementById( 'info-texto' );
                parrafoc.style.visibility = 'visible';


				var imgSe = document.getElementById("imgSeñal");
				imgSe.style.visibility = 'visible';
				imgSe.src="./assets/img/corteblendos.png";

				var infoc = document.createTextNode( 'Tiene ciclo de trabajo al 25%. Lo anterior quiere decir que la señal se encuentra encendida un 25% del ciclo y el 75% restante se encuentra apagada. Al contrario que en el blend 1, el blend 3 no se logra cortar mucho pero si se logra una muy buena hemostasia. ' );
				parrafoc.appendChild(infoc);
			
				document.getElementById( 'imgS' ).addEventListener( 'click', BtnSalirTxt( tittext, infoc, imgSe ) );
			}





		} )


				// FIGURA CON TEXTO DINAMICO BIPOLAR
				var dynamicTexture	= new THREEx.DynamicTexture( 292, 292 );
				dynamicTexture.context.font	= 'bolder 100px Verdana';
				dynamicTexture.texture.anisotropy = renderer.getMaxAnisotropy();

				var text = `${contadorBipolar}`;
				// update the text
				dynamicTexture.clear( 'black' ).drawText( text, undefined, 210, 'pink' );


				// update the text


				var CuboBipolar	= new THREE.BoxGeometry( 15, 10, 5 );
				var materialCuboBipolar	= new THREE.MeshBasicMaterial( {
					map: dynamicTexture.texture,

				} );
				var mesh	= new THREE.Mesh( CuboBipolar, materialCuboBipolar );
				mesh.position.set(68, 47.5, -130 );
				mesh.name = 'pantallaBipolar';
				scene.add( mesh );



				// FIGURA CON TEXTO DINAMICO MONOPOLAR DERECHO
				var dynamicTextureMonopolar1	= new THREEx.DynamicTexture( 292, 292 );
				dynamicTextureMonopolar1.context.font	= 'bolder 100px Verdana';
				dynamicTextureMonopolar1.texture.anisotropy = renderer.getMaxAnisotropy();

				var text2 = `${ContadorCoagulacion}`;
				// update the text
				dynamicTextureMonopolar1.clear( 'black' ).drawText( text2, undefined, 210, 'pink' );


				// update the text


				var CuboMonopolar1	= new THREE.BoxGeometry( 15, 10, 5 );
				var materialCuboMonopolar1	= new THREE.MeshBasicMaterial( { map: dynamicTextureMonopolar1.texture} );


				var meshcuboMonopolar1	= new THREE.Mesh( CuboMonopolar1, materialCuboMonopolar1 );
				meshcuboMonopolar1.position.set(  115.5, 47.5, -130  );
				meshcuboMonopolar1.name = 'trt';
				scene.add( meshcuboMonopolar1 );




				// FIGURA CON TEXTO DINAMICO MONOPOLAR IZQUIERDA
				var dynamicTextureMonopolar2	= new THREEx.DynamicTexture( 292, 292 );
				dynamicTextureMonopolar2.context.font	= 'bolder 100px Verdana';
				dynamicTextureMonopolar2.texture.anisotropy = renderer.getMaxAnisotropy();

				var text2 = `${contadorCortePuro}`;
				// update the text
				dynamicTextureMonopolar2.clear( 'black' ).drawText( text2, undefined, 210, 'pink' );


				// update the text


				var CuboMonopolar2	= new THREE.BoxGeometry( 15, 10, 5 );
				var materialCuboMonopolar2	= new THREE.MeshBasicMaterial( {map: dynamicTextureMonopolar2.texture	} );


				var meshcuboMonopolar2	= new THREE.Mesh( CuboMonopolar2, materialCuboMonopolar2 );
				meshcuboMonopolar2.position.set( 92.5, 47.5, -130 );
				meshcuboMonopolar2.name = 'box3';
				scene.add( meshcuboMonopolar2 );

	} );




//////////////////////////////

	 //Sprites

	 groupSprites = new THREE.Group();
	 scene.add( groupSprites );

	const map = new THREE.TextureLoader().load( 'assets/iconos/punto.png' );
	const material = new THREE.SpriteMaterial( { map: map, color: 0xffffff } );

	 sprite = new THREE.Sprite( material );
	sprite.position.set( 46,19,-112 );
	sprite.scale.set( 3,3,3);
	sprite.name = 'drag1';
	groupSprites.add( sprite );

	sprite2 = new THREE.Sprite( material );
	sprite2.position.set( 92,19,-115 );
	sprite2.scale.set( 3,3,3);
	sprite2.name = 'drag2';
	groupSprites.add( sprite2 );


	const element2 = document.getElementById('container');

addEventListener( 'mousedown', ( u ) => {

	mouse2.x = ( u.clientX / window.innerWidth ) * 2 - 1;
	mouse2.y = - ( u.clientY / window.innerHeight ) * 2 + 1;


	raycaster.setFromCamera( mouse2, camera );

	const Spriteitems = raycaster.intersectObjects( groupSprites.children );

	Spriteitems.forEach(function(m){

		if ( m.object.name == 'drag1' ) {

			camera.position.set( 9.8, player.height, -107 );
			camera.rotation.set( 0, -1.57 , 0);
		
			DragDrop1();


		}

		if ( m.object.name == 'drag2' ) {
			camera.position.set( 72, player.height, -105 );
			camera.rotation.set( 0, -1.57 , 0);
			DragDrop2();

		}
	} );






} );
















	

	





}


function initCannon() {

	 // Setup world
	world = new CANNON.World();
	world.gravity.set( 0, - 20, 0 );

	world.solver.iterations = 5;
	world.defaultContactMaterial.contactEquationStiffness = 1e6;

	// fisicas
	var density = 2515; // kg/m^3
	//var mass = density * shape.volume();

	//materiales
	physicsMaterial = new CANNON.Material( 'physics' );
	const physics_physics = new CANNON.ContactMaterial( physicsMaterial, physicsMaterial, {
	  friction: 0.1,
	  restitution: 0.3,
	} );

	// Floor
	const floorShape = new CANNON.Plane();
	const floorBody = new CANNON.Body( { mass: 0 } );
	floorBody.addShape( floorShape );
	floorBody.quaternion.setFromEuler( - Math.PI / 2, 0, 0 );
	floorBody.position.set( 0, 0, - 1 );
	world.addBody( floorBody );

	// Cube body
	const cubeShape = new CANNON.Box( new CANNON.Vec3( 2, 2, 1.5 ) );
	cubeBody = new CANNON.Body( { mass: 5, shape: cubeShape } );
	cubeBody.addShape( cubeShape );
	cubeBody.position.set( 0, 5, 10 );
	bodies.push( cubeBody );
	world.addBody( cubeBody );



    	// Cube body Bipolar
	const owoShape = new CANNON.Box( new CANNON.Vec3( 4, 3.4, 2 ) );
	cubetwoBody = new CANNON.Body( { mass: 50, shape: owoShape } );
	cubetwoBody.addShape( owoShape );
	cubetwoBody.position.set( 55, 9, -100 );
	bodies.push( cubetwoBody );
	world.addBody( cubetwoBody );

	// Cube body Monopolar 
	const CuboEAmonoShape = new CANNON.Box( new CANNON.Vec3( 4, 3.4, 2 ) );
	CuboEAMonoBody = new CANNON.Body( { mass: 50, shape: CuboEAmonoShape } );
	CuboEAMonoBody.addShape( owoShape );
	CuboEAMonoBody.position.set( 110, 9, -100 );
	bodies.push( CuboEAMonoBody );
	world.addBody( CuboEAMonoBody );

	

	// Cube body esuinferior
	const esuinferiorShape = new CANNON.Box( new CANNON.Vec3( 50, 2.5, 70 ) ); //puntos el primero equivale al ancho de la colision , el segundo la masa y el tercero el largo de la colision
	esuinferiorBody = new CANNON.Body( { mass: density, material: physicsMaterial } );
	esuinferiorBody.addShape( esuinferiorShape );
	esuinferiorBody.position.set( 80, 1, - 176 );
	bodies.push( esuinferiorBody );
	world.addBody( esuinferiorBody );

	// Cube para colisionar electrodo activo bipolar
	const CuboElectrodoActivoBipolarShape = new CANNON.Box( new CANNON.Vec3( 5, 5, 5 ) );
	electroActivoBiBody = new CANNON.Body( { isTrigger: true } );
	electroActivoBiBody.addShape( CuboElectrodoActivoBipolarShape );
	electroActivoBiBody.position.set(59, 7, -121 );
 
	bodies.push( electroActivoBiBody );
	world.addBody( electroActivoBiBody );

	// Cube para electrodo colisionar activo Monopolar
	const CuboElectrodoActivoMonopolarShape = new CANNON.Box( new CANNON.Vec3( 5, 5, 5 ) );
	electroActivoMonoBody = new CANNON.Body( { isTrigger: true } );
	electroActivoMonoBody.addShape( CuboElectrodoActivoMonopolarShape );
	electroActivoMonoBody.position.set(111.5, 7, -121 );
 
	bodies.push( electroActivoMonoBody );
	world.addBody( electroActivoMonoBody );

	


	electroActivoBiBody.addEventListener( 'collide', ( event ) => {

		if ( event.body === cubetwoBody ) {

			  console.log( 'The sphere entered the trigger!', event );

			 // alert(" Se conecto el electrodoActivo");

			  world.removeBody( cubetwoBody );
			  scene.remove( owoMesh );

			  const loaderEABipolar = new GLTFLoader();
			  loaderEABipolar.load( 'assets/modelado/EABipolarMom2.gltf', function ( gltf ) {
		  
		  
				  gltf.scene.children[ 0 ];
				  gltf.scene.position.set( 0, -580.5,0 );
				   scene.add( gltf.scene );
		  
			  
		  
			  } );


			  const loaderPedal = new GLTFLoader();
			  loaderPedal.load( 'assets/modelado/Pedal.gltf', function ( gltf ) {
		  
		  
				  gltf.scene.children[ 0 ];
				  gltf.scene.position.set( 0, -580.5,0 );
				   scene.add( gltf.scene );
		  
			  
		  
			  } );
			

		
		}

	} );
		  world.addEventListener( 'endContact', ( event ) => {

		if (
			  ( event.bodyA === cubetwoBody && event.bodyB === electroActivoBiBody ) ||
			  ( event.bodyB === cubetwoBody && event.bodyA === electroActivoBiBody )
		) {

			  console.log( 'The sphere exited the trigger!', event );




		}

	} );



	electroActivoMonoBody.addEventListener( 'collide', ( event ) => {

		if ( event.body === CuboEAMonoBody ) {

			  console.log( 'The cube entered the trigger!', event );

			
			  world.removeBody( CuboEAMonoBody );
			  scene.remove( cubomonoeaMesh );

			  const loaderEABipolar = new GLTFLoader();
			  loaderEABipolar.load( 'assets/modelado/EAMonopolarMom2.gltf', function ( gltf ) {
		  
		  
				  gltf.scene.children[ 0 ];
				  gltf.scene.position.set( 0, -581, 0 );
				   scene.add( gltf.scene );
		  
			  
		  
			  } ); 
			//  scene.remove( owoMesh );

		
		}

	} );
		  world.addEventListener( 'endContact', ( event ) => {

		if (
			  ( event.bodyA === CuboEAMonoBody && event.bodyB === electroActivoMonoBody ) ||
			  ( event.bodyB === CuboEAMonoBody && event.bodyA === electroActivoMonoBody )
		) {

			  console.log( 'The sphere exited the trigger!', event );




		}

	} );










	// Plano para arrastrat
	// Movement plane when dragging

	const floorMaterial = new THREE.MeshLambertMaterial( { color: 0x777777 } );
	const planeGeometry = new THREE.PlaneBufferGeometry( 100, 100 );
	movementPlane = new THREE.Mesh( planeGeometry, floorMaterial );
	movementPlane.visible = false; // Hide it..
	scene.add( movementPlane );

	// Joint body, to later constraint the cube
	const jointShape = new CANNON.Sphere( 0.1 );
	jointBody = new CANNON.Body( { mass: 0 } );
	jointBody.addShape( jointShape );
	jointBody.collisionFilterGroup = 0;
	jointBody.collisionFilterMask = 0;
	world.addBody( jointBody );

	//INGRESA AL MODO DE ARTRASTRE DE CUBOS



	


	



}



function DragDrop1() {

	raycaster = new THREE.Raycaster();

	const markerGeometry = new THREE.SphereBufferGeometry( 0.2, 8, 8 );
	const markerMaterial = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
	clickMarker = new THREE.Mesh( markerGeometry, markerMaterial );
	clickMarker.visible = false; // Hide it..
	scene.add( clickMarker );

	window.addEventListener( 'pointerdown', ( event ) => {

		// Cast a ray from where the mouse is pointing and
		// see if we hit something
		const hitPoint = getHitPoint( event.clientX, event.clientY, owoMesh, camera );

		// Return if the cube wasn't hit
		if ( ! hitPoint ) {

			return;

		}

		// Move marker mesh on contact point
		showClickMarker();
		moveClickMarker( hitPoint );

		// Move the movement plane on the z-plane of the hit
		moveMovementPlane( hitPoint, camera );

		// Create the constraint between the cube body and the joint body
		addJointConstraint( hitPoint, cubetwoBody );

		// Set the flag to trigger pointermove on next frame so the
		// movementPlane has had time to move
		requestAnimationFrame( () => {

			isDragging = true;

		} );

	} );

	window.addEventListener( 'pointermove', ( event ) => {

		if ( ! isDragging ) {

			return;

		}

		// Project the mouse onto the movement plane
		const hitPoint = getHitPoint( event.clientX, event.clientY, movementPlane, camera );

		if ( hitPoint ) {

			// Move marker mesh on the contact point
			moveClickMarker( hitPoint );

			// Move the cannon constraint on the contact point
			moveJoint( hitPoint );

		}

	} );

	window.addEventListener( 'pointerup', () => {

		isDragging = false;

		// Hide the marker mesh
		hideClickMarker();

		// Remove the mouse constraint from the world
		removeJointConstraint();

	} );

	function showClickMarker() {

		clickMarker.visible = true;

	}

	function moveClickMarker( position ) {

		clickMarker.position.copy( position );

	}

	function hideClickMarker() {

		clickMarker.visible = false;

	}

	// This function moves the virtual movement plane for the mouseJoint to move in
	function moveMovementPlane( point, camera ) {

		// Center at mouse position
		movementPlane.position.copy( point );

		// Make it face toward the camera
		movementPlane.quaternion.copy( camera.quaternion );

	}

	// Returns an hit point if there's a hit with the mesh,
	// otherwise returns undefined
	function getHitPoint( clientX, clientY, mesh, camera ) {

		// Get 3D point form the client x y
		const mouse3 = new THREE.Vector2();
		mouse3.x = ( clientX / window.innerWidth ) * 2 - 1;
		mouse3.y = - ( ( clientY / window.innerHeight ) * 2 - 1 );

		// Get the picking ray from the point
		raycaster.setFromCamera( mouse3, camera );

		// Find out if there's a hit
		const hits = raycaster.intersectObject( mesh );

		// Return the closest hit or undefined
		return hits.length > 0 ? hits[ 0 ].point : undefined;

	}

	// Add a constraint between the cube and the jointBody
	// in the initeraction position
	function addJointConstraint( position, constrainedBody ) {

		// Vector that goes from the body to the clicked point
		const vector = new CANNON.Vec3().copy( position ).vsub( constrainedBody.position );

		// Apply anti-quaternion to vector to tranform it into the local body coordinate system
		const antiRotation = constrainedBody.quaternion.inverse();
		const pivot = antiRotation.vmult( vector ); // pivot is not in local body coordinates

		// Move the cannon click marker body to the click position
		jointBody.position.copy( position );

		// Create a new constraint
		// The pivot for the jointBody is zero
		jointConstraint = new CANNON.PointToPointConstraint( constrainedBody, pivot, jointBody, new CANNON.Vec3( 0, 0, 0 ) );

		// Add the constraint to world
		world.addConstraint( jointConstraint );

	}

	// This functions moves the joint body to a new postion in space
	// and updates the constraint
	function moveJoint( position ) {

		jointBody.position.copy( position );
		jointConstraint.update();

	}

	// Remove constraint from world
	function removeJointConstraint() {

		world.removeConstraint( jointConstraint );
		jointConstraint = undefined;

	}


}



function DragDrop2() {

	raycaster = new THREE.Raycaster();

	const markerGeometry = new THREE.SphereBufferGeometry( 0.2, 8, 8 );
	const markerMaterial = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
	clickMarker = new THREE.Mesh( markerGeometry, markerMaterial );
	clickMarker.visible = false; // Hide it..
	scene.add( clickMarker );

	window.addEventListener( 'pointerdown', ( event ) => {

		// Cast a ray from where the mouse is pointing and
		// see if we hit something
		const hitPoint = getHitPoint( event.clientX, event.clientY, cubomonoeaMesh, camera );

		// Return if the cube wasn't hit
		if ( ! hitPoint ) {

			return;

		}

		// Move marker mesh on contact point
		showClickMarker();
		moveClickMarker( hitPoint );

		// Move the movement plane on the z-plane of the hit
		moveMovementPlane( hitPoint, camera );

		// Create the constraint between the cube body and the joint body
		addJointConstraint( hitPoint, CuboEAMonoBody );

		// Set the flag to trigger pointermove on next frame so the
		// movementPlane has had time to move
		requestAnimationFrame( () => {

			isDragging = true;

		} );

	} );

	window.addEventListener( 'pointermove', ( event ) => {

		if ( ! isDragging ) {

			return;

		}

		// Project the mouse onto the movement plane
		const hitPoint = getHitPoint( event.clientX, event.clientY, movementPlane, camera );

		if ( hitPoint ) {

			// Move marker mesh on the contact point
			moveClickMarker( hitPoint );

			// Move the cannon constraint on the contact point
			moveJoint( hitPoint );

		}

	} );

	window.addEventListener( 'pointerup', () => {

		isDragging = false;

		// Hide the marker mesh
		hideClickMarker();

		// Remove the mouse constraint from the world
		removeJointConstraint();

	} );

	function showClickMarker() {

		clickMarker.visible = true;

	}

	function moveClickMarker( position ) {

		clickMarker.position.copy( position );

	}

	function hideClickMarker() {

		clickMarker.visible = false;

	}

	// This function moves the virtual movement plane for the mouseJoint to move in
	function moveMovementPlane( point, camera ) {

		// Center at mouse position
		movementPlane.position.copy( point );

		// Make it face toward the camera
		movementPlane.quaternion.copy( camera.quaternion );

	}

	// Returns an hit point if there's a hit with the mesh,
	// otherwise returns undefined
	function getHitPoint( clientX, clientY, mesh, camera ) {

		// Get 3D point form the client x y
		const mouse4 = new THREE.Vector2();
		mouse4.x = ( clientX / window.innerWidth ) * 2 - 1;
		mouse4.y = - ( ( clientY / window.innerHeight ) * 2 - 1 );

		// Get the picking ray from the point
		raycaster.setFromCamera( mouse4, camera );

		// Find out if there's a hit
		const hits = raycaster.intersectObject( mesh );

		// Return the closest hit or undefined
		return hits.length > 0 ? hits[ 0 ].point : undefined;

	}

	// Add a constraint between the cube and the jointBody
	// in the initeraction position
	function addJointConstraint( position, constrainedBody ) {

		// Vector that goes from the body to the clicked point
		const vector = new CANNON.Vec3().copy( position ).vsub( constrainedBody.position );

		// Apply anti-quaternion to vector to tranform it into the local body coordinate system
		const antiRotation = constrainedBody.quaternion.inverse();
		const pivot = antiRotation.vmult( vector ); // pivot is not in local body coordinates

		// Move the cannon click marker body to the click position
		jointBody.position.copy( position );

		// Create a new constraint
		// The pivot for the jointBody is zero
		jointConstraint = new CANNON.PointToPointConstraint( constrainedBody, pivot, jointBody, new CANNON.Vec3( 0, 0, 0 ) );

		// Add the constraint to world
		world.addConstraint( jointConstraint );

	}

	// This functions moves the joint body to a new postion in space
	// and updates the constraint
	function moveJoint( position ) {

		jointBody.position.copy( position );
		jointConstraint.update();

	}

	// Remove constraint from world
	function removeJointConstraint() {

		world.removeConstraint( jointConstraint );
		jointConstraint = undefined;

	}


}





function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}



function MoveFPC() {

	requestAnimationFrame( MoveFPC );

	//camera.rotation.order = 'YXZ';

	
	

	// Keyboard movement inputs
	if ( keyboard[ 87 ]) { // W key

		cubeBody.position.x += -Math.sin( camera.rotation.y ) * player.speed;
		cubeBody.position.z += - Math.cos( camera.rotation.y ) * player.speed;

		if ( cubeBody.position.x != null && cubeBody.position.z != null ) {

			camera.position.x = cubeBody.position.x - player.speed;
			camera.position.z = cubeBody.position.z - player.speed;

		}



	}

	if ( keyboard[ 83 ] ) { // S key

		cubeBody.position.x -= -Math.sin( camera.rotation.y ) * player.speed;
		cubeBody.position.z -= - Math.cos( camera.rotation.y ) * player.speed;
		if ( cubeBody.position.x != null && cubeBody.position.z != null ) {

			camera.position.x = cubeBody.position.x - player.speed;
			camera.position.z = cubeBody.position.z - player.speed;

		}

		console.log(camera.position);
		console.log(camera.rotation);

	}

	if ( keyboard[ 65 ] ) { // A key

		// Redirect motion by 90 degrees
		cubeBody.position.x -= Math.sin( camera.rotation.y + Math.PI / 2 ) * player.speed;
		cubeBody.position.z -= Math.cos( camera.rotation.y + Math.PI / 2 ) * player.speed;

		if ( cubeBody.position.x != null && cubeBody.position.z != null ) {

			camera.position.x = cubeBody.position.x - player.speed;
			camera.position.z = cubeBody.position.z - player.speed;

		}

	


	}

	if ( keyboard[ 68 ] ) { // D key

		cubeBody.position.x -= Math.sin( camera.rotation.y - Math.PI / 2 ) * player.speed;
		cubeBody.position.z -=  Math.cos( camera.rotation.y - Math.PI / 2 ) * player.speed;

		if ( cubeBody.position.x != null && cubeBody.position.z != null ) {

			camera.position.x = cubeBody.position.x - player.speed;
			camera.position.z = cubeBody.position.z - player.speed;	
		}


		

		

		


	}   

	// Keyboard turn inputs
	if ( keyboard[ 81 ] ) { // left arrow key Q

		camera.rotation.order = 'YXZ';

		camera.rotation.y += player.turnSpeed;
		

		//camera.rotation.y = 90 * (Math.PI/180);
		//cubeBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);

	}

	if ( keyboard[ 69 ] ) { // right arrow key E

		camera.rotation.order = 'YXZ';

		camera.rotation.y -= player.turnSpeed;
		


	}

	if ( keyboard[ 82 ] ) { // up arrow key R = 82

		camera.rotation.x -= player.turnSpeed;

	}

	if ( keyboard[ 70 ] ) { // down arrow key  F=70

		camera.rotation.x += player.turnSpeed;

	}

	//T = 84 G = 71   subir y bajar a partir de position                    https://css-tricks.com/snippets/javascript/javascript-keycodes/

	if ( keyboard[ 71 ] ) { // left arrow key

		camera.position.y -= 10 * player.turnSpeed;


	}

	if ( keyboard[ 84 ] ) { // right arrow key

		camera.position.y += 10 * player.turnSpeed;

	}   


	Limits();

}


function keyDown( event ) {

	keyboard[ event.keyCode ] = true;

}

function keyUp( event ) {

	keyboard[ event.keyCode ] = false;

}


function Limits (){

	if(camera.position.x > 218 ||  camera.position.x <= -95){
		camera.position.set(1,1,1);
		cubeBody.position.set(1,1,1);
	}
	if(camera.position.z > 131 ||  camera.position.z <= -450){
		camera.position.set(1,1,1);
		cubeBody.position.set(1,1,1);
	}

	if(camera.position.y < 2.5){
		//camera.position.set(1,2.5,1);
		camera.position.y = 2.5;
		
	}

	if(camera.position.y > 500){
		//camera.position.set(1,2.5,1);
		camera.position.y = 500;
		
	}





}
window.addEventListener( 'keydown', keyDown );
window.addEventListener( 'keyup', keyUp );

function onTransitionEnd( event ) {


	event.target.remove();

	
}


function BtnSalirTxt( tittext, infoc, infoc2,imgSe ) {

	
	const BtnSa = document.getElementById( 'imgS' );
	var imgSe = document.getElementById("imgSeñal");
	BtnSa.style.visibility = 'visible';

	BtnSa.addEventListener( 'click', function ( ) {


		imgSe.style.visibility = 'hidden';
		tituloc.style.visibility = 'hidden';
		parrafoc.style.visibility = 'hidden';
		contci.style.visibility = 'hidden';
		BtnSa.style.visibility = 'hidden';

		 document.getElementById( 'info-titulo' ).removeChild(tittext);
		 document.getElementById( 'info-texto' ).removeChild(infoc);
		// document.getElementById( 'info-texto' ).removeChild(infoc2);
		// document.getElementById( 'i-eleminfo' ).removeChild(imgSe);

	
		

	} ); 

}



function animate() {

	requestAnimationFrame( animate );

	// Step the physics world
	updatePhysics();

	// Sync the three.js meshes with the bodies
	for ( let i = 0; i !== meshes.length; i ++ ) {

		meshes[ i ].position.copy( bodies[ i ].position );
		meshes[ i ].quaternion.copy( bodies[ i ].quaternion );

	}




}

function updatePhysics() {

	const time = performance.now() / 1000;
	if ( ! lastCallTime ) {

		world.step( timeStep );

	} else {

		const dt = time - lastCallTime;
		world.step( timeStep, dt );

	}

	lastCallTime = time;

}



/************Funcion update*************** */

function update() {

	requestAnimationFrame( update );
	render();



}







/************Funcion render *************** */
function render() {
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.outputEncoding = THREE.sRGBEncoding;
	renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	renderer.render( scene, camera );

}


/* DOCUMENTACION*/

//gtlf loafer
//https://www.youtube.com/watch?v=1TeMXIWRrqE

//colsiones
//http://www.bryanjones.us/article/basic-threejs-game-tutorial-part-5-collision-detection
//https://www.youtube.com/watch?v=Tte0xobRJsk

