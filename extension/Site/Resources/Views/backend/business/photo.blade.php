@extends('reactor.layout.base')

@section('styles')
    {!! Html::style('assets/plugins/dropzone/jquery.ezdzcover.css') !!}
@endsection
@section('scripts')
    {!! Html::script('assets/plugins/dropzone/jquery.ezdzcover.js') !!}

    @parent
    <script>
       <?php
        if($logo){?>
        $('.imglogo').ezdz({

            text: '<img src="{!! asset('uploads/'.$logo->path) !!}">',
        });
        <?php }else{?>

        $('.imglogo').ezdz({

            text: '300 X 200',
        });
        <?php }?>

        <?php
        if($cover){?>
        $('.imgcover').ezdzcover({

            text: '<img src="{!! asset('uploads/'.$cover->path) !!}">',
        });
       <?php }else{?>

       $('.imgcover').ezdzcover({

           text: 'Select a Image',
       });
        <?php }?>
    </script>
@endsection

<!-- Main content -->
@section('content')
    <!-- Content Header (Page header) -->
    @include('partials.content_header',['title' => __('Business'),'breadcrumb => []'])


    <section class="content">
        <div class="nav-tabs-custom" style="cursor: move;">
            <!-- Tabs within a box -->


            <ul class="nav nav-tabs pull-right ui-sortable-handle">
                <li class="active">
                    <a href="#daily" data-toggle="tab" aria-expanded="true" data-mode="daily">
                        {!! __('Update Business') !!}
                    </a>
                </li>
            </ul>
            <div class="tab-content">

                {!! Form::open(['files' => true,'url' => route('reactor.business.upload.photo')]) !!}
                {!! Form::hidden('node_id',$node->getKey()) !!}

                <div class="tab-pane active" id="daily">

                    <div class="row">
                        <div class="col-md-4 col-xs-12">
                            <fieldset class="scheduler-border">
                                <legend class="scheduler-border">Business Logo</legend>
                                <input type="file" class="imglogo" name="logo">
                            </fieldset>
                        </div>
                        <div class="col-md-8 col-xs-12">
                            <fieldset class="scheduler-border">
                                <legend class="scheduler-border">Business Cover</legend>
                                <input type="file" name="cover" class="imgcover">
                            </fieldset>

                        </div>
                    </div>


                </div>

                <button class="btn btn-primary">Save</button>
                <a href="{!! route('reactor.business.edit',[$node->getKey(),$node->translate(locale())->getKey()]) !!}" class="btn btn-info">Back</a>
                {!! Form::close() !!}
            </div>


        </div>
    </section>
    <!-- /.content -->

@endsection