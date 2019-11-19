"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../../src/");
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const recipe_1 = require("../entities/recipe");
const rate_1 = require("../entities/rate");
const recipe_input_1 = require("./types/recipe-input");
const rate_input_1 = require("./types/rate-input");
let RecipeResolver = class RecipeResolver {
    constructor(recipeRepository, ratingsRepository) {
        this.recipeRepository = recipeRepository;
        this.ratingsRepository = ratingsRepository;
    }
    recipe(recipeId) {
        return this.recipeRepository.findOne(recipeId);
    }
    recipes() {
        return this.recipeRepository.find();
    }
    addRecipe(recipeInput, { user }) {
        const recipe = this.recipeRepository.create(Object.assign({}, recipeInput, { author: user }));
        return this.recipeRepository.save(recipe);
    }
    rate({ user }, rateInput) {
        return __awaiter(this, void 0, void 0, function* () {
            // find the recipe
            const recipe = yield this.recipeRepository.findOne(rateInput.recipeId, {
                relations: ["ratings"],
            });
            if (!recipe) {
                throw new Error("Invalid recipe ID");
            }
            // add the new recipe rate
            (yield recipe.ratings).push(this.ratingsRepository.create({
                recipe,
                user,
                value: rateInput.value,
            }));
            // return updated recipe
            return yield this.recipeRepository.save(recipe);
        });
    }
};
__decorate([
    src_1.Query(returns => recipe_1.Recipe, { nullable: true }),
    __param(0, src_1.Arg("recipeId", type => src_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RecipeResolver.prototype, "recipe", null);
__decorate([
    src_1.Query(returns => [recipe_1.Recipe]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecipeResolver.prototype, "recipes", null);
__decorate([
    src_1.Mutation(returns => recipe_1.Recipe),
    __param(0, src_1.Arg("recipe")), __param(1, src_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recipe_input_1.RecipeInput, Object]),
    __metadata("design:returntype", Promise)
], RecipeResolver.prototype, "addRecipe", null);
__decorate([
    src_1.Mutation(returns => recipe_1.Recipe),
    __param(0, src_1.Ctx()), __param(1, src_1.Arg("rate")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, rate_input_1.RateInput]),
    __metadata("design:returntype", Promise)
], RecipeResolver.prototype, "rate", null);
RecipeResolver = __decorate([
    src_1.Resolver(recipe_1.Recipe),
    __param(0, typeorm_typedi_extensions_1.InjectRepository(recipe_1.Recipe)),
    __param(1, typeorm_typedi_extensions_1.InjectRepository(rate_1.Rate)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], RecipeResolver);
exports.RecipeResolver = RecipeResolver;
