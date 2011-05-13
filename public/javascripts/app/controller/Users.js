Ext.define('AM.controller.Users', {
  extend: 'Ext.app.Controller',

  stores: ['Users'],
  models: ['User'],

  views: [
    'user.List',
    'user.Form'
  ],

  refs: [{
    ref: 'toolbar',
    selector: 'toolbar'
  }],

  init: function() {
    this.control({
      'userlist': {
        itemdblclick: this.editUser,
        selectionchange: this.selectionChange
      },
      'userform button[action=save]': {
        click: this.updateUser
      }
    });
  },

  editUser: function(grid, record) {
    console.log("Double clicked on " + record.get('name'));

    var view = Ext.widget('userform'); // create user form widget instance
    view.down('form').loadRecord(record);
  },

  updateUser: function(button) {
    var win = button.up('window');
    var form = win.down('form');
    var record = form.getRecord();
    var values = form.getValues();

    record.set(values);
    win.close();
    this.getUsersStore().sync();
  },

  selectionChange: function(grid, selections) {
    var toolbar = this.getToolbar();

    if (selections.length > 0) {
      toolbar.enableRecordRelatedButtons();
    } else {
      toolbar.disableRecordRelatedButtons();
    }
  }

});
