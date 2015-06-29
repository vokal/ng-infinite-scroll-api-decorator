# ng-infinite-scroll-api-decorator

Makes it easier to connect paged API responses to ngInfiniteScroll

## Use

To initialize, pass a URL with the token `{page}` which will be replaced as each page is loaded.

```js
$scope.list = new infiniteScroll( "/users?p={page}" );
```

The attributes shown here are attributes of ngInfiniteScroll, but the conditionals and callbacks are part of infiniteScrollDecorator.

```html
<tbody infinite-scroll="list.getNextPage()" infinite-scroll-distance="0"
    infinite-scroll-disabled="list.busy || list.hasMore === false">
    <tr data-ng-repeat="item in list.items">
        ...
    </tr>
</tbody>
```

## Dependencies

Currently, there is a dependency on toastr, this may be removed in a future version.