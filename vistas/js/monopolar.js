'use strict';

import * as THREE from '../../node_modules/three/build/three.module.js';
//import {OrbitControls} from "../../node_modules/three/examples/jsm/controls/OrbitControls.js";
//import { TransformControls } from '../examples/jsm/controls/TransformControls.js';
import { GUI } from '../../node_modules/three/examples/jsm/libs/lil-gui.module.min.js'
import { GLTFLoader } from '../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { DecalGeometry } from '../../node_modules/three/examples/jsm/geometries/DecalGeometry.js';
import { TWEEN } from '../../node_modules/three/examples/jsm/libs/tween.module.min.js';


import { RGBELoader } from '../../node_modules/three/examples/jsm/loaders/RGBELoader.js';
import { Camera, LoadingManager } from '../../node_modules/three/build/three.module.js';


var container; //nombre de id del div donde se visualizara el render
var sceneWidth, sceneHeight; //ancho y alto de la escena (propiedades de la libreria three js)
var scene; // escena
var renderer; // render
var camera;
var controls;
var trasnformcontrols;
//variables para el hover de puntos
let selectedObject = null;
const pointer = new THREE.Vector2();


var scene1, scene2 , scene3, scene4, scene5;





//Variables Decal 

let raycaster;
let line;
let mesh;



const intersection = {
				intersects: false,
				point: new THREE.Vector3(),
				normal: new THREE.Vector3()
};
const mouse = new THREE.Vector2();
const intersects = [];

const textureLoader = new THREE.TextureLoader(); 

const materialscuts = {};
let typecuts,typeDeeps;

//decal texture

//const decalDiffuse = textureLoader.load( '../examples/textures/decal/decal-diffuse.png' );
//	const decalNormal = textureLoader.load( '../examples/textures/decal/decal-normal.jpg' );

const decalDiffuse = textureLoader.load( './assets/texturas/pure_cut.png' );
const decalNormal = textureLoader.load( './assets/texturas/Normal_Map_CutPure.png' );


const decalDiffuse2 = textureLoader.load( './assets/texturas/blend1.png' );
const decalNormal2 = textureLoader.load( './assets/texturas/blend_cut_Normal.png' );

const decalDiffuse3 = textureLoader.load( './assets/texturas/blend2.png' );
const decalNormal3 = textureLoader.load( './assets/texturas/Normal2_BlendCut.png' );


const decalDiffuse4 = textureLoader.load( './assets/texturas/blend3.png' );
const decalNormal4 = textureLoader.load( './assets/texturas/blend_cut_Normal.png' );


materialscuts['Corte Puro'] = new THREE.MeshPhongMaterial( {
				specular: 0x444444,
				map: decalDiffuse,
				normalMap: decalNormal,
				normalScale: new THREE.Vector2( 1, 1 ),
				shininess: 30,
				transparent: true,
				depthTest: true,
				depthWrite: false,
				polygonOffset: true,
				polygonOffsetFactor: - 4,
				wireframe: false
			} );

materialscuts['Blend 1'] = new THREE.MeshPhongMaterial( {
				specular: 0x444444,
				map: decalDiffuse2,
				normalMap: decalNormal2,
				normalScale: new THREE.Vector2( 1, 1 ),
				shininess: 30,
				transparent: true,
				depthTest: true,
				depthWrite: false,
				polygonOffset: true,
				polygonOffsetFactor: - 4,
				wireframe: false
			} );

materialscuts['Blend 2'] = new THREE.MeshPhongMaterial( {
				specular: 0x444444,
				map: decalDiffuse3,
				normalMap: decalNormal3,
				normalScale: new THREE.Vector2( 1, 1 ),
				shininess: 30,
				transparent: true,
				depthTest: true,
				depthWrite: false,
				polygonOffset: true,
				polygonOffsetFactor: - 4,
				wireframe: false
			} );
			
materialscuts['Blend 3'] = new THREE.MeshPhongMaterial( {
				specular: 0x444444,
				map: decalDiffuse4,
				normalMap: decalNormal4,
				normalScale: new THREE.Vector2( 1, 1 ),
				shininess: 30,
				transparent: true,
				depthTest: true,
				depthWrite: false,
				polygonOffset: true,
				polygonOffsetFactor: - 4,
				wireframe: false
			} );

