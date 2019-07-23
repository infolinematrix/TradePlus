@extends('layout.base')


<!-- Main content -->
@section('content')
    <!-- Content Header (Page header) -->
    @include('partials.content_header',['title' => 'Business','breadcrumb' => (!empty($node) ? $node : null) ])

    <section class="content">

        <!-- SELECT2 EXAMPLE -->
        <div class="box box-default">
            <div class="box-header with-border">
                <h3 class="box-title">{!! __('Business') !!}</h3>

                <div class="box-tools pull-right">
                    <a href="{!! route('reactor.business.import') !!}" class="btn btn-flat btn-warning">Import</a>

                    <a href="{!! route('reactor.business.create') !!}" class="btn btn-flat btn-danger">Create</a>

                </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body">

                @if(count($nodes) > 0 )
                    <table class="table table-striped">
                        <tbody>
                        <tr>
                            <th>{!! __('#ID') !!}</th>
                            <th>{!! __('Title') !!}</th>
                            <th width="30%">{!! __('Slug') !!}</th>
                            <th>{!! __('Type') !!}</th>
                            <th>{!! __('Updated') !!}</th>
                            <th class="text-right">{!! __('Action') !!}</th>
                        </tr>

                        @foreach($nodes as $node)
                            <tr>
                                <td>#{!! $node->getKey() !!}</td>
                                <td>
                                    <a href="{!! route('reactor.business.edit',[$node->getKey(),$node->translate(locale())->getKey()]) !!}">
                                        {!! $node->getTitle() !!}
                                    </a>
                                </td>
                                <td>{!! str_limit($node->node_name,25) !!}</td>
                                <td>{!! $node->getNodeType()->label !!}</td>
                                <td>{!! $node->created_at->formatLocalized('%b %e, %Y') !!}</td>
                                <td class="text-right">
                                    @include('Site::backend.business.partials.options',['node' => $node])
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
            @else
                {!! no_results_row(__('No Nodes found ...')) !!}
            @endif
            <!-- /.row -->
            </div>

            <div class="box-footer">
                @if(!is_null($nodes) && count($nodes) > 0)
                    @include('partials.contents.pagination', ['paginator' => $nodes])
                @endif
            </div>
        </div>
        <!-- /.box -->

    </section>
    <!-- /.content -->

@endsection