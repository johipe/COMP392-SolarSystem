/// <reference path="_reference.ts"/>

// MAIN GAME FILE

// THREEJS Aliases
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Material = THREE.Material;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import DirectionalLight = THREE.DirectionalLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
import Point = objects.Point;

//Custom Game Objects
import gameObject = objects.gameObject;

var emptyObject: Object3D;
var scene: Scene;
var renderer: Renderer;
var camera: PerspectiveCamera;
var axes: AxisHelper;
var cube: Mesh;
var plane: Mesh;
var sphere: Mesh;
var earth: Mesh;
var sun: Mesh;
var sunlight: DirectionalLight;
var planet: Mesh;
var planet2: Mesh;
var ambientLight: AmbientLight;
var spotLight: SpotLight;
var control: Control;
var gui: GUI;
var stats: Stats;
var step: number = 0;
var vertices: Vector3[] = new Array<Vector3>();
var faces: Face3[] = new Array<Face3>();
var customGeometry: Geometry;
var customMaterials: Material[] = new Array<Material>();
var customMesh: Object3D;
var moon: Mesh;
var cylinder;
var textureLoader = new THREE.TextureLoader()
var earthTexture, moonTexture, sunTexture;

function init() {
    
     earthTexture = textureLoader.load("/Content/img/1_earth_1k.jpg");
     moonTexture = textureLoader.load("/Content/img/moonmap1k.jpg");
     sunTexture = textureLoader.load("/Content/img/realsun.jpg");
    // Instantiate a new Scene object
    scene = new Scene();
    

    setupRenderer(); // setup the default renderer
	
    setupCamera(); // setup the camera
	
    // add an axis helper to the scene
    axes = new AxisHelper(20);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    
    //Add a Plane to the Scene
   /**
    plane = new gameObject(
        new PlaneGeometry(60, 40, 1, 1),
        new LambertMaterial({ color: 0xffffff }),
        0, 0, 0);


    plane.rotation.x = -0.5 * Math.PI;

    scene.add(plane);
    console.log("Added Plane Primitive to scene...");
      */
    /*  earth = new THREE.Mesh(
  new THREE.SphereGeometry(8, 32, 32),
  new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture('/Content/img/1_earth_1k.jpg'),
    transparent: true
  })
);*/

  /*  sphere = new gameObject(
        new SphereGeometry(8, 20, 20), //2
        new LambertMaterial({ color: 0xff35ff }),
        15, 0, 0);

     earth = new THREE.Mesh(
  new THREE.SphereGeometry(8, 32, 32),
  new THREE.MeshPhongMaterial({
    map: earthTexture,
    transparent: true
  })
);*/

earth = new gameObject(
    new THREE.SphereGeometry(8, 32, 32),
    new THREE.MeshPhongMaterial({map: earthTexture, transparent: true}), 
    5,9,0);

earth.position.set(5,9,10);
//scene.add(earth);

    console.log("Added earth planet to scene..."); 
      
     emptyObject = new Object3D();
     emptyObject.position.set(0,0,0);
          
     sunlight = new THREE.DirectionalLight(0xFFFFFF); 
     sunlight.position.set(0,0,0);
      var obj1= new THREE.Object3D();
      obj1.position.set(10,0,0);
      scene.add(obj1);
      sunlight.target = obj1;
      sunlight.castShadow = true;
      
      
     var sunlight2 = new THREE.DirectionalLight(0xFFFFFF); 
     sunlight2.position.set(0,0,0);
      var obj2= new THREE.Object3D();
      obj2.position.set(-10,0,0);
      scene.add(obj2);
      sunlight2.target = obj2;
      sunlight2.castShadow = true;
      scene.add(sunlight2)
     //sunlight.target.position = new THREE.Object3D();
    // sunlight.target.position.x = 5;
    //sunlight.target.position.y = 9;
    //sunlight.target.position.z = 0;
     //sunlight.target.position.set(5, 9, 0);
     
     //sunlight.shadowCameraVisible = true;
   
     //sunlight.lookAt(new Vector3(-50, 0, 0));
      
          //Add a Cube to the Scene        
    sun = new gameObject(
        new SphereGeometry(8, 32, 32),
        //new LambertMaterial({ color: 0xffff00 }),
                new THREE.MeshPhongMaterial({map: sunTexture, transparent: false}), 
        0, 0, 0);
        
        scene.add(sunlight);
    //sun.add(sunlight);
    scene.add(sun);
    console.log("Added Cube Primitive to scene...");          
          
    sphere = new gameObject(
        new SphereGeometry(8, 20, 20), //2
        //new LambertMaterial({ color: 0xff35ff }),
        new THREE.MeshPhongMaterial({map: earthTexture, transparent: false}), 
        30, 0, 0);

        //sun.add(sphere);
    //scene.add(sphere);
    //console.log("Added Cube Primitive to scene...");
    
    moon = new gameObject(
        new SphereGeometry(4, 32, 32), //0.5
        //new LambertMaterial({ color: 0xff0000 }),
        new THREE.MeshPhongMaterial({map: moonTexture, transparent: false}), 
        15, 0, 0); //2

    sphere.add(moon)
    console.log("Added Child Cube Primitive to cube object...");
    
    
        planet2 = new gameObject(
        new SphereGeometry(6, 20, 20),
        new LambertMaterial({ color: 0x00ff00 }),
        -10, 0, 0);

        //sun.add(planet2);
        planet2.applyMatrix( new THREE.Matrix4().makeTranslation(14, 0, 0) );

        //scene.add(planet2);
                     
         
    emptyObject.add(sphere);   
    scene.add(emptyObject); 
    //scene.add(sphere);
    console.log("Added Cube Primitive to scene...");
    
    // CYLINDER
var cyl_material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
var cyl_width = 1;
var cyl_height = 5;
// THREE.CylinderGeometry(bottomRadius, topRadius, height, segmentsRadius, segmentsHeight, openEnded )
var cylGeometry = new THREE.CylinderGeometry(cyl_width, cyl_width, cyl_height, 20, 1, false);
// translate the cylinder geometry so that the desired point within the geometry is now at the origin
cylGeometry.translate( 0, 10, 0 ); // three.js r.72

//cylGeometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, cyl_height/2, 0 ) );
 cylinder = new THREE.Mesh(cylGeometry, cyl_material);

//scene.add( cylinder ); 

    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0xC4C394);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
	
    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(-40, 60, 10);
    spotLight.castShadow = true;
    //scene.add(spotLight);
    console.log("Added a SpotLight Light to Scene");
    
    // Call the Custom Mesh function
    //initializeCustomMesh();
    
    
    // add controls
    gui = new GUI();
    control = new Control(0.005);
    addControl(control);
    //gui = new GUI();
    //control = new Control(customMesh);
    //addControlPoints();
    //addControl(control);

    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");

    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    
    window.addEventListener('resize', onResize, false);
}

