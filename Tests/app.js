mocha.setup('bdd');
var expect = chai.expect;

//TESTS
var Earth = {
  isRound : true,
  whichPlanet : 3,
  density : 6
}

describe('earth', function(){

  it('is round', function(){
    expect(Earth.isRound).to.equal(true);
  });

  it('is the third planet from the sun', function(){
    expect(Earth.whichPlanet).to.equal(4);
  });

  it('is a dense planet', function(){
    expect(Earth.density).to.be.at.least(5);
  })
});

mocha.checkLeaks();
mocha.run();
