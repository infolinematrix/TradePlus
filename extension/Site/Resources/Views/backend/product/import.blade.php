@extends('reactor.layout.base')

@section('scripts')
    {!! Theme::js('js/list.js') !!}
    {!! Theme::js('js/jquery.livequery.js') !!}
@endsection
<!-- Main content -->
@section('content')
    <!-- Content Header (Page header) -->
    @include('partials.content_header',['title' => __('Product'),'breadcrumb => []'])


    <section class="content">

        <!-- SELECT2 EXAMPLE -->
        <div class="box box-default">
            <div class="box-header with-border">
                <h3 class="box-title">
                    Business Import
                </h3>

                <div class="box-tools pull-right">
                    <a href="{!! route('reactor.business.product',$node_id) !!}" class="btn btn-flat btn-danger">List</a>
                </div>
            </div>
            <!-- /.box-header -->
            {!! Form::open(['files' => true,'url' => route('reactor.business.product.import',$node_id)]) !!}
            <div class="box-body">
                <div class="row">
                    <div class="col-md-12 border-right">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Category</label>
                                    <div id="show_sub_categories">
                                        <select required class="form-control cat" name="categories[]" id="categories[]" required>
                                            <option value="">{!! __('----Select Category----') !!}</option>
                                            @foreach($categories as $category)

                                                <option value="{!! $category->getKey() !!}">{!! $category->getTitle() !!}</option>

                                            @endforeach
                                        </select>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="row">

                            <div class="col-md-3 ">
                                <label>Not allowed more than 500 data</label>
                                <input type="file" name="file">
                            </div>

                            <div class="col-md-4 col-md-offset-5">
                                <label>Download import file format</label>
                                <br>
                                <a href="{!! asset('/assets/product.xls') !!}" class="btn btn-xs btn-info">Download</a>
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