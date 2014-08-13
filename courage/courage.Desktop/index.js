
$(function() {
    var startupView = "View1";

    DevExpress.devices.current("desktop");

    courage.app = new DevExpress.framework.html.HtmlApplication({
        namespace: courage,
        layoutSet: DevExpress.framework.html.layoutSets[courage.config.layoutSet],
        mode: "webSite",
        navigation: courage.config.navigation
    });

    $(window).unload(function() {
        courage.app.saveState();
    });

    courage.app.router.register(":view/:id", { view: startupView, id: undefined });
    courage.app.navigate();
});