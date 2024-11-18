import { order_array} from "../db/database.js";
const loadOrderDetailTable=() => {
    console.log("redtfyghukjil")

    $("#orderdetail-table-body").empty();
    order_array.map((item) => {
        let data = `
            <tr>
                <td>${item.o_id}</td>
                <td>${item.c_id}</td>
                <td>${item.i_code}</td>
                <td>${item.description}</td>
                <td>${item.quantity}</td>
                <td>${item.total}</td>
            </tr>`;
        $("#orderdetail-table-body").append(data);
    })
}

$(document).ready(function () {
    $("#orderdetail-nav").on().click(function () {
        console.log("Order Detail Nav Clicked");
        loadOrderDetailTable();
    })

})
