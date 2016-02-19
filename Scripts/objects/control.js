/// <reference path="../../typings/tsd.d.ts"/>
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(rotationSpeed) {
            this.rotationSpeed = rotationSpeed;
            this.zoom = "ZoomOut";
        }
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
        Control.prototype.switchCamera = function () {
            if (this.zoom == "Zoom In Earth") {
                camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
                camera.position.x = -20;
                camera.position.y = 25;
                camera.position.z = 80;
                camera.lookAt(new Vector3(5, 0, 0));
                console.log("Finished setting up Camera...");
                this.zoom = "Zoom Out";
            }
            else {
                camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
                camera.position.x = 0;
                camera.position.y = 0;
                camera.position.z = 25;
                camera.lookAt(new Vector3(5, 0, 0));
                console.log("Finished setting up zoom Earth Camera...");
                this.zoom = "Zoom In Earth";
                emptyObjectMoon.add(camera);
            }
        };
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
/**

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control {
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
        public points: objects.Point[];
        public mesh: Object3D;
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(mesh: Object3D) {
            this.points = new Array<objects.Point>();
            this.mesh = mesh;
        }
        
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
        public clone(): void {
            var materials = [
                new THREE.MeshLambertMaterial({ opacity: 0.6, color: 0xff44ff, transparent: true }),
                new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true })
            ];

            var mesh2 = THREE.SceneUtils.createMultiMaterialObject(customGeometry, materials);
            mesh2.children.forEach(function(child) {
                child.castShadow = true
            });
            mesh2.translateX(5);
            mesh2.translateZ(5);
            mesh2.name = "clone";
            scene.remove(scene.getObjectByName("clone"));
            scene.add(mesh2);
        }
    }
}
 
*/ 
//# sourceMappingURL=control.js.map