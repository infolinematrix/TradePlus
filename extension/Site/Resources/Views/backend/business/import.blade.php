@extends('reactor.layout.base')

@section('scripts')
    {!! Theme::js('js/list.js') !!}
    {!! Theme::js('js/jquery.livequery.js') !!}
@endsection
<!-- Main content -->
@section('content')
    <!-- Content Header (Page header) -->
    @include('partials.content_header',['title' => __('Business'),'breadcrumb => []'])


    <section class="content">

        <!-- SELECT2 EXAMPLE -->
        <div class="box box-default">
            <div class="box-header with-border">
                <h3 class="box-title">
                    Business Import
                </h3>

                <div class="box-tools pull-right">
                    <a href="{!! route('reactor.business.index') !!}" class="btn btn-flat btn-danger">List</a>
                </div>
            </div>
            <!-- /.box-header -->
            {!! Form::open(['files' => true,'url' => route('reactor.business.import')]) !!}
            <div class="box-body">
                <div class="row">
                    <div class="col-md-12 border-right">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Location</label>
                                    <div id="show_sub_locations">
                                        <select required class="form-control loc" name="locations[]" id="locations[]" required>
                                            <option value="">{!! __('----Select Location----') !!}</option>
                                            @foreach($locations as $location)

                                                <option value="{!! $location->getKey() !!}">{!! $location->getTitle() !!}</option>

                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Business Type</label>
                                    <select class="form-control" name="business_entity">
                                        @foreach(config('site.entity') as $key => $value)
                                            <option value="{!! $key !!}">{!! $value !!}</option>
                                        @endforeach

                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Scale</label>
                                    <select class="form-control" name="business_scale">
                                        @foreach(config('site.scale') as $key => $value)
                                            <option value="{!! $key !!}">{!! $value !!}</option>
                                        @endforeach

                                    </select>
                                </div>
                            </div>

                           <div class="col-md-12">
                               <legend class="scheduler-border">Accept Payment</legend>

                           @foreach(config('site.payment_accept') as $payment_accept => $value)

                                <div class="checkbox-inline checkbox-small">

                                        <input type="checkbox" name="payment_accept[]"
                                               value="{!! $payment_accept !!}"
                                        > {!! $value !!}
                                </div>
                            @endforeach
                                </div>

                        </div>
                        <hr>
                        <div class="row">

                            <div class="col-md-3 ">
                                <label>Not allowed more than 500 data</label>
                                <input type="file" name="file">
                            </div>

                            <div class="col-md-4 col-md-offset-5">
                                <label>Download import file format</label>
                                <br>
                                <a href="{!! asset('/assets/business.xls') !!}" class="btn btn-xs btn-info">Download</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="box-footer">
                <button type="submit" class="btn btn-action btn-black">
                    <i class="fa fa-save"></i>Import
                </button>
            </div>
            {!! Form::close() !!}

        </div>
        <!-- /.box -->

    </section>
    <!-- /.content -->

@endsection