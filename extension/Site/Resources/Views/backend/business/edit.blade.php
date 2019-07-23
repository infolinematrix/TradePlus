@extends('reactor.layout.base')



@section('scripts')
    @parent
    {!! Theme::js('js/list.js') !!}
    {!! Theme::js('js/jquery.livequery.js') !!}
@endsection
<!-- Main content -->
@section('content')
    <!-- Content Header (Page header) -->
    @include('partials.content_header',['title' => __('Business'),'breadcrumb => []'])


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
                                                <label>Location</label>
                                                <div id="show_sub_locations">
                                                    @if($location_meta)
                                                        <select class="form-control loc" required name="locations[]" id="location">
                                                            <option value="">--Select--</option>
                                                            @foreach($locations as $location)
                                                                <option value="{!! $location->getKey() !!}" @if($location_meta == $location->getKey()) selected @endif>{!! $location->getTitle() !!}</option>
                                                            @endforeach
                                                        </select>


                                                        <?php

                                                        $sub1 = $node->metas()->where('key','locations')->first();

                                                        if($sub1){?>
                                                        <?php
                                                        $metas = explode(',', $sub1->value);
                                                        ?>
                                                        @foreach($metas as $loc)

                                                            <?php
                                                            if($loc != $location_meta){
                                                            ?>
                                                            <?php
                                                            $locationtype = get_node_type('locations');
                                                            ?>
                                                            <select class="loc form-control" name="locations[]"
                                                                    required>
                                                                <?php
                                                                $p1 = \Reactor\Hierarchy\Node::findOrFail($loc);

                                                                $ll = $locationtype->nodes()->where('parent_id', $p1->parent_id)->translatedIn(locale())->get();

                                                                ?>
                                                                @foreach($ll as $l)
                                                                    <option value="{!! $l->getKey() !!}" {!! (($p1->getKey() == $l->getkey()) ? "Selected": '') !!}>{!! $l->getTitle() !!}</option>
                                                                @endforeach

                                                            </select>
                                                            <?php }?>

                                                        @endforeach
                                                        <?php }?>

                                                    @else

                                                        <select class="form-control loc" required name="locations[]" id="location">
                                                            <option value="">--Select--</option>
                                                            @foreach($locations as $location)
                                                                <option value="{!! $location->getKey() !!}">{!! $location->getTitle() !!}</option>
                                                            @endforeach
                                                        </select>
                                                    @endif
                                                </div>

                                            </div>
                                        </div>


                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            {!! form_row($form->business_lat)  !!}
                                        </div>
                                        <div class="col-md-6">
                                            {!! form_row($form->business_long)  !!}
                                        </div>
                                    </div>


                                </fieldset>


                                <fieldset class="scheduler-border">
                                    <legend class="scheduler-border">Other Information</legend>
                                    <div class="row">
                                        <div class="col-md-8">
                                            {!! form_row($form->business_address) !!}
                                        </div>
                                        <div class="col-md-4">
                                            {!! form_row($form->business_zipcode) !!}
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-8">
                                            {!! form_row($form->business_email) !!}
                                        </div>
                                        <div class="col-md-4">
                                            {!! form_row($form->business_phone) !!}
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            {!! form_row($form->business_website) !!}
                                        </div>
                                        <div class="col-md-6">
                                            {!! form_row($form->business_entity) !!}
                                        </div>
                                    </div>

                                </fieldset>
                                <fieldset class="scheduler-border">
                                    <legend class="scheduler-border">About</legend>

                                    <div class="row">
                                        <div class="col-md-12">
                                            {!! form_row($form->description) !!}
                                        </div>
                                    </div>

                                </fieldset>

                                <fieldset class="scheduler-border">
                                    <legend class="scheduler-border">Others</legend>

                                    <div class="row">
                                        <div class="col-md-4">
                                            {!! form_row($form->business_employee) !!}
                                        </div>
                                        <div class="col-md-4">
                                            {!! form_row($form->business_scale) !!}
                                        </div>
                                        <div class="col-md-4">
                                            {!! form_row($form->business_established) !!}
                                        </div>
                                    </div>
                                </fieldset>

                                <fieldset class="scheduler-border">
                                    <legend class="scheduler-border">Social Links</legend>
                                    <div class="row">
                                        <div class="col-md-6">
                                            {!! form_row($form->business_facebook) !!}
                                        </div>
                                        <div class="col-md-6">
                                            {!! form_row($form->business_twitter) !!}
                                        </div>
                                        <div class="col-md-6">
                                            {!! form_row($form->business_linkedin) !!}
                                        </div>
                                        <div class="col-md-6">
                                            {!! form_row($form->business_youtube) !!}
                                        </div>
                                        <div class="col-md-6">
                                            {!! form_row($form->business_google) !!}
                                        </div>
                                    </div>
                                </fieldset>

                                <fieldset class="scheduler-border">
                                    <legend class="scheduler-border">Settings</legend>
                                    <div class="row">
                                        <div class="col-md-6">
                                          {!! form_row($form->emailenquiry) !!}
                                        </div>

                                        <div class="col-md-6">
                                            {!! form_row($form->phonemessage) !!}
                                        </div>
                                    </div>

                                    <legend class="scheduler-border">Accept Payment</legend>

                                    @foreach(config('site.payment_accept') as $payment_accept => $value)

                                        <div class="checkbox-inline checkbox-small">

                                            @if($node)
                                                <?php
                                                $arr = json_decode($node->payment_accept, true);
                                                ?>
                                                @if($arr)

                                                    <input type="checkbox" name="payment_accept[]"
                                                           value="{!! $payment_accept !!}"
                                                            {!!  (in_array($payment_accept, $arr) ? "checked='checked'" : "" ) !!}> {!! $value !!}

                                                @else

                                                    <input type="checkbox" name="payment_accept[]"
                                                           value="{!! $payment_accept !!}"
                                                    > {!! $value !!}
                                                @endif
                                            @else
                                                <input type="checkbox" name="payment_accept[]"
                                                       value="{!! $payment_accept !!}"
                                                > {!! $value !!}
                                            @endif


                                        </div>
                                    @endforeach

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

                @include('Site::backend.business.partials.options_list',['_edit' => true])

            </div>

        </div>

    </section>
    <!-- /.content -->

@endsection