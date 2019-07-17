<div class="dropdown">
    <button class="btn btn-primary btn-xs dropdown-toggle " type="button" data-toggle="dropdown">{!! __('Options') !!}
        <span class="caret"></span></button>
    <ul class="dropdown-menu dropdown-menu-right">
        <li>
            <a href="{!! route('reactor.category.index', $node->getKey()) !!}">View Child</a></li>
        <li>
            <a href="{!! route('reactor.category.edit',[$node->getKey(),$node->translate(locale())->getKey()]) !!}">{!! __('Edit Category') !!}</a>
        </li>
        <li>
            {!! delete_form(
                route('reactor.nodes.destroy', $node->getKey()),
                'Delete') !!}
        </li>
    </ul>


</div>
