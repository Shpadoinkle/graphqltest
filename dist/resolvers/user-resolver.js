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
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const user_1 = require("../entities/user");
let UserResolver = class UserResolver {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    /**
     * Queries/Mutations
     */
    me(ctx) {
        if (!ctx.user) {
            return null;
        }
        return this.userRepository.findOne(ctx.user.id);
    }
};
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Query(returns => user_1.User, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "me", null);
UserResolver = __decorate([
    type_graphql_1.Resolver(user_1.User),
    __param(0, typeorm_typedi_extensions_1.InjectRepository(user_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UserResolver);
exports.UserResolver = UserResolver;