const decals = [];
			let mouseHelper;
			const position = new THREE.Vector3();
			const orientation = new THREE.Euler();
			const size = new THREE.Vector3( 10, 10, 10 );

const params = {
				minScale: 1,
				maxScale: 1,
				limpiar: function () {

					removeDecals();

				},
				Tipo:"Corte Puro"
			};

			//GUI

	//Sprites
	
	let sprite1,sprite2,sprite3;
	let groupSprites;
	let gltfmono;

	//HDRI VARIABLES
	let ldrCubeMap, hdrCubeMap, rgbmCubeMap;

	//GLTF DE PROFUNDIDAD DE CORTE
	
	let meshdeep = {};


init();

function init() {

	createScene();
	update();

}
function createScene() {

	 /////////////////////////////////////////////////
  //       Scene 1 : Corte Puro                               //
  /////////////////////////////////////////////////

	sceneWidth = window.innerWidth;
	sceneHeight = window.innerHeight;

	//Escena
	scene1 = new THREE.Scene();
	scene1.background = new THREE.Color( /*0x000000*/ 0x5298CA );



	//Render = renderiza el entorno
	renderer = new THREE.WebGLRenderer( { antialis: true, alpha: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( sceneWidth, sceneHeight );

	//
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
				renderer.toneMappingExposure = 1;
				renderer.outputEncoding = THREE.sRGBEncoding;


	//

	renderer.localClippingEnabled = true;

	//canvas = llama la variable del documento index.html que se llama container y lo iguala a la variable creada para three js, llamada canvas
	container = document.getElementById( 'container' );
	container.appendChild( renderer.domElement );

	//camara

	camera = new THREE.PerspectiveCamera( 75, sceneWidth / sceneHeight, 1, 10000 );
	camera.position.set(-21,31,-35);
	camera.rotation.set( -2.56,-0.42,-2.9); 
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

	
	
	

	//luces

	const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 0.5 );
	scene1.add( light );

	//const dirLight = new THREE.DirectionalLight( 0xffffff );
	//dirLight.position.set( 3, 10, 10 );

     //controls

	/* controls = new OrbitControls( camera, renderer.domElement );
	 controls.enabled = true;
	 controls.rotation = true;
	 controls.enableZoom = true; 
	 
	
	 controls.minDistance = 0;
	 controls.maxDistance = 200; */
	 console.log(camera.position);
	 console.log(camera.rotation);
	/* trasnformcontrols = new TransformControls( camera, renderer.domElement );
	 trasnformcontrols.addEventListener( 'change', render );

	 trasnformcontrols.addEventListener( 'dragging-changed', function ( event ) {

					controls.enabled = ! event.value;

				} );*/


	


				const Back = document.getElementById( 'btnBack' );
				Back.style.visibility = 'hidden';



	 window.addEventListener( 'resize', onWindowResize );


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




				 //Puntos de movimiento
	 groupSprites = new THREE.Group(manager);
	 scene1.add( groupSprites );

	const map = new THREE.TextureLoader().load( 'assets/iconos/punto.png' );
	const material = new THREE.SpriteMaterial( { map: map, color: 0xffffff } );

	 sprite1 = new THREE.Sprite( material );
	 sprite1.position.set( 0, 20, -15 );
	 sprite1.scale.set( 1.5, 1.5, 1.5 );
	 sprite1.name = 'mov1';
	 groupSprites.add( sprite1 );

	sprite2 = new THREE.Sprite( material );
	sprite2.position.set( -5, 16, 0 );
	sprite2.scale.set( 1.5, 1.5, 1.5 );
	sprite2.name = 'mov2';
    groupSprites.add( sprite2 );

   
				//ENTORNO CIRUGIA

				const loaderEntornoSurgical = new GLTFLoader(manager);
				loaderEntornoSurgical.load( './assets/modelado/EntornoMom3.gltf', function ( gltf ) {


				 gltf.scene.children[ 0 ];
				 gltf.scene.position.set(0,0,0 );
				 gltf.material = new THREE.MeshStandardMaterial( {
					color: 0xEDC696,
					specular: 0x111111,
				//	shininess: 10,
					
				} ); 
			
		


				 scene1.add( gltf.scene );
				 console.log( 'entorno cargado' );

	 } );



		

   
	const geometry = new THREE.BufferGeometry();
	geometry.setFromPoints( [ new THREE.Vector3(), new THREE.Vector3() ] );

	line = new THREE.Line( geometry, new THREE.LineBasicMaterial() );
	scene1.add( line );

	loadHumanBody();

	//ELECTRODO ACTIVO

	const loaderEAmono = new GLTFLoader(manager);
	loaderEAmono.load( './assets/modelado/esu_monopolar_ea.gltf', function ( gltf ) {


			
		scene1.add( gltf.scene );
		gltfmono = gltf.scene;
		console.log( 'electrodo activo cargado' );
		gltfmono.scale.set( 0.2, 0.2, 0.2 );
		gltfmono.position.set( -10,-10,-10);

		

					//renderer.render( scene.camera );

		} );


		//ELECTRODO RETORNO

	/*const loaderERetorno = new GLTFLoader();
	loaderERetorno.load( './assets/modelado/electrodo_retorno.gltf', function ( gltfe ) {

	

			
		scene1.add( gltfe.scene );
		gltfe = gltfe.scene;
		console.log( 'electrodo activo cargado' );
		gltfe.position.set(-0.4,1.2,-0.4);

		} );  */


	
	raycaster = new THREE.Raycaster();

	mouseHelper = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 10 ), new THREE.MeshNormalMaterial() );
	mouseHelper.visible = false;
	scene1.add( mouseHelper );

	let paint = false;	


   addEventListener( 'mousedown', ( e ) => {



	mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;


	raycaster.setFromCamera( mouse, camera );

	const Spriteitems = raycaster.intersectObjects( groupSprites.children );

	Spriteitems.forEach( ( i ) => {

		if ( i.object.name == 'mov1' ) {
			console.log( mouse );
			console.log( i.object.name );



			var positionStart = camera.position;
			var positionEnd = { x: -2.9, y: 20, z: -8.7 };
			var tweenPosition = new TWEEN.Tween( positionStart ).to( positionEnd, 2000 );
			tweenPosition.easing( TWEEN.Easing.Linear.None );
			tweenPosition.start();

			animate();
				//console.log(camera.position);

				camera.rotation.set(  -1.57, -0.29, -1.58 );


				///////////////////////////////

		

			

				window.addEventListener( 'pointerdown', function ( event ) {

					paint = true;
					checkIntersection( event.clientX, event.clientY );
					//drawStartPos.set( e.offsetX, e.offsetY );
			
					if ( intersection.intersects ){
						shoot();
					

							
					}	

									
						
			
				} );
			
				window.addEventListener( 'pointermove', onPointerMove );
			
				function onPointerMove( event ) {
			
					if ( paint ) {
			
						checkIntersection( event.clientX, event.clientY );
			
						if ( intersection.intersects ){	
							shoot();
							

							
							}
			
					}
			
				}
			
				window.addEventListener( 'pointerup', function ( event ) {
			
					paint = false;
			
				} );
			
				window.addEventListener( 'pointerleave', function () {
			
					paint = false;
			
				} );


					


				//////////////////////////////////////////////


				function checkIntersection( x, y ) {

					if ( mesh === undefined ) return;

					mouse.x = ( x / window.innerWidth ) * 2 - 1;
					mouse.y = - ( y / window.innerHeight ) * 2 + 1;

					raycaster.setFromCamera( mouse, camera );
					raycaster.intersectObject( mesh, false, intersects );

					if ( intersects.length > 0 ) {

						const p = intersects[0].point;
						mouseHelper.position.copy( p );
						intersection.point.copy( p );
						gltfmono.position.copy(p);
						

					
						const n = intersects[ 0 ].face.normal.clone();
						n.transformDirection( mesh.matrixWorld );
					//	n.transformDirection( gltfmono.matrixWorld );

						n.multiplyScalar( 10);
						n.add( intersects[ 0 ].point );

						
					
						
					

						intersection.normal.copy( intersects[ 0 ].face.normal );
						mouseHelper.lookAt( n );
						gltfmono.lookAt(p);
						//gltfmono.position.copy(n);

						const positions = line.geometry.attributes.position;
						positions.setXYZ( 0, p.x, p.y, p.z );
						positions.setXYZ( 1, n.x, n.y, n.z );
						positions.needsUpdate = true;
						gltfmono.position.copy(p);
						

						intersection.intersects = true;

						intersects.length = 0;
						

						
			

					} else {

						intersection.intersects = false;

					}

				}

				////////////////////////////

				if ( positionEnd ) {
					
					document.getElementById( 'imgS' ).addEventListener( 'click', BtnSalirTxt( paint ) );

					//optimizar el codigo para no eliminar los sprites

					groupSprites.remove(sprite1,sprite2);
				}

		}

		if ( i.object.name == 'mov2' ) {
			console.log( mouse );
			console.log( i.object.name );

		//	controls = new OrbitControls( camera, renderer.domElement );
//			controls.enabled = false;
//			controls.rotate = false;
			


			var positionStart = camera.position;
			var positionEnd = { x: -4.7, y: 20, z: 0.24 };
			var tweenPosition = new TWEEN.Tween( positionStart ).to( positionEnd, 2000 );
			tweenPosition.easing( TWEEN.Easing.Linear.None );
			tweenPosition.start();

			animate();
				//console.log(camera.position);

				camera.rotation.set(  -1.00, -0.6, -0.73 );

				if ( positionEnd ) {
					
					document.getElementById( 'imgS' ).addEventListener( 'click', BtnSalirTxt( ) );
					var divcontainer = document.getElementById('ig-context-container-er');
					divcontainer.style.visibility= 'visible';

					//optimizar el codigo para no eliminar los sprites

					groupSprites.remove(sprite1,sprite2);
				}




		}

	} );

} );

