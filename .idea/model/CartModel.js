export default class CartModel {
    constructor(i_code, description, unitPrice, qty, tot) {
        this._i_code = i_code;
        this._description = description;
        this._unitPrice = unitPrice;
        this._qty = qty;
        this._tot = tot;
    }

    get i_code() {
        return this._i_code;
    }

    set i_code(value) {
        this._i_code = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get unitPrice() {
        return this._unitPrice;
    }

    set unitPrice(value) {
        this._unitPrice = value;
    }

    get qty() {
        return this._qty;
    }

    set qty(value) {
        this._qty = value;
    }

    get tot() {
        return this._tot;
    }

    set tot(value) {
        this._tot = value;
    }
}