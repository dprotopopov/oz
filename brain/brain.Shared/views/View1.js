﻿brain.View1 = function (params) {

    var viewModel = {
//  Put the binding properties here
        viewShown: function(e) {

            var SCREEN_WIDTH = window.innerWidth,
                SCREEN_HEIGHT = window.innerHeight,

                r = 450,

                mouseX = 0,
                mouseY = 0,

                windowHalfX = window.innerWidth / 2,
                windowHalfY = window.innerHeight / 2,

                camera,
                scene,
                renderer;

            init();
            animate();

            function init() {

                camera = new THREE.PerspectiveCamera(80, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 3000);
                camera.position.z = 1000;

                scene = new THREE.Scene();

                var i,
                    line,
                    vertex1,
                    vertex2,
                    material,
                    p,
                    parameters = [
                        [0.25, 0xff7700, 1, 2], [0.5, 0xff9900, 1, 1], [0.75, 0xffaa00, 0.75, 1], [1, 0xffaa00, 0.5, 1], [1.25, 0x000833, 0.8, 1],
                        [3.0, 0xaaaaaa, 0.75, 2], [3.5, 0xffffff, 0.5, 1], [4.5, 0xffffff, 0.25, 1], [5.5, 0xffffff, 0.125, 1]
                    ],

                    geometry = new THREE.Geometry();


                for (i = 0; i < 1500; i ++) {

                    var vertex1 = new THREE.Vector3();
                    vertex1.x = Math.random() * 2 - 1;
                    vertex1.y = Math.random() * 2 - 1;
                    vertex1.z = Math.random() * 2 - 1;
                    vertex1.normalize();
                    vertex1.multiplyScalar(r);

                    vertex2 = vertex1.clone();
                    vertex2.multiplyScalar(Math.random() * 0.09 + 1);

                    geometry.vertices.push(vertex1);
                    geometry.vertices.push(vertex2);

                }

                for (i = 0; i < parameters.length; ++ i) {

                    p = parameters[i];

                    material = new THREE.LineBasicMaterial({ color: p[1], opacity: p[2], linewidth: p[3] });

                    line = new THREE.Line(geometry, material, THREE.LinePieces);
                    line.scale.x = line.scale.y = line.scale.z = p[0];
                    line.originalScale = p[0];
                    line.rotation.y = Math.random() * Math.PI;
                    line.updateMatrix();
                    scene.add(line);

                }

                var canvas = $("#myCanvas").get(0);

                renderer = new THREE.CanvasRenderer({
                    canvas: canvas
                });
                renderer.setSize(window.innerWidth, window.innerHeight);


                document.addEventListener('mousemove', onDocumentMouseMove, false);
                document.addEventListener('touchstart', onDocumentTouchStart, false);
                document.addEventListener('touchmove', onDocumentTouchMove, false);

                //

                window.addEventListener('resize', onWindowResize, false);

            }

            function onWindowResize() {

                windowHalfX = window.innerWidth / 2;
                windowHalfY = window.innerHeight / 2;

                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                renderer.setSize(window.innerWidth, window.innerHeight);

            }

            function onDocumentMouseMove(event) {

                mouseX = event.clientX - windowHalfX;
                mouseY = event.clientY - windowHalfY;

            }

            function onDocumentTouchStart(event) {

                if (event.touches.length > 1) {

                    event.preventDefault();

                    mouseX = event.touches[0].pageX - windowHalfX;
                    mouseY = event.touches[0].pageY - windowHalfY;

                }

            }

            function onDocumentTouchMove(event) {

                if (event.touches.length == 1) {

                    event.preventDefault();

                    mouseX = event.touches[0].pageX - windowHalfX;
                    mouseY = event.touches[0].pageY - windowHalfY;

                }

            }


            //

            function animate() {

                // requestAnim shim layer by Paul Irish
                var requestAnimFrame = (function () {
                    return window.requestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.oRequestAnimationFrame ||
                            window.msRequestAnimationFrame ||
                            function (/* function */ callback, /* DOMElement */ element) {
                                window.setTimeout(callback, 1000 / 60);
                            };
                })();

                requestAnimFrame(animate);

                render();

            }

            function render() {

                camera.position.y += (- mouseY + 200 - camera.position.y) * .05;
                camera.lookAt(scene.position);

                renderer.render(scene, camera);

                var time = Date.now() * 0.0001;

                for (var i = 0; i < scene.children.length; i ++) {

                    var object = scene.children[i];

                    if (object instanceof THREE.Line) {

                        object.rotation.y = time * (i < 4 ? (i + 1) : - (i + 1));

                        if (i < 5) object.scale.x = object.scale.y = object.scale.z = object.originalScale * (i / 5 + 1) * (1 + 0.5 * Math.sin(7 * time));

                    }

                }

            }

        }
    };

    return viewModel;
};