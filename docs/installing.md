# Installing the public browser

The CollectionSpace public browser application can be added to a web page with a few lines of HTML and JavaScript, and a small amount of web server configuration. For WordPress users, a [plugin](https://github.com/collectionspace/wp-collectionspace) is available that automates most of the work to add the public browser to a WordPress site.

## Adding the application to a web page

The public browser is a JavaScript application that can be loaded onto a web page, and configured to render into a container on the page. Typically, the page will be an HTML file named `index.html`, placed in some directory inside the server's document root.

Load the application's JavaScript code by adding a `script` tag to the HTML. The JavaScript code for the application can be retrieved from a JavaScript CDN, such as [jsDelivr](https://www.jsdelivr.com/) or [UNPKG](https://www.unpkg.com/). For example, to load the JavaScript for version 2.0.0 of the public browser from jsDelivr, add the following tag to the HTML file:

```
<script src="https://cdn.jsdelivr.net/npm/@collectionspace/cspace-public-browser@2.0.0/dist/cspacePublicBrowser.min.js"></script>
```

Typically, you'll want to use the latest version of the public browser that is compatible with the version of CollectionSpace you're using. Version compatibility is noted in the [changelog](../CHANGELOG.md). A major release of the public brower (when the first digit in the version number changes) may indicate that a newer version of the CollectionSpace server is required. Minor releases and bugfix releases of the public browser will not change compatibility with CollectionSpace.

Add a container element to the page. The public browser will be rendered into this element. Typically, the container element will be a `div` whose `id` is `cspace-browser`. For example:

```
<div id="cspace-browser"></div>
```

The container element should not have any content. Any existing content will be deleted.

The application must be initialized by adding some JavaScript code that calls an initialization function, passing in the desired configuration options. For example:

```
<script>
  cspacePublicBrowser({
    basename: '/collection',
    gatewayUrl: 'https://core.dev.collectionspace.org/gateway/core',
  });
</script>
```

Two configuration settings are required:

- `basename` - This should be set to the path to the web page containing the public browser, as seen in the URL to the page (which typically would also be the path to the index.html file, from the web root directory). For example, if the public browser is being added to a web page located at http://mymuseum.org/cspace/collection/index.html, then `basename` should be set to `/cspace/collection`.

- `gatewayUrl` - This should be set to the URL of a CollectionSpace public gateway that has access to the collection data. Typically, this is something like `https://{cspace server hostname}/gateway/{tenant short name}`. This can vary depending on how the CollectionSpace back-end has been configured, so verify the gateway URL with your CollectionSpace administrator.

One other setting is required if you're using a CollectionSpace community-of-practice profile:

- `baseConfig` - This should be set to the name of the profile.

See the [configuration reference](./configuration/README.md) for more information about these and other settings.

## Configuring the web server

The CollectionSpace public browser application runs as a "front controller". This means that if the application is added to a web page at e.g., http://mymuseum.org/cspace/collection, then any request to a URL under http://mymuseum.org/cspace/collection should return the same HTML as http://mymuseum.org/cspace/collection. The web server must be configured to do this. In Apache, this can be done using the [FallbackResource](https://httpd.apache.org/docs/trunk/mod/mod_dir.html#fallbackresource) directive. For example:

```
<Directory "/cspace/collection">
    FallbackResource /cspace/collection/index.html
</Directory>
```

Other web servers will vary.

## Customizing styling

Usually you'll need to add some CSS styling rules to make a seamless integration between your web site and the CollectionSpace browser application. The exact rules will depend on your web site's existing styling rules, and your preference for how the public browser looks. Writing these rules will require knowledge of HTML, CSS, and your web browser's developer tools.

In some cases, you'll need to override styling rules from your web site, and in other cases, you'll have to override styling from the CollectionSpace browser. To help target these rules, the following classes will appear on the `body` tag of a CollectionSpace browser page:

- `.collectionspace-template-default`: Indicates that this page is a CollectionSpace browser.

- `.has-cspace-SearchResultPage`: Indicates that this page contains a CollectionSpace browser search result listing.

- `.has-cspace-DetailPage`: Indicates that this page contains a CollectionSpace browser detail page.

To determine the exact selectors necessary to override a style, use your browser's developer tools to examine the structure of the HTML page, and the CSS rules that apply to the element you're interested in styling. Then write a more specific selector, using one of the above classes, to override any existing rules.
