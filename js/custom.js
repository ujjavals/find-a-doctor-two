var valid_extensions = /(.pdf|.docx|.doc)$/i;
var num =/^\d+$/;
var feed_city_pattern = /^[A-Za-z ]{3,80}$/;
var feed_city_patternd = /^[A-Za-z. ]{3,80}$/;
var mobile_pattern =/^\d{4,10}$/;
var regdate = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d+$/;
var url =/^([w*3]+(\.[a-zA-Z0-9]+)+.*)$/;
var mobileline  = /^(\+)?([0-9]{1,4})?\d{8,12}$/;
var landline  = /^(\+)?([0-9]{1,4})?([ ]{1,1})?(\-{0,1})?\d{8,12}$/;

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
		var error = 0;
		var nam = document.getElementById('user_name'); 
		var emailId = document.getElementById('user_email'); 
		var phone = document.getElementById('user_mobilenumber');
		
		if ((nam.value == "Enter name")||(nam.value == "")){
			alert("Please Enter Your Name");
			nam.focus();
			error =1;
			return;
		}
		
		//Email id
	
		   if((emailId.value == "Enter email") || (emailId.value == "")){
				alert("Enter Your Email Address");
				emailId.focus();
				error =1;
				return;
			}else{
			if(!isValidEmail(emailId.value))
			{
				alert("Enter Valid Email Address");
				emailId.focus();
				error =1;
				return;
			}
			}
			
		//Phone Number
		if (!ValidPhone(phone.value))
		{
			phone.focus();
			error =1;
			return;
		}	
		
		
		if(error ==0){
		
				
				
				
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
		

}



function isValidEmail(e)
{
    
    var exp=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
    result = exp.test(e);
    if (result)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function ValidPhone(phone)
{
    var reg_mobile= /^(\+)?([0-9]{8,15})?\d{8,15}$/;
    var valid = "0123456789";
    if((phone=="") || (phone<=0))
    {
        alert ("Please Enter Mobile Number")
        return false
    }    
    else if(!reg_mobile.test(phone))
    {
        alert("Invalid Mobile Number Length! Please Try Again.")
        return false
    }
        
    return true
}

//Number Validation
function valid1(f) {
   // !(/^[ÃƒÂ±0-9( )+\/#-]*$/i).test(f.value)?f.value = f.value.replace(/[^ÃƒÂ±0-9( )+#\/-]/ig,''):null;
    !(/^[ÃƒÂ0-9]*$/i).test(f.value)?f.value = f.value.replace(/[^ÃƒÂ0-9]/ig,''):null;
}

function valid88(f) {
   // !(/^[ÃƒÂ±0-9( )+\/#-]*$/i).test(f.value)?f.value = f.value.replace(/[^ÃƒÂ±0-9( )+#\/-]/ig,''):null;
    !(/^[ÃƒÂ0-9+-]*$/i).test(f.value)?f.value = f.value.replace(/[^ÃƒÂ0-9]/ig,''):null;
}
function valid77(f) {
   // !(/^[ÃƒÂ±0-9( )+\/#-]*$/i).test(f.value)?f.value = f.value.replace(/[^ÃƒÂ±0-9( )+#\/-]/ig,''):null;
    !(/^[ÃƒÂ0-9+]*$/i).test(f.value)?f.value = f.value.replace(/[^ÃƒÂ0-9]/ig,''):null;
}

function valid67(f) {
    !(/^[ÃƒÂ0-9+.]*$/i).test(f.value)?f.value = f.value.replace(/[^ÃƒÂ0-9]/ig,''):null;
}
function validc(f) {
	   !(/^[ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â±a-z( )+ÃƒÂ0-9+.]*$/i ).test(f.value)?f.value = f.value.replace(/[^ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â±a-z( )+ÃƒÂ0-9+.]/ig,''):null;
   // !(/^[ÃƒÂ0-9+.]*$/i).test(f.value)?f.value = f.value.replace(/[^ÃƒÂ0-9]/ig,''):null;
}
function valid2(f) {
    !(/^[ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â±a-z( )+\/#-]*$/i).test(f.value)?f.value = f.value.replace(/[^ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â±a-z( )+#\/-]/ig,''):null;
}
function valid3(f) {
    !(/^[ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â±a-z( )+\/-]*$/i).test(f.value)?f.value = f.value.replace(/[^ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â±a-z( )+\/-]/ig,''):null;
}
/*Name Validation*/
function valid4(f) {
    !(/^[ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â±a-z]*$/i ).test(f.value)?f.value = f.value.replace(/[^ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â±a-z]/ig,''):null;
}
/*website*/
function valid9(f) {
    !(/^[ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â±a-z+.+ÃƒÂ0-9]*$/i ).test(f.value)?f.value = f.value.replace(/[^ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â±a-z( )+.+ÃƒÂ0-9]/ig,''):null;
}

/*company validation*/
function valid5(f) {
    !(/^[ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â±a-z. ]*$/i).test(f.value)?f.value = f.value.replace(/[^ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â±a-z]/ig,''):null;
}

