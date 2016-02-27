//Source File: gameonject.ts  
//Author: Johanna Ponce 
//Last Modified Date: Feb, 26, 2016  
//Last Modified by: Johanna Ponce 
//Solar system objects constructor
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// <reference path="../../typings/tsd.d.ts"/>
var objects;
(function (objects) {
    var gameObject = (function (_super) {
        __extends(gameObject, _super);
        //public material: THREE.MeshPhongMaterial;
        //CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++
        function gameObject(geometry, material, x, y, z) {
            _super.call(this, geometry, material);
            this._geometry = geometry;
            this._material = material;
            this.position.x = x;
            this.position.y = y;
            this.position.z = z;
            this.receiveShadow = true;
            this.castShadow = true;
        }
        gameObject.prototype.applyTexture = function () {
            //_material.
        };
        return gameObject;
    })(THREE.Mesh);
    objects.gameObject = gameObject;
})(objects || (objects = {}));
//# sourceMappingURL=gameobject.js.map