function onResize(): void {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function addControl(controlObject: Control): void {
    gui.add(controlObject, 'rotationSpeed', -0.5, 0.5);
}

function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}

// Setup main game loop
function gameLoop(): void {
    stats.update();
    //rotation
    sphere.rotation.y += control.rotationSpeed;
    moon.rotation.y += control.rotationSpeed;
    
    earth.rotation.y += control.rotationSpeed;
    
    emptyObject.rotation.y += control.rotationSpeed;
    
   // planet2.translateX(10); // three.js r.72
      // planet2.applyMatrix( new THREE.Matrix4().makeTranslation(-10, 0, 0) );
    planet2.rotation.x += 0.03;
    

cylinder.rotation.x = 0.5*Math.PI;
    
   // sun.rotation.y += control.rotationSpeed;
    
    
/**
    vertices = new Array<Vector3>();
    for (var index = 0; index < 8; index++) {
        vertices.push(new Vector3(
            control.points[index].x,
            control.points[index].y,
            control.points[index].z));
    }
     */

    // remove our customMesh from the scene and add it every frame 
 //   scene.remove(scene.getObjectByName("customMesh"));
  //  createCustomMesh();

    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
	
    // render the scene
    renderer.render(scene, camera);
}

// Setup default renderer
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}

// Setup main camera for the scene
function setupCamera(): void {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -20;
    camera.position.y = 25;
    camera.position.z = 80;
    camera.lookAt(new Vector3(5, 0, 0));
    console.log("Finished setting up Camera...");
}
