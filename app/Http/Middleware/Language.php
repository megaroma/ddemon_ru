<?php namespace App\Http\Middleware;

use Closure;
use Illuminate\Routing\Redirector;
use Illuminate\Http\Request;
use Illuminate\Foundation\Application;

class Language  {

    public function __construct(Application $app, Redirector $redirector, Request $request) {
        $this->app = $app;
        $this->redirector = $redirector;
        $this->request = $request;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // Make sure current locale exists.
        $locale = $request->segment(1);

        if ( ! array_key_exists($locale, $this->app->config->get('app.locales'))) {
            $segments = $request->segments();
            //$segments[0] = $this->app->config->get('app.fallback_locale');

            $c_locate = \Cookie::get('lang',''); //$request->cookie('lang','');

            $c_locate =  \Crypt::decrypt($c_locate);
            if(($c_locate != "") && (array_key_exists($c_locate , $this->app->config->get('app.locales')))) {
                $locale = $c_locate;
            } else {
                $locale = $this->app->config->get('app.fallback_locale');
            }
            array_unshift($segments,$locale);
            return $this->redirector->to(implode('/', $segments));
        }

        $lang_c = \Cookie::forever('lang', $locale);
        \Cookie::queue($lang_c);

        $this->app->setLocale($locale);
        \View::share ( 'lang', $locale );

        return $next($request);
    }

}
