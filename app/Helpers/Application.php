<?php
/**
 * Created by PhpStorm.
 * User: dev
 * Date: 4/4/17
 * Time: 12:42 PM
 */



use ReactorCMS\Entities\NodeMeta;
use Reactor\Documents\Media\Media;

use ReactorCMS\Entities\Node;
use ReactorCMS\Entities\Settings;
//use App\Support\Database\CacheQueryBuilder;




/*Get Mail Confriguration*/



/*Get Settings*/

if (!function_exists('getSettings')) {

    function getSettings($variable = '')
    {

        //$settings = Settings::where('variable', $variable)->first();
        $settings = Cache::rememberForever('settings_' . $variable, function () use ($variable) {
            return Settings::where('variable', $variable)->first();
        });

        if ($settings) {
            return $settings->value;
        } else {

            return false;
        }

    }
}

//Time ellaps

if (!function_exists('time_elapsed_string')) {
    function time_elapsed_string($datetime, $full = false)
    {
        $now = new DateTime;
        $ago = new DateTime($datetime);
        $diff = $now->diff($ago);

        $diff->w = floor($diff->d / 7);
        $diff->d -= $diff->w * 7;

        $string = array(
            'y' => 'year',
            'm' => 'month',
            'w' => 'week',
            'd' => 'day',
            'h' => 'hour',
            'i' => 'minute',
            's' => 'second',
        );
        foreach ($string as $k => &$v) {
            if ($diff->$k) {
                $v = $diff->$k . ' ' . $v . ($diff->$k > 1 ? 's' : '');
            } else {
                unset($string[$k]);
            }
        }

        if (!$full) {
            $string = array_slice($string, 0, 1);
        }

        return $string ? implode(', ', $string) . ' ago' : 'just now';
    }
}


