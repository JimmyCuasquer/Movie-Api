const {User} = require('../models/user.model')
const {Actor} = require('../models/actor.model')
const {Movie} = require('../models/movies.model')
const {MovieReviews} = require('../models/reviews.model')
const {ActorInMovie} = require('../models/ActorInMovie')

const initModel = () => {

User.hasMany(MovieReviews)
MovieReviews.belongsTo(User)

Movie.hasMany(MovieReviews)
MovieReviews.belongsTo(Movie)

Movie.belongsTo(Actor, troung)
MovieReviews.belongsTo(User)

Movie.belongsToMany(Actor, {through: 'actorId'});
Actor.belongsToMany(Movie, {through: 'movieId'});


}
module.exports = {initModel}