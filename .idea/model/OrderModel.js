export default  class OrderModel {
    constructor(o_id,c_id, i_code,description, quantity, total) {
        this._o_id = o_id;
        this._c_id = c_id;
        this._i_code = i_code;
        this._description = description;
        this._quantity = quantity;
        this._total = total;
    }

    get o_id() {
        return this._o_id;
    }
    set o_id(value) {
        this._o_id = value;
    }

    get c_id() {
        return this._c_id;
    }

    set c_id(value) {
        this._c_id = value;
    }

    get i_code() {
        return this._i_code;
    }

    set i_code(value) {
        this._i_code = value;
    }

    get quantity() {
        return this._quantity;
    }

    set quantity(value) {
        this._quantity = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }
}