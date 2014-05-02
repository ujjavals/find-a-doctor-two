$(document).ready(function(){
	
	
	
	
	
});

var doctor_value ="";
var qualification_value="";
var location_value ="";

function onload(){


		$.ajax({
				
				url: "http://fomax.us/Bangalore-doctor/location2.php",
				type: "POST",
				dataType: "json",
				success: function (res) {
					var index;
					for (index = 0; index < res.length; ++index) {
						$("#location").append("<option value='"+res[index]['location_name']+"'>"+res[index]['location_name']+"</option>");
					}	   
				
				},
				error: function(rtn){
					alert("error");
				}
			
			
			});
			
			
			
		$.ajax({
			url :	"http://fomax.us/Bangalore-doctor/specialitylist2.php" ,
			type : "POST",
			dataType : "json",
		
			success : function(res)
			{
				
				var index;
				for (index = 0; index < res.length; ++index) {
						$("#specilties").append("<option value='"+res[index]['speciality_name'] +"'>"+res[index]['speciality_name']+"</option>");
				}	   
				
				
				
			
			},
			error: function(rtn){
					alert("error");
			}
			
		});
		
		
			


} 


function submit(){
		$("#sceenone").css("display","none");
		$("#screen_two").css("display","block");
		var speciality =  $("#specilties").val();
		var location =   $("#location").val();
		$.ajax({
			url :	"http://fomax.us/Bangalore-doctor/Doctors_service2.php" ,
			type : "POST",
			dataType : "json",
			data: {
			"speciality": speciality,
			"location": location,
			},
			success : function(res)
			{
				
				 var index;
				for (index = 0; index < res.length; ++index) {
				
						//$("#specilties").append("<option>"+res[index]['doctor_name']+"</option>");
						/*  alert(res[index]['doctor_name']);
						alert(res[index]['location_name']);
						alert(res[index]['speciality']);  */
						//$("#list_style_doc").append("<li><div class='doctor_box'><div class='col-xs-2 doctor_icon'><\/div><div class='col-xs-8 col-sm-offset-1 doctor_contain'><h5>"+res[index]['doctor_name']+"<\/h5><p>"+res[index]['qualification']+"<\/p><div class='row show-grid'><div class='col-xs-4 doctor_icon_map'><\/div><div class='col-xs-10 addres_content'>"+res[index]['location_name']+"<\/div><div style='clear:both;'><\/div><\/div><div class='col-xs-2 get_appointment'><\/div><div style='clear:both;'><\/div><\/div><div style='clear:both;'><\/div><\/div><\/li>");
						$("#list_style_doc").append("<li><div class='doctor_box'><div class='col-xs-2 doctor_icon'><\/div><div class='col-xs-8 col-sm-offset-1 doctor_contain'><h5>"+res[index]['doctor_name']+"<\/h5><p>"+res[index]['qualification']+"<\/p><div class='row show-grid'><div class='col-xs-4 doctor_icon_map'><\/div><div class='col-xs-10 addres_content'>"+res[index]['location_name']+"<\/div><div style='clear:both;'><\/div><\/div><div class='col-xs-2 get_appointment'><input type='hidden' class='doctorname_value' value='"+res[index]['doctor_name']+"'><input type='hidden' class='qualification_value' value='"+res[index]['qualification']+"'><input type='hidden' class='location_value' value='"+res[index]['location_name']+"'><\/div><div style='clear:both;'><\/div><\/div><div style='clear:both;'><\/div><\/div><\/li>");
						
						
				
				
				}	
				$("body .get_appointment").click(function(){
						doctor_value = $(this).children('.doctorname_value').val();
						qualification_value = $(this).children('.qualification_value').val();
						location_value = $(this).children('.location_value').val();
						/* alert(doctor_value); */
						/*alert(qualification_value);
						alert(location_value); */
						$("#screen_two").css("display","none");
						$("#screen_three").css("display","block");
						
						
				});
				
			},
			error: function(rtn){
					//alert("error");
			}
			
		});
		
		
		
		return false;
}

function gohome(){
	$("#sceenone").css("display","block");
		$("#screen_two").css("display","none");
		$("#screen_three").css("display","none");

}

function appointmentsubmit(){
		
		/*qualification_value;
		location_value */
		var user_name =  $("#user_name").val();
		var user_email =   $("#user_email").val();
		var user_mobilenumber =   $("#user_mobilenumber").val();
		var user_comment =   $("#user_comment").val();
		$(".page_loading").css("display","block");
		
		$.ajax({
			url :	"http://fomax.us/Bangalore-doctor/Appointment2.php" ,
			type : "POST",
			dataType : "html",
			data: {
			"user": user_name,
			"emailid": user_email,
			"mobile": user_mobilenumber,
			"doctor_value": doctor_value,
			"qualification_value": qualification_value,
			"location_value": location_value,
			"purpose" : user_comment,
			},
			success : function(res)
			{
				
				if(res==1){
					$(".page_loading").css("display","none");
					alert("Appointment is completed successfully.");
					//$("#user_name").reset();
					 document.getElementById("user_name").value="";
					 document.getElementById("user_email").value="";
					 document.getElementById("user_mobilenumber").value="";
					 document.getElementById("user_comment").value="";
				
					 location.reload(); 
				}
				
				
				
			
			},
			error: function(rtn){
				//	alert("error");
			}
			
		});
		

}

