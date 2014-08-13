
$(function() {
    var startupView = "About";


    heart.app = new DevExpress.framework.html.HtmlApplication({
        namespace: heart,
        layoutSet: DevExpress.framework.html.layoutSets[heart.config.layoutSet],
        navigation: heart.config.navigation
    });

    $(window).unload(function() {
        heart.app.saveState();
    });

    heart.app.router.register(":view/:id", { view: "Home", id: undefined });
    heart.app.navigate();
});