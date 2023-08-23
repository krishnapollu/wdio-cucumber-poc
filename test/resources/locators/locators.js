module.exports = {

  
  loginPage: {
    txt_uname: '#user-name',
    txt_pwd: '#password',
    btn_login: '#login-button'
  },

  homePage: {
    list_sort: '.product_sort_container',
    lnk_cart: '//div[@id="shopping_cart_container"]/a',
    lnk_menu: '//button[contains(.,"Open Menu")]',
    lnk_logout: '#logout_sidebar_link',
    lnk_inventory: '#inventory_sidebar_link',
  },

  productPage: {
    btn_addToCart: '//button[contains(.,"ADD TO CART")]',
    btn_back: '//button[@class="inventory_details_back_button"]',
  },

  cartPage: {
    btn_continueShpg: '//a[contains(.,"Continue Shopping")',
    lnk_chkout: '//a[contains(.,"CHECKOUT")]',
    info_summary: '.summary_info',
    lnk_finish: '//a[contains(.,"FINISH")]',
    img_chkoutComplete: '#checkout_complete_container',
  },

  checkoutPage: {
    txt_fname: '#first-name',
    txt_lname: '#last-name',
    txt_zip: '#postal-code',
    btn_continue: '//input[@value="CONTINUE"]',
    btn_cancel: '//a[contains(.,"CANCEL")]',
  }
}