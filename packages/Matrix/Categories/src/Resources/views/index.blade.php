@extends('layout.base')


<!-- Main content -->
@section('content')
    <!-- Content Header (Page header) -->
    @include('partials.content_header',['title' => 'Categories','breadcrumb' => (!empty($node) ? $node : null) ])

    <section class="content">

        <!-- SELECT2 EXAMPLE -->
        <div class="box box-default">
            <div class="box-header with-border">
                <h3 class="box-title">{!! __('Categories') !!}</h3>

                <div class="box-tools pull-right">
                    <a href="{!! route('reactor.category.import',$id) !!}" class="btn btn-flat btn-warning">Import</a>

                    <a href="{!! route('reactor.category.create',$id) !!}" class="btn btn-flat btn-danger">Create</a>

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
                                    {!! link_to_route('reactor.category.index', str_limit($node->getTitle(),25), [$node->getKey()]) !!}
                                </td>
                                <td>{!! str_limit($node->node_name,25) !!}</td>
                                <td>{!! $node->getNodeType()->label !!}</td>
                                <td>{!! $node->created_at->formatLocalized('%b %e, %Y') !!}</td>
                                <td class="text-right">
                                    @include('Categories::partials.options',['node' => $node])
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