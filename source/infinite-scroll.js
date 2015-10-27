( function ( root, factory )
{
    if( typeof define === "function" && define.amd )
    {
        define( "infinite-scroll-decorator", [ "toastr" ], function ( a0 )
        {
            return factory( a0 );
        } );
    }
    else if( typeof exports === "object" )
    {
        module.exports = factory( require( "toastr" ) );
    }
    else
    {
        factory( toastr );
    }
}( this, function ( toastr )
{
    angular.module( "infiniteScrollDecorator", [] )
    .service( "infiniteScrollDecorator", [
        function ()
        {
            "use strict";

        	/*
            * @param {string} url example: /users?p={page}
        	*/
            var infiniteScrollDecorator = function ( url, API )
            {
                var scope = this;

                scope.url = url;
                scope.API = API;

                scope.reload = function ()
                {
                    scope.items = [];
                    scope.page = 1;
                    scope.busy = false;
                    scope.hasMore = true;
                    scope.getNextPage();
                };

                scope.getNextPage = function ()
                {
                    if ( !scope.url || scope.busy || scope.hasMore === false )
                    {
                        return;
                    }

                    scope.busy = true;

                    API.$get( url.replace( "{page}", scope.page ) )
                        .then( function ( response )
                        {
                            var newItems = response.data.results;

                            if ( newItems && newItems.length )
                            {
                                for ( var i = 0; i < newItems.length; i++ )
                                {
                                    scope.items.push( newItems[ i ] );
                                }
                            }

                            scope.hasMore = !!response.data.nextPage || !!response.data.next || false;
                            scope.page++;
                            scope.busy = false;

                            if ( !scope.hasMore )
                            {
                                toastr.info( "All results loaded." );
                            }

                        },
                        function()
                        {
                            toastr.error( "Error", "There was an Error" );
                        } );
                };

                scope.reload();
            };

            return infiniteScrollDecorator;
        }
    ] );

} ) );
