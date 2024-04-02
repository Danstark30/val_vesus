'use strict';

import * as THREE from '../../node_modules/three/build/three.module.js';
import {OrbitControls} from "../../node_modules/three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from '../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';



import { RGBELoader } from '../../node_modules/three/examples/jsm/loaders/RGBELoader.js';


var container; //nombre de id del div donde se visualizara el render
var sceneWidth, sceneHeight; //ancho y alto de la escena (propiedades de la libreria three js)
var scene; // escena
var renderer; // render
var camera;
var controls;



	


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
	scene.background = new THREE.Color( 0x5298CA );

	scene.background = new THREE.Color( 0xa0a0a0 );
				scene.fog = new THREE.Fog( 0xa0a0a0, 200, 1000 );

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
	console.log(camera.position);
	console.log(camera.rotation);
	camera.position.set(-52,20,21);
	camera.rotation.set(  -0.51, -0.91,-0.42);
	
	// ground
	const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
	mesh.rotation.x = - Math.PI / 2;
	mesh.receiveShadow = true;
	scene.add( mesh );

	const grid = new THREE.GridHelper( 2000, 20, 0x000000, 0x000000 );
	grid.material.opacity = 0.2;
	grid.material.transparent = true;
	scene.add( grid );

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

    //llama a la funcion de pantalla completa

	window.addEventListener( 'resize', onWindowResize );
    
    //CONTROLS
    const controls = new OrbitControls( camera, renderer.domElement );
				controls.addEventListener( 'change', render ); // use if there is no animation loop
				controls.minDistance = 20;
				controls.maxDistance = 300;
				//controls.target.set( 10, 90, - 16 );
				controls.update();



   
				//ENTORNO CIRUGIA

				const loaderCortes = new GLTFLoader(manager);
				loaderCortes.load( './assets/modelado/Piel.gltf', function ( gltf ) {


				 gltf.scene.children[ 0 ];
				 gltf.scene.position.set(0,0,0 );
			/*	 gltf.material = new THREE.MeshStandardMaterial( {
					color: 0xEDC696,
					specular: 0x111111,
					shininess: 10
					
				} ); */

				gltf.castShadow = true;
				gltf.receiveShadow = true;
			
		


				 scene.add( gltf.scene );
				 console.log( 'entorno cargado' );

	

	 } );

     


	 const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
	 hemiLight.position.set( 0, 200, 0 );
	 scene.add( hemiLight );

	 const dirLight = new THREE.DirectionalLight( 0xffffff );
	 dirLight.position.set( 0, 200, 100 );
	 dirLight.castShadow = true;
	 dirLight.shadow.camera.top = 180;
	 dirLight.shadow.camera.bottom = - 100;
	 dirLight.shadow.camera.left = - 120;
	 dirLight.shadow.camera.right = 120;
	 scene.add( dirLight );



			


 /*new RGBELoader()
 .setPath( './assets/hdri/' )
 .load( 'hospital_room_4k.hdr', function ( texture ) {

     texture.mapping = THREE.EquirectangularReflectionMapping;

 //	scene.background = texture;
     scene.environment = texture;
     //renderer.toneMapping = LinearToneMapping;
     //renderer.toneMappingExposure = 0.5;
     


 } );*/


} 







function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	requestAnimationFrame( animate );

	



}

function onTransitionEnd( event ) {


	event.target.remove();

	
}




function update() {

	
	requestAnimationFrame( update );
	render();
	

}


function render() {

		
	

	//controls.update();
	renderer.render( scene, camera );

}