$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-product]').click(function(){
    window.location = 'product.html';
  })

  $('[data-add-to-cart]').click(function(){
    alert('أُضيف المنتج إلى عربة الشراء');
    
  });
  $('.product-option input[type="radio"]').change(function(){
    $(this).parents('.product-option').siblings().removeClass('active');
    $(this).parents('.product-option').addClass('active');
  });
 
  $('[data-remove-from-cart]').click(function(){
    $(this).parents('[data-product-info]').remove();
    calculateTotalPrice();
  });

  $('[data-product-quantity]').change(function(){
    var newQuantity = $(this).val();
    var $parent = $(this).parents('[data-product-info]');
    var pricePerUnit = $parent.attr('data-product-price');
    var totalPriceForProduct = newQuantity * pricePerUnit;
    $parent.find('.total-price-for-product').text(totalPriceForProduct + '$');
    calculateTotalPrice();
  });

  function calculateTotalPrice(){
    var totalPriceForAllProducts=0;
    $('[data-product-info]').each(function(){
      var pricePerUnit = $(this).attr('data-product-price');
      var quantity = $(this).find('[data-product-quantity]').val();
      var toatalPriceForProduct = pricePerUnit * quantity;
      totalPriceForAllProducts = totalPriceForAllProducts + (toatalPriceForProduct);
    });
    $('#total-price-for-all-products').text(totalPriceForAllProducts + '$');
    if(totalPriceForAllProducts ===0){
      $('#form-checkout button[type="submit"]').prop('disabled',true);
    }
  }

  var citiesByCountry = {
    sa:[
      'الرياض',
      'جدة'
    ],
    eg:[
      'القاهرة',
      'الإسكندرية'
    ],
    jo:[
      'عمان',
      'الزرقاء'
    ],
    sy:[
      'دمشق',
      'حلب',
      'حمص'
    ]
  };

  $('#form-checkout select[name="country"]').change(function(){
    var country = $(this).val();
    var cities = citiesByCountry[country];
    $('#form-checkout select[name="city"]').empty();
    $('#form-checkout select[name="city"]').append(
      ' <option selected disabled value="">إختر المدينة</option>'
      
    );
    cities.forEach(function(city){
      var $newOption = $('<option></option>');
      $newOption.text(city);
      $newOption.val(city);

      $('#form-checkout select[name="city"]').append($newOption);
    });

  });

  $('#form-checkout input[name="payment_method"]').change(function(){
    
    var paymentMethod = $(this).val();
    if(paymentMethod === 'on_delivery'){
      $('#credit_card_info input').prop('disabled',true);
    }
    else{
      $('#credit_card_info input').prop('disabled',false);
    }
    $('#credit_card_info').toggle();
  });
})