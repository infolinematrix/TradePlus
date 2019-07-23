@extends('reactor.layout.base')


@section('scripts')

    @parent
    {!! Theme::js('js/list.js') !!}
    {!! Theme::js('js/jquery.livequery.js') !!}

    <script>
        <?php
        if($cover){?>
        $('.imgcover').ezdz({

            text: '<img src="{!! asset('uploads/'.$cover->path) !!}">',
        });
        <?php }else{?>

        $('.imgcover').ezdz({

            text: 'Select a Image',
        });
        <?php }?>
    </script>
@endsection
<!-- Main content -->
@section('content')
    <!-- Content Header (Page header) -->
    @include('partials.content_header',['title' => __('Service'),'breadcrumb => []'])


    <section class="content">


        <div class="row">
            <div class="col-md-9 border-right">

                {!! form_start($form) !!}

                <div class="nav-tabs-custom" style="cursor: move;">
                    <!-- Tabs within a box -->
                    <ul class="nav nav-tabs pull-right ui-sortable-handle">

                        <li>
                            <a href="#seo" data-toggle="tab" aria-expanded="false"><i
                                        class="fa fa-magnet"></i> {!! uppercase(__('SEO')) !!}</a>
                        </li>

                        <li class="active">
                            <a href="#node" data-toggle="tab" aria-expanded="true"><i
                                        class="fa fa-code-fork"></i> {!! uppercase(__('Node')) !!}</a>
                        </li>

                        <li class="pull-left header"><i class="fa fa-inbox"></i> {!! uppercase(__('Edit')) !!}</li>
                    </ul>


                    <div class="tab-content no-padding">

                        <div class="tab-pane active" id="node">
                            <div class="box-body">
                                <fieldset class="scheduler-border">
                                    <legend class="scheduler-border">Basic Information</legend>
                                    <div class="row">
                                        <div class="col-md-12">
                                            {!! form_row($form->title)  !!}
                                        </div>
                                    </div>

                                    <div class="hidden">
                                        <div class="col-md-12">
                                            {!! form_row($form->node_name)  !!}
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label>Category</label>
                                                <div id="show_sub_categories">
                                                    @if($category_meta)
                                                        <select class="form-control cat" required name="categories[]" id="categories">
                                                            <option value="">--Select--</option>
                                                            @foreach($categories as $category)
                                                                <option value="{!! $category->getKey() !!}" @if($category_meta == $category->getKey()) selected @endif>{!! $category->getTitle() !!}</option>
                                                            @endforeach
                                                        </select>


                                                        <?php

                                                        $sub1 = $node->metas()->where('key','categories')->first();

                                                        if($sub1){?>
                                                        <?php
                                                        $metas = explode(',', $sub1->value);
                                                        ?>
                                                        @foreach($metas as $loc)

                                                            <?php
                                                            if($loc != $category_meta){
                                                            ?>
                                                            <?php
                                                            $categoryype = get_node_type('categories');
                                                            ?>
                                                            <select class="loc form-control" name="categories[]"
                                                                    required>
                                                                <?php
                                                                $p1 = \Reactor\Hierarchy\Node::findOrFail($loc);

                                                                $ll = $categoryype->nodes()->where('parent_id', $p1->parent_id)->translatedIn(locale())->get();

                                                                ?>
                                                                @foreach($ll as $l)
                                                                    <option value="{!! $l->getKey() !!}" {!! (($p1->getKey() == $l->getkey()) ? "Selected": '') !!}>{!! $l->getTitle() !!}</option>
                                                                @endforeach

                                                            </select>
                                                            <?php }?>

                                                        @endforeach
                                                        <?php }?>

                                                    @else

                                                        <select class="form-control cat" required name="categories[]" id="categories">
                                                            <option value="">--Select--</option>
                                                            @foreach($categories as $category)
                                                                <option value="{!! $category->getKey() !!}">{!! $category->getTitle() !!}</option>
                                                            @endforeach
                                                        </select>
                                                    @endif
                                                </div>

                                            </div>
                                        </div>


                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            {!! form_row($form->description)  !!}
                                        </div>

                                    </div>


                                </fieldset>

                                <fieldset class="scheduler-border">
                                    <legend class="scheduler-border">Image</legend>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <input type="file" class="imgcover" name="cover">
                                        </div>
                                    </div>
                                </fieldset>







                            </div>

                        </div>

                        <div class="tab-pane" id="seo">
                            @include('reactor.nodes.includes.seo')
                        </div>
                        <!-- Morris chart - Sales -->

                    </div>

                    <div class="box-footer">
                        <button type="submit" class="btn btn-action btn-black">
                            <i class="fa fa-save"></i>Save
                        </button>


                    </div>

                </div>

                {!! form_end($form,false)!!}

            </div>

            <div class="col-md-3">

                @include('Site::backend.service.partials.options_list',['_edit' => true])

            </div>

        </div>

    </section>
    <!-- /.content -->

@endsection