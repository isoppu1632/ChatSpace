$(function(){
  function scrollToNewest(){
    $('.mainMessages').animate({scrollTop: $('.mainMessages')[0].scrollHeight}, 'fast');
  }


  function buildHTML(message){
    var image = message.image == null ? "" : message.image
    var html = `<div class="mainMessages__box">
                  <div class="mainMessages__box__list" data-id="${message.id}">
                    <div class="mainMessages__box__list__userName">
                      ${message.name}
                    </div>
                    <div class="mainMessages__box__list__createdAt">
                      ${message.time}
                    </div>
                    <div class="mainMessages__box__list__text">
                      <p class="mainMessages__box__list__text__content">
                        ${message.body}
                      </p>
                      <img class="mainMessages__box__list__text__image" src="${image}">
                    </div>
                  </div>
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
      $('#new_message')[0].reset()
      scrollToNewest();
    })
    .fail(function() {
        alert('文字を入力してください');
    })
    .always(() => {
      $(".form__submit").removeAttr("disabled");
    })
  });

  $(function(){
    var id = $('.mainMessages__box__list:last-child').data('id');
    var interval = setInterval(function(){
    var insertHTML = '';
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      $.ajax({
        url: location.href,
        dataType: 'json',
      })
      .done(function(data){
        data.forEach(function(message){
        if (message.id > id) {
            insertHTML += buildHTML(message);
          }
        });
        $('.mainMessages').append(insertHTML);
        scrollToNewest();
      })
      .fail(function(data){
        alert('自動更新できません。更新するにはページを再度読み込んでください。');
      });
    } else {
      clearInterval(interval);
    }
    id = $('.mainMessages__list:last-child').data('id');
    }, 5000);
  });
});
