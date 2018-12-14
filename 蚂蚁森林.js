function unlock() {
    if (!device.isScreenOn()) {
        device.wakeUp();
       // sleep(1000);
        //swipe(540, 1600, 540, 400, 300);
        //sleep(4000);
        //gesture(1000, [540, 1425], [540, 1680], [800, 1425], [800, 1680]);
       // sleep(300);
        home();
    }
}

function mainpage() {
    app.startActivity({        
        action: "VIEW",
        data: "alipays://platformapi/startapp?appId=60000002"    
    });
    sleep(1000);
}

function myself() {//自己能量
	//打开蚂蚁森林
    if (!textContains("我的大树养成记录").exists() ) mainpage();
    //关闭可能的对话框
	if (idEndsWith("J_pop_treedialog_close").exists()) idEndsWith("J_pop_treedialog_close").findOne().click();
    sleep(100);
    collect();//收集能量
    sleep(1000);
}

function collect() {//查找能量球

/*if (descEndsWith("克").exists()) {
          
        descEndsWith("克").find().forEach(function(object) {
            click(object.bounds().centerX(), object.bounds().centerY());
            sleep(500);
        });}*/
    
 idMatches("J_barrier_free").findOne(6000).children().forEach(function(child){
           sleep(100);
           if(child.clickable())
           click(child.bounds().centerX(),child.bounds().centerY());
           sleep(500);
      });     
    sleep(1000);
}

function friendslist() {
    if (!textContains("好友排行榜").exists()) {
        if (!textContains("蚂蚁森林").exists() || !descContains("返回").exists()) mainpage();
    }
    while (true) {//查看更多好友
        if (descEndsWith("查看更多好友").exists()) {
            if (descEndsWith("查看更多好友").findOne().bounds().centerY() < device.height) {
                bs = descEndsWith("查看更多好友").findOne().bounds();
                click(bs.centerX(), bs.centerY());//进入排行榜
                break;//查找完毕
            }
        }
        scrollDown();//下拉
		sleep(1000);
    }
}
function gofriend(){
    
    descEndsWith("g").depth(6).find().forEach(function(collectable) {//每个好友
        
            if (collectable.bounds().centerY() < device.height-30) {
             
              a=descMatches("\\d+’");//#fff99137
             if (collectable.parent().find(a).size()<1) {
            
                var p = findColor(captureScreen(), "#ff1da06d", {
                    region: [collectable.bounds().right, collectable.bounds().top - 30, 30, 30],
                    threshold: 4
                });//绿色小手
               var q = findColor(captureScreen(), "#fff99137", {
                    region: [collectable.bounds().right, collectable.bounds().top - 30, 30, 30],
                    threshold: 4
                });//橙色爱心
                
                if(p){//偷
                   // press(p.x+10, p.y+10, 80);
                    click(p.x + 10, p.y + 10);//进入好友能量
                    sleep(1000);
                    collect();//收集能量球
                    back();
                    sleep(1000);
                }
                if(q){//帮
                   // press(p.x+10, p.y+10, 80);
                    click(q.x + 10, q.y + 10);//进入好友能量
                    sleep(1000);
                    collect();//收集能量球
                    back();
                    sleep(1000);
                }
           }//<1
            }//g
        });//each
    
    }//function

function steal() {
	ii=0
    friendslist();////进入排行榜
    //sleep(1000);
    while (true) {
        
        //swipe(500,1500,500,300,50);
        
        gofriend();
        scrollDown();//下拉
        if (descEndsWith("关闭").exists()&&descEndsWith("没有更多了").exists())
        { descEndsWith("关闭").findOne().click();	
           break;
        }
        
        sleep(1000);
    
    }
    
}

auto();
requestScreenCapture();
unlock();
var i = 0;
while (i < 30) {
    sleep(5000);
    myself();
    steal();
    i++;
}
