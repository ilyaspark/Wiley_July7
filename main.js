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


var list = $('#current_tasks #tasks_list'),
    list_completed = $('#done_tasks #tasks_list'),
    tasks = '',
    username = localStorage.getItem('username')

    list.append(localStorage.getItem(username+'_tasks'));
    list_completed.append(localStorage.getItem(username+'_tasks'));

$('#b_submit').click(function(){
  var newTask  = $('#i_task').val(),
    newItem = '<div class="task_item normal_task">' + newTask + '</div>'; 
  list.append(newItem);
  tasks = list.html();
  localStorage.setItem(username+'_tasks',tasks);

  $('#i_task').val('');
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
})


$('#logout').click(function(){
  localStorage.removeItem('username');
  window.location.reload(false); 
})



