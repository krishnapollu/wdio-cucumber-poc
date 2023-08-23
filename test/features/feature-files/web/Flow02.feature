Feature: Product Sort Functionality

Scenario: Verify Sort Functionality
Given Login to Application
When Sorting the page
Then Products should get sorted

Scenario: Add Product to cart and then remove
Given Product selected
When Added to cart
Then Product should be visible in Cart page
And User should be able to remove the product from Cart

Scenario: Checkout Cancellation
Given Product selected
When Added to cart
Then Product should be visible in Cart page
And User should be able to cancel Checkout