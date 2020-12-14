// A $( document ).ready() block.
$( document ).ready(function() {

  for (i = 2020; i > 1940; i--) {
    $(".issue_year").append(new Option(i,i));
  }

  $( "#removeUni" ).click(function() {
    var n = $( ".university" ).length;

    if(n>1){
      $(".university").last().remove();
      $(".department").last().remove();
      $(".styled-select").last().remove();
    }
  });

  $( "#removeExp" ).click(function() {
    var n = $( ".company" ).length;

    if(n>1){
      $(".company").last().remove();
      $(".role").last().remove();
      $(".qty-buttons").last().remove();
    }
  });

  $( "#addUni" ).click(function() {
    $( '<input type="text" name="university" class="form-control university" placeholder="University">' ).appendTo( ".addUni" );
    $( '<input type="text" name="department" class="form-control department" placeholder="Department">' ).appendTo( ".addUni" );
  });


  $( "#addExp" ).click(function() {
    $( '<input type="text" name="company" class="form-control company" placeholder="Company">' ).appendTo( ".addExp" );
    $( '<input type="text" name="role" class="form-control role" placeholder="Role">' ).appendTo( ".addExp" );
    $( '<div class="qty-buttons"><input type="button" value="+" class="qtyplus" name="duration"><input type="text" name="duration" value="" class="qty form-control required" placeholder="Duration (Years)"><input type="button" value="-" class="qtyminus" name="duration"></div>' ).appendTo( ".addExp" );
  });

  $( "#addCert" ).click(function() {
    $( '<div class="col-md-12"><div class="form-group"><input type="text" name="certification" class="form-control required certification" placeholder="Certification" id="certification" required></div></div><div class="col-md-6"><div class="form-group"><input type="text" name="issue_organization" class="form-control required issue_organization" placeholder="Issue Organization" id="organization" required></div></div><div class="col-md-3"><div class="styled-select"><select class="required issue_year" name="issue_year" id="issue_year"></select></div></div><div class="col-md-3"><div class="form-group"><input type="text" name="issue_id" class="form-control required credential_id" placeholder="Credential ID" id="credential_id" required></div></div>' ).appendTo( ".addCert" );
    for (i = 2020; i > 1940; i--) {
      $(".issue_year").append(new Option(i,i));
    }
  });

  $( "#submit" ).click(function() {
    var first_name = $('#firstname').val();
    var last_name = $('#lastname').val();
    var email = $('#email').val();
    var phone = $('#phone').val();
    var gender = $('#gender').val();
    var age = $('#age').val();
    var nationality = $('#nationality').val();

    const genderCapitalized = gender.charAt(0).toUpperCase() + gender.slice(1)
    const nationalityCapitalized = nationality.charAt(0).toUpperCase() + nationality.slice(1)

    var city = $('#city').val();
    var region = $('#region').val();
    var address = $('#address').val();
    var zipcode = $('#zipcode').val();

    var workEthic = $('#ethic:checkbox:checked').length > 0;
    var motivation = $('#motivation:checkbox:checked').length > 0;
    var timemanage = $('#timemanage:checkbox:checked').length > 0;

    var creative = $('#creative:checkbox:checked').length > 0;
    var communication = $('#communication:checkbox:checked').length > 0;
    var adaptability = $('#adaptability:checkbox:checked').length > 0;

    var teamwork = $('#teamwork:checkbox:checked').length > 0;
    var problem = $('#problem:checkbox:checked').length > 0;
    var critical = $('#critical:checkbox:checked').length > 0;

    var country = $( "#country option:selected" ).text();

    var universities_list = [];
    var department_list = [];

    var companies_list = [];
    var roles_list = [];
    var duration_list = [];

    var credential_list = [];
    var issue_year_list = [];
    var credential_id_list = [];
    var credential_org_list = [];

    $('.university').each(function(index) {
      if ($( this ).val() != ''){
        universities_list.push ($( this ).val());
      }
    });

    $('.department').each(function(index) {
      if ($( this ).val() != ''){
        department_list.push ($( this ).val());
      }
    });

    $('.company').each(function(index) {
      if ($( this ).val() != ''){
        companies_list.push ($( this ).val());
      }
    });

    $('.role').each(function(index) {
      if ($( this ).val() != ''){
        roles_list.push ($( this ).val());
      }
    });

    $('.duration').each(function(index) {
      if ($( this ).val() != ''){
        duration_list.push ($( this ).val());
      }
    });

    $('.issue_organization').each(function(index) {
      if ($( this ).val() != ''){
        credential_org_list.push ($( this ).val());
      }
    });

    $('.issue_year').each(function(index) {
      if ($( this ).val() != ''){
        issue_year_list.push ($( this ).val());
      }
    });

    $('.credential_id').each(function(index) {
      if ($( this ).val() != ''){
        credential_id_list.push ($( this ).val());
      }
    });

    $('.certification').each(function(index) {
      if ($( this ).val() != ''){
        credential_list.push ($( this ).val());
      }
    });

    var conceptName = $('#gender').find(":selected").text();

    const doc = new jsPDF();

    doc.setFont("LibreCaslonDisplay-Regular");

    var text_name = first_name + ' ' + last_name;
    var text_email = email;
    var text_phone = phone;
    var text_gender = genderCapitalized;
    var text_nationality = nationalityCapitalized;
    var text_age = age;
    var text_address = address+', '+city+', ';

    if ($('#region').val().length>1){
      text_address = text_address + region + ', '+ country;
    }
    else {
      text_address = text_address + country;
    }

    doc.setFontSize(20);
    doc.setFontType('bold');
    doc.text("Curriculum Vitae", 10, 10);
    doc.setFontSize(12);
    doc.text("Personal Information", 10, 20);
    doc.setFontSize(10);
    doc.setFontType('normal');

    doc.text("Name",10, 25);
    doc.text(text_name, 35, 25);
    doc.text("Email",10, 30);
    doc.text(email, 35, 30);
    doc.text("Telephone",10, 35);
    doc.text(text_phone, 35, 35);
    doc.text("Address",10, 40);
    doc.text(text_address, 35, 40);
    doc.text("Age",10, 45);
    doc.text(text_age, 35, 45);
    doc.text("Gender",10, 50);
    doc.text(text_gender, 35, 50);
    doc.text("Nationality",10, 55);
    doc.text(text_nationality, 35, 55);

    doc.setFontSize(12);
    doc.setFontType('bold');
    doc.text("Education", 10, 65);
    doc.setFontType('normal');
    doc.setFontSize(10);

    index = 0;
    counter = 70;

    universities_list.forEach(function(item) {
      doc.text('\u2022 '+item, 10, counter);
      doc.text(department_list[index], 14, counter+5);
      counter = counter + 10;
      index = index + 1;
    });

    doc.setFontSize(12);
    doc.setFontType('bold');
    doc.text("Working Experience", 10, counter+5);
    doc.setFontType('normal');
    doc.setFontSize(10);

    index = 0;
    counter = counter+10

    companies_list.forEach(function(item) {
      doc.text('\u2022 '+item+', '+duration_list[index]+' Years', 10, counter);
      doc.text(roles_list[index], 14, counter+5);
      counter = counter + 10;
      index = index + 1;
    });

    doc.setFontSize(12);
    doc.setFontType('bold');
    doc.text("Certifications", 10, counter+5);
    doc.setFontType('normal');
    doc.setFontSize(10);

    index = 0;
    counter = counter+10

    credential_list.forEach(function(item) {
      doc.text('\u2022 '+item+' by '+credential_org_list[index], 10, counter);
      doc.text('Credential ID: '+credential_id_list[index], 14, counter+5);
      doc.text('Issue Organization: '+credential_org_list[index], 14, counter+10);
      doc.text('Issue Year: '+issue_year_list[index], 14, counter+15);
      counter = counter + 20;
      index = index + 1;
    });

    doc.setFontSize(12);
    doc.setFontType('bold');
    doc.text("Soft Skills", 10, counter+5);
    doc.setFontType('normal');
    doc.setFontSize(10);

    index = 0;
    counter = counter+10

    soft_skills_array = [];

    if (workEthic == true){ soft_skills_array.push("Work Ethic"); }
    if (motivation == true){ soft_skills_array.push("Motivation"); }
    if (timemanage == true){ soft_skills_array.push("Time Management"); }

    if (creative == true){ soft_skills_array.push("Creative"); }
    if (communication == true){ soft_skills_array.push("Communication"); }
    if (adaptability == true){ soft_skills_array.push("Adaptability"); }

    if (critical == true){ soft_skills_array.push("Critical Thinking"); }
    if (problem == true){ soft_skills_array.push("Problem Solving"); }
    if (teamwork == true){ soft_skills_array.push("Team Working"); }

    if (soft_skills_array.length > 0){
      soft_skills_array.forEach(function(item) {
        doc.text('\u2022 '+item, 10, counter);
        counter = counter + 5;
        index = index + 1;
      });
    }

    doc.save("CV.pdf");

  });

});
