import { expect } from 'chai';
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { Types } from 'mongoose'
import { getRecipes } from './getRecipes.js';
import { NotFoundError, ValidationError } from 'com/errors.js';
import { User, Recipe } from '../data/index.js';
import { data } from '../data/index.js';
const { ObjectId } = Types

chai.use(chaiAsPromised)


describe('getRecipes', () => {
    before(() => data.connect(process.env.MONGO_URL, process.env.MONGO_DB));

    beforeEach(() => Promise.all([User.deleteMany({}), Recipe.deleteMany({})]));

    it('succeeds on existing user', () => {
        let user, recipe;
        return User.create({
            name: 'John Doe',
            email: 'john@doe.com',
            username: 'johndoe',
            password: 'password123'
        })
            .then((createdUser) => {
                user = createdUser;
                return Recipe.create({
                    author: user._id,
                    image: 'http://example.com/image.jpg',
                    title: 'Delicious Recipe',
                    description: 'A really delicious recipe.',
                    ingredients: ['ingredient1', 'ingredient2'],
                    cookingTime: 30
                });
            })
            .then((createdRecipe) => {
                recipe = createdRecipe;
                return getRecipes(user._id.toString());
            })
            .then((recipes) => {
                expect(recipes).to.be.an('array');
                expect(recipes).to.have.lengthOf(1);
                expect(recipes[0].title).to.equal(recipe.title);
                expect(recipes[0].description).to.equal(recipe.description);
            });
    });

    it('fails on non-existing user', () => {
        return expect(getRecipes(new ObjectId().toString()))
            .to.be.rejectedWith(NotFoundError, 'user not found');
    });

    it('fails on invalid user id', () => {
        expect(() => getRecipes(123)).to.throw(ValidationError, 'invalid id type');
        expect(() => getRecipes('123')).to.throw(ValidationError, 'invalid id syntax');
    });

    afterEach(() => Promise.all([User.deleteMany({}), Recipe.deleteMany({})]));

    after(() => data.disconnect());
});
