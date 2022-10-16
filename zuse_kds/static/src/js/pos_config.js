odoo.define('pos_custom_buttons.DemoButton', function(require) {
'use strict';
   const { Gui } = require('point_of_sale.Gui');
   const PosComponent = require('point_of_sale.PosComponent');
   const { posbus } = require('point_of_sale.utils');
   const ProductScreen = require('point_of_sale.ProductScreen');
   const { useListener } = require('web.custom_hooks');
   const Registries = require('point_of_sale.Registries');
   const PaymentScreen = require('point_of_sale.PaymentScreen');
   class CustomDemoButtons extends PosComponent {

constructor() {

super(...arguments);

useListener('click', this.onClick);

}

is_available() {
   return this.env.pos.get_order();
}

onClick() {
    const order = this.is_available();
    for (var lines in order.get_orderlines()){
         console.log(lines);
    }
   Gui.showPopup("ErrorPopup", {

   title: this.env._t('Payment Screen Custom Button Clicked'),

   body: this.env._t('Welcome to OWL, ' + this.env.pos.get_order().name),

   });

}
   }
   CustomDemoButtons.template = 'CustomDemoButtons';
   ProductScreen.addControlButton({

component: CustomDemoButtons,

condition: function() {

return this.env.pos;

},
   });
   Registries.Component.add(CustomDemoButtons);
   return CustomDemoButtons;
});