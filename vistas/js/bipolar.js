'use strict';

import * as THREE from '../../node_modules/three/build/three.module.js';
//import {OrbitControls} from "../../node_modules/three/examples/jsm/controls/OrbitControls.js";
import { GUI } from '../../node_modules/three/examples/jsm/libs/lil-gui.module.min.js'
import { GLTFLoader } from '../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { DecalGeometry } from '../../node_modules/three/examples/jsm/geometries/DecalGeometry.js';
import { TWEEN } from '../../node_modules/three/examples/jsm/libs/tween.module.min.js';
import { Camera, LoadingManager } from '../../node_modules/three/build/three.module.js';


import { RGBELoader } from '../../node_modules/three/examples/jsm/loaders/RGBELoader.js';


var container; //nombre de id del div donde se visualizara el render
var sceneWidth, sceneHeight; //ancho y alto de la escena (propiedades de la libreria three js)
var scene; // escena
var renderer; // render
var camera;
var controls;









//Variables Decal 

let raycaster;
let line;
let mesh,mesh2,mesh3;



const intersection = {
				intersects: false,
				point: new THREE.Vector3(),
				normal: new THREE.Vector3()
};
const mouse = new THREE.Vector2();
const intersects = [];

const textureLoader = new THREE.TextureLoader(); 

const materialscuts = {};
let typecuts;

//decal texture

//const decalDiffuse = textureLoader.load( '../examples/textures/decal/decal-diffuse.png' );
//	const decalNormal = textureLoader.load( '../examples/textures/decal/decal-normal.jpg' );

const decalDiffuse = textureLoader.load( './assets/texturas/bipolar.png' );
const decalNormal = textureLoader.load( './assets/texturas/burn_map.jpg' );


const decalDiffuse2 = textureLoader.load( './assets/texturas/coagulacion.png' );
const decalNormal2 = textureLoader.load( './assets/texturas/blend_cut_Normal.png' );



