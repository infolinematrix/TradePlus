<div class="dropdown">
    <button class="btn btn-primary btn-xs dropdown-toggle " type="button" data-toggle="dropdown">{!! __('Options') !!}
        <span class="caret"></span></button>
    <ul class="dropdown-menu dropdown-menu-right">
        <li>{!! node_option_form(
                $node->isPublished() ? route('reactor.nodes.unpublish', $node->getKey()) : route('reactor.nodes.publish', $node->getKey()),
                $node->isPublished() ? 'fa fa-check' : 'fa fa-remove text-danger',
                $node->isPublished() ? 'Unpublish' : 'Publish') !!}
        </li>
        <li>
            <a href="{!! route('reactor.business.edit',[$node->getKey(),$node->translate(locale())->getKey()]) !!}"><i class="fa fa-edit"></i> {!! __('Edit Business') !!}</a>
        </li>
        <li>
            {!! delete_form(
                route('reactor.business.destroy', $node->getKey()),
                'Delete') !!}
        </li>
    </ul>


</div>
