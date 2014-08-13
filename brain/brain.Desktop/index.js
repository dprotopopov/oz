
$(function() {
    var startupView = "View1";

    DevExpress.devices.current("desktop");

    brain.app = new DevExpress.framework.html.HtmlApplication({
        namespace: brain,
        layoutSet: DevExpress.framework.html.layoutSets[brain.config.layoutSet],
        mode: "webSite",
        navigation: brain.config.navigation
    });

    $(window).unload(function() {
        brain.app.saveState();
    });

    brain.app.router.register(":view/:id", { view: startupView, id: undefined });
    brain.app.navigate();
});