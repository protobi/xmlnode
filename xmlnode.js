// Support  CommonJS, AMD or independent user
//http://stackoverflow.com/questions/13673346/supporting-both-commonjs-and-amd
(function (name, definition) {
  if (typeof define == 'function' && typeof define.amd == 'object') {console.log("AMD"); define(definition);}
  else if (typeof module != 'undefined') module.exports = definition();
  else this[name] = definition();
}('XmlNode', function () {
return (function () {
  function XmlNode(tagName, attributes, children) {

    if (!(this instanceof XmlNode)) {
      return new XmlNode(tagName, attributes, children);
    }
    this.tagName = tagName;
    this._attributes = attributes || {};
    this._children = children || [];
    this._prefix = '';
    return this;
  }

  XmlNode.prototype.createElement = function () {
    return new XmlNode(arguments)
  }

  XmlNode.prototype.children = function() {
    return this._children;
  }

  XmlNode.prototype.append = function (node) {
    this._children.push(node);
    return this;
  }

  XmlNode.prototype.prefix = function (prefix) {
    if (arguments.length==0) { return this._prefix;}
    this._prefix = prefix;
    return this;
  }

  //from http://archive.oreilly.com/pub/h/2127
  var APOS = "'"; QUOTE = '"'
  var ESCAPED_QUOTE = {  }
  ESCAPED_QUOTE[QUOTE] = '&quot;'
  ESCAPED_QUOTE[APOS] = '&apos;'

  XmlNode.prototype.escapeAttributeValue = function(att_value) {

    var att_value;
    var apos_pos, quot_pos;
    var use_quote, escape, quote_to_escape;
    var att_str;
    var re;
    var result = ''


    // Find first quote marks if any
    apos_pos = att_value.indexOf(APOS)
    quot_pos = att_value.indexOf(QUOTE)

    // Determine which quote type to use around
    // the attribute value
    if (apos_pos == -1 && quot_pos == -1) {
      att_str = ' ' + att + "='" + att_value +  "'"
      result += att_str

    }
    else {
      // Prefer the single quote unless forced to use double
      if (quot_pos != -1 && quot_pos < apos_pos) {
        use_quote = APOS
      }
      else {
        use_quote = QUOTE
      }

      // Figure out which kind of quote to escape
      // Use nice dictionary instead of yucky if-else nests
      escape = ESCAPED_QUOTE[use_quote]

      // Escape only the right kind of quote
      re = new RegExp(use_quote,'g')
      att_str = ' ' + att + '=' + use_quote +
          att_value.replace(re, escape) + use_quote
      result += att_str
    }
    return result
  }


  XmlNode.prototype.attr = function (attr, value) {
    if (arguments.length == 0) {
      return this._attributes;
    }
    else if (typeof attr == 'string' && arguments.length == 1) {
      return this._attributes.attr[attr];
    }
    if (typeof attr == 'object' && arguments.length == 1) {
      for (var key in attr) {
        this._attributes[key] = attr[key];
      }
    }
    else if (arguments.length == 2 && typeof attr == 'string') {
      this._attributes[attr] = value;
    }
    return this;
  }

  XmlNode.prototype.toXml = function (node) {
    if (!node) node = this;
    var xml = node._prefix;
    xml += '<' + node.tagName;
    if (node._attributes) {
      for (var key in node._attributes) {
        xml += ' ' + key + '="' + this.escapeAttributeValue(''+node._attributes[key]) + '"'ore
      }
    }
    if (node._children && node._children.length > 0) {
      xml += ">";
      for (var i = 0; i < node._children.length; i++) {
        xml += this.toXml(node._children[i]);
      }
      xml += '</' + node.tagName + '>';
    }
    else {
      xml += '/>';
    }
    return xml;
  }
  return XmlNode;
})();

}));