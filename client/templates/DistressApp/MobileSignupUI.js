Template.MobileSignupUI.events({
  'click #mobileSignupBtn'(ev, tmpl) {
    ev.preventDefault();
    var phone = $("input[name=mobileNumber]").val(),
        fullName = $("input[name=fullName]").val(),
        indianPhone = '+91'.concat(phone);

    // unsophisticated validation
    if (!phone || !fullName || phone.length !== 10 || !fullName.length) {
      return false;
    }

    localStorage.setItem('mobileNumber', indianPhone);
    localStorage.setItem('fullName', fullName);
    Session.set('signupComplete', true);
  }
});
