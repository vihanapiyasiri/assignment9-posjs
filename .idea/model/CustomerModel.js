export default class CustomerModel {
    constructor(c_id,name,address,contact) {
        this._c_id = c_id;
        this._name = name;
        this._address = address;
        this._contact = contact;
    }

    get c_id() {
        return this._c_id;
    }

    set c_id(value) {
        this._c_id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get address() {
        return this._address;
    }

    set address(value) {
        this._address = value;
    }

    get contact() {
        return this._contact;
    }

    set contact(value) {
        this._contact = value;
    }
}