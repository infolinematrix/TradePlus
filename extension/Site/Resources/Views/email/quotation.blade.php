<html>



<body style="font-family: Open Sans, sans-serif;font-size:100%;font-weight:400;line-height:1.4;">
<table style="width:720px;margin:50px auto 10px;padding:20px;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;-webkit-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);-moz-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);">
    <thead>
    <tr>
        <th style="text-align:left;">
            <a href="{!! env('CLIENT_URL') !!}">
                {!! $site_name !!}
            </a>
        </th>
        <th style="text-align:right;font-weight:400;"><?= date('d') ?> <?= date('M') ?> <?= date('Y') ?></th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td style="height:35px;"></td>
    </tr>
    <tr>
        <td colspan="2" style="border: solid 1px #ddd; padding:10px 20px;">
            <p style="font-size:14px;margin:0 0 6px 0;">
                <span style="font-weight:bold;display:inline-block;min-width:146px">Your Requirement</span>
                <br>
                {!! $quotation !!}

            </p>

        </td>
    </tr>
    <tr>
        <td style="height:35px;"></td>
    </tr>

    <tr>
        <td colspan="2" style=" padding:10px 20px;">
            <p style="font-size:14px;margin:0 0 6px 0;">
                <span style="font-weight:bold;display:inline-block;min-width:146px">Business Owner's Message</span>
                <br>
                {!! $description !!}
            </p>

        </td>
    </tr>
    </tbody>
    <tfooter>
        <tr>
            <td colspan="2" style="font-size:14px;padding:50px 15px 0 15px;">
                <strong style="display:block;margin:0 0 10px 0;">Regards</strong> <a href="{!! env('CLIENT_URL') !!}/browse/company/{!! $slug !!}">{!! $business !!}</a><br> <br><br>
            </td>
        </tr>
    </tfooter>
</table>
</body>

</html>