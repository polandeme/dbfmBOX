// 文字跟随鼠标动 or 文字不动
(function() {
  $('body').append("<canvas id='canvasId'></canvas>");

  var canvas = document.getElementById("canvasId");

  var ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.lineWidth = .3;
  var s = true;
  var a_point = [];
  var c_point = [];
  var t_pos = [];
  var cp_index = null;
  for(var i = 0; i < 120; i++) {
    var a = {
              x: canvas.width * Math.random(),
              vx: ran().vx,
              y: canvas.height * Math.random(),
              vy: ran().vy
            };
    a_point.push(a);
    c_point.push(a);

  }


  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(var i = 0; i < a_point.length; i++) {
      ctx.beginPath();
      ctx.fillStyle = '#B6B6B6';
      ctx.strokeStyle = '#eee';
      ctx.lineWidth = 10;
      if(i === cp_index) {
        ctx.fillStyle = '#B6B6B6'; //#828d8d
        ctx.strokeStyle = '#eee';
        ctx.lineWidth = 12;
        ctx.arc(a_point[cp_index].x, a_point[cp_index].y ,3, 0, 2*Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        w_words(a_point[cp_index].x, a_point[cp_index].y);
      } else {
        var x = a_point[i].x;
        var y = a_point[i].y;
        c_point[i].x = x;
        c_point[i].y = y;
        ctx.arc(x, y ,3, 0, 2*Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath(); 
      }

    }
  }

  function reDraw(p) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(var i = 0; i < a_point.length; i++) {
      ctx.beginPath();
      ctx.fillStyle = '#B6B6B6';
      var x = c_point[i].x;
      var y = c_point[i].y;
      ctx.arc(x, y ,13, 0, 2*Math.PI);
      ctx.fill();

      if(p && ctx.isPointInPath(p.x, p.y)) {
          cp_index = i;
         /* ctx.fillStyle = 'blue';   
          ctx.beginPath(); 
          ctx.arc(c_point[cp_index].x, c_point[cp_index].y ,15, 0, 2*Math.PI);
          ctx.fill();  */
          t_pos[0] = p;
      }else if( p &&t_pos[0] && ((p.x - t_pos[0].x) > 6  || (p.x - t_pos[0].x) < -6)  ){
        t_pos[0] = p;
        window.cancelAnimationFrame(reId); 
        reId = requestAnimationFrame(moveTo);
        cp_index = null;
        connect(); 
      }
    }
  }

  function connect() {

    for(var i = 0; i < 100; i++) {
      for(var j = 0; j< 100; j++) {
        if((a_point[i].x - a_point[j].x < 100) && (a_point[i].y - a_point[j].y < 100) && (a_point[i].y - a_point[j].y > -100) && (a_point[i].x - a_point[j].x > -100)) {
          ctx.beginPath();
          ctx.strokeStyle = 'gray';
          ctx.lineWidth = .2;
          ctx.moveTo(a_point[i].x, a_point[i].y);
          ctx.lineTo(a_point[j].x, a_point[j].y);
          ctx.stroke();
        }
        
      }
    }
  }

  function moveTo() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(var i = 0; i < a_point.length; i++) {
      if(i === cp_index) {
        // console.log(cp_index);
        a_point[cp_index].x = a_point[cp_index].x;
        a_point[cp_index].y = a_point[cp_index].y;
      }else {

        a_point[i].x +=  a_point[i].vx;
        a_point[i].y +=  a_point[i].vy;        
      }
    }
    draw();
    check();
    connect();
    reId = requestAnimationFrame(moveTo); 
  }
  
  function ran() {
    var f1 = Math.round(Math.random());
    var f2 = Math.round(Math.random());
    var x = -.5 + Math.random();
    var y = -.5 + Math.random(); 
    return {
      vx : x, 
      vy : y 
    }
  }

  function check() {
    for(var i = 0; i < c_point.length; i++) {

      if(c_point[i].x > window.innerWidth || c_point[i].x < 0  )
      {
        a_point[i].vx = -a_point[i].vx;
        a_point[i].vy = a_point[i].vy;  
      } else if(c_point[i].y > canvas.height || c_point[i].y < 0) {
        a_point[i].vx = a_point[i].vx;
        a_point[i].vy = -a_point[i].vy;  
      }
    }
    
  }

  // bind event 
  $("#canvasId").on({
    mousemove: function(e) {
      var p = getEventPosition(e);
        var ts = reDraw(p);
        connect();
      },
      mousemleave: function(e) {
        // console.log('out');
      var p = getEventPosition(e);
        var ts = reDraw(p);
        connect();
      }
  })

  function getEventPosition(e) {
    var e = e || window.event;
    var x, y;
    if(e.layerX || e.layerX == 0) {
      x = e.layerX;
      y = e.layerY;
    } else if(e.offsetX || e.offsetY == 0) {
      x = e.offsetX;
      y = e.offsetY;
    }
    return {
      x : x,
      y : y,
    }
  }

  // write words 
  function w_words(x, y, data) {
    var lData = localStorage.getItem('data').split('<br />');
    var data = data ? data.data : lData;
    console.log(lData);
    var i = Math.round(Math.random() * data.length);
    ctx.fillStyle = 'blue';
    ctx.fillText(data[cp_index % data.length], x + 5, y - 5);
  }

// draw();
requestAnimationFrame(moveTo); 

/*$.ajax({
  async:false,
  url: 'data.json',
  type: 'get',
  dataType: 'json',
  success: function(data) {
    console.log(data);
    window.localStorage.setItem('data', data.data)
  }, 
  error: function(error) {
    console.log(error);
  }
});*/

$('body').css(
  'background', "url(" + canvas.toDataURL() + ")"
  );
$('body').on('click', '.clearCanvas', function() {
        window.cancelAnimationFrame(reId); 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    $("#fm-channel-list").css('z-index', 0);
});

})();