document.addEventListener( 'pointermove', onPointerMove );

















	
/*	controls.addEventListener( 'change', function () {
		console.log(camera.position);
	console.log(camera.rotation);


		/*if(paint==true){
			controls.enabled = false;
			controls.rotate = false;
			
		}else{
			controls.zoom= true;
		} 
	
	
	//	controls.enabled = ! event.value;
	
		} ); */





	
	
	
	/*let moved = false;

	controls.addEventListener( 'change', function () {

	moved = false;

	} );

	window.addEventListener( 'pointerdown', function () {

	moved = true;

	} );

				window.addEventListener( 'pointerup', function ( event ) {

					if ( moved === false ) {

						checkIntersection( event.clientX, event.clientY );

						if ( intersection.intersects )	shoot();
						

					}

				} );

				window.addEventListener( 'pointermove', onPointerMove );

				function onPointerMove( event ) {

					if ( event.isPrimary ) {

						checkIntersection( event.clientX, event.clientY );

					}

				}*/


				

				const gui = new GUI(manager);

				gui.add( params, 'minScale', 1, 4 );
				gui.add( params, 'maxScale', 1, 4 );
				gui.add( params, 'limpiar' );

				gui.add(params, 'Tipo', [ 'Corte Puro','Blend 1', 'Blend 2', 'Blend 3' ] ).name("Tipo de corte:").onChange(selectTypeCut);
				
				function selectTypeCut(typecuts){
					typecuts = params.Tipo;

					if(typecuts == 'Corte Puro'){
						materialscuts['Corte Puro'] 
					}
					if(typecuts =='Blend 1'){
						materialscuts['Blend 1']
					}
					if(typecuts == 'Blend 2'){
						materialscuts['Blend 2']
					}
					if(typecuts == 'Blend 3'){
						materialscuts['Blend 3']
					}
				}

			

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


	

	// controls.enableDamping = true
