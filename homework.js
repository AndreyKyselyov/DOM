/**
 * Обработчик клика по ссылке с классом 'popup-link'
 * @param {HTMLElement} el контейнер в котором будем искать ссылки (по умолчанию body) 
 * @param {HTMLElement} tag tag который нам нужен в этом контейнере 
 * @param {Attribute} clName class елемента
 * @param {Function} funTo обработчик 
 * @private
 */

 function _onMouseClick(el,tag,clName,funTo)
 {
   var b = [];  el = el || document.body;
 try { var a = el.getElementsByTagName(tag); }   catch(ex) { return[]; }
    for( var i=0; i < a.length; i++ )
     if( !clName || a[i].className == clName )
      {
        b.push(a[i]);
        if( funTo ) funTo( a[i] );
      }
   return b;
 }

   _onMouseClick( 0, "a", "popup-link", function(el) {
    el.onclick = function(e) { openPopupFromLink(el); return false; };
     });

     
/**
 * Обработчик события
 * Добавляем событие елементу
 * @param {HTMLElement} el елемент которому добавляем событие
 * @param {Event} ev событие которое нужно привязать
 * @param {Function} fun обработчик для данного события
 */
 function elEvent( el, ev, fun )
  {
      if( el.addEventListener )    el.addEventListener( ev, fun, false );
      else  if( el.attachEvent )   el.attachEvent     ( "on" + ev, fun);
      else  el['on' + ev] = fun;
  }
  
  
/**
 * Получает данные из ссылки
 * на основе этих данных создаёт попап (через createPopup) и добавляет его в DOM
 * @param {HTMLElement} link Ссылка с data-аттрибутами
 */
function openPopupFromLink(link) {
    var title = link.dataset.title;
    var message = link.dataset.message;
    
	   var change = '%s';
       var newmessage = message.replace(change,link.href,'g');
       
    var popup = createPopup(title, newmessage);
	_onMouseClick( popup, "input", "", function(el)
	{
 	   elEvent( el, "click", function(e) { onOk(el,link.href); });
	});
	
    var c_width = document.body.clientWidth;
    popup.style.left = c_width/2 - 190 +'px';
    
    var lock = document.getElementById('lock');
    lock.style.display = 'block';    
}

/**
 * Создаёт DOM-узел с сообщением
 * @param {String} title Заголовок сообщение
 * @param {String} message Текст сообщения сообщение
 * @returns {HTMLElement}
 */
function createPopup(title, message) {
    
  var content = document.createElement('div');
      content.className = "message";   

  content.innerHTML = ' \
                            <h1>' + title + '</h1> \
                            <div class="desc">' + message + '</div> \
                            <input  class="no" type="button" value="Нет"> \
                            <input  class="ok" type="button" value="Да"> \
                       ';
  return document.body.appendChild(content);  
}

/**
 * Обработчик клика (да или нет)
 * @param {HTMLElement} el input
 * @param {HTMLElement} link сылка для перехода 
 */ 
function onOk(el,link){
    
	 document.body.removeChild( el.parentNode ); 
     lock.style.display = 'none';

    if (el.value == 'Да'){
      window.location.assign(link);  
    }
}
