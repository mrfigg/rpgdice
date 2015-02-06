{
	var Roll = require('./Roll');
}

start
  = additive:additive OWS { return additive; }

additive
  = left:multiplicative OWS oper:[+-] right:additive { return {type: (oper == '+') ? 'add' : 'subtract', left: left, right: right}; }
  / multiplicative

multiplicative
  = left:primary OWS oper:[*/] right:multiplicative
    { return {type: (oper == '*') ? 'multiply' : 'divide', left: left, right: right}; }
  / primary

primary
  = function
  / value
  / OWS '(' additive:additive OWS ')' { return additive; }
  / count:number OWS '(' additive:additive OWS ')'
    { return {type: 'repeat', count: count, right: additive}; }

function
  = name:identifier OWS '(' arg1:additive rest:(OWS ',' arg:additive { return arg; })* OWS ')' { return {type: 'function', name: name, args: [arg1].concat(rest) }; }

value
  = roll
  / variable
  / numberValue

///////

roll "die roll"
  = count:integer? OWS 'd' sides:integer
    { return new Roll((!count && count != 0) ? 1 : count, sides); }

variable
  = name:identifier { return {type: 'variable', name: name}; }

numberValue "numeric value"
  = value:number { return {type: 'number', value: value}; }

///////

number "number"
  = OWS value:$([0-9]+ ('.' [0-9]*)? / '.' [0-9]+)
    { return parseFloat(value); }

integer "integer"
  = OWS digits:$([0-9]+) { return parseInt(digits, 10); }

identifier "identifier"
  = (OWS name:$([A-Za-z_][A-Za-z0-9_]+) { return name; })
  / (OWS "'" name:$([^']* ("''" [^']+)*) "'" { return name; })
  / (OWS '[' name:$([^[\]]* ('\\]' [^[\]]+)*) ']' { return name; })

OWS = [ \t\r\n]*
