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


