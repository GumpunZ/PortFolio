
$("#txtsearch").on("keyup", function () {
    var filterValue = document.getElementById("txtsearch").value.toLowerCase();
    var rows = document.getElementById("DataIssue").getElementsByTagName("tr");
    if (filterValue == "") {
      for (var i = 1; i < rows.length; i++) {
        var row = rows[i];
        var cells = row.getElementsByTagName("td");
        var shouldShowRow = false;
        for (var j = 0; j < cells.length; j++) {
          var cell = cells[j];

          shouldShowRow = true;
          break;

        }
        row.style.display = shouldShowRow ? "" : "none";
      }
    } else {
      for (var i = 1; i < rows.length; i++) {
        var row = rows[i];
        var cells = row.getElementsByTagName("td");
        var shouldShowRow = false;
        for (var j = 0; j < cells.length; j++) {
          var cell = cells[j];
          if (cell.innerHTML.toLowerCase().indexOf(filterValue) > -1) {
            shouldShowRow = true;
            break;
          }
        }
        row.style.display = shouldShowRow ? "" : "none";
      }
    }
    
  });

  function getdata(id){
      var rows = document.getElementById("DataIssue").getElementsByTagName("tr");
      
      for (var i = 1; i < rows.length; i++) {
          var row = rows[i];
        var cells = row.getElementsByTagName("td");
        for (var j = 0; j < cells.length; j++) {
          var cellid = cells[1].innerText;
          if (cellid.trimStart().trimEnd() == id){
             var des = cells[3].innerText;
             var name = cells[2].innerText;
             var Baseunit = cells[4].innerText;
               document.getElementById("Id").value = id
               document.getElementById("PRD_id").value = id
               document.getElementById("des").value = des;
               document.getElementById("PRD_name").value = name;
               document.getElementById("Baseunit").value = Baseunit;
               const deep = document.getElementById("Tblinn");
                const ntbl = document.createElement("table")
                ntbl.setAttribute("id","Datapic")
               ntbl.setAttribute("class","table table-striped")
               ntbl.innerHTML= '<thead> <th scope="col">Filename</th><th scope="col">เปลี่ยนชื่อ</th><th scope="col">ลบไฟล์</th></thead>';
               var path = "../../img/"+id;
               $.post("detailmodal.php",{Prd_id:id}, function(data){
                const obj = JSON.parse(data);
                 var paths = "'"+ path +"'"
                 for (let key in obj) {
                    if (obj.hasOwnProperty(key)) {
                      const value = obj[key];
                      var filename = "'"+value+"'"
                      ntbl.innerHTML +='<tr><td>'+ value +'</td><td> <a id="ch'+ value +'"style="" class="btn btn-secondary "onclick="beforerename('+ filename +','+ paths +')">เปลี่ยนชื่อ</a><a id="cf'+ value +'" style="display: none;" class="btn btn-success " onclick="rename('+ filename +','+ paths +')">ยืนยัน</a> </td><td><a class="btn btn-danger "onclick="delfile('+ filename +','+ paths +')" >ลบไฟล์</a></td></tr>';     
                    }
                  }
              });
            deep.appendChild(ntbl)
                break;
            }
          
        }

      }      
  } 
  function SaveCMD(CurACtion){
      switch(CurACtion) {
          case 'UPDATE':
              const id = document.getElementById("Id").value;
              const des =document.getElementById("des").value;
              const PRD_name= document.getElementById("PRD_name").value ;
              const Baseunit= document.getElementById("Baseunit").value ;
              if(des!="" || PRD_name!=""|| Baseunit!=""){
                  var xmlhttp=new XMLHttpRequest();
                  xmlhttp.onreadystatechange=function() {
                      if (this.readyState==4 && this.status==200) {
                          if(this.responseText == "TRUE"){
                              document.getElementById("alertjs").innerHTML = "บันทึกรายการสำเร็จ";
                              document.getElementById("alertjs").style.color = "green";
                             
                          }else{
                              document.getElementById("alertjs").innerHTML = this.responseText;
                              document.getElementById("alertjs").style.color = "red";
                              alert(this.responseText);
                          }
                      
                      }
                  }
                  xmlhttp.open("GET","updatedataIssue.php?mode="+CurACtion+"&Id="+id+"&des="+des+"&PRD_name="+PRD_name+"&Baseunit="+Baseunit,true);
                  xmlhttp.send();
                  
              }else{
                  document.getElementById("alertjs").innerHTML = "ระบบปฎิเสธการบันทึกเนื่องจากมีข้อมูลเป็นค่าว่าง";
                  document.getElementById("alertjs").style.color = "red";
              }
          break;               
          case 'Insert':
              const desimm =document.getElementById("desimm").value;
              const idimm =document.getElementById("idimm").value;
              const PRD_nameimm= document.getElementById("PRD_nameimm").value ;
              const Baseunitimm= document.getElementById("Baseunitimm").value ;
             if(idimm=="" || idimm.length < 10){
                document.getElementById("alertjs2").innerHTML = "ระบบปฎิเสธการบันทึกเนื่องจากมีข้อมูลเป็นค่าว่าง หรือ มีจำนวนตัวอักษรน้อยกว่า 10 ตัวอักษร";
                document.getElementById("alertjs2").style.color = "red";

             }else{
                document.getElementById("alertjs2").innerHTML="";
              if(desimm!=""|| PRD_nameimm!=""|| Baseunitimm!=""){
                  var xmlhttp=new XMLHttpRequest();
                  xmlhttp.onreadystatechange=function() {
                      if (this.readyState==4 && this.status==200) {
                          if(this.responseText == "TRUE"){
                              document.getElementById("alertjs2").innerHTML = "บันทึกรายการสำเร็จ";
                              document.getElementById("alertjs2").style.color = "green";
                              document.getElementById("Id2").value = idimm;
                              $('#submit').click();

                          }else{
                              document.getElementById("alertjs2").innerHTML = this.responseText;
                              document.getElementById("alertjs2").style.color = "red";
                          }
                      
                      }
                  }
                  xmlhttp.open("GET","updatedataIssue.php?mode="+CurACtion+"&Id="+idimm+"&des="+desimm+"&PRD_name="+PRD_nameimm+"&Baseunit="+Baseunitimm,true);
                  xmlhttp.send();
              }else{
                  document.getElementById("alertjs2").innerHTML = "ระบบปฎิเสธการบันทึกเนื่องจากมีข้อมูลเป็นค่าว่าง";
                  document.getElementById("alertjs2").style.color = "red";
              }

             }
              
          break;
          default: alert("ระบบมีปัญหากรุณาติดต่อ แผนก IT") 
      }
  }
  function closemodal(){
 
      location.reload();
  }
