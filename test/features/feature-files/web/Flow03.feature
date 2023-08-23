Feature: End to End User flow

Scenario: User Checkout Flow
Given Login to Application
Given Product selected
When Added to cart
Then Product should be visible in Cart page
And User should be able to Checkout