//	 controls.target.z = -5
//	 controls.update();
	
/*	const dragControls = new DragControls( objects, camera, renderer.domElement );
	dragControls.addEventListener( 'dragstart', function () { controls.enabled = false; } );
	dragControls.addEventListener( 'dragend', function () { controls.enabled = true; } );
	*/
	
	//controls.enableDamping = false;
	 //controls.campingFactor = 0.25;
	 //controls.enableZoom = true;


	/////////////////////////////////////////////////
	//       Scene 2  : Blend 1                             //
	/////////////////////////////////////////////////



	 scene2 = new THREE.Scene();
	// scene2.background = new THREE.Color( 0x000000);

	 scene2.background = new THREE.Color( 0xe0e0e0 );
	scene2.fog = new THREE.Fog( 0xe0e0e0, 20, 100 );

	 const lightsc2 = new THREE.HemisphereLight( 0xffffbb, 0x080820, 0.5 );
	scene2.add( lightsc2 );

	const amlight = new THREE.AmbientLight( 0x404040 ); // soft white light
	scene2.add( amlight );
   

		 // ground

		 const meshgr = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
		 meshgr.rotation.x = - Math.PI / 2;
		 scene2.add( meshgr );

		 const grid = new THREE.GridHelper( 200, 40, 0x000000, 0x000000 );
		 grid.material.opacity = 0.2;
		 grid.material.transparent = true;
		 scene2.add( grid );

		
		 	


		

		 