materialscuts['Modo Bipolar'] = new THREE.MeshPhongMaterial( {
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

materialscuts['Coagulación'] = new THREE.MeshPhongMaterial( {
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




const decals = [];
			let mouseHelper;
			const position = new THREE.Vector3();
			const orientation = new THREE.Euler();
			const size = new THREE.Vector3( 10, 10, 10 );

const params = {
				minScale: 1,
				maxScale: 1,
				clear: function () {

					removeDecals();

				},
				Tipo:"Modo Bipolar"
			};

			//GUI

	//Sprites
	
	let sprite1,sprite2,sprite3;
	let groupSprites;
	let gltfBi,gltfmono,gltfER;
	//let gltfSelec = {};

	


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
	scene.background = new THREE.Color( /*0x000000*/ 0x5298CA );



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
	camera.position.set(16,30.2,-22);
	camera.rotation.set( -2.4, 0.7, 2.6);
	
	
	

	//luces

	const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 0.5 );
	scene.add( light );


	

    //llama a la funcion de pantalla completa

	window.addEventListener( 'resize', onWindowResize );

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

	



	


				 //Puntos de movimiento


	 groupSprites = new THREE.Group(manager);
	 scene.add( groupSprites );

	const map = new THREE.TextureLoader().load( 'assets/iconos/punto.png' );
	const material = new THREE.SpriteMaterial( { map: map, color: 0xffffff } );

	 sprite1 = new THREE.Sprite( material );
	 sprite1.position.set( 0, 18, -15  );
	 sprite1.scale.set( 1.5, 1.5, 1.5 );
	 sprite1.name = 'mov1';
	groupSprites.add( sprite1 );

	sprite2 = new THREE.Sprite( material );
	sprite2.position.set( -5, 16, 0);
	sprite2.scale.set( 1.5, 1.5, 1.5 );
	sprite2.name = 'mov2';
   groupSprites.add( sprite2 );

   
				//ENTORNO CIRUGIA

				const loaderEntornoSurgical = new GLTFLoader(manager);
				loaderEntornoSurgical.load( './assets/modelado/EntornoMom3.1.gltf', function ( gltf ) {


				 gltf.scene.children[ 0 ];
				 gltf.scene.position.set(0,0,0);
				 gltf.material = new THREE.MeshStandardMaterial( {
					color: 0xEDC696,
					specular: 0x111111,
				//	shininess: 10,
					
				} ); 
			
		


				 scene.add( gltf.scene );
				 console.log( 'entorno cargado' );

		 //renderer.render( scene.camera );

	 } );

     

	 

	 						//ELECTRODO ACTIVO MONOPOLAR

							 const loaderEAmono = new GLTFLoader();
							 loaderEAmono.load( './assets/modelado/esu_monopolar_ea.gltf', function ( gltf ) {
 
 
									 
								 scene.add( gltf.scene );
								 gltfmono = gltf.scene;
								 console.log( 'electrodo activo cargado' );
								 gltfmono.scale.set( 0.2, 0.2, 0.2 );
								gltfmono.position.set( 0,0,0 );
 
					 
 
								 } );

								 						//ELECTRODO ACTIVO BIPOLAR

						const loaderEABi = new GLTFLoader();
						loaderEABi.load( './assets/modelado/esu_Bipolar_ea.gltf', function ( gltf ) {


								
							scene.add( gltf.scene );
							gltfBi = gltf.scene;
							console.log( 'electrodo activo cargado' );
							gltfBi.scale.set( 0.2, 0.2, 0.2 );
							gltfBi.position.set( 0,0,0 );

							

										//renderer.render( scene.camera );

							} );

									//ELECTRODO RETORNO

							const loaderERetornom = new GLTFLoader();
							loaderERetornom.load( './assets/modelado/ElectrodoReMom3.1.gltf', function ( gltfe ) {

							

									
								scene.add( gltfe.scene );
								gltfER = gltfe.scene;
								console.log( 'electrodo retorno cargado' );
								gltfER.position.set(0,-20,0);

								} );  


										//ABDOMEN ABIERTO

							const loaderAA = new GLTFLoader();
							loaderAA.load( './assets/modelado/AbdomenAbierto.gltf', function ( gltfe ) {

							

									
								scene.add( gltfe.scene );
								gltfe = gltfe.scene;
								console.log( 'AA cargado' );
								//gltfe.position.set(0,-20,0);

								} );  



		

   
	const geometry = new THREE.BufferGeometry();
	geometry.setFromPoints( [ new THREE.Vector3(), new THREE.Vector3() ] );

	line = new THREE.Line( geometry, new THREE.LineBasicMaterial() );
	scene.add( line );

	loadHumanBody();

	
	
	raycaster = new THREE.Raycaster();

	mouseHelper = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 10 ), new THREE.MeshNormalMaterial() );
	mouseHelper.visible = false;
	scene.add( mouseHelper );

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
			var positionEnd = { x: -4.14, y: 18.5, z: -9.3 };
			var tweenPosition = new TWEEN.Tween( positionStart ).to( positionEnd, 2000 );
			tweenPosition.easing( TWEEN.Easing.Linear.None );
			tweenPosition.start();

			animate();
				//console.log(camera.position);

				camera.rotation.set(  -1.58, -0.35, -1.61);


			

				window.addEventListener( 'pointerdown', function ( event ) {

					paint = false;
								
						
			
				} );
			
				window.addEventListener( 'pointermove', onPointerMove );
			
				function onPointerMove( event ) {
			
					if ( paint ) {
			
                        if ( event.isPrimary ) {

                            checkIntersection( event.clientX, event.clientY );
							console.log('ioi');
                        }
    
			
					}
			
				}
			
				window.addEventListener( 'pointerup', function ( event ) {
			
                    if ( paint === false ) {

						checkIntersection( event.clientX, event.clientY );

						if ( intersection.intersects ) shoot();

					}
			
				} );
		

					


				//////////////////////////////////////////////


				function checkIntersection( x, y ) {

					if ( mesh === undefined || mesh2 === undefined) return;

					mouse.x = ( x / window.innerWidth ) * 2 - 1;
					mouse.y = - ( y / window.innerHeight ) * 2 + 1;

					raycaster.setFromCamera( mouse, camera );
					raycaster.intersectObject( mesh, false, intersects );
					raycaster.intersectObject( mesh2, false, intersects );
					

					if ( intersects.length > 0 ) {

						console.log("funciona");
                        const p = intersects[0].point;
						mouseHelper.position.copy( p );

					
					intersection.point.copy( p );

				
					
						const n = intersects[ 0 ].face.normal.clone();
						n.transformDirection( mesh.matrixWorld );
					//	n.transformDirection( gltfmono.matrixWorld );

						n.multiplyScalar( 1);
						n.add( intersects[ 0 ].point );

						
                       
						
					

						intersection.normal.copy( intersects[ 0 ].face.normal );
						mouseHelper.lookAt( n );
					
						//gltfmono.position.copy(n);

						const positions = line.geometry.attributes.position;
						positions.setXYZ( 0, p.x, p.y, p.z );
						positions.setXYZ( 1, n.x, n.y, n.z );
						positions.needsUpdate = true;
						typecuts = params.Tipo;

                     

						intersection.intersects = true;

						intersects.length = 0;


						if(typecuts == "Modo Bipolar"){

							console.log("DSfsdf");
							
							gltfBi.position.copy(p);
							gltfBi.updateMatrixWorld();
							gltfBi.lookAt(p);

						}else{

							
							gltfBi.position.set(-10,-20,-10);
						

						}

						if(typecuts == "Coagulación"){

							console.log("uwu");
							
							gltfmono.position.copy(p);
							gltfmono.updateMatrixWorld();
							gltfmono.lookAt(p);

							gltfER.position.set(0,0,0);
							

							
						}else{
							gltfmono.position.set(-10,-20,-10);
							gltfER.position.set(0,-20,0);
						
						}

			
			

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

		

			var positionStart = camera.position;
			var positionEnd = { x: -6, y: 20.17, z: -0.3 };
			var tweenPosition = new TWEEN.Tween( positionStart ).to( positionEnd, 2000 );
			tweenPosition.easing( TWEEN.Easing.Linear.None );
			tweenPosition.start();

			animate();
				//console.log(camera.position);

				camera.rotation.set(  -1.29, -0.8, -1.12 );

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



	

				const gui = new GUI();

				gui.add( params, 'minScale', 1, 4 );
				gui.add( params, 'maxScale', 1, 4 );
				gui.add( params, 'clear' );
				gui.add(params, 'Tipo', [ 'Modo Bipolar','Coagulación'] ).name("Tipo de Modo").onChange(selectTypeCut);
				
				function selectTypeCut(typecuts){
					typecuts = params.Tipo;

					if(typecuts == 'Modo Bipolar'){
						materialscuts['Modo Bipolar'] 

						
						
					}
					if(typecuts =='Coagulación'){
						materialscuts['Coagulación']

					

						
						}
					
				}
				
				
				
			
				gui.open();


			
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
				


	





}

function loadHumanBody() {

	const loader = new GLTFLoader();

	loader.load( './assets/modelado/AbdomenCirugia.gltf', function ( gltf ) {

		mesh = gltf.scene.children[ 0 ];
		/*mesh.material = new THREE.MeshPhongMaterial( {
			specular: 0x111111,
		//	map: textureLoader.load( '../examples/models/gltf/LeePerrySmith/Map-COL.jpg' ),
		//	specularMap: textureLoader.load( '../examples/models/gltf/LeePerrySmith/Map-SPEC.jpg' ),
		//	normalMap: textureLoader.load( '../examples/models/gltf/LeePerrySmith/Infinite-Level_02_Tangent_SmoothUV.jpg' ),
			shininess: 10
		} );  */

		

		scene.add( mesh );
	//	mesh.scale.set( 4.5, 4.5, 4.5 );
	//	mesh.position.set(-1.3,16.75,-11);
	
	//	mesh.rotation.x= -Math.PI / 2;

	} );

	const loader2 = new GLTFLoader();

	loader2.load( './assets/modelado/AbdomenCirugia2.gltf', function ( gltf ) {

		mesh2 = gltf.scene.children[ 0 ];
		/*mesh.material = new THREE.MeshPhongMaterial( {
			specular: 0x111111,
		//	map: textureLoader.load( '../examples/models/gltf/LeePerrySmith/Map-COL.jpg' ),
		//	specularMap: textureLoader.load( '../examples/models/gltf/LeePerrySmith/Map-SPEC.jpg' ),
		//	normalMap: textureLoader.load( '../examples/models/gltf/LeePerrySmith/Infinite-Level_02_Tangent_SmoothUV.jpg' ),
			shininess: 10
		} );  */

		

		scene.add( mesh2 );
	//	mesh.scale.set( 4.5, 4.5, 4.5 );
	//	mesh.position.set(-1.3,16.75,-11);
	
	//	mesh.rotation.x= -Math.PI / 2;

	} );


}

function shoot() {

	

	position.copy( intersection.point );
	orientation.copy( mouseHelper.rotation );
//	orientation.copy( gltfmono.rotation );


//	console.log(position,orientation);

if ( orientation.z) orientation.y = Math.PI;
//if(orientation.rotation)

//if ( orientation.position ) position.y = m.orientation * Math.PI/2;
	
	
//	if ( params.rotate ) orientation.x = Math.PI/2;

	const scale = params.minScale + Math.random() * ( params.maxScale - params.minScale );
	size.set( scale, scale, scale );

	const material = materialscuts[params.Tipo].clone();
	material.color.setHex( 0xffffff );

	const m = new THREE.Mesh( new DecalGeometry( mesh, position, orientation, size ), material );

	

	decals.push( m );
	scene.add( m );

}



function removeDecals() {

	decals.forEach( function ( d ) {

		scene.remove( d );

	} );

	decals.length = 0;

}

function onTransitionEnd( event ) {


	event.target.remove();

	
}

function BtnSalirTxt() {

	console.log( 'wdasdasd' );
	const BtnSa = document.getElementById( 'imgS' );
	BtnSa.style.visibility = 'visible';

	

	BtnSa.addEventListener( 'click', function (paint ) {

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

		
			groupSprites.add(sprite1);
			groupSprites.add(sprite2);
			//groupSprites.add(sprite3);
			let paint = false;	
			
			

		}

	} );

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