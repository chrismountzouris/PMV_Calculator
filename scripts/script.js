$( document ).ready(function() {

  $( "#at_value" ).keyup(function() {
    if ($("#at_value").val()>40){
      $( "div .air_temperature_validate" ).addClass( "was-validated" );
      if ($("#gt_value").val().length>0 && $("#at_value").val().length>0 && $("#av_value").val().length>0){
        var mrt_temp = parseFloat($("#gt_value").val()) + 2.42*parseFloat($("#av_value").val())*parseFloat(($("#at_value").val())-parseFloat($("#gt_value").val()));
        mrt_temp = Math.round(mrt_temp * 100) / 100
        $("#mrt_value").val(mrt_temp);
      }
      if ($("#rh_value").val().length>0 && $("#at_value").val().length>0){
        var at_temp = parseFloat(($("#at_value").val()));
        var wvp = (parseFloat($("#rh_value").val())/100)*0.1333*Math.exp(18.6686-4030.183/(at_temp+235));
        wvp = Math.round(wvp * 100) / 100
        $("#pa_value").val(wvp);
      }
    }
  });

  $( "#gt_value" ).keyup(function() {
    if ($("#gt_value").val()>40){
      $( "div .globe_temperature_validate" ).addClass( "was-validated" );
    }
    if ($("#gt_value").val().length>0 && $("#at_value").val().length>0 && $("#av_value").val().length>0){
      var mrt_temp = parseFloat($("#gt_value").val()) + 2.42*parseFloat($("#av_value").val())*parseFloat(($("#at_value").val())-parseFloat($("#gt_value").val()));
      mrt_temp = Math.round(mrt_temp * 100) / 100
      $("#mrt_value").val(mrt_temp);
    }
    if ($("#rh_value").val().length>0 && $("#at_value").val().length>0){
      var at_temp = parseFloat(($("#at_value").val()));
      var wvp = (parseFloat($("#rh_value").val())/100)*0.1333*Math.exp(18.6686-4030.183/(at_temp+235));
      wvp = Math.round(wvp * 100) / 100
      $("#pa_value").val(wvp);
    }
  });

  $( "#rh_value" ).keyup(function() {
    if ($("#rh_value").val()>100 || $("#rh_value").val()<0){
      $( "div .relative_humidity_validate" ).addClass( "was-validated" );
    }
    if ($("#rh_value").val().length>0 && $("#at_value").val().length>0){
      var at_temp = parseFloat(($("#at_value").val()));
      var wvp = (parseFloat($("#rh_value").val())/100)*0.1333*Math.exp(18.6686-4030.183/(at_temp+235));
      wvp = Math.round(wvp * 100) / 100
      $("#pa_value").val(wvp);
    }
  });

  $( "#av_value" ).keyup(function() {
    if ($("#av_value").val()>1 || $("#av_value").val()<0){
      $( "div .air_velocity_validate" ).addClass( "was-validated" );
    }
    if ($("#gt_value").val().length>0 && $("#at_value").val().length>0 && $("#av_value").val().length>0){
      var mrt_temp = parseFloat($("#gt_value").val()) + 2.42*parseFloat($("#av_value").val())*parseFloat(($("#at_value").val())-parseFloat($("#gt_value").val()));
      mrt_temp = Math.round(mrt_temp * 100) / 100
      $("#mrt_value").val(mrt_temp);
    }
    if ($("#rh_value").val().length>0 && $("#at_value").val().length>0){
      var at_temp = parseFloat(($("#at_value").val()));
      var wvp = (parseFloat($("#rh_value").val())/100)*0.1333*Math.exp(18.6686-4030.183/(at_temp+235));
      wvp = Math.round(wvp * 100) / 100
      $("#pa_value").val(wvp);
    }
  });

  $("#clo_value").val($("#upper_clothing_insulation").val()+' clo');

  $("#met_value").val($("#metabolic_rate").val()+' met');

  $("#upper_clothing_insulation").on('change', function (e) {
    $("#clo_value").val($("#upper_clothing_insulation").val()+' clo');
  });

  $("#metabolic_rate").on('change', function (e) {
    $("#met_value").val($("#metabolic_rate").val()+' met');
  });

  // Personal Information Step
  $("#button_next_1").click(function() {

    if ($("#at_value").val() == '' || $("#gt_value").val() == '' || $("#av_value").val() == '' || $("#rh_value").val() == ''){
      $( "div .col-md-6" ).addClass( "was-validated" );
      $( "div .col-md-3" ).addClass( "was-validated" );
      return;
    }

    if ($("#at_value").val() < 10 || $("#at_value").val() > 40 || $("#gt_value").val() > 40 || $("#gt_value").val() < 10 || $("#rh_value").val()>100 || $("#rh_value").val() <0 || $("#av_value").val()>1 || $("#av_value").val() <0){
      $( "div .col-md-6" ).addClass( "was-validated" );
      $( "div .col-md-3" ).addClass( "was-validated" );
      return;
    }

    at_value = $("#at_value").val();
    gt_value = $("#gt_value").val();
    av_value = $("#av_value").val();
    rh_value = $("#rh_value").val();

    window.localStorage.setItem('at_value', at_value);
    window.localStorage.setItem('gt_value', gt_value);
    window.localStorage.setItem('av_value', av_value);
    window.localStorage.setItem('rh_value', rh_value);

    location.href = 'index2.html';

  });

  $( "#submit" ).click(function() {

    // Air Temperature Value
    var Ta = parseFloat(window.localStorage.getItem('at_value'));

    if (Ta<10){ Ta = 10.0; }

    if (Ta>40){ Ta = 40.0; }

    // Global Temperature Value
    var Tg = parseFloat(window.localStorage.getItem('gt_value'));

    if (Tg<10){ Tg = 10.0; }

    if (Tg>40){ Tg = 40.0; }

    // Air Velocity Value
    var av = parseFloat(window.localStorage.getItem('av_value'));

    if (av<0){ av = 0.0; }

    if (av>1){ av = 1.0; }

    // Mean Radiant Temperature [MRT]
    var Tr = parseFloat(Tg + 2.42*av*(Ta-Tg));

    // Relative humidity Value
    var rh = parseFloat(window.localStorage.getItem('rh_value'));

    if (rh<0){ rh = 0.0; }

    if (rh>100){ rh = 100.0; }

    // Metabolic Rate Value
    var m = 58*parseFloat($("#metabolic_rate").val());

    // Activity Level Value
    var w = 0;

    // Clothing Insulation
    var Icl = parseFloat($("#upper_clothing_insulation").val());

    Icl = Icl * 0.155;

    var Tsk = 35.7 - 0.0285*m;

    // Partial Water pressure vapour
    var Pa = (rh/100)*0.1333*Math.exp(18.6686-4030.183/(Ta+235));

    var factor = 500; var s = 0;

    do {

      // Clothing Factor / Clothing Insulation
      var fcl = 1.05 + 0.65*Icl;

      var e = 0.42*((m-w)-58);

      var Ediff = 3.05*(0.255*Tsk-3.36-Pa);

      var Hres = 1.73*0.01*m*(5.867-Pa)+1.4*0.001*m*(34-Ta);

      var Tcl = Tsk-Icl*(m-w-e-Ediff-Hres-s);

      var hr = 5.67*(10**-8)*0.95*0.77*( Math.exp(4*Math.log(273+Tcl))-Math.exp(4*Math.log(273+Tr)) )/(Tcl-Tr);

      var hc = 12.1*Math.pow(av,0.5);

      var r = fcl*hr*(Tcl-Tr);

      var c = fcl*hc*(Tcl-Ta);

      var Balance = m-w-e-Ediff-Hres-r-c-s;

      if (Balance>0)  {
        s = s + factor;
        factor = factor/2;
      }
      else {
        s = s - factor;
      }

    } while (Math.abs(Balance) > 0.01);

    s = m-w-e-Ediff-Hres-r-c;

    var pmv = (0.303*Math.exp(-0.036*m)+0.028)*s

    pmv = Math.round(pmv*100)/100;

    window.localStorage.setItem('pmv_value', pmv);

    //alert("PMV: "+pmv);

    location.href = 'index3.html';

  });


});
