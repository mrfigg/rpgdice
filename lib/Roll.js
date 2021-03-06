// ---------------------------------------------------------------------------------------------------------------------
// A roll expression.
// ---------------------------------------------------------------------------------------------------------------------

const Expression = require('./Expression');
const defaultScope = require('./defaultScope');

const { rollDie } = require('./rolldie');
const { range } = require('./utils');

// ---------------------------------------------------------------------------------------------------------------------

class Roll extends Expression
{
    constructor(count, sides)
    {
        super('roll');

        this.count = count;
        this.sides = sides;
        this.results = [];
    } // end constructor

    toString()
    {
        const count = (this.count === undefined) ? '' : this.count;

        return `${ count }d${ this.sides }`;
    } // end toString

    render()
    {
        const count = (this.count === undefined) ? '' : this.count.render();

        return `{ ${ count }d${ this.sides.render() }: [ ${ this.results.join(', ') } ] }`;
    } // end render

    // noinspection JSAnnotator
    eval(scope, depth = 1)
    {
        scope = defaultScope.buildDefaultScope(scope);

        let count = 1;

        if(this.count !== undefined)
        {
            this.count = this.count.eval(scope, depth + 1);

            count = Math.floor(Math.abs(this.count.value));
        } // end if

        this.sides = this.sides.eval(scope, depth + 1);

        this.results = range(count).reduce((results) =>
        {
            results.push(rollDie(this.sides.value));
            return results;
        }, []);

        this.value = this.results.reduce((results, roll) => results + roll, 0);

        this.value *= (this.count && this.count.value < 0 ? -1 : 1);

        return this;
    } // end eval
} // end Roll

// ---------------------------------------------------------------------------------------------------------------------

module.exports = Roll;

// ---------------------------------------------------------------------------------------------------------------------
