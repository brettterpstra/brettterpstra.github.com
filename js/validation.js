
 $(document).ready(function() {

    $('#name').blur(function(){NameValidation();})
    $('#email').blur(function(){EmailValidation();})
    $('#message').blur(function(){MessageValidation();})
    $('#check').blur(function(){SumValidation();})

    $('#submit').click(function() {
        if(! validate())
            return false;
        
        var conf = $('#confirmation');
        conf.text("Your message is being sent ...");
        conf.addClass("confirmation_visible");

        var dataString = $("#chatform").serialize();

        $.ajax({
            url: "scripts/sendMail.php",
            type: "POST",
            data: dataString,
            dataType: "json",
            //timeout: 5000 ,
            success:function(data) {
                if(data.error==true) {
                    conf.text("Your message could not bee sent. Please try again later.");
                    conf.addClass("confirmation_visible");
                    setTimeout(function(){
                        conf.removeClass("confirmation_visible");},3000);
                }
                else {
                    conf.addClass("confirmation_visible");
                    conf.text("Your message has been sent."); 
                    setTimeout(function(){
                        conf.fadeOut(2000, function(){
                            conf.removeClass("confirmation_visible");
                        });
                    },3000);
                }
            },
            error:function(xhr,err,e) {                            
                conf.text("Your message could not bee sent. Please try again later.");
                conf.addClass("confirmation_visible");
                setTimeout(function(){
                    conf.removeClass("confirmation_visible");},3000);
                }
        }); // closing $.ajax()

        return true;
    })      
});


function NameValidation() {

    var inputName = $('#name');
    var wrapName = $('#name_wrap');
    inputName.val(trim(inputName.val()));
    var strValue = inputName.val();

    if(isEmpty(strValue)){
        wrapName.addClass("error");
        return false;
    }
    
    var objRegExp = /^([a-z0-9_\'\-]+ *)*[a-z0-9]+$/i
    if(! objRegExp.test(strValue)){
        wrapName.addClass("error");
        return false;
    }

    wrapName.removeClass("error");

    return true;
}

function EmailValidation() {

    var emailInput = $('#email');
    var wrapEmail = $('#email_wrap');

    emailInput.val(trim(emailInput.val()));
    var strValue = trim(emailInput.val());
    
    var emailExp = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
    if(isEmpty(strValue)) {
        wrapEmail.addClass("error");
        return false;
    }

    if(!strValue.match(emailExp)) {
        wrapEmail.addClass("error");
        return false;
    }

    wrapEmail.removeClass("error");

    return true;
}

function MessageValidation() {

    var messageInput = $('#message');
    var wrapMessage = $('#message_wrap');

    messageInput.val(trim(messageInput.val()));
    var strValue = trim(messageInput.val());

    if(isEmpty(strValue)) {
        wrapMessage.addClass("error");
        return false;
    }

    wrapMessage.removeClass("error");
   
    return true;
}

function SumValidation() {

    var sumInput = $('#check');
    var wrapSum = $('#check_wrap');

    var strValue = trim(sumInput.val());
    if(isEmpty(strValue))    {
        wrapSum.addClass("error");
        return false;
    }
    
    if(isNaN(strValue)) {
        wrapSum.addClass("error");
        return false;
    }

    var n1 = parseInt(($('#n1')).text(), 10);
    var n2 = parseInt(($('#n2')).text(), 10);
    var s  = parseInt(strValue, 10);
    if((n1+n2)!= s) {
        wrapSum.addClass("error");
        return false;
    }

    wrapSum.removeClass("error");

    return true;
}

function validate() {

    var valid = true;

    if(!NameValidation())
        valid = false;
    if(!EmailValidation())
        valid = false;
    if(!MessageValidation())
        valid = false;
    if(!SumValidation())
        valid = false;

    return valid ;
}

function trim(stringToTrim) {
    return stringToTrim.replace(/^\s+|\s+$/g,"");
}

function isEmpty(strValue) {
    if(strValue.length == 0)
        return true;
    return false;
}

