// Import necessary modules and arrays
import CustomerModel from "../model/CustomerModel.js";
import { customer_array } from "../db/database.js";

// Function to validate Sri Lankan mobile numbers
const validateMobile = (contact) => {
    const sriLankanMobileRegex = /^(?:\+94|0)?7[0-9]{8}$/;
    return sriLankanMobileRegex.test(contact);
}
function validateCustomerId(c_id) {
    const idRegex = /^C\d+$/; // Pattern matches 'C' followed by exactly 3 digits
    return idRegex.test(c_id);
}
// Function to load customer data into the table
const loadCustomerTable = () => {
    $("#customerTableBody").empty();
    customer_array.forEach((item) => {
        let data = `
            <tr>
                <td>${item.c_id}</td>
                <td>${item.name}</td>
                <td>${item.address}</td>
                <td>${item.contact}</td>
            </tr>`;
        $("#customerTableBody").append(data);
    });
}

// Function to clear the customer form fields
const cleanCustomerForm = () => {
    $('#customerId1, #customerName, #address, #contact').val('');
}

let selected_customer_index = null;  // Track selected customer for updates

$(document).ready(function () {
    // Save button click event
    $("#btn-save").on('click', function () {
        console.log("save");
        const c_id = $("#customerId1").val();
        const name = $("#customerName").val();
        const address = $("#address").val();
        const contact = $("#contact").val();

        // Input validation with SweetAlert alerts for each validation failure
        if (!validateCustomerId(c_id)) {
            Swal.fire({
                icon: "error",
                title: "Invalid Input",
                text: "Please enter a valid Customer ID (e.g., C001)."

            });
            return;
        }
        if (!name) {
            Swal.fire({
                icon: "error",
                title: "Invalid Input",
                text: "Invalid Name"
            });
            return;
        }
        if (!address) {
            Swal.fire({
                icon: "error",
                title: "Invalid Input",
                text: "Invalid Address"
            });
            return;
        }
        if (!validateMobile(contact)) {
            Swal.fire({
                icon: "error",
                title: "Invalid Input",
                text: "Please ever a valid Mobile Number (e.g., 0771234567 or +94771234567)."
            });
            return;
        }

        // If validation passes, create a new customer object and save
        let customer = new CustomerModel(c_id, name, address, contact);
        customer_array.push(customer);

        // Clear form and refresh UI
        cleanCustomerForm();
        loadCustomerTable();

        // SweetAlert success message
        Swal.fire({
            icon: "success",
            title: "Customer Saved",
            text: "Customer details have been saved successfully."
        });
    });

    // Row click event to populate form with customer data for updates
    $('#customerTableBody').on('click', 'tr', function () {
        selected_customer_index = $(this).index();
        let customer = customer_array[selected_customer_index];

        // Fill form with customer data
        $('#customerId1').val(customer.c_id);
        $('#customerName').val(customer.name);
        $('#address').val(customer.address);
        $('#contact').val(customer.contact);
    });

    // Update button click event
    $('#customer_update_btn').on('click', function () {
        console.log("update");

        if (selected_customer_index === null) {
            Swal.fire({
                icon: "warning",
                title: "No Selection",
                text: "Please select a customer to update."
            });
            return;
        }

        // Input validation
        const c_id = $('#customerId1').val();
        const name = $('#customerName').val();
        const address = $('#address').val();
        const contact = $('#contact').val();

        // Regex validation for customer ID and mobile
        if (!validateCustomerId(c_id)) {
            Swal.fire({
                icon: "error",
                title: "Invalid Input",
                text: "Please enter a valid Customer ID (e.g., C001)."
            });
            return;
        }
        if (!name) {
            Swal.fire({
                icon: "error",
                title: "Invalid Input",
                text: "Please enter a valid Name."
            });
            return;
        }
        if (!address) {
            Swal.fire({
                icon: "error",
                title: "Invalid Input",
                text: "Please enter a valid Address."
            });
            return;
        }
        if (!validateMobile(contact)) {
            Swal.fire({
                icon: "error",
                title: "Invalid Input",
                text: "Please enter a valid Mobile Number (e.g., 0771234567 or +94771234567)."
            });
            return;
        }

        // SweetAlert confirmation before updating
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to update the selected customer's details?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, update it!",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                let updatedCustomer = new CustomerModel(c_id, name, address, contact);

                // Update customer in the array and refresh the UI
                customer_array[selected_customer_index] = updatedCustomer;
                cleanCustomerForm();
                loadCustomerTable();

                // SweetAlert success message
                Swal.fire({
                    icon: "success",
                    title: "Customer Updated",
                    text: "Customer details have been updated successfully."
                });
            }
        });
    });

    // Delete button click event with confirmation
    $("#customer_delete_btn").on('click', function () {
        // Confirm delete action with SweetAlert
        $("#customer_delete_btn").on('click', function () {
            // Show confirmation dialog with SweetAlert
            Swal.fire({
                title: 'Are you sure?',
                text: "This action cannot be undone!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log("Deleting customer at index:", selected_customer_index);

                    // Ensure selected_customer_index is a valid number
                    if (typeof selected_customer_index === "number" && selected_customer_index >= 0) {
                        customer_array.splice(selected_customer_index, 1); // Fix: pass only index here
                        loadCustomerTable(); // Reload table to reflect changes
                        cleanCustomerForm(); // Clear form fields

                        // Display a success message
                        Swal.fire(
                            'Deleted!',
                            'The customer has been removed.',
                            'success'
                        );
                    } else {
                        console.error("Invalid index:", selected_customer_index);
                    }
                }
            });
        });

    });
});
