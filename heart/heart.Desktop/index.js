
$(function() {
    var startupView = "View1";

    DevExpress.devices.current("desktop");

    heart.app = new DevExpress.framework.html.HtmlApplication({
        namespace: heart,
        layoutSet: DevExpress.framework.html.layoutSets[heart.config.layoutSet],
        mode: "webSite",
        navigation: heart.config.navigation
    });

    $(window).unload(function() {
        heart.app.saveState();
    });

    heart.app.router.register(":view/:id", { view: startupView, id: undefined });
    heart.app.navigate();
});