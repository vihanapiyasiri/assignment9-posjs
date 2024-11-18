// Import necessary modules and arrays
import { item_array} from "../db/database.js";
import ItemModel from "../model/ItemModel.js";

// Function to validate Sri Lankan mobile numbers


// Function to load customer data into the table
const loadItemTable = () => {
    $("#itemTableBody").empty();
    item_array.forEach((item) => {
        let data = `
            <tr>
                <td>${item.i_code}</td>
                <td>${item.description}</td>
                <td>${item.unitPrice}</td>
                <td>${item.qty}</td>
            </tr>`;
        $("#itemTableBody").append(data);
    });
}

// Function to clear the customer form fields
const cleanItemForm = () => {
    $('#itemcode1, #description1, #unitPrice1, #qty').val('');
}

let selected_item_index = null;  // Track selected customer for updates

$("#item-nav").on('click', function () {
     loadItemTable()
})

$(document).ready(function () {
    // Save button click event
    $("#btn-save-item").on('click', function () {
        console.log("save");
        const i_code = $("#itemcode1").val();
        const description = $("#description1").val();
        const unitPrice = $("#unitPrice1").val();
        const qty = $("#qty").val();

        // Regex for item code (e.g., I001, A001)
        const itemCodeRegex = /^I\d+$/; // One uppercase letter followed by three digits

        // Regex for unit price (positive decimal numbers)
        const unitPriceRegex = /^(0|[1-9]\d*)(\.\d{1,2})?$/; // Positive numbers with optional two decimal places

        // Input validation using SweetAlert
        if (!i_code || !itemCodeRegex.test(i_code)) {
            Swal.fire({
                icon: "error",
                title: "Invalid Input",
                text: "Please enter a valid Item Code (e.g., I001)."
            });
            return;
        }
        if (!description) {
            Swal.fire({
                icon: "error",
                title: "Invalid Input",
                text: "Please enter a valid Description."
            });
            return;
        }
        if (!unitPrice || !unitPriceRegex.test(unitPrice) || parseFloat(unitPrice) <= 0) {
            Swal.fire({
                icon: "error",
                title: "Invalid Input",
                text: "Please enter a valid Unit Price (e.g., 10.50)."
            });
            return;
        }
        if (!qty || isNaN(qty) || parseInt(qty) <= 0) {
            Swal.fire({
                icon: "error",
                title: "Invalid Input",
                text: "Please enter a valid Quantity greater than 0."
            });
            return;
        }

        // Create a new item object and save
        let item = new ItemModel(i_code, description, parseFloat(unitPrice), parseInt(qty));
        item_array.push(item);

        // Show success message using SweetAlert
        Swal.fire({
            icon: "success",
            title: "Item Saved",
            text: "The item has been successfully saved."
        });

        // Update UI and clear form
        cleanItemForm(); // Clears the input fields
        loadItemTable(); // Reloads the item table with the new item
    });

    $('#itemTableBody').on('click', 'tr', function () {
        selected_item_index = $(this).index();
        let item = item_array[selected_item_index];

        // Fill form with customer data
        $('#itemcode1').val(item.i_code);
        $('#description1').val(item.description);
        $('#unitPrice1').val(item.unitPrice);
        $('#qty').val(item.qty);
    });

    // Update button click event
    $('#item_update_btn').on('click', function () {
        console.log("update");

        // Check if any row is selected
        if (selected_item_index === null) {
            Swal.fire({
                icon: "warning",
                title: "No Selection",
                text: "Please select an item to update."
            });
            return;
        }

        // SweetAlert confirmation dialog
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to update this item?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // Create an updated item object
                let updatedItem = new ItemModel(
                    $('#itemcode1').val(),
                    $('#description1').val(),
                    parseFloat($('#unitPrice1').val()),
                    parseInt($('#qty').val())
                );

                // Update item in array
                item_array[selected_item_index] = updatedItem;

                // Clear form and refresh UI
                cleanItemForm();
                loadItemTable();

                // Success message
                Swal.fire({
                    icon: "success",
                    title: "Item Updated",
                    text: "The item has been successfully updated."
                });
            }
        });
    });


    // Delete button click event with confirmation
    $("#item_delete_btn").on('click', function () {
        // Show confirmation dialog with SweetAlert
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("Deleting item at index:", selected_item_index);

                // Ensure selected_item_index is a valid number
                if (typeof selected_item_index === "number" && selected_item_index >= 0) {
                    item_array.splice(selected_item_index, 1); // Fix: pass only index here
                    loadItemTable(); // Reload table to reflect changes
                    cleanItemForm(); // Clear form fields

                    // Display a success message
                    Swal.fire(
                        'Deleted!',
                        'The item has been deleted.',
                        'success'
                    );
                } else {
                    console.error("Invalid index:", selected_item_index);
                }
            }
        });
    });


});

