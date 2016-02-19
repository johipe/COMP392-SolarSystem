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
var emptyObjectMoon: Object3D;
var scene: Scene;
var renderer: Renderer;
var camera: PerspectiveCamera;
var zoomEarthCamera: PerspectiveCamera;
var axes: AxisHelper;
var cube: Mesh;
var plane: Mesh;
var sphere: Mesh;
var earth: Mesh;
var mars: Mesh;
var saturn: Mesh;
var planet4: Mesh;
var planet5: Mesh;
var sun: Mesh;
var ring: Mesh;
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
var moon1_planet4: Mesh;
var moon2_planet4: Mesh;
var cylinder;
var textureLoader = new THREE.TextureLoader()
var earthTexture, moonTexture, sunTexture, marsTexture, saturnTexture, planet4Texture, planet5Texture, ringTexture;

function init() {

    earthTexture = textureLoader.load("/Content/img/1_earth_1k.jpg");
    moonTexture = textureLoader.load("/Content/img/moonmap1k.jpg");
    sunTexture = textureLoader.load("/Content/img/realsun.jpg");
    marsTexture = textureLoader.load("/Content/img/planet_texture2.png");
    saturnTexture = textureLoader.load("/Content/img/planet_texture5.png");
    planet4Texture = textureLoader.load("/Content/img/planet_texture3.png");
    planet5Texture = textureLoader.load("/Content/img/planet_texture4.png");
    ringTexture = textureLoader.load("/Content/img/SaturnRings.png");
    // Instantiate a new Scene object
    scene = new Scene();


    setupRenderer(); // setup the default renderer
	//setupZoomEarthCamera();
    setupCamera(); // setup the camera
	
    // add an axis helper to the scene
    axes = new AxisHelper(20);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    
    ring = new gameObject(
    new THREE.RingGeometry(6, 8,18,18, 0, Math.PI * 2),
    //new THREE.MeshLambertMaterial({ map: ringTexture, transparent: false }),
    new THREE.MeshLambertMaterial({color: 0x9FB6CD, wireframe: true}),
    -40, 0, 0);
    
    ring.rotation.y = 10;
    ring.rotation.x = 20;
    scene.add(ring);
    
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
        new THREE.MeshPhongMaterial({ map: earthTexture, transparent: true }),
        5, 9, 0);

   // earth.position.set(5, 9, 10);
    //scene.add(earth);

    console.log("Added earth planet to scene...");

    emptyObject = new Object3D();
    emptyObject.position.set(0, 0, 0);
    
 

    sunlight = new THREE.DirectionalLight(0xFFFFFF);
    sunlight.position.set(0, 0, 0);
    var obj1 = new THREE.Object3D();
    obj1.position.set(10, 0, 0);
    scene.add(obj1);
    sunlight.target = obj1;
    sunlight.castShadow = true;


    var sunlight2 = new THREE.DirectionalLight(0xFFFFFF);
    sunlight2.position.set(0, 0, 0);
    var obj2 = new THREE.Object3D();
    obj2.position.set(-10, 0, 0);
    scene.add(obj2);
    sunlight2.target = obj2;
    sunlight2.castShadow = true;
    scene.add(sunlight2)

    var sunlight3 = new THREE.DirectionalLight(0xFFFFFF);
    sunlight3.position.set(0, 0, 0);
    var obj3 = new THREE.Object3D();
    obj3.position.set(0, 0, 10);
    scene.add(obj3);
    sunlight3.target = obj3;
    sunlight3.castShadow = true;
    scene.add(sunlight3)

    var sunlight4 = new THREE.DirectionalLight(0xFFFFFF);
    sunlight4.position.set(0, 0, 0);
    var obj4 = new THREE.Object3D();
    obj4.position.set(0, 0, -10);
    scene.add(obj4);
    sunlight4.target = obj4;
    sunlight4.castShadow = true;
    scene.add(sunlight4)
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
        new THREE.MeshPhongMaterial({ map: sunTexture, transparent: false }),
        0, 0, 0);

    scene.add(sunlight);
    //sun.add(sunlight);
    scene.add(sun);
    console.log("Added Cube Primitive to scene...");

    sphere = new gameObject(
        new SphereGeometry(8, 32, 32), //2
        //new LambertMaterial({ color: 0xff35ff }),
        new THREE.MeshPhongMaterial({ map: earthTexture, transparent: false }),
        30, 0, 0);

    //sun.add(sphere);
    //scene.add(sphere);
    //console.log("Added Cube Primitive to scene...");
    
    moon = new gameObject(
        new SphereGeometry(3, 32, 32), //0.5
        //new LambertMaterial({ color: 0xff0000 }),
        new THREE.MeshPhongMaterial({ map: moonTexture, transparent: false }),
        15, 0, 0); //2

    //sphere.add(moon);
    //sphere.add(camera);
    
    emptyObjectMoon = new Object3D();
    emptyObjectMoon.position.set(30, 0, 0);
    
    emptyObjectMoon.add(moon);
    
    
    console.log("Added Child Cube Primitive to cube object...");
    
        moon1_planet4 = new gameObject(
        new SphereGeometry(1, 32, 32), //0.5
        //new LambertMaterial({ color: 0xff0000 }),
        new THREE.MeshPhongMaterial({ map: moonTexture, transparent: false }),
        -5, -3, 0); 
        
       moon2_planet4 = new gameObject(
        new SphereGeometry(0.5, 32, 32), //0.5
        //new LambertMaterial({ color: 0xff0000 }),
        new THREE.MeshPhongMaterial({ map: moonTexture, transparent: false }),
        3, 1, 2); //2
        
        //moon2_planet4.rotation.z = 10;


    planet2 = new gameObject(
        new SphereGeometry(6, 20, 20),
        new LambertMaterial({ color: 0x00ff00 }),
        -10, 0, 0);

    //sun.add(planet2);
    planet2.applyMatrix(new THREE.Matrix4().makeTranslation(14, 0, 0));
    
    
    mars = new gameObject(
    new THREE.SphereGeometry(6, 32, 32),
    new THREE.MeshPhongMaterial({map: marsTexture, transparent: false}), 
    50,0,0);
    
    scene.add(mars);
    
    saturn = new gameObject(
    new THREE.SphereGeometry(5, 32, 32),
    new THREE.MeshPhongMaterial({map: saturnTexture, transparent: false}), 
    -40,0,0);
    
    scene.add(saturn);
    
    planet4 = new gameObject(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshPhongMaterial({map: planet4Texture, transparent: false}), 
    -55,0,0);
    
    planet4.add(moon1_planet4);
    planet4.add(moon2_planet4);
    scene.add(planet4);
    
    planet5 = new gameObject(
    new THREE.SphereGeometry(4, 32, 32),
    new THREE.MeshPhongMaterial({map: planet5Texture, transparent: false}), 
    60,0,0);
    
    scene.add(planet5);
    
    