function formatdate(date){
  var newdate = date.split("-");
  var newformat = newdate[2]+"-"+newdate[1]+"-"+newdate[0];
  return newformat
}
function etdata(id,type,table,pk,id_pk){
  //confirm('คุณต้องการลบข้อมูลหรือไม่')
  var xmlhttp=new XMLHttpRequest();
  xmlhttp.onreadystatechange=function() {
      if (this.readyState==4 && this.status==200) {
          if(this.responseText == "TRUE"){
              alert("บันทึกรายการสำเร็จ");
              closemodal()

          }else{
              alert(this.responseText);
              closemodal()
          }
      }

  }
  xmlhttp.open("GET","etdata.php?mode="+type+"&Id="+id+"&table="+table+"&pk="+pk+"&id_pk="+id_pk,true);
  xmlhttp.send();


}

function getdatas(id,pass){
  var rows = document.getElementById("DataIssue").getElementsByTagName("tr");
  for (var i = 1; i < rows.length; i++) {
      var row = rows[i];
    var cells = row.getElementsByTagName("td");
    for (var j = 0; j < cells.length; j++) {
      var cellid = cells[1].innerText;
      if (cellid.trimStart().trimEnd() == id){
          document.getElementById("Id").value = id;
          document.getElementById("UserID").value = cells[2].innerText;
          document.getElementById("Password").value = cells[3].innerText;
   document.getElementById("unhidePassword").value = pass;
          document.getElementById("UserName").value = cells[4].innerText;
          var Status_Id = cells[5].innerText
          var selected = document.getElementById("Status_Id");  
          if(Status_Id == "NO ACTIVE"){
              selected.value = '0';
          }else{
              selected.value = '1';
          }
          var Status_Permission = cells[6].innerText
          var selected2 = document.getElementById("Status_Permission");  
          if(Status_Permission == "Eligible"){
              selected2.value = '1';
          }else{
              selected2.value = '0';
          }
          var Status_Permission = cells[7].innerText
          var selected3 = document.getElementById("outofmanage");  
          if(Status_Permission == "มีสิทธ์เข้าถึงการจัดการ"){
              selected3.value = '0';
          }else{
              selected3.value = '1';
          }
      }
    }
  }      
} 
$("#seepass").on("click", function () {
document.getElementById("hidepass").style.display = null;
document.getElementById("seepass").style.display = 'none';
document.getElementById("unhidePassword").style.display = null;
document.getElementById("Password").style.display = 'none';
});
$("#hidepass").on("click", function () {
 document.getElementById("hidepass").style.display = 'none';
document.getElementById("seepass").style.display = null;
document.getElementById("unhidePassword").style.display = 'none';
document.getElementById("Password").style.display = null;
});

