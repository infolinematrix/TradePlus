@extends('layout.base')


<!-- Main content -->
@section('content')
    <!-- Content Header (Page header) -->
    @include('partials.content_header',['title' => 'Requirements','breadcrumb' => (!empty($requirements) ? $requirements : null) ])

    <section class="content">

        <!-- SELECT2 EXAMPLE -->
        <div class="box box-default">
            <div class="box-header with-border">
                <h3 class="box-title">{!! __('Requirements') !!}</h3>

            </div>
            <!-- /.box-header -->
            <div class="box-body">

                @if(count($requirements) > 0 )
                    <table class="table table-striped">
                        <tbody>
                        <tr>
                            <th>{!! __('#ID') !!}</th>
                            <th>{!! __('Title') !!}</th>
                            <th>{!! __('Posted On') !!}</th>
                            <th class="text-right">{!! __('Action') !!}</th>
                        </tr>

                        @foreach($requirements as $requirement)
                            <tr>
                                <td>#{!! $requirement->id !!}</td>
                                <td>
                                    {!! str_limit($requirement->title,25) !!}
                                </td>
                                <td>{!! $requirement->created_at->formatLocalized('%b %e, %Y') !!}</td>
                                <td class="text-right">
                                    <div class="dropdown">
                                        <button class="btn btn-primary btn-xs dropdown-toggle " type="button" data-toggle="dropdown">{!! __('Options') !!}
                                            <span class="caret"></span></button>
                                        <ul class="dropdown-menu dropdown-menu-right">
                                            <li>
                                                <a href="{{ route('reactor.requirement.view',$requirement->id) }}"><i class="fa fa-eye"></i> {!! __('View') !!}</a>
                                            </li>
                                            <li>
                                                <a href="{!! route('reactor.requirement.delete',$requirement->id) !!}">
                                                    <i class="fa fa-trash-o"></i> Delete
                                                </a>
                                            </li>
                                        </ul>


                                    </div>

                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
            @else
                {!! no_results_row(__('No Requirements found ...')) !!}
            @endif
            <!-- /.row -->
            </div>

            <div class="box-footer">
                @if(!is_null($requirements) && count($requirements) > 0)
                    @include('partials.contents.pagination', ['paginator' => $requirements])
                @endif
            </div>
        </div>
        <!-- /.box -->

    </section>
    <!-- /.content -->

@endsection