//earth.position.set(5,9,10);

    //scene.add(planet2);
                   
    //emptyObject.add(camera);  
    //emptyObjectMoon.add(camera);
    emptyObject.add(emptyObjectMoon);    
    emptyObject.add(sphere);
    scene.add(emptyObject); 
    
    //scene.add(sphere);
    console.log("Added Cube Primitive to scene...");
    


    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x0c0c0c);
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
    control = new Control(0.002);
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
    gui.add(controlObject, 'switchCamera');
    gui.add(controlObject, 'zoom').listen();
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
    
    moon.rotation.y += (control.rotationSpeed*3);
    
    emptyObjectMoon.rotation.y += (control.rotationSpeed*8);
    
    planet4.rotation.y -= control.rotationSpeed;

//    earth.rotation.y += control.rotationSpeed;

    emptyObject.rotation.y += control.rotationSpeed;
    
    // planet2.translateX(10); // three.js r.72
    // planet2.applyMatrix( new THREE.Matrix4().makeTranslation(-10, 0, 0) );
    planet2.rotation.x += 0.03;


   
    
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

// Setup main camera for the scene
function setupZoomEarthCamera(): void {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 25;
    camera.lookAt(new Vector3(5, 0, 0));
    console.log("Finished setting up zoom Earth Camera...");
}
