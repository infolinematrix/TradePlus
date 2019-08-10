@extends('reactor.layout.base')


<!-- Main content -->
@section('content')
    <!-- Content Header (Page header) -->
    @include('partials.content_header',['title' => __('Requirement'),'breadcrumb => []'])


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
                                            <label>Category : </label>
                                            {!! \Reactor\Hierarchy\Node::find($requirement->category)->getTitle() !!}
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Title :</label>
                                        {!! $requirement->title !!}
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Description :</label>
                                       {!! $requirement->description !!}
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>First Name :</label>
                                            {!! $requirement->first_name !!}
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Last Name :</label>
                                            {!! $requirement->last_name !!}
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Email :</label>
                                            {!! $requirement->email !!}
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Phone :</label>
                                            {!! $requirement->phone !!}
                                        </div>
                                    </div>



                                </div>

                            </div>

                        </div>


                    </div>

                    <div class="box-footer">
                        <a href="{!! route('reactor.requirement.index') !!}" class="btn btn-action btn-black">
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

                                @if($requirement->approved == 0)
                                    <a class="text-info" href="{!! route('reactor.requirement.status',$requirement->id) !!}">
                                        <i class="fa fa-check"></i> Publish
                                    </a>

                                 @else
                                    <a class="text-danger" href="{!! route('reactor.requirement.status',$requirement->id) !!}">
                                        <i class="fa fa-remove"></i> Unpublish
                                    </a>
                                @endif
                            </li>

                            <li class="list-group-item">
                                <a href="{!! route('reactor.requirement.delete',$requirement->id) !!}">
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