function SaveCMD_P(CurACtion){
  switch(CurACtion) {
      case 'UPDATE':
  var id = document.getElementById("Id").value;
  var user_id = document.getElementById("UserID").value;
  var Password = document.getElementById("unhidePassword").value;
  var user_name = document.getElementById("UserName").value;
  var stautslogin = document.getElementById("Status_Id").value;
  var stauts_P = document.getElementById("Status_Permission").value;
          var outofmanage = document.getElementById("outofmanage").value;
     $.post("UpdateCmddata.php",{id:id,user_id:user_id,Password:Password,user_name:user_name,stautslogin:stautslogin,status_manage:stauts_P,status_viewonly:outofmanage}, function(data){
                 if (data =="True"){
                      document.getElementById("alertjs").innerHTML = "บันทึกรายการสำเร็จ";
                      document.getElementById("alertjs").style.color = "Green";
                 }else{
                      document.getElementById("alertjs").innerHTML = "ระบบปฏิเสธการบันทึก";
                      document.getElementById("alertjs").style.color = "Red";
                 }
     });
      break;               
      case 'Insert':			
  var user_idimm =  document.getElementById("UserIDimm").value;
  var Passwordimm = document.getElementById("Passwordimm").value;
  var user_nameimm = document.getElementById("UserNameimm").value;
  var stauts_Pimm = document.getElementById("Status_Permissionimm").value;
 var outofmanageimm = document.getElementById("outofmanageimm").value;
          if(user_idimm !="" && Passwordimm!="" && user_nameimm != ""){
              $.post("AddCmddata.php",{user_id:user_idimm,Password:Passwordimm,user_name:user_nameimm,stauts_Pimm:stauts_Pimm,status_viewonly:outofmanageimm}, function(data){			
              if (data =="True"){
                  document.getElementById("alertjs2").innerHTML = "บันทึกรายการสำเร็จ";
                      document.getElementById("alertjs2").style.color = "Green";
              }else{
                  document.getElementById("alertjs2").innerHTML = data;
                  document.getElementById("alertjs2").style.color = "Red";
              }	      
     });
          }else{
              document.getElementById("alertjs2").innerHTML = "ระบบปฏิเสธการบันทึก";
              document.getElementById("alertjs2").style.color = "Red";
          }
     
      break;
      default: alert("ระบบมีปัญหากรุณาติดต่อ แผนก IT")  
  }
}
$("#remame").on("click", function () {
    var id = document.getElementById("remame").value+".jpg";
    var rows = document.getElementById("Datapic").getElementsByTagName("tr");
    for (var i = 1; i < rows.length; i++) {
        var row = rows[i];
        var cells = row.getElementsByTagName("td");
        for (var j = 0; j < cells.length; j++) {
            var cell = cells[0];
            if(cell.innerText !== id){
              document.getElementById("ch"+cell.innerText).style.display= null;
              document.getElementById("cf"+cell.innerText).style.display = 'none';
                document.getElementById("ch"+cell.innerText).style.pointerEvents = 'none';
            }else{
                document.getElementById("ch"+cell.innerText).style.display= 'none';
              document.getElementById("cf"+cell.innerText).style.display = null;
            }
            break;
        }
    }
});
function delfile(filename,path){
  var xmlhttp=new XMLHttpRequest();
                  xmlhttp.onreadystatechange=function() {
                      if (this.readyState==4 && this.status==200) {
                          if(this.responseText == "True"){
                              alert("บันทึกรายการสำเร็จ");
                              location.reload();
                          }else{
                              alert(this.responseText);
                          }
                      
                      }
                  }
                  xmlhttp.open("GET","deldata_u.php?id="+filename+"&path="+path,true);
                  xmlhttp.send();
}
function beforerename(id){
    document.getElementById("remame").style.display = null
    document.getElementById("remame").value = id.slice(0, -4);
  
  }
function rename(filename,path){
  var newname = document.getElementById("remame").value ;
  if(newname !== ""){
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function() {
        if (this.readyState==4 && this.status==200) {
            var rows = document.getElementById("Datapic").getElementsByTagName("tr");
                for (var i = 1; i < rows.length; i++) {
                    var row = rows[i];
                    var cells = row.getElementsByTagName("td");
                    for (var j = 0; j < cells.length; j++) {
                        var cell = cells[0];
                        document.getElementById("ch"+cell.innerText).style.display= null;
                        document.getElementById("cf"+cell.innerText).style.display= 'none';
                        document.getElementById("ch"+cell.innerText).style.pointerEvents = '';
                        break;
                    }
                }
                document.getElementById("alertjs").innerHTML = "บันทึกรายการสำเร็จ";
                document.getElementById("alertjs").style.color = "green";
                getdata(id);
        }
    }
    xmlhttp.open("GET","rename.php?id="+filename+"&path="+path+"&newname="+newname,true);
    xmlhttp.send();

  }else{
    document.getElementById("alertjs").innerHTML = "ชื่อรูปภาพไม่สามารถเป็นค่าว่างได้";
    document.getElementById("alertjs").style.color = "red";
}
 
}

$('#Authentication').on("click", function () {
    $.post('raAH.php',function(data){
        alert(data);
    })
});
$('#seeAuthentication').on("click", function () {
    $.post('seeAH.php',function(data){
        alert(data);
    })
});
