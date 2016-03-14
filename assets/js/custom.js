$(function() {
  var middleH = window.innerWidth /2 - 60;
  document.querySelector('#FBButton').style.left=middleH;
  window.addEventListener("resize", myResize);

  function myResize() {
    var middleH2 = window.innerWidth /2 - 60;
    console.log(middleH2);
    document.querySelector('#FBButton').style.left=middleH2;
  };

  var deleteLinks = {
    initialize: function() {
      this.methodLinks = $('a[data-method]');
      this.registerEvents();
    },

    registerEvents: function() {
      this.methodLinks.click(this.handleMethod);
    },

    handleMethod: function(e) {
      e.preventDefault();
      e.stopPropagation();
      var link = $(this);
      var httpMethod = link.data('method').toUpperCase();

      if ($.inArray(httpMethod, ['PUT', 'DELETE']) === - 1) {
        return;
      }

      if(link.data('confirm')) {
        if(!deleteLinks.verifyConfirm(link)) {
          return false;
        }
      }

      $.ajax({
        url: link.attr('href'),
        method: httpMethod,
        success: function(data) {
          console.log('success');
          console.log(data);
          window.location = '/dashboard'
        },
        error: function(data) {
          console.log('error');
          console.log(data);
        }
      })
    },

    verifyConfirm: function(link) {
      return confirm(link.data('confim'));
    }
  }

  deleteLinks.initialize();
});
