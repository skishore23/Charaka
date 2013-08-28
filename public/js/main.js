var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "products"	: "list",
        "products/page/:page"	: "list",
        "products/add"         : "addProduct",
        "products/:id"         : "productDetails",
        "about"             : "about"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function (id) {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },

	list: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var productList = new ProductCollection();
        productList.fetch({success: function(){
            $("#content").html(new ProductListView({model: productList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    productDetails: function (id) {
        var product = new Product({_id: id});
        product.fetch({success: function(){
            $("#content").html(new ProductView({model: product}).el);
        }});
        this.headerView.selectMenuItem();
    },

	addProduct: function() {
        var product = new Product();
        $('#content').html(new ProductView({model: product}).el);
        this.headerView.selectMenuItem('add-menu');
	},

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    }

});

utils.loadTemplate(['HomeView', 'HeaderView', 'ProductView', 'ProductListItemView', 'AboutView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});