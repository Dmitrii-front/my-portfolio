const hamburger = document.querySelector('.hamburger'),
      menu = document.querySelector('.menu'),
      closeElem = document.querySelector('.menu__close');

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});

closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
});

const percent = document.querySelectorAll('.skills__lvl-percent'),
      lines = document.querySelectorAll('.skills__lvl-scale div');

percent.forEach( (item, i) => {
    lines[i].style.width = item.innerHTML;
});


// jqValid

/* $("#myform").validate({
    rules: {
        name: "required",
        email: {
            required: true,
            email: true
        },
        text: "required",

    },
    messages: {
        name: {
            required: "Введите свое имя",
            minlength: jQuery.validator.format("Введите минимально {0} символа!")
          },
        text: {
            minlength: 20,
            maxlenght: 120
        },
        email: {
          required: "Введите свою почту",
          email: "Введите корректный адрес"
        }
    }
}); */


// phpMailer

/* $('form').submit(function(e) {
    e.preventDefault();

    if (!$(this).valid()) {
        return;
    }

    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function() {
        $(this).find("input").val("");
        $('forms').trigger('reset');
    });
    return false;
}); */