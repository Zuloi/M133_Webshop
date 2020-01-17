"use strict";
exports.__esModule = true;
var ShoppingCart = /** @class */ (function () {
    function ShoppingCart() {
        this.total = 0.00;
        this.products = [];
        this.products = new Array();
    }
    ShoppingCart.prototype.getTotal = function () {
        return this.total;
    };
    ShoppingCart.prototype.addToTotal = function (price) {
        this.total += price;
    };
    ShoppingCart.prototype.removeToTotal = function (price) {
        this.total -= price;
    };
    ShoppingCart.prototype.add = function (product) {
        this.addToTotal(product.specialOffer);
        if (this.products.find(function (p) { return p.id == product.id; }) != undefined) {
            product.amount++;
        }
        else {
            product.amount = 1;
            this.products.push(product);
        }
    };
    ShoppingCart.prototype.getCart = function () {
        return this.products;
    };
    
    ShoppingCart.prototype.remove = function (product) {
        this.removeToTotal(product.specialOffer);
        if ( product.amount == 1) {
            this.products.splice(this.products.indexOf(product), 1);
        }
        else{
            product.amount--;
        }
        
    };

    ShoppingCart.prototype.reset = function () {
        this.products.forEach(product => {
            product.amount = 0;
        });
        this.products = [];
        this.total = 0;
    }
    return ShoppingCart;
}());
exports.ShoppingCart = ShoppingCart;
