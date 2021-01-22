class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numOfVamps = 0;
    let currentVamp = this;

    while (currentVamp.creator) {
      currentVamp = currentVamp.creator;
      numOfVamps++;
    }
    return numOfVamps;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.numberOfVampiresFromOriginal > vampire.numberOfVampiresFromOriginal)
      return false;
    else return true;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let thisVamp = this;
    let thatVamp = vampire;

    if (this.creator === null || thisVamp.name === thatVamp.name) {
      return this;
    }

    while (thisVamp.creator) {
      while (thatVamp.creator) {
        if (thisVamp.creator.name === thatVamp.name)
          return thatVamp;
        else if (thatVamp.creator.name === thisVamp.name)
          return thisVamp;

        if (thatVamp.creator.name === thisVamp.creator.name) {
          return thatVamp.creator;
        }

        thatVamp = thatVamp.creator;
      }
      thisVamp = thisVamp.creator;
      
      //reset comparing vamp
      thatVamp = vampire;
    }
    return false;
  }
}

module.exports = Vampire;

