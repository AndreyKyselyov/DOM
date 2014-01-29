/**
 * Обработчик клика по ссылке с классом 'popup-link'
 * @param {Event} e событие клика
 * @private
 */
function _onMouseClick(e, el) {
     if (!e) e = window.event;
     if (e.type == 'click'){
        openPopupFromLink(el);  
     }
}

/**
 * Получает данные из ссылки
 * на основе этих данных создаёт попап (через createPopup) и добавляет его в DOM
 * @param {HTMLElement} link Ссылка с data-аттрибутами
 */
function openPopupFromLink(link) {
    title = link.getAttribute('data-title');
    message = link.getAttribute('data-message');
    inlink = link.getAttribute('href');
    
       var change = '%s';
       var newmessage = message.replace(change,inlink,'g');
       message = newmessage; 
       
    creat = createPopup(title, message,onOk);
     document.body.appendChild(creat);    
     
    c_width = document.body.clientWidth;
    mas_con = document.getElementById('massage');
    mas_con.style.left = c_width/2 - 190 +'px';
    
    lock = document.getElementById('lock');
    lock.style.display = 'block';
}

/**
 * Создаёт DOM-узел с сообщением
 * @param {String} title Заголовок сообщение
 * @param {String} message Текст сообщения сообщение
 * @param {Function} onOk Обработчик клика по кнопке 'Да'
 * @returns {HTMLElement}
 */
function createPopup(title, message, fun) {
    
  var content = document.createElement('div');
 //    document.body.appendChild(content);    

  content.innerHTML = '<div class="message" id="massage"> \
                            <h1>' + title + '</h1> \
                            <div class="desc">' + message + '</div> \
                            <input onclick="' + fun.name + '(this.value)" class="no" type="button" value="Нет"> \
                            <input onclick="' + fun.name + '(this.value)" class="ok" type="button" value="Да"> \
                       </div>';
  return content.firstChild;
}

function onOk(val){
    if (val == 'Да'){
      document.body.removeChild(creat);
      lock.style.display = 'none'; 
      window.location.assign(inlink);  
    } else {
      document.body.removeChild(creat);
      lock.style.display = 'none';  
    }
}
