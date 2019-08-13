@extends('reactor.layout.base')


<!-- Main content -->
@section('content')
    <!-- Content Header (Page header) -->
    @include('partials.content_header',['title' => __('Reviews'),'breadcrumb => []'])


    <section class="content">


        <div class="row">
            <div class="col-md-9 border-right">
                <div class="nav-tabs-custom" style="cursor: move;">
                    <!-- Tabs within a box -->
                    <ul class="nav nav-tabs pull-right ui-sortable-handle">
                        <li class="pull-left header"><i class="fa fa-inbox"></i> {!! uppercase(__('View')) !!}</li>
                    </ul>
                    <div class="tab-content no-padding">
                        <div class="tab-pane active" id="node">
                            <div class="box-body">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Node Name : </label>
                                            {!! \Reactor\Hierarchy\Node::find($review->reviewable_id)->getTitle() !!}
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Review Title :</label>
                                            {!! $review->title !!}
                                        </div>
                                    </div>
                                </div>
                     <div class="row">
                         <div class="col-md-12">
                             <div class="form-group">
                                  <label>Review :</label>
                                          {!! $review->body !!}
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Rating :</label>
                                            {!! $review->rating !!} / 5
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Name :</label>
                                            {!! $review->first_name !!}
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Email :</label>
                                            {!! $review->email !!}
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>


                    </div>

                    <div class="box-footer">
                        <a href="{!! route('reactor.reviews.index') !!}" class="btn btn-action btn-black">
                            <i class="fa fa-list"></i>Back
                        </a>


                    </div>

                </div>



            </div>

            <div class="col-md-3">

                <div class="box box-default">
                    <div class="box-header with-border">
                        <h3 class="box-title">
                            {!! __('OPTIONS') !!}
                        </h3>

                    </div>
                    <!-- /.box-header -->

                    <div class="box-body">
                        <ul class="list-group">


                            <li class="list-group-item">

                                @if($review->approved == 0)
                                    <a class="text-info" href="{!! route('reactor.reviews.status',$review->id) !!}">
                                        <i class="fa fa-check"></i> Publish
                                    </a>

                                @else
                                    <a class="text-danger" href="{!! route('reactor.reviews.status',$review->id) !!}">
                                        <i class="fa fa-remove"></i> Unpublish
                                    </a>
                                @endif
                            </li>

                            <li class="list-group-item">
                                <a href="{!! route('reactor.reviews.delete',$review->id) !!}">
                                    <i class="fa fa-trash-o"></i> Delete
                                </a>
                            </li>

                        </ul>

                    </div>
                </div>

            </div>

        </div>

    </section>
    <!-- /.content -->

@endsection