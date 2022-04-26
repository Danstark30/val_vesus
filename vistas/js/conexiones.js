'use strict';

import * as THREE from '../../node_modules/three/build/three.module.js';
import { GLTFLoader } from '../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { DRACOLoader } from '../../node_modules/three/examples/jsm/loaders/DRACOLoader.js';
import * as TWEEN from '../../node_modules/@tweenjs/tween.js/dist/tween.esm.js';
import { RGBELoader } from '../../node_modules/three/examples/jsm/loaders/RGBELoader.js';


import { Camera, LoadingManager } from '../../node_modules/three/build/three.module.js';

var container;
var sceneWidth, sceneHeight;
var scene;
var renderer;
var camera;
var controls;

// Limits
const maxX = 25;
const minX = - 25;
const maxZ = 25;
const minZ = - Infinity;

// State
let positionX;
let positionZ;
let phi;
let theta;

//

let selectedObject = null;
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let groupSprites;
let sprite,sprite2,sprite3,sprite4;



//Html
let titulo, parrafo,contc;

//Animación
let mixer;
let mixer2;
let mixer3;
let mixer4;

const clock = new THREE.Clock();
const mouse = {};

//Animacion variables GLTF

let modelEnchufe;
let modelEsuBaja;
let modelElectrodoRetorno;
let modelConectorPaciente;

let action1;
let action2;
let action3;
let action4;

//
let spritedisibale=false;

//Interfaz
/*
const myTimeout = setTimeout(Instrucciones, 1000); 

function Instrucciones() {
	document.getElementById("instrucciones").style.visibility="hidden";
  }  */



init();

function init() {

	createScene();
	update();

}

function createScene() {

	

	sceneWidth = window.innerWidth;
	sceneHeight = window.innerHeight;

	//Escena

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x5298CA /*0x5298CA*/ );

	//Render
	renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( sceneWidth, sceneHeight );
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.BasicShadowMap;
	 //canvas
	 container = document.getElementById( 'container' );
	 container.appendChild( renderer.domElement );

	 //camara

	 camera = new THREE.PerspectiveCamera( 75, sceneWidth / sceneHeight, 0.5, 1500 );
	 camera.position.set( -182,159,-252 );
	 console.log( camera.rotation );


	 const axesHelper = new THREE.AxesHelper( 5 );
	 //scene.add( axesHelper );

	 //luces

	 const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 0.5 );
	 scene.add( light );

	 

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


	/*const light = new THREE.PointLight( 0xFFFFFF, 1, 1000 );
	light.position.set( 120, 120, 400 );
	scene.add( light );
	const light2 = new THREE.PointLight( 0xFFFFFF, 1, 1000 );
	light2.position.set( 150, 550, 1000 );
	scene.add( light2 );
	const light3 = new THREE.PointLight( 0xFFFFFF, 1, 1000 );
	light3.position.set( - 150, 550, 1 );
	scene.add( light3 ); */

	 //controls

	 
	 controls = new OrbitControls( camera, renderer.domElement );
	 controls.enableDamping = false;
	 controls.enableZoom = true;
	 console.log( controls.object.position );
	//limita el zoom del control
	 controls.minDistance = 20;
	 controls.maxDistance = 500;
	 controls.maxPolarAngle = Math.PI / 2;
	 controls.dampingFactor = 0.1;
	 controls.enablePan = false;

	 console.log( controls.object.position );


	/* //GUI INTERFAZ 

	 var gui = new GUI({ autoPlace: false });
	 gui.domElement.id = 'gui';
	 gui_container.appendChild(gui.domElement);

		const cameraFolder = gui.addFolder('Camera');
		cameraFolder.add(camera.position, 'z', 0, 10);
		cameraFolder.open();*/



		//boton de configuracion __> contexto
