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
					//alert("error");
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
					//alert("error");
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
						$("#list_style_doc").append("<li><div class='doctor_box'><div class='col-xs-2 doctor_icon'><\/div><div class='col-xs-8 col-sm-offset-1 doctor_contain'><h5>"+res[index]['doctor_name']+"<\/h5><p>"+res[index]['qualification']+"<\/p><div class='row show-grid'><div class='col-xs-4 doctor_icon_map'><\/div><div class='col-xs-10 addres_content'>"+res[index]['location_name']+"<\/div><div style='clear:both;'><\/div><\/div><div class='col-xs-2 get_appointment'><\/div><div style='clear:both;'><\/div><\/div><div style='clear:both;'><\/div><\/div><\/li>");
				}	   
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

}

$(document).ready(function(){
	
	
});