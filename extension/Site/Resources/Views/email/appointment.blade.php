<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<body>

<div style='padding: 15px'>
    <div style='padding: 10px 0px; font-size: 14px; color: #3b3b3b'>


        <h3>Hello Sir, You have an Appointment from <a href="{!! env('CLIENT_URL') !!}">{!! $site_name !!}</a></h3>
        <br><b>Full Name : </b>{!! $name !!}
        <br><b>Email : </b>{!! $email !!}
        <br><b>Phone No : </b>{!! $phone !!}
        <br><b>Date & Time: </b>{!! $picker_date.' '.$picker_time !!}



    </div>


    <p>
    <div style='font-size: 12px; color: #005983'>{!! $content !!}</div>
    </p>

</div>
</body>
</html>