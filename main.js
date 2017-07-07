if(localStorage.getItem('username') === null){
  $('.login').show();
  $('.task_manager').hide();
} else {
  $('.login').hide();
  $('.task_manager').show();
}

$('#l_f_login').click(function(){
  localStorage.setItem('username',$('#l_f_username').val());
  window.location.reload(false); 
})

function sortList(param){
  var mylist = $('#current_tasks #tasks_list');
  var listitems = mylist.children('div').get().reverse();
  listitems.sort(function(a, b) {
     return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
  });
  $.each(listitems, function(index, item) {
     mylist.append(item); 
  });
  mylist.children().each(function(i,div){mylist.prepend(div)})
}

var list = $('#current_tasks #tasks_list'),
    list_completed = $('#done_tasks #tasks_list'),
    tasks = '',
    username = localStorage.getItem('username')

    list.append(localStorage.getItem(username+'_tasks'));
    list_completed.append(localStorage.getItem(username+'_tasks'));
    sortList();

$('#b_submit').click(function(){
  var newTask  = $('#i_task').val(),
    newItem = '<div class="task_item normal_task"><span class="tsk_text">' + newTask + '</span><span class="edit">edit</span></div>'; 
  list.append(newItem);
  tasks = list.html();
  localStorage.setItem(username+'_tasks',tasks);

  $('#i_task').val('');
  sortList();
})

$('body').on('click', '.edit', function (event){
  event.stopPropagation();
  var eval = $(this).parent().find('.tsk_text').html();
  $('.edit_task_form').fadeIn();
  $('#e_task').val(eval);
  localStorage.setItem('toReplace',$(this).parent().html());
})

$('#be_submit').click(function(){
  $('.edit_task_form').fadeOut();
  var edits = $('#e_task').val();
  var toReplace = localStorage.getItem('toReplace');
  $('#current_tasks #tasks_list .task_item').filter(function() {
    return $(this).html() == toReplace;
  }).html(edits+ '</span><span class="edit">edit</span></div>');
  tasks = list.html();        
  localStorage.setItem(username+'_tasks',tasks);
  sortList();
})

$('body').on('click', '.task_item', function (){
  if ($(this).hasClass('completed')){
      $(this).remove();
      tasks = list_completed.html();      
      localStorage.setItem(username+'_tasks',tasks);
  } else {
      $(this).addClass('completed');
      $(this).removeClass('normal_task');
      tasks = list.html();        
      localStorage.setItem(username+'_tasks',tasks);
      $('#done_tasks #tasks_list').html('');
      list_completed.append(localStorage.getItem(username+'_tasks'));
  }
  sortList();
})



$('#logout').click(function(){
  localStorage.removeItem('username');
  window.location.reload(false); 
})