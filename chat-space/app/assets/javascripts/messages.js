$(function(){
  function buildHTML(message){
    var image = message.image == null ? "" : message.image
    var html = `<div class="mainMessages__list__userName">
                    ${message.name}
                  </div>
                  <div class="mainMessages__list__createdAt">
                    ${message.time}
                  </div>
                  <div class="mainMessages__list__text">
                    <p class="lower-message__content">
                      ${message.body}
                    </p>
                    <img class="lower-message__image" src="${image}">
                  </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.mainMessages').append(html)
      $('.input-box__text,.input-box__image__input').val('')
      $('.mainMessages').animate({scrollTop: $('.mainMessages')[0].scrollHeight}, 'fast');
    })
    .fail(function() {
        alert('文字を入力してください');
    })
    .always(() => {
      $(".form__submit").removeAttr("disabled");
    });
  })
});