/*
	
	
	
	scene2 = new THREE.Scene();

	if(scene= scene2){
		camera = new THREE.PerspectiveCamera( 75, sceneWidth / sceneHeight, 1, 10000 );
	camera.position.set(0,10,0);
}

//	camera.rotation.set( -0.4 -0.32,-0.13);
									

	scene2.background = new THREE.Color( 0x000000); 
								

		//ELECTRODO RETORNO

		const DeepCutCP = new GLTFLoader();
		DeepCutCP.load( './assets/modelados/Corte_Puro_Profundidad.gltf', function ( gltfcp ) {
	
		
	
				
			scene2.add( gltfcp.scene );
			gltfcp = gltfcp.scene;
			console.log( 'electrodo activo cargado' );
			gltfcp.position.set(0,0,0);
	
			} );

	const BBtn = document.getElementById("btnBack");
	BBtn.onclick = function(){
								
	const BtnSa = document.getElementById( 'imgS' );
	BtnSa.style.visibility = 'visible';
	const Menu = document.getElementById( 'menu-cortes' );
	Menu.style.visibility = 'visible';
	const Back = document.getElementById( 'btnBack' );
	Back.style.visibility = 'hidden';
	};


*/
  



 	  /////////////////////////////////////////////////
  //       Scene 3  : Blend 2                          //
  /////////////////////////////////////////////////

 /* scene2 = new THREE.Scene();
  scene2.background = new THREE.Color( 0x000000);

  const geometry3 = new THREE.SphereGeometry(100, 10, 10);
  const material3 = new THREE.MeshNormalMaterial();

  const mesh3 = new THREE.Mesh(geometry3, material3);
  mesh3.position.set(0, 0, 0);
  scene2.add(mesh3);


  const boxCut2 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshPhongMaterial({ color: 0x3C33FF }));
  boxCut2.name = 'electrodo activo';

  scene2.add(boxCut2)
 */





  scene = scene1;


}

function loadHumanBody() {

	const loader = new GLTFLoader();

	loader.load( './assets/modelado/Abdomen.gltf', function ( gltf ) {

		mesh = gltf.scene.children[ 0 ];
		/*mesh.material = new THREE.MeshPhongMaterial( {
			specular: 0x111111,
		//	map: textureLoader.load( '../examples/models/gltf/LeePerrySmith/Map-COL.jpg' ),
		//	specularMap: textureLoader.load( '../examples/models/gltf/LeePerrySmith/Map-SPEC.jpg' ),
		//	normalMap: textureLoader.load( '../examples/models/gltf/LeePerrySmith/Infinite-Level_02_Tangent_SmoothUV.jpg' ),
			shininess: 10
		} );  */

		

		scene1.add( mesh );
	//	mesh.scale.set( 4.5, 4.5, 4.5 );
	//	mesh.position.set(-1.7,15.9,-8);
	
	//	mesh.rotation.x= -Math.PI / 2;

		

	} );

	

}



