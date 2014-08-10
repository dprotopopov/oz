﻿courage.View1 = function(params) {

    var viewModel = {
        //  Put the binding properties here
        viewShown: function(e) {
            var container, stats;
            var camera, scene, renderer, group, particle;
            var mouseX = 0, mouseY = 0;

            var windowHalfX = window.innerWidth / 2;
            var windowHalfY = window.innerHeight / 2;

            var lasttime = Date.now(), elapsed;

            init();
            animate();

            var sparksEmitter;

            function init() {

                camera = new THREE.Camera(75, window.innerWidth / window.innerHeight, 1, 3000);
                camera.position.z = 200; //1000

                scene = new THREE.Scene();


                group = new THREE.Object3D();
                scene.add(group);


                var canvas = $("#myCanvas").get(0);

                renderer = new THREE.CanvasRenderer({
                    canvas: canvas
                });
                renderer.setSize(window.innerWidth, window.innerHeight);

                document.addEventListener('mousemove', onDocumentMouseMove, false);
                document.addEventListener('touchstart', onDocumentTouchStart, false);
                document.addEventListener('touchmove', onDocumentTouchMove, false);


                //// EMITTER STUFF
                var h = 0;
                var k = 0.7;


                var callback = function() {

                    var material = new THREE.ParticleCanvasMaterial({ program: SPARKS.CanvasShadersUtils.circles, blending: THREE.AdditiveBlending });

                    material.color.setHSV(h, 1, 0.3); //0.7
                    h += 0.001;
                    if (h > 1) h -= 1;

                    particle = new THREE.Particle(material);

                    particle.scale.x = particle.scale.y = 1 + Math.random() * 3;
                    group.add(particle);

                    return particle;
                };


                sparksEmitter = new SPARKS.Emitter(new SPARKS.SteadyCounter(70));

                sparksEmitter.addInitializer(new SPARKS.Position(new SPARKS.PointZone(new THREE.Vector3(0, 0, 0))));
                sparksEmitter.addInitializer(new SPARKS.Lifetime(0, 3));
                sparksEmitter.addInitializer(new SPARKS.Target(null, callback));
                sparksEmitter.addInitializer(new SPARKS.Velocity(new SPARKS.PointZone(new THREE.Vector3(0, 100, 00))));


                sparksEmitter.addAction(new SPARKS.Age());
                sparksEmitter.addAction(new SPARKS.Move());
                sparksEmitter.addAction(new SPARKS.RandomDrift(2 * 500, 500, 2 * 500));
                sparksEmitter.addAction(new SPARKS.Accelerate(0, -40, 0));


                sparksEmitter.addCallback("created", function(particle) {
                    particle.target.position = particle.position;
                });
                sparksEmitter.addCallback("dead", function(particle) {
                    particle.target.visible = false; // is this a work around?
                    group.remove(particle.target);
                });

                sparksEmitter.start();

            }

            //

            function onDocumentMouseMove(event) {

                mouseX = event.clientX - windowHalfX;
                mouseY = event.clientY - windowHalfY;
            }

            function onDocumentTouchStart(event) {

                if (event.touches.length == 1) {

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

                requestAnimationFrame(animate);

                render();

            }

            var _rotation = 0;

            function render() {

                //camera.position.x += (mouseX - camera.position.x) * 0.05;
                //camera.position.y += (-mouseY - camera.position.y) * 0.05;
                camera.position.x = 0;
                camera.position.y = 100;
                renderer.render(scene, camera);

            }


            $(window).resize(function() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
                windowHalfX = window.innerWidth / 2;
                windowHalfY = window.innerHeight / 2;
            });
        }
    };

    return viewModel;
};