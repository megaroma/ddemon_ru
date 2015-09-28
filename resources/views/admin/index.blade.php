@extends('admin.master')
@include('admin.menu')
@section('content')

<div class="panel panel-dd">
  <div class="panel-heading">This is my body content.</div>
  <div class="panel-body">
    {!! $content !!}
  </div>
</div>
@endsection