const divcontexto = document.getElementById('i-contexto');
const btncontexto= document.getElementById('i-btnCont');
btncontexto.onclick = function () {
	if(divcontexto.style.visibility == "visible"){
		divcontexto.style.visibility = "hidden";
	}else{
		divcontexto.style.visibility = "visible";
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

	 //Sprites

	 groupSprites = new THREE.Group(manager);
	 scene.add( groupSprites );

	const map = new THREE.TextureLoader().load( './assets/iconos/paso1.png' );
	const material = new THREE.SpriteMaterial( { map: map, color: 0xffffff } );

	 sprite = new THREE.Sprite( material );
	sprite.position.set( 0,20,350 );
	sprite.scale.set( 45, 50, 45 );
	sprite.name = 'paso1';
	groupSprites.add( sprite );

	const maps2 = new THREE.TextureLoader().load( 'assets/iconos/paso_2.png' );
	const materials2 = new THREE.SpriteMaterial( { map: maps2, color: 0xffffff } );

	 sprite2 = new THREE.Sprite( materials2 );
	sprite2.position.set( 170, 20, 600 );
	sprite2.scale.set( 45, 50, 45 );
	sprite2.name = 'paso2';
	groupSprites.add( sprite2 );

	const maps3 = new THREE.TextureLoader().load( 'assets/iconos/paso_3.png' );
	const materials3 = new THREE.SpriteMaterial( { map: maps3, color: 0xffffff } );

	 sprite3 = new THREE.Sprite( materials3 );
	sprite3.position.set( 50,25, -230 );
	sprite3.scale.set( 45, 50, 45 );
	sprite3.name = 'paso3';
	groupSprites.add( sprite3 );

	const maps4 = new THREE.TextureLoader().load( './assets/iconos/paso_4.png' );
	const materials4 = new THREE.SpriteMaterial( { map: maps4, color: 0xffffff } );

	 sprite4 = new THREE.Sprite( materials4 );
	sprite4.position.set(150,20,90 );
	sprite4.scale.set( 45, 50, 45 );
	sprite4.name = 'paso4';
	groupSprites.add( sprite4 );











	 //llama a la funcion de pantalla completa
	window.addEventListener( 'resize', onWindowResize );

	 //create Entorno

	 const loaderEntorno = new GLTFLoader(manager);
	 loaderEntorno.load( './assets/modelado/EntornoLabBiomedico.gltf', function ( gltf ) {


		 gltf.scene.children[ 0 ];
		 gltf.scene.position.set( - 50, -650, - 50 );
		 gltf.castShadow = true; 
		 gltf.receiveShadow = true;


		 scene.add( gltf.scene );
		 console.log( 'entorno cargado' );

		 //renderer.render( scene.camera );

	 } );

	 //Animaciones + Gltf

	 	//Animacion paso 1
	const dracoLoader1 = new DRACOLoader();
	dracoLoader1.setDecoderPath( 'assets/animaciones/' );

	const loaderAnm1 = new GLTFLoader();
	loaderAnm1.setDRACOLoader( dracoLoader1 );
	loaderAnm1.load( 'assets/animaciones/AnimConectEsu.gltf', function ( gltfPaso1 ) {

		modelEsuBaja = gltfPaso1.scene;
		modelEsuBaja.position.set(-50,-651,-50 );
		//modelEnchufe.scale.set( 0.9, 0.9, 0.9 );
		scene.add( modelEsuBaja );


	//	modelEsuBaja.rotation.set(0,15,0);



		mixer = new THREE.AnimationMixer( modelEsuBaja );
		    action1 = mixer.clipAction( gltfPaso1.animations[ 0 ] );


		//animate();



	}, undefined, function ( e ) {

		console.error( e );

	} );


	///Animacion paso 2

	 const dracoLoader = new DRACOLoader(manager);
	dracoLoader.setDecoderPath( 'assets/animaciones/' );

	const loader = new GLTFLoader();
	loader.setDRACOLoader( dracoLoader );
	loader.load( 'assets/animaciones/AnimConectEnchufe.gltf', function ( gltfPaso2 ) {

		modelEnchufe = gltfPaso2.scene;
		modelEnchufe.position.set( -35, - 608.4, 22 );
		modelEnchufe.scale.set( 0.9, 0.9, 0.9 );
		scene.add( modelEnchufe );


		mixer2 = new THREE.AnimationMixer( modelEnchufe );
		    action2 = mixer2.clipAction( gltfPaso2.animations[ 0 ] );


		//animate();



	}, undefined, function ( e ) {

		console.error( e );

	} );


	
	///Animacion paso 3

	const dracoLoader3 = new DRACOLoader(manager);
	dracoLoader3.setDecoderPath( 'assets/animaciones/' );

	const loader3 = new GLTFLoader();
	loader3.setDRACOLoader( dracoLoader3 );
	loader3.load( 'assets/animaciones/AnimElectrodoR.glb', function ( gltfPaso3 ) {

		modelElectrodoRetorno = gltfPaso3.scene;
		modelElectrodoRetorno.position.set( -100,-224, 350 );
		modelElectrodoRetorno.scale.set( 0.9, 0.9, 0.9 );
		modelElectrodoRetorno.rotation.y = Math.PI ;
		scene.add( modelElectrodoRetorno );


		mixer3 = new THREE.AnimationMixer( modelElectrodoRetorno );
		    action3 = mixer3.clipAction( gltfPaso3.animations[ 0 ] );


		//animate();



	}, undefined, function ( e ) {

		console.error( e );

	} );

	const dracoLoader4 = new DRACOLoader(manager);
	dracoLoader4.setDecoderPath( 'assets/animaciones/' );

	const loader4 = new GLTFLoader();
	loader4.setDRACOLoader( dracoLoader4 );
	loader4.load( 'assets/animaciones/AnimEPaciente.gltf', function ( gltfPaso4 ) {

		modelConectorPaciente = gltfPaso4.scene;
		modelConectorPaciente.position.set( -50,-651.5, -50);
	//	modelConectorRetornoRojo.scale.set( 0.9, 0.9, 0.9 );
	//modelConectorPaciente.rotation.y = Math.PI ;
		scene.add( modelConectorPaciente );


		mixer4 = new THREE.AnimationMixer( modelConectorPaciente );
		action4 = mixer4.clipAction( gltfPaso4.animations[ 0 ] );


		//animate();



	}, undefined, function ( e ) {

		console.error( e );

	} );




	//Permite acceder a la animacion a partir de la funcion onclick

	addEventListener( 'mousedown', ( e ) => {

		mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;


		raycaster.setFromCamera( mouse, camera );

		const Spriteitems = raycaster.intersectObjects( groupSprites.children );

		Spriteitems.forEach( ( i ) => {

			if ( i.object.name == 'paso1' ) {

				

				console.log( mouse );
				console.log( i.object.name );
				//camera.position.set( -169, -166, 506 );
				//	controls.object.position.set( - 209, - 162, 535 );
				//
				controls.enabled = false;
				controls.rotate = false;

				//Animacion con libreria TWEEN JS

				var positionStart = camera.position;
				var positionEnd = { x: 125, y: 22, z: 341 };
				
				var tweenPosition = new TWEEN.Tween( positionStart ).to( positionEnd, 2000 );
				tweenPosition.easing( TWEEN.Easing.Linear.None );
				tweenPosition.start();

				animate();
				//console.log(camera.position);

				camera.rotation.set( -0.11, 0.23, 0.027 );
			
				if ( positionEnd ) {

					

					console.log( 'Se reproduce animacion de accion1' );
					action1.play();

					
					//elementos html
					//	const imgsalir = document.getElementById( '#imgS' );
					//imgsalir.src = './assets/iconos/salir.png';

					contc = document.getElementById( 'c' );
					contc.style.visibility = 'visible';
					titulo = document.getElementById( 'info-titulo' );
					titulo.style.visibility = 'visible';
					var text = document.createTextNode( '1) Conexión del conector de ESU a la parte trasera del equipo' );
					titulo.appendChild( text );
					//titulo.textContent = "TITULO DE LA FUNCION";
					parrafo = document.getElementById( 'info-texto' );
					parrafo.style.visibility = 'visible';
					var info = document.createTextNode( 'El primer paso es conectar uno de los extremos del cable de poder al equipo, generalmente el lugar de conexión se ubica en la parte trasera del mismo. Es muy común encontrar este cable fijo a través de una celda, esto para asegurar que no se desconecte el cable de la unidad electroquirúrgica, ya que podría representar un riesgo tanto para el paciente como para el personal de salud durante un procedimiento quirúrgico.');
					parrafo.appendChild( info );

					
					
					

					//var btn = document.createElement( 'img' ).src = './assets/iconos/salir.png';
					//btn.src = './assets/iconos/salir.png';

					//	document.getElementById( 'ImgS' ).style.visibility = 'visible';


					document.getElementById( 'imgS' ).addEventListener( 'click', BtnSalirTxt( text, info ) );

					//optimizar el codigo para no eliminar los sprites

					groupSprites.remove(sprite,sprite2,sprite3,sprite4);
				
					



				}




			}

			if ( i.object.name == 'paso2' ) {

			
				console.log( mouse );
				console.log( i.object.name );
				//camera.position.set( -169, -166, 506 );
				//	controls.object.position.set( - 209, - 162, 535 );
				//
				controls.enabled = false;
				controls.rotate = false;

				//Animacion con libreria TWEEN JS

				var positionStart = camera.position;
				var positionEnd = { x: -14, y: - 240, z: 569 };
				var tweenPosition = new TWEEN.Tween( positionStart ).to( positionEnd, 2000 );
				tweenPosition.easing( TWEEN.Easing.Linear.None );
				tweenPosition.start();

				animate();
				//console.log(camera.position);

				camera.rotation.set( - 3.04, -0.62,-3.1);

				if ( positionEnd ) {

					console.log( 'Se reproduce animacion de accion2' );
					action2.play();


					//elementos html
					//	const imgsalir = document.getElementById( '#imgS' );
					//imgsalir.src = './assets/iconos/salir.png';

					contc = document.getElementById( 'c' );
					contc.style.visibility = 'visible';
					titulo = document.getElementById( 'info-titulo' );
					titulo.style.visibility = 'visible';
					var text = document.createTextNode( '2) Conexión del cable de poder de ESU al tomacorriente ' );
					titulo.appendChild( text );
					//titulo.textContent = "TITULO DE LA FUNCION";
					parrafo = document.getElementById( 'info-texto' );
					parrafo.style.visibility = 'visible';
					var info = document.createTextNode( 'El segundo paso es la conexión del ESU al tomacorriente para que de esta manera pueda prender y funcionar el ESU. El cable se compone de dos extremos, uno que irá ubicado en la parte de atrás del equipo (primer paso) y otro que irá directamente al tomacorriente como se observa en la animación.Si el equipo no enciende, lo primero que siempre se debe hacer es revisar si está conectado al tomacorriente. En caso de que lo esté, revisar el estado del tomacorriente.Si el fallo aún persiste, llamar al Ingeniero Biomédico o persona a cargo del área de mantenimiento para hacer una revisión del equipo. ' );
					parrafo.appendChild( info );

					

					//var btn = document.createElement( 'img' ).src = './assets/iconos/salir.png';
					//btn.src = './assets/iconos/salir.png';

					//	document.getElementById( 'ImgS' ).style.visibility = 'visible';


					document.getElementById( 'imgS' ).addEventListener( 'click', BtnSalirTxt( text, info ) );

					groupSprites.remove(sprite,sprite2,sprite3,sprite4);


				}




			}

			
			if ( i.object.name == 'paso3' ) {

				

				console.log( mouse );
				console.log( i.object.name );
				//camera.position.set( -169, -166, 506 );
				//	controls.object.position.set( - 209, - 162, 535 );
				//
				controls.enabled = false;
				controls.rotate = false;

				//Animacion con libreria TWEEN JS

				var positionStart = camera.position;
				var positionEnd = { x: -95, y:-12 , z: 55 };
				var tweenPosition = new TWEEN.Tween( positionStart ).to( positionEnd, 2000 );
				tweenPosition.easing( TWEEN.Easing.Linear.None );
				tweenPosition.start();

				animate();
				//console.log(camera.position);

				camera.rotation.set( - 0.95, -1.05, -0.88 );

				if ( positionEnd ) {

					console.log( 'Se reproduce animacion de accion3' );
					action3.play();
					//action31.play();


					//elementos html
					//	const imgsalir = document.getElementById( '#imgS' );
					//imgsalir.src = './assets/iconos/salir.png';

					contc = document.getElementById( 'c' );
					contc.style.visibility = 'visible';
					titulo = document.getElementById( 'info-titulo' );
					titulo.style.visibility = 'visible';
					var text = document.createTextNode( '3) Conexión del electrodo de retorno (Cable del electrodo de retorno)' );
					titulo.appendChild( text );
					//titulo.textContent = "TITULO DE LA FUNCION";
					parrafo = document.getElementById( 'info-texto' );
					parrafo.style.visibility = 'visible';
					var info = document.createTextNode( 'La conexión del electrodo de retorno se muestra en la animación, este electrodo solo se utiliza en el modo monopolar y se coloca en el paciente. La localización del electrodo de retorno depende del procedimiento a realizar teniendo en cuenta que el área no debe tener prominencias óseas ni vello, debe tener gran área de contacto y estar limpia. El sitio más común de lesión relacionado con el uso de este equipo biomédico es el electrodo de retorno del paciente. La colocación correcta del electrodo de retorno es esencial para evitar problemas con la circulación de la corriente.' );
					parrafo.appendChild( info );


					//var btn = document.createElement( 'img' ).src = './assets/iconos/salir.png';
					//btn.src = './assets/iconos/salir.png';

					//	document.getElementById( 'ImgS' ).style.visibility = 'visible';


					document.getElementById( 'imgS' ).addEventListener( 'click', BtnSalirTxt( text, info ) );

					groupSprites.remove(sprite,sprite2,sprite3,sprite4);


				}




			}


			if ( i.object.name == 'paso4' ) {

			console.log( mouse );
				console.log( i.object.name );
				//camera.position.set( -169, -166, 506 );
				//	controls.object.position.set( - 209, - 162, 535 );
				//
				controls.enabled = false;
				controls.rotate = false;

				//Animacion con libreria TWEEN JS

				var positionStart = camera.position;
				var positionEnd = { x: 148, y: 27, z: 146 };
				var tweenPosition = new TWEEN.Tween( positionStart ).to( positionEnd, 2000 );
				tweenPosition.easing( TWEEN.Easing.Linear.None );
				tweenPosition.start();

				animate();
				//console.log(camera.position);

				camera.rotation.set( -2.6, 1.31,2.6);

				if ( positionEnd ) {

					console.log( 'Se reproduce animacion de accion4' );
					action4.play();


					//elementos html
					//	const imgsalir = document.getElementById( '#imgS' );
					//imgsalir.src = './assets/iconos/salir.png';

					contc = document.getElementById( 'c' );
					contc.style.visibility = 'visible';
					titulo = document.getElementById( 'info-titulo' );
					titulo.style.visibility = 'visible';
					var text = document.createTextNode( '4) Conexión cable del electrodo de retorno al ESU' );
					titulo.appendChild( text );
					//titulo.textContent = "TITULO DE LA FUNCION";
					parrafo = document.getElementById( 'info-texto' );
					parrafo.style.visibility = 'visible';
					var info = document.createTextNode( 'Este momento muestra el otro extremo del cable mostrado en el paso 3, corresponde a la conexión del cable del electrodo de retorno al electrobisturí. Se puede apreciar que arriba de este conector se encuentra un indicador de color rojo. Este indicador se ilumina cuando el sistema de monitoreo de calidad de contacto REM detecta que el contacto entre el electrodo de retorno del paciente y el paciente no es adecuado. Usualmente, se genera un tono como alarma cuando se detecta la condición por primera vez. ' );
					parrafo.appendChild( info );

					

					//var btn = document.createElement( 'img' ).src = './assets/iconos/salir.png';
					//btn.src = './assets/iconos/salir.png';

					//	document.getElementById( 'ImgS' ).style.visibility = 'visible';


					document.getElementById( 'imgS' ).addEventListener( 'click', BtnSalirTxt( text, info ) );

					groupSprites.remove(sprite,sprite2,sprite3,sprite4);


				}
			}

			

		} );


	} );






	 document.addEventListener( 'pointermove', onPointerMove );

}

function BtnSalirTxt( text, info ) {

	console.log( 'wdasdasd' );
	const BtnSa = document.getElementById( 'imgS' );
	BtnSa.style.visibility = 'visible';

	

	BtnSa.addEventListener( 'click', function ( ) {

		var positionStartf = camera.position;
		var positionEndf = { x: -182, y: 159, z: -252  };
		var tweenPositionf = new TWEEN.Tween( positionStartf ).to( positionEndf, 2000 );
		tweenPositionf.easing( TWEEN.Easing.Linear.None );
		tweenPositionf.start();

		animate();

		titulo.style.visibility = 'hidden';
		parrafo.style.visibility = 'hidden';
		contc.style.visibility = 'hidden';


		document.getElementById( 'info-titulo' ).removeChild( text );
		document.getElementById( 'info-texto' ).removeChild( info );
		BtnSa.style.visibility = 'hidden';

		camera.rotation.set(-2.57, -0.54, -2.821);


		if ( camera.position.set( -182, 159,  -252 ) ) {

			console.log( 'Camera si esta funcioando?' );

			controls = new OrbitControls( camera, renderer.domElement );
			controls.enableDamping = false;
			controls.enableZoom = true;
			console.log( controls.object.position );
		   //limita el zoom del control
			controls.minDistance = 20;
			controls.maxDistance = 500;
			controls.maxPolarAngle = Math.PI / 2;
			controls.dampingFactor = 0.1;
			controls.enablePan = false;

			groupSprites.add(sprite);
			groupSprites.add(sprite2);
			groupSprites.add(sprite3);
			groupSprites.add(sprite4);
			
			

		}

		
		
		


	} );





	/*var positionStartf = camera.position;
	var positionEndf = { x: 1, y: 1, z: 1 };
	var tweenPositionf = new TWEEN.Tween( positionStartf ).to( positionEndf, 2000 );
	tweenPositionf.easing( TWEEN.Easing.Linear.None );
	tweenPositionf.start();

	animate();*/

}




//Permite realizar hover a los sprites
function onPointerMove( event ) {

	if ( selectedObject ) {

		selectedObject.scale.set( 45, 45, 45 );
		selectedObject = null;

	}

	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	raycaster.setFromCamera( pointer, camera );

	const intersects = raycaster.intersectObject( groupSprites, true );

	if ( intersects.length > 0 ) {

		const res = intersects.filter( function ( res ) {

			return res && res.object;

		} )[ 0 ];

		if ( res && res.object ) {

			selectedObject = res.object;
			selectedObject.scale.set( 75, 75, 75 );

		}



	}

}





function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	requestAnimationFrame( animate );

	const delta = clock.getDelta();

	//let timeaction31 = .003;

	mixer.update( delta );
	mixer2.update( delta );
	mixer3.update( delta );
	mixer4.update( delta );

	TWEEN.update();


}

function onTransitionEnd( event ) {


	event.target.remove();

	
}


function update() {

	requestAnimationFrame( update );
	render();

}


function render() {
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.outputEncoding = THREE.sRGBEncoding;
	renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	

	renderer.render( scene, camera );

}


