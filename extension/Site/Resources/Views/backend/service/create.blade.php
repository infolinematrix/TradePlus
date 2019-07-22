@extends('reactor.layout.base')
@section('scripts')

    @parent
    {!! Theme::js('js/list.js') !!}
    {!! Theme::js('js/jquery.livequery.js') !!}
@endsection
<!-- Main content -->
@section('content')
    <!-- Content Header (Page header) -->
    @include('partials.content_header',['title' => __('Service'),'breadcrumb => []'])


    <section class="content">

        <!-- SELECT2 EXAMPLE -->
        <div class="box box-default">
            <div class="box-header with-border">
                <h3 class="box-title">
                    {!! __('Post Add') !!}

                </h3>

                <div class="box-tools pull-right">
                    <a href="{!! route('reactor.business.service',$node_id) !!}" class="btn btn-flat btn-danger">List</a>
                </div>
            </div>
            <!-- /.box-header -->

            {!! form_start($form)!!}

            {!! form_row($form->type)  !!}
            <input type="hidden" value="{!! $node_id !!}" name="node_id">

            <div class="box-body">

                <div class="row">
                    <div class="col-md-12 border-right">

                        {!! form_row($form->title)  !!}
                        {!! form_row($form->node_name)  !!}

                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Category</label>
                            <div id="show_sub_categories">
                <select class="form-control cat" required name="categories[]" id="categories">
                    <option value="">--Select--</option>
                    @foreach($categories as $category)
                        <option value="{!! $category->getKey() !!}">{!! $category->getTitle() !!}</option>
                    @endforeach
                </select>
               </div>
              </div>
             </div>
            </div>

            </div>

            <div class="box-footer">
                <button type="submit" class="btn btn-action btn-black">
                    <i class="fa fa-save"></i>Save
                </button>
            </div>
            <!--FORM END-->
            {!! form_end($form,false)!!}

        </div>
        <!-- /.box -->

    </section>
    <!-- /.content -->

@endsection