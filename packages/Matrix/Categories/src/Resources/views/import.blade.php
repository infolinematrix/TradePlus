@extends('reactor.layout.base')


<!-- Main content -->
@section('content')
    <!-- Content Header (Page header) -->
    @include('partials.content_header',['title' => __('Categories'),'breadcrumb => []'])


    <section class="content">

        <!-- SELECT2 EXAMPLE -->
        <div class="box box-default">
            <div class="box-header with-border">
                <h3 class="box-title">
                   Category Import to {!! $parent !!}
                </h3>

                <div class="box-tools pull-right">
                    <a href="{!! route('reactor.category.index',$id) !!}" class="btn btn-flat btn-danger">List</a>
                </div>
            </div>
            <!-- /.box-header -->
            {!! Form::open(['files' => true,'url' => route('reactor.category.import',$id)]) !!}
            <div class="box-body">
                <div class="row">
                    <div class="col-md-12 border-right">
                        <div class="row">

                            <div class="col-md-3 ">
                                <label>Not allowed more than 500 data</label>
                                <input type="file" name="file">
                            </div>

                            <div class="col-md-4 col-md-offset-5">
                                <label>Download import file format</label>
                                <br>
                                <a href="{!! asset('/assets/category.xls') !!}" class="btn btn-xs btn-info">Download</a>
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