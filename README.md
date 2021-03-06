# valle-select

> Awesome valle-select - Web Component using Polymer 3

[![npm](https://img.shields.io/npm/v/@valle/valle-select.svg)](https://www.npmjs.com/package/@valle/valle-select)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@valle/valle-select)

## How to install and use:

1 - Install the element using [Yarn](http://yarn.io/):

```sh
$ yarn add @valle/valle-select
```

2 -  Import the element:

```html
<script type="module" src="node_modules/@valle/valle-select/valle-select.js"></script>
```

or in your javascript file

```js
import "@valle/valle-select/valle-select.js";
```

3 - Start using it!

<!--
```
<custom-element-demo>
  <template>
    <script type="module" src="valle-select.js"></script>
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->

```html
<valle-select label="Names" helpertext="Choose your name">
  <valle-option value="option 1">Example 1</valle-option>
  <valle-option value="option 2">Example 2</valle-option>
  <valle-option value="option 3">Example 3</valle-option>
</valle-select>
```

## &lt;valle-select&gt;

### Properties

Property        | Type        | Default   | Description
:---            |:---         |:---       |:---
`label`         | *String*    | `""`      | Default label
`disabled`      | *Boolean*   | `false`   | Disabled state
`required`      | *Boolean*   | `false`   | Required validate
`helpertext`    | *String*    | `""`      | Description text for help
`errortext`     | *String*    | `""`      | Error message
`placeholder`   | *String*    | `""`      | Default placeholder
`error`         | *Boolean*   | `false`   | Error state
`open`          | *Boolean*   | `false`   | Open state
`autofocus`     | *Boolean*   | `false`   | Default autofocus
`tooltip`       | *String*    | `""`      | A tooltip for inputs
`tooltippos`    | *String*    | `""`      | Tooltip position (available: `top-right`)
`tooltiplength` | *String*    | `""`      | Tooltip length (available: `small`, `medium` and `large`)

### Styling

The following custom properties and mixins are available for styling:

Custom property       | Default                  | Description
:---                  |:---                      |:---
--valle-select-color  | `rgba(5, 159, 183, .87)` | Primary color
--valle-input-width   | `100%`                   | Select width
--icon-tooltip-color  | `#000`                   | Icon tooltip color

### API

The following properties are available via javascript:

Property         | Type      | Description
:---             |:---       |:---
value            | `String`  | Selected value from option content
data-valle-value | `String`  | Selected value from option value
disabled         | `Boolean` | Disabled state
options          | `Array`   | All `valle-options` available
open             | `Boolean` | Open state
error            | `Boolean` | Error state
current          | `Object`  | Selected `valle-options`

## &lt;valle-option&gt;

### Properties

Property   | Type        | Default   | Description
:---       |:---         |:---       |:---
`selected` | *Boolean*   | `false`   | Selected state
`value`    | *String*    | `""`      | Default value

## Browser Support

Using the [webcomponents.js](https://github.com/WebComponents/webcomponentsjs):

 ![Chrome](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/39.2.2/chrome/chrome_48x48.png) | ![Opera](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/39.2.2/opera/opera_48x48.png) | ![Firefox](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/39.2.2/firefox/firefox_48x48.png) | ![Safari](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/39.2.2/safari/safari_48x48.png) |![IE](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/39.2.2/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |  ![Edge](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/39.2.2/edge/edge_48x48.png) |
:---: | :---: | :---: | :---: | :---: | :---: |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 11+ | Latest ✔

## Development

1 - Verify if you have [node](http://nodejs.org/) and [yarn](http://yarn.io/) installed.

2 - Install [Polymer-CLI](https://www.polymer-project.org/1.0/docs/tools/polymer-cli):

```sh
$ [sudo] yarn global add polymer-cli
```

3 - Install local dependencies:

```sh
$ yarn
```

4 - Start the development server:

```sh
$ yarn start
```

## Versioning

To keep better organization of releases we follow the [Semantic Versioning 2.0.0](http://semver.org/) guidelines.

## Contributing

Find on our [issues](https://github.com/valleweb/valle-select/issues/) the next steps of the project ;)
<br>
Want to contribute? [Follow these recommendations](https://github.com/valleweb/valle-select/blob/master/CONTRIBUTING.md).

## History

See [Releases](https://github.com/valleweb/valle-select/releases) for detailed changelog.

## License

[MIT License](https://github.com/valleweb/valle-select/blob/master/LICENSE.md) © [valleweb](https://github.com/orgs/valleweb/people)
