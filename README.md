# XmlNode

Simple XML String generator that works across platforms, including Node.js, Chrome and IE.   This is tiny, so you can just include the code itself rather than introducing module dependencies in otherwise clean code.

# Install
`npm install protobi/xmlnode`

or
`<script type="text/javascript" src="https://rawgithub.com"

# Use
Here's an example generating the base for `xl/styles.xml` inside an Excel .xlsx document:

```js
var XmlNode = require('./xmlnode');

var $styles = XmlNode('styleSheet')
    .prefix('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>')
    .attr('xmlns:mc','http://schemas.openxmlformats.org/markup-compatibility/2006')
    .attr('xmlns:x14ac','http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac')
    .attr('xmlns','http://schemas.openxmlformats.org/spreadsheetml/2006/main')
    .attr('mc:Ignorable','x14ac')
    .append(XmlNode('numFmts').attr('count',0))
    .append(XmlNode('fonts').attr('count',0).attr("x14ac:knownFonts","1"))
    .append(XmlNode('fills').attr('count',0))
    .append(XmlNode('borders').attr('count',0))
    .append(XmlNode('cellStyleXfs').append(XmlNode('xf')
        .attr('numFmtId', 0)
        .attr('fontId', 0)
        .attr('fillId', 0)
        .attr('borderId', 0)))
    .append(XmlNode('cellXfs').attr('count',0))
    .append(
        XmlNode('cellStyles').append(XmlNode('cellStyle')
            .attr('name', 'Normal')
            .attr('xfId',0)
            .attr('builtinId',0))
    )
    .append(XmlNode('dxfs').attr('count', "0"))
    .append(XmlNode('tableStyles')
        .attr('count','0')
        .attr('defaultTableStyle','TableStyleMedium9')
        .attr('defaultPivotStyle','PivotStyleMedium4') );

console.log($styles.toXml());
```

## Motivation
I assumed XML strings is a solved problem by now.  There's cheerio.js and JSDom on the server, and there's jQuery on the browser. But it's surprisingly a hassle to write XML cross platforms.  In the end it was easier to write a small library than to adapt an exisiting framework.

 * Cheerio.js is super easy, but you have to tell it XML mode `cheerio('<patternFill>', null, null, {xmlMode: true})`
 * jQuery `$('<patternFill')` lower cases tag names on creation, so you have to use `$el = jQuery.parseXML('<patternFill>')`
 * jQuery `$el.html()` includes only the inner HTML, so you have to use `$el[0].outerHTML` to get the outer html
 * jQuery `outerHTML` lower cases the tag names, so you have to use `XMLSerializer`
 * And jQuery `outerHTML` [isn't defined in IE 10 or IE11](http://stackoverflow.com/questions/28799419/how-to-reliably-convert-xml-to-string-in-ie-10-11)
 * IE10 and 11 has some wild fails with XMLSerializer

So now you're working with libraries and arcane bugs to write a simple strings, but in a way that allows you to keep track
of references and add attributes and content dynamically as your model changes.  And writing code conditionally by platform.

A common alternative is writing strings by hand, as in `var xml = '<fonts count="+fonts.counts+'"><font name="'+font[i].name + '" sz="+font[i].sz+'"></font>";...`   But then you encounter embedded quotes which need escaping, and different kinds of quotes.  That's no fun either.  

Here use use a simple function from O'Reilly (http://archive.oreilly.com/pub/h/2127) inside a jQuery/cheerio-like wrapper.


