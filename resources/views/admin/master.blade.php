<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <title>{{ isset($title) ? $title : 'DDemon Admin' }}</title>
    <link href="{{url('css/bootstrap.min.css')}}" rel="stylesheet">
    <link href="{{url('css/tma.css')}}" rel="stylesheet">
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <style>
      body {
        padding-top: 70px;
        padding-bottom: 20px;
        background-image: url("{{url('pics/ZenBG3.jpg')}}");
        background-color: #333333;  
      }
      .navbar {
        margin-bottom: 20px;
      }


.panel-dd {
  border-radius: 7px;
  background: transparent none repeat scroll 0% 0%;
}
.panel-dd > .panel-heading {
border-bottom: 1px solid rgba(255, 255, 255, 0.2);
border-radius: 7px 7px 0px 0px;
font-family: sans-serif;
text-transform: uppercase;
font-weight: 700;
padding: 10px 20px;
background: rgba(0, 0, 0, 0.55) none repeat scroll 0% 0%;
color: rgba(255, 255, 255, 0.75);
display: block;
}
.panel-dd > .panel-heading + .panel-collapse > .panel-body {
  border-top-color: #ddd;
}
.panel-dd > .panel-heading .badge {
  color: #f5f5f5;
  background-color: #333;
}
.panel-dd >  .panel-body {
 border-bottom-left-radius: 7px;
border-bottom-right-radius: 7px;
text-decoration: none;
background: rgba(255, 245, 255, 0.85) none repeat scroll 0% 0%;
min-height: 150px;
padding: 10px 12px 20px;
text-align: left;
font-size: 18px;
color: #000;
}

.panel-dd > .table {
  background: rgba(255, 245, 255, 0.85) none repeat scroll 0% 0%;
}

    </style>
    <script src="{{url('js/jquery-1.11.3.min.js')}}"></script>
    <script src="{{url('js/bootstrap.min.js')}}"></script>
    <script src="{{url('js/dd.js')}}"></script>
    <script src="{{url('js/crud.js')}}"></script>    
    <script>
    $.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
    });
    </script>
  </head>
  <body>
    @yield('menu')
    <div class="container-fluid">
      @yield('content')
    </div>

  </body>
</html>
