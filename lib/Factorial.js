// ----------------------------------------------------------------------------------------------------------------------
// A factorial expression.
// ----------------------------------------------------------------------------------------------------------------------

const Expression = require('./Expression');
const defaultScope = require('./defaultScope');

// ----------------------------------------------------------------------------------------------------------------------

class Factorial extends Expression
{
    constructor(content)
    {
        super('factorial');

        this.content = content;
    } // end constructor

    toString()
    {
        return `${ this.content }!`;
    } // end toString

    // noinspection JSAnnotator
    eval(scope, depth = 1)
    {
        scope = defaultScope.buildDefaultScope(scope);

        this.content = this.content.eval(scope, depth + 1);

        // Anything higher than 170 will cause value to exceed the maximum double precision float
        if(this.content.value > 170 || this.content.value < 0) 
        { 
            throw new RangeError('Factorial content out of range, must be between 0 and 170, inclusive.');
        }

        this.value = 1;

        for(let i = 2; i <= this.content.value; i++)
        {
            this.value *= i;
        }

        return this;
    } // end eval
} // end Factorial

// ----------------------------------------------------------------------------------------------------------------------

module.exports = Factorial;

// ----------------------------------------------------------------------------------------------------------------------