//Permite realizar hover a los sprites
function onPointerMove( event ) {

	if ( selectedObject ) {

		selectedObject.scale.set(  1.5, 1.5, 1.5  );
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
			selectedObject.scale.set( 3,3,3 );

		}



	}

}

function shoot() {

	

	position.copy( intersection.point );
//	orientation.copy( mouseHelper.rotation );
//	orientation.copy( gltfmono.rotation );



	const scale = params.minScale + Math.random() * ( params.maxScale - params.minScale );
	size.set( scale, scale, scale );

	const material = materialscuts[params.Tipo].clone();
	material.color.setHex( 0xffffff );

	const m = new THREE.Mesh( new DecalGeometry( mesh, position, orientation, size ), material );

	if ( orientation) {
	//	console.log("deja de rotararara");
		orientation.z =  Math.PI/2;
		orientation.x =  Math.PI/2;
	}
	decals.push( m );
	scene1.add( m );

}



function removeDecals() {

	decals.forEach( function ( d ) {

		scene1.remove( d );

	} );

	decals.length = 0;

}



function BtnSalirTxt(paint) {

	paint = false;

	console.log( 'wdasdasd' );
	const BtnSa = document.getElementById( 'imgS' );
	BtnSa.style.visibility = 'visible';

	

	BtnSa.addEventListener( 'click', function () {

		var positionStartf = camera.position;
		var positionEndf = { x: -14, y: 33, z: 18 }; 
		var tweenPositionf = new TWEEN.Tween( positionStartf ).to( positionEndf, 2000 );
		tweenPositionf.easing( TWEEN.Easing.Linear.None );
		tweenPositionf.start();

		animate();

		
		var divcontainer = document.getElementById('ig-context-container-er');
		divcontainer.style.visibility= 'hidden';

	
		BtnSa.style.visibility = 'hidden';

		if ( camera.position.set( -14, 33, 18 ) ) {

			console.log( 'Camera si esta funcioando?' );
			camera.rotation.set( -0.4, -0.32,-0.13);

		//   controls = new OrbitControls( camera, renderer.domElement );
		//	controls.enabled = false;
		//	controls.enableZoom = false;
		//	controls.enablePan = false;
		//	controls.autoRotate = false;
		/*	console.log( controls.object.position );
		   //limita el zoom del control
			controls.minDistance = 20;
			controls.maxDistance = 500;
			controls.maxPolarAngle = Math.PI / 2;
			controls.dampingFactor = 0.1;
			controls.enablePan = false;
			controls.autoRotate = false; */

		
			groupSprites.add(sprite1);
			groupSprites.add(sprite2);
			//groupSprites.add(sprite3);
			 paint = false;	
			
			

		}

	} );

}

function MultiScenes(){
	

	const BtnSa = document.getElementById( 'imgS' );
	BtnSa.style.visibility = 'hidden';
	const Menu = document.getElementById( 'menu-cortes' );
	Menu.style.visibility = 'hidden';
	//const Back = document.getElementById( 'btnBack' );
	//Back.style.visibility = 'visible';

/*	const BBtn = document.getElementById("btnBack");
	BBtn.onclick = function(){
								
	const BtnSa = document.getElementById( 'imgS' );
	BtnSa.style.visibility = 'visible';
	const Menu = document.getElementById( 'menu-cortes' );
	Menu.style.visibility = 'visible';
	const Back = document.getElementById( 'btnBack' );
	Back.style.visibility = 'hidden';
	};*/

}

function setupKeyControls() {
	// w= 87 a=65 s=83 d=68
	document.onkeydown = function(e) {
	  switch (e.keyCode) {
		case 87:  
		camera.position.y += 0.5;
		break;
		case 65:
		camera.position.x -= 0.5;
		break;
		case 83:
		camera.position.y -= 0.1;
		break;
		case 68:
			camera.position.x += 0.5;
		break;
	  }
	};
  }





function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	requestAnimationFrame( animate );

	

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
	//controls.update();
	renderer.render( scene, camera );
	

}