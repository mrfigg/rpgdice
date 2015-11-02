//----------------------------------------------------------------------------------------------------------------------
// Rolls a signle die of the given number of sides.
//
// @module rolldie.js
//----------------------------------------------------------------------------------------------------------------------

module.exports = {
    rollDie: function(sides)
    {
        return Math.floor(Math.random() * sides) + 1;
    } // end rollDice
}; // end exports

//----------------------------------------------------------------------------------------------------------------------