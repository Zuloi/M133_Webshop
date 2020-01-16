"use strict";
exports.__esModule = true;
var express = require("express");
var products = require("./products.json");
var cookieParser = require("cookie-parser");
var router = express.Router();
router.use(cookieParser());

router.get('/checkout', function (req, res) {
    res.render(__dirname + '/checkout', { products: products, total: req.session.cookie.cart.getTotal() });
});
router.post('/checkout', function (req, res) {
    req.session.cookie.cart.reset();
    res.redirect('/index');
});
router.get('/cart', function (req, res) {
    res.render(__dirname + '/cart', { products: req.session.cookie.cart.getCart(), total: req.session.cookie.cart.getTotal() });
});
//router.post('/product/:id', function (req, res) {
  //  var product = loadProduct(req.params.id);
    //req.session.cookie.cart.manageCart(product);
   // res.render(__dirname + '/cart.ejs', {products: req.session.cookie.cart.getCart(),  total: req.session.cookie.cart.getTotal() });
//});

router.get('/cart/product/delete/:id', (req, res) => {
    var product = loadProduct(req.params.id);
    req.session.cookie.cart.remove(product);
    res.redirect('/cart');
});

router.post('/cart/product/add/:id', (req, res) => {
    var product = loadProduct(req.params.id);
    req.session.cookie.cart.add(product);
    res.redirect('/cart');
});


router.get('/', function (req, res) {
    res.render(__dirname + '/index', { products: products, total: req.session.cookie.cart.getTotal() });
});
router.get('/index', function (req, res) {
    res.render(__dirname + '/index', { products: products, total: req.session.cookie.cart.getTotal() });
});
router.get('/product/:id', function (req, res) {
    var product = loadProduct(req.params.id);
    res.render(__dirname + '/item', { product: product, total: req.session.cookie.cart.getTotal() });
});
router.post('/product/:id', function (req, res) {
    var product = loadProduct(req.params.id);
    req.session.cookie.cart.add(product);
    res.render(__dirname + '/index', { products: products, total: req.session.cookie.cart.getTotal() });
});


router.get('/api/product/:id', function (req, res) {
    var product = loadProduct(req.params.id);
    req.session.product = product;
    res.json(req.session.product);
});
router.get('api/products', function (req, res) {
    res.json(products);
});
function loadProduct(id) {
    return products.find(function (p) { return p.id.toString() === id; });
}
module.exports = router;
