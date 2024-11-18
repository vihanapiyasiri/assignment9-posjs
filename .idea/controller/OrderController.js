import { customer_array,item_array ,order_array,cart_array} from "../db/database.js";
import OrderModel from "../model/OrderModel.js";
import CartModel from "../model/CartModel.js";

let itemindex ;
let finaltotal = 0;
let c_id;

$(document).ready(function () {

    $("#order-nav").on().click(function () {
        console.log("Order Nav Clicked");
        loadCustomerSelector();
        loadItemSelector();
    })

});

const loadCartTable = () => {
    $("#cartTableBody").empty();
    cart_array.map((item) => {
        let data = `
            <tr>
                <td>${item.i_code}</td>
                <td>${item.description}</td>
                <td>${item.unitPrice}</td>
                <td>${item.qty}</td>
                <td>${item.tot}</td>
            </tr>`;
        $("#cartTableBody").append(data);
    });
}

const cleanCartForm = () => {
    $("#selectCustomer").val("")
    $("#customerName2").val("")
    $("#selectItem").val("")
    $("#description").val("")
    $("#qtyOnHand").val("")
    $("#quantity").val("")
    $("#unitPrice").val("")
}

const loadCustomerSelector = () => {
    $("#selectCustomer").empty();
    $("#selectCustomer").append(`<option value="" >Select a Customer</option>`);

    customer_array.map((item) => {
        $("#selectCustomer").append(`<option >${item.c_id}</option>`);
    })
}

const loadItemSelector = () => {
    $("#selectItem").empty();
    $("#selectItem").append(`<option value="" >Select a Item</option>`);

    item_array.map((item) => {
        $("#selectItem").append(`<option >${item.i_code}</option>`);
    })
}

$("#selectCustomer").on("change", function () {
    let index = $(this).prop("selectedIndex");
    if (index>0) {
        $("#customerName2").val(customer_array[index - 1].name);
    }
})
$("#selectItem").on("change", function () {
     itemindex = $(this).prop("selectedIndex");
    if (itemindex>0) {
        $("#description").val(item_array[itemindex - 1].description);
        $("#qtyOnHand").val(item_array[itemindex - 1].qty);
        $("#unitPrice").val(item_array[itemindex - 1].unitPrice);
    }
})

$("#addcart").on("click", function () {
    let i_code = $("#selectItem").val();
    let description = $("#description").val();
    let unitPrice = parseFloat($("#unitPrice").val());
    let qtyOnHand = parseInt($("#qtyOnHand").val());
    let qty = parseInt($("#quantity").val());
    let tot = unitPrice * qty;
    c_id = $("#selectCustomer").val();

    if (qty>qtyOnHand){
        alert("Not enough stock");
    }else{
        let cartdata = new CartModel(i_code, description, unitPrice, qty, tot);

        updateItem(i_code, qty);
        console.log(cartdata)
        cart_array.push(cartdata)

        finaltotal += tot;
        $("#totalAmount").empty()
        $("#totalAmount").append(finaltotal+"/=");

        loadCartTable();
        cleanCartForm()

    }

})
function updateItem(i_code, quantity) {
    for (let i = 0; i < item_array.length; i++) {
        if (i_code === item_array[i].i_code) {
            item_array[i].qty = item_array[i].qty - quantity;
        }
    }
}
$("#placeOrder").on().click(function () {
    console.log("place order clicked");
    $("#cartTableBody tr").each(function () {
        let i_code = $(this).find("td").eq(0).text();
        let description = $(this).find("td").eq(1).text();
        let unitPrice = parseFloat($(this).find("td").eq(2).text());
        let qty = parseInt($(this).find("td").eq(3).text());
        let tot = parseFloat($(this).find("td").eq(4).text());
        let orderdata = new OrderModel(order_array.length+1,c_id, i_code, description, qty, tot);
        order_array.push(orderdata);
        c_id=null
    })

    $("#cartTableBody").empty();
    $("#totalAmount").empty();
    $("#totalAmount").append("0.00");

    cleanCartForm()
    cart_array.splice(0,cart_array.length)
    console.log(order_array)

    Swal.fire({
        position: "succ",
        icon: 'success',
        title: 'Order Placed Successfully',
        showConfirmButton: false,
        timer: 1500
    })
})
