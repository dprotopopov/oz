


heart.View1 = function(params) {

    var viewModel = {
//  Put the binding properties here
        viewShown: function(e) {

            var camera, scene, renderer;

            var targetRotation = 0;
            var targetRotationOnMouseDown = 0;

            var mouseX = 0;
            var mouseXOnMouseDown = 0;

            var windowHalfX = window.innerWidth / 2;
            var windowHalfY = window.innerHeight / 2;

            var heartShape, particleCloud, sparksEmitter, emitterPos;
            var _rotation = 0;
            var timeOnShapePath = 0;

            function init() {

                camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
                camera.position.y = 150;
                camera.position.z = 700;

                scene = new THREE.Scene();

                parent = new THREE.Object3D();


                particleCloud = new THREE.Object3D(); // Just a group
                particleCloud.y = 800;
                parent.add(particleCloud);

                scene.add(parent);


                // Create Particle Systems

                // Heart

                var x = 0, y = 0;

                heartShape = new THREE.Shape();

                heartShape.moveTo(x + 25, y + 25);
                heartShape.bezierCurveTo(x + 25, y + 25, x + 20, y, x, y);
                heartShape.bezierCurveTo(x - 30, y, x - 30, y + 35, x - 30, y + 35);
                heartShape.bezierCurveTo(x - 30, y + 55, x - 10, y + 77, x + 25, y + 95);
                heartShape.bezierCurveTo(x + 60, y + 77, x + 80, y + 55, x + 80, y + 35);
                heartShape.bezierCurveTo(x + 80, y + 35, x + 80, y, x + 50, y);
                heartShape.bezierCurveTo(x + 35, y, x + 25, y + 25, x + 25, y + 25);

                var hue = 0;

                var setTargetParticle = function() {

                    //hearts circleLines
                    var material = new THREE.ParticleCanvasMaterial({ program: SPARKS.CanvasShadersUtils.hearts, blending: THREE.AdditiveBlending });

                    material.color.setHSV(hue, 0.5, 1);
                    hue += 0.001;
                    if (hue > 1) hue -= 1;

                    particle = new THREE.Particle(material);

                    particle.scale.x = particle.scale.y = Math.random() * 20 + 20;
                    particleCloud.add(particle);

                    return particle;
                };

                var onParticleCreated = function(p) {
                    var position = p.position;
                    p.target.position = position;
                };

                var onParticleDead = function(particle) {
                    particle.target.visible = false;
                    particleCloud.remove(particle.target);
                };

                sparksEmitter = new SPARKS.Emitter(new SPARKS.SteadyCounter(160));

                emitterpos = new THREE.Vector3();

                sparksEmitter.addInitializer(new SPARKS.Position(new SPARKS.PointZone(emitterpos)));
                sparksEmitter.addInitializer(new SPARKS.Lifetime(0, 2));
                sparksEmitter.addInitializer(new SPARKS.Target(null, setTargetParticle));

                sparksEmitter.addInitializer(new SPARKS.Velocity(new SPARKS.PointZone(new THREE.Vector3(0, -50, 10))));

                // TOTRY Set velocity to move away from centroid

                sparksEmitter.addAction(new SPARKS.Age());
                //sparksEmitter.addAction(new SPARKS.Accelerate(0.2));
                sparksEmitter.addAction(new SPARKS.Move());
                sparksEmitter.addAction(new SPARKS.RandomDrift(50, 50, 2000));

                sparksEmitter.addCallback("created", onParticleCreated);
                sparksEmitter.addCallback("dead", onParticleDead);
                sparksEmitter.start();

                // End Particles


                var canvas = $("#myCanvas").get(0);

                renderer = new THREE.CanvasRenderer({
                    canvas: canvas
                });
                renderer.setSize(window.innerWidth, window.innerHeight);

                document.addEventListener('mousedown', onDocumentMouseDown, false);
                document.addEventListener('touchstart', onDocumentTouchStart, false);
                document.addEventListener('touchmove', onDocumentTouchMove, false);
            }

            //

            document.addEventListener('mousemove', onDocumentMouseMove, false);

            function onDocumentMouseDown(event) {

                event.preventDefault();

                mouseXOnMouseDown = event.clientX - windowHalfX;
                targetRotationOnMouseDown = targetRotation;

                if (sparksEmitter.isRunning()) {
                    sparksEmitter.stop();
                } else {
                    sparksEmitter.start();
                }

            }

            function onDocumentMouseMove(event) {

                mouseX = event.clientX - windowHalfX;

                targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.02;

            }

            function onDocumentTouchStart(event) {

                if (event.touches.length == 1) {

                    event.preventDefault();

                    mouseXOnMouseDown = event.touches[0].pageX - windowHalfX;
                    targetRotationOnMouseDown = targetRotation;

                }

            }

            function onDocumentTouchMove(event) {

                if (event.touches.length == 1) {

                    event.preventDefault();

                    mouseX = event.touches[0].pageX - windowHalfX;
                    targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.05;

                }

            }

            //

            function animate() {

                requestAnimationFrame(animate);

                render();

            }

            function render() {

                timeOnShapePath += 0.0337;

                if (timeOnShapePath > 1) timeOnShapePath -= 1;

                // TODO Create a PointOnShape Action/Zone in the particle engine
                var pointOnShape = heartShape.getPointAt(timeOnShapePath);

                emitterpos.x = pointOnShape.x * 5 - 100;
                emitterpos.y = -pointOnShape.y * 5 + 400;

                // Pretty cool effect if you enable this
                // particleCloud.rotation.y += 0.05;

                parent.rotation.y += (targetRotation - parent.rotation.y) * 0.05;
                renderer.render(scene, camera);

            }

            init();
            animate();

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