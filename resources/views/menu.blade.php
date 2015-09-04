@section('menu')
      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">DDemon</a>
          </div>
          <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
              <li class="active"><a href="#">Home</a></li>
              <li><a href="#">News</a></li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Blog <span class="caret"></span></a>
                <ul class="dropdown-menu" role="menu">
                  <li><a href="#">Action</a></li>
                  <li><a href="#">Another action</a></li>
                  <li><a href="#">Something else here</a></li>
                  <li class="divider"></li>
                  <li class="dropdown-header">Nav header</li>
                  <li><a href="#">Separated link</a></li>
                  <li><a href="#">One more separated link</a></li>
                </ul>
              </li>
              <li><a href="#">Photo</a></li>
              <li><a href="#">Guest Book</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
              @if(\Auth::check())
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">{{Auth::user()->name}} <span class="caret"></span></a>
                <ul class="dropdown-menu" role="menu">
                  <li><a href="#" id="dd-auth-top-logout" data-action="{{url($lang.'/auth/logout')}}">Logout</a></li>
                </ul>
              </li>              
              @else
              <li><a href="#">{{ trans('auth.signup') }}</a></li>
              <li class="dropdown" id="menuLogin">
                <a class="dropdown-toggle" href="#" data-toggle="dropdown" id="navLogin">{{ trans('auth.login') }}</a>
                <div class="dropdown-menu" style="width:500px;padding:17px;">
                  <form class="form-horizontal" id="dd-auth-top-login-form" action="{{url($lang.'/auth/login')}}" method="post">
                    <div class="form-group">
                     <label for="inputEmail" class="col-sm-2 control-label">{{ trans('auth.email') }}</label>
                      <div class="col-sm-10">
                        <input type="email" name="dd-auth-email" value="{{ old('dd-auth-email') }}" class="form-control" id="inputEmail" placeholder="{{ trans('auth.email_ph') }}">
                      </div>
                   </div>
                    <div class="form-group">
                      <label for="inputPassword" class="col-sm-2 control-label">{{ trans('auth.password') }}</label>
                      <div class="col-sm-10">
                       <input type="password" name="dd-auth-password" class="form-control" id="inputPassword" placeholder="{{ trans('auth.password') }}">
                     </div>
                   </div>
                    <div class="form-group">
                     <div class="col-sm-offset-2 col-sm-10">
                       <div class="checkbox">
                         <label>
                           <input type="checkbox" name="dd-auth-remember" value="1"> {{ trans('auth.remember') }}
                         </label>
                       </div>
                     </div>
                   </div>
                   <div class="form-group">
                    <div class="col-sm-12">
                      <div class="alert alert-danger" id="dd-auth-top-error-msg" style="display:none;" role="alert"><strong>{{ trans('auth.error') }}:</strong>{{ trans('auth.login_error') }}<br><a href="#">{{ trans('auth.forgot') }}</a></div>
                    </div>
                   </div>
                   <div class="form-group">
                     <div class="col-sm-2" >
                       <div style="display:none;" id="dd-auth-top-ajax-loader"><img src="{{url('pics/ajax-loader.gif')}}"></div>
                     </div>                   
                     <div class="col-sm-2">
                      {!! csrf_field() !!}
                       <button type="submit" class="dd_auth_login_btn btn btn-default" id="dd-auth-top-login-btn">{{ trans('auth.login') }}</button>
                        
                     </div>
                     <div class="col-sm-8">
                       {{ trans('auth.not_registered') }} <a href="#">{{ trans('auth.signup') }} DDemon!</a>
                     </div>
                   </div>
                  </form>
                </div>
              </li>
              @endif
              <li><a href="#" class="dd_change_lang" data-lang="{{$lang}}">{{($lang == 'en')? 'Русский' : 'English' }}</a></li>
            </ul>



          </div><!--/.nav-collapse -->
        </div><!--/.container-fluid -->
      </nav>
@endsection