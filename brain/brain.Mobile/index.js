
$(function() {
    var startupView = "View1";

    // Uncomment the line below to disable platform-specific look and feel and to use the Generic theme for all devices
    // DevExpress.devices.current({ platform: "generic" });

    if(DevExpress.devices.real().platform === "win8") {
        $("body").css("background-color", "#000");
    }

    document.addEventListener("deviceready", onDeviceReady, false);
    
    function onDeviceReady() {
        navigator.splashscreen.hide();
        document.addEventListener("backbutton", onBackButton, false);
    }

    function onBackButton() {
        DevExpress.hardwareBackButton.fire();
    }

    function onNavigatingBack(e) {
        if(e.isHardwareButton && !brain.app.canBack()) {
            e.cancel = true;
            exitApp();
        }
    }

    function exitApp() {
        switch (DevExpress.devices.real().platform) {
            case "tizen":
                tizen.application.getCurrentApplication().exit();
                break;
            case "android":
                navigator.app.exitApp();
                break;
            case "win8":
                window.external.Notify("DevExpress.ExitApp");
                break;
        }
    }

    brain.app = new DevExpress.framework.html.HtmlApplication({
        namespace: brain,
        layoutSet: DevExpress.framework.html.layoutSets[brain.config.layoutSet],
        navigation: brain.config.navigation
    });

    $(window).unload(function() {
        brain.app.saveState();
    });

    brain.app.router.register(":view/:id", { view: startupView, id: undefined });
    brain.app.navigatingBack.add(onNavigatingBack);
    brain.app.